import { Observable, Subject } from "rxjs";
import { PLUGINS } from "./retext-plugins";
import { ObsidianReadabilitySettings } from "./settings";

export type Summary = {
  selector: keyof ObsidianReadabilitySettings;
  settingsKey: string;
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

export const updaterObservable = new Subject<Summary[]>();

export const updateSummary = (summary: Summary[]) => {
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

  updaterObservable.next(fullSummary);
};
