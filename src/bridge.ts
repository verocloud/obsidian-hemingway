import { Observable, Subject } from "rxjs";
import { PLUGINS } from "./retext-plugins";

export type Summary = {
  selector: string;
  label: string;
  count: number;
};

const classes: Summary[] = PLUGINS.map(({ name, label }) => {
  const cssClass = `cm-rtx-${name.toLocaleLowerCase().replace(" ", "-")}`;

  return {
    selector: cssClass,
    count: 0,
    label,
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
