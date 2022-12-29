import { ItemView, WorkspaceLeaf } from "obsidian";

import { Summary, Updater, updaterObservable } from "./bridge";
import { ObsidianReadabilitySettings } from "./settings";
import { getSentiment } from "./sentiment";

export const COUNTER_VIEW_TYPE = "counter";

export class CounterView extends ItemView {
  settings: ObsidianReadabilitySettings;
  previousUpdater: Updater;

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
    updaterObservable.subscribe((updateContent) => this.update(updateContent));
  }

  update(updater?: Updater) {
    if (!this.containerEl) return;

    if (!updater) updater = this.previousUpdater;
    this.previousUpdater = updater;

    const { newContent, summary } = updater;

    const container = this.containerEl.children[1];
    container.empty();
    container.createEl("h1", { text: "Retex findings" });

    let css = "";

    const wrapper = container.createDiv("wrapper");

    for (const { count, label, selector, settingsKey } of summary) {
      if (count === 0 || settingsKey === "highlightText") continue;

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

    const analyzedSentiment = getSentiment(newContent);
    const sentimentContent = `${analyzedSentiment} (${this.sentimentToEmoji(
      analyzedSentiment
    )})`;

    const sentimentParagraph = wrapper.createDiv("sentiment");
    sentimentParagraph.createEl("span", {
      text: "Sentiment level: ",
      cls: "cm-rtx-sentiment-lvl-lbl",
    });
    sentimentParagraph.createEl("span", {
      text: sentimentContent,
      cls: "cm-rtx-sentiment-lvl",
    });

    container.createEl("style", {
      text: css,
    });
  }

  sentimentToEmoji(sentiment: number) {
    if (sentiment < -5) {
      return "😡";
    } else if (sentiment < -2) {
      return "😠";
    } else if (sentiment < 0) {
      return "😕";
    } else if (sentiment == 0) {
      return "😐";
    } else if (sentiment < 2) {
      return "🙂";
    } else if (sentiment < 5) {
      return "😀";
    } else {
      return "😍";
    }
  }

  async onClose() {
    updaterObservable.unsubscribe();
  }
}
