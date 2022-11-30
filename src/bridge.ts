import { Observable, Subject } from "rxjs";

export type Summary = {
  selector: string;
  label?: string;
  count: number;
};

export const classes: Summary[] = [
  {
    selector: "cm-rtx-intensify",
    label: "Weak words",
    count: 0,
  },
  {
    selector: "cm-rtx-passive",
    label: "Passive voice",
    count: 0,
  },
  {
    selector: "cm-rtx-profanities",
    label: "Bad words or profanities",
    count: 0,
  },
  {
    selector: "cm-rtx-readability",
    label: "Readability",
    count: 0,
  },
  {
    selector: "cm-rtx-repeated-words",
    label: "Repeated words",
    count: 0,
  },
  {
    selector: "cm-rtx-sentence-spacing",
    label: "Sentence spacing",
    count: 0,
  },
  {
    selector: "cm-rtx-indefinite-article",
    label: "Wrong indefinite article",
    count: 0,
  },
  {
    selector: "cm-rtx-equality",
    label: "Equality",
    count: 0,
  },
];

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
