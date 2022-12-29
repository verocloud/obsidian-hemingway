import { EditorView } from "@codemirror/view";
import { MarkdownView, Plugin } from "obsidian";
import { errorHighlightPlugin } from "./statefield-plugin";
import { CounterView, COUNTER_VIEW_TYPE } from "./counter-view";
import {
  ObsidianReadabilitySettings,
  DEFAULT_SETTINGS,
  SettingsTab,
} from "./settings";
import { VFile } from "vfile";

export default class RetexterPlugin extends Plugin {
  settings: ObsidianReadabilitySettings;
  editorView: EditorView;

  async onload() {
    (VFile.prototype as any).warn = VFile.prototype.message;
    (String.prototype as any).join = function (separator: string) {
      return this;
    };

    await this.loadSettings();

    this.registerEditorExtension(errorHighlightPlugin(this.settings));

    this.registerView(
      COUNTER_VIEW_TYPE,
      (leaf) => new CounterView(leaf, this.settings)
    );

    this.addSettingTab(new SettingsTab(this.app, this));

    this.activateView();
  }

  async onunload() {
    this.app.workspace.detachLeavesOfType(COUNTER_VIEW_TYPE);
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async activateView() {
    this.app.workspace.detachLeavesOfType(COUNTER_VIEW_TYPE);

    await this.app.workspace.getRightLeaf(false).setViewState({
      type: COUNTER_VIEW_TYPE,
      active: true,
    });

    this.app.workspace.revealLeaf(
      this.app.workspace.getLeavesOfType(COUNTER_VIEW_TYPE)[0]
    );
  }
}
