import { Observable, Subject } from "rxjs";
import { PLUGINS } from "./retext-plugins";

export type Summary = {
  selector: string;
  label?: string;
  count: number;
};

export const classes: Summary[] = PLUGINS.map((plugin) => ({
  selector: plugin.settingsKey,
  label: plugin.label,
  count: 0,
}));

export const updaterObservable = new Subject<Summary[]>();

export const updateSummary = (summary: Summary[]) => {
  for (let summaryItem of summary) {
    const classItem = classes.find(
      (item) => item.selector === summaryItem.selector
    );
    if (classItem) {
      classItem.count = summaryItem.count;
    }
  }

  updaterObservable.next(classes);
};
