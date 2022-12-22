import { ItemView, WorkspaceLeaf } from "obsidian";
import { ObsidianReadabilitySettings } from "./settings";

import { Summary, updaterObservable } from "./bridge";

export const COUNTER_VIEW_TYPE = "counter";

export class CounterView extends ItemView {
  private settings: ObsidianReadabilitySettings;

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
    updaterObservable.subscribe((summary) => {
      this.update(summary);
    });
  }

  update(summary: Summary[]) {
    if (!this.containerEl) return;

    const container = this.containerEl.children[1];
    container.empty();
    container.createEl("h1", { text: "Retex findings" });

    const wrapper = container.createDiv("wrapper");

    for (const { count, label, selector } of summary) {
      if (count) {
        const div = wrapper.createDiv(selector);
        const span = div.createSpan();
        span.setText(`${count} - ${label}`);
      }
    }
  }

  async onClose() {
    updaterObservable.unsubscribe();
  }
}
