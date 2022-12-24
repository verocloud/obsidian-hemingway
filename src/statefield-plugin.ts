import { StateField } from "@codemirror/state";
import { Decoration, DecorationSet, EditorView } from "@codemirror/view";

import { unified } from "unified";
import english from "retext-english";
import stringify from "retext-stringify";
import { Summary, updateSummary } from "./bridge";
import { ObsidianReadabilitySettings } from "./settings";
import { PLUGINS } from "./retext-plugins";

/*
type Plugins = typeof PLUGINS[number];
type Keys = Plugins["messageSource"];
type ExtractCssClass<T extends Keys> = T extends Plugins["messageSource"]
  ? typeof PLUGINS[number]["cssClass"]
  : never;

type LegacyClasses = {
  [key in Keys]: ExtractCssClass<key>;
};
*/

type Classes = Record<
  string,
  {
    label: string;
    cssClass: string;
    settingsKey: keyof ObsidianReadabilitySettings;
  }
>;

type KeyToNumber = Record<
  string,
  {
    count: number;
    label: string;
    settingsKey: keyof ObsidianReadabilitySettings;
  }
>;

const classes = PLUGINS.reduce((acc, plugin) => {
  const messageSource = `retext-${plugin.settingsKey
    .toLocaleLowerCase()
    .replace(" ", "-")}`;
  const cssClass = `cm-rtx-${plugin.name
    .toLocaleLowerCase()
    .replace(" ", "-")}`;

  acc[messageSource] = {
    label: plugin.label,
    settingsKey: plugin.settingsKey,
    cssClass,
  };
  return acc;
}, {} as Classes);

const initializeProcessor = (settings: ObsidianReadabilitySettings) => {
  let processor = unified().use(english);

  for (const plugin of PLUGINS) {
    if (settings[plugin.settingsKey].enabled) {
      const pluginFn = plugin.plugin as any;

      if (plugin.settings) processor = processor.use(pluginFn, plugin.settings);
      else processor = processor.use(pluginFn);
    }
  }

  return processor.use(stringify);
};

export const errorHighlightPlugin = (settings: ObsidianReadabilitySettings) =>
  StateField.define<DecorationSet>({
    create: (_) => Decoration.none,
    update: function (highlights, tr) {
      highlights = Decoration.none;

      const fullText = tr.newDoc.sliceString(0);
      const processor = initializeProcessor(settings);

      const vfile = processor.processSync(fullText);
      const summary: KeyToNumber = {};

      for (let message of vfile.messages) {
        if (!message.source) continue;
        const source = message.source;
        if (!classes[source]) {
          continue;
        }

        const { cssClass: className, label, settingsKey } = classes[source];

        if (summary[className] === undefined) {
          summary[className] = {
            label,
            count: 1,
            settingsKey,
          };
        } else {
          summary[className].count += 1;
        }

        const begin = message.position?.start.offset || 0;
        const end = message.position?.end.offset || 0;

        let skip = false;
        highlights.between(begin, end, (from, to, value) => {
          skip = (value as any).class === className;
          return false;
        });

        if (!skip)
          highlights = highlights.update({
            add: [
              Decoration.mark({
                class: classes[message.source].cssClass,
                attributes: { title: message.reason },
              }).range(begin, end),
            ],
          });
      }

      const summaryArray: Summary[] = Object.entries(summary).map(
        ([key, value]) => ({
          selector: key as keyof ObsidianReadabilitySettings,
          count: value.count,
          label: value.label,
          settingsKey: value.settingsKey,
        })
      );
      updateSummary(summaryArray, tr.newDoc.sliceString(0));
      return highlights;
    },
    provide: (f) => EditorView.decorations.from(f),
  });
