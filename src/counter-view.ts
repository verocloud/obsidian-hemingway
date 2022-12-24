import { ItemView, WorkspaceLeaf } from "obsidian";

import { Updater, updaterObservable } from "./bridge";
import { ObsidianReadabilitySettings } from "./settings";

export const COUNTER_VIEW_TYPE = "counter";

import { calculateIndexes } from "./grade-level-algs";

export class CounterView extends ItemView {
  settings: ObsidianReadabilitySettings;
  previousUpdate: Updater;

  constructor(leaf: WorkspaceLeaf, settings: ObsidianReadabilitySettings) {
    super(leaf);
    this.settings = settings;
  }

  getDisplayText(): string {
    return "Hemingway Plugin";
  }

  getViewType(): string {
    return COUNTER_VIEW_TYPE;
  }

  async onOpen() {
    updaterObservable.subscribe((summary) => this.update(summary));
  }

  update(update?: Updater) {
    if (!this.containerEl) return;

    if (!update) update = this.previousUpdate;
    const { docContent, summary } = update;

    this.previousUpdate = update;

    const container = this.containerEl.children[1];
    container.empty();
    container.createEl("h1", { text: "Retex findings" });

    let css = "";

    const wrapper = container.createDiv("cm-wrapper");

    for (const { count, label, selector, settingsKey } of summary) {
      if (count === 0) continue;

      const div = wrapper.createDiv(selector);
      const span = div.createSpan();
      span.setText(`${count} - ${label}`);

      const backgroundColor = this.settings[settingsKey].background;
      const color = this.settings[settingsKey].foreground;

      css += `.${selector} {
        background-color: ${backgroundColor};
        color: ${color};
      }\n`;
    }

    const table = wrapper.createEl("table");
    table.addClass("cm-rtx-summary__table");

    const tr = table.createEl("tr");

    tr.createEl("th", { text: "Algorithm" });
    tr.createEl("th", { text: "Level" });
    tr.createEl("th", { text: "Who can read?" });

    for (const { name, result } of calculateIndexes(docContent)) {
      const tr = table.createEl("tr");

      tr.createEl("td", { text: name });
      tr.createEl("td", { text: `${result.value.toFixed(2)}` });
      tr.createEl("td", { text: result.label });
    }

    container.createEl("style", {
      text: css,
    });
  }

  async onClose() {
    updaterObservable.unsubscribe();
  }
}
