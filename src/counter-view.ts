import { ItemView, WorkspaceLeaf } from "obsidian";

import { Summary, updaterObservable } from "./bridge";
import { ObsidianReadabilitySettings } from "./settings";

export const COUNTER_VIEW_TYPE = "counter";

export class CounterView extends ItemView {
  settings: ObsidianReadabilitySettings;
  previousSummary: Summary[] = [];

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

  update(summary?: Summary[]) {
    if (!this.containerEl) return;

    console.log("antes", summary);
    if (!summary) summary = this.previousSummary;
    console.log("despues", summary);

    this.previousSummary = summary;

    const container = this.containerEl.children[1];
    container.empty();
    container.createEl("h1", { text: "Retex findings" });

    let css = "";

    const wrapper = container.createDiv("wrapper");

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

    container.createEl("style", {
      text: css,
    });
  }

  async onClose() {
    updaterObservable.unsubscribe();
  }
}
