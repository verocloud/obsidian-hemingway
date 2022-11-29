import { EditorView } from "@codemirror/view";
import { MarkdownView, Plugin } from "obsidian";
import { errorHighlightPlugin } from "./statefield-plugin";

const DEFAULT_SETTINGS = {};

export default class HemingwayPlugin extends Plugin {
	settings: typeof DEFAULT_SETTINGS;
	editorView: EditorView;

	async onload() {
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);

		this.registerEditorExtension(errorHighlightPlugin);
	}

	async onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
