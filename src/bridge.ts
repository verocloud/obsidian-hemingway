import { Subject } from "rxjs";
import { PLUGINS } from "./retext-plugins";
import { ObsidianReadabilitySettings } from "./settings";

export type Summary = {
  selector: keyof ObsidianReadabilitySettings;
  settingsKey: keyof ObsidianReadabilitySettings;
  label: string;
  count: number;
};

const classes: Summary[] = PLUGINS.map(({ name, label, settingsKey }) => {
  const cssClass = `cm-rtx-${name.toLocaleLowerCase().replace(" ", "-")}`;

  return {
    selector: cssClass as keyof ObsidianReadabilitySettings,
    count: 0,
    label,
    settingsKey,
  };
});

export type Updater = { summary: Summary[]; newContent: string };
export const updaterObservable = new Subject<Updater | undefined>();

export const updateSummary = (summary: Summary[], newContent: string) => {
  const fullSummary = classes.map((item) => {
    const summaryItem = summary.find(
      (summaryItem) => summaryItem.selector === item.selector
    );

    if (summaryItem) {
      return summaryItem;
    } else {
      return item;
    }
  });

  updaterObservable.next({ summary: fullSummary, newContent });
};
