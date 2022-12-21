import { StateField } from "@codemirror/state";
import { Decoration, DecorationSet, EditorView } from "@codemirror/view";

import { unified } from "unified";
import english from "retext-english";
import equality from "retext-equality";
import indefiniteArticle from "retext-indefinite-article";
import syntaxMentions from "retext-syntax-mentions";
import sentenceSpacing from "retext-sentence-spacing";
import repeatedWords from "retext-repeated-words";
import quotes from "retext-quotes";
import profanities from "retext-profanities";
import passive from "retext-passive";
import intensify from "retext-intensify";
import readability from "retext-readability";
import stringify from "retext-stringify";
import { Summary, updateSummary } from "./bridge";
import { ObsidianReadabilitySettings } from "./settings";

const classes = {
  "retext-intensify": "cm-rtx-intensify",
  "retext-passive": "cm-rtx-passive",
  "retext-profanities": "cm-rtx-profanities",
  "retext-readability": "cm-rtx-readability",
  "retext-repeated-words": "cm-rtx-repeated-words",
  "retext-sentence-spacing": "cm-rtx-sentence-spacing",
  "retext-indefinite-article": "cm-rtx-indefinite-article",
  "retext-equality": "cm-rtx-equality",
} as const;

const initializeProcessor = (settings: ObsidianReadabilitySettings) => {
  let processor = unified().use(english);
  if (settings.passive) processor = processor.use(passive);

  if (settings.readability) processor = processor.use(readability, { age: 18 });

  if (settings.intensify) processor = processor.use(intensify);

  if (settings.equality) processor = processor.use(equality);

  if (settings["indefinite-article"])
    processor = processor.use(indefiniteArticle);

  if (settings["sentence-spacing"]) processor = processor.use(sentenceSpacing);

  if (settings["repeated-words"]) processor = processor.use(repeatedWords);

  if (settings.profanities)
    processor = processor.use(profanities, { sureness: 2 });

  return processor.use(stringify);
};

type KeyToNumber<T extends Record<keyof T, keyof any>> = {
  [P in T[keyof T]]?: number;
};

export const errorHighlightPlugin = (settings: ObsidianReadabilitySettings) =>
  StateField.define<DecorationSet>({
    create: (_) => Decoration.none,
    update: function (highlights, tr) {
      const fullText = tr.newDoc.sliceString(0);
      const processor = initializeProcessor(settings);

      highlights = highlights.map(tr.changes);
      const vfile = processor.processSync(fullText);
      const summary: KeyToNumber<typeof classes> = {};

      for (let message of vfile.messages) {
        if (!message.source) continue;
        const source = message.source as keyof typeof classes;
        const className = classes[source];

        summary[className] = (summary[className] || 0) + 1;

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
                class: classes[message.source as keyof typeof classes],
                attributes: { title: message.reason },
              }).range(begin, end),
            ],
          });
      }

      const summaryArray = Object.entries(summary).map(([key, value]) => ({
        selector: key,
        count: value,
      }));
      updateSummary(summaryArray);
      return highlights;
    },
    provide: (f) => EditorView.decorations.from(f),
  });
