import { EditorView } from "@codemirror/view";
import { MarkdownView, Plugin } from "obsidian";
import { errorHighlightPlugin } from "./statefield-plugin";
import { CounterView, COUNTER_VIEW_TYPE } from "./counter-view";

const DEFAULT_SETTINGS = {};

export default class HemingwayPlugin extends Plugin {
	settings: typeof DEFAULT_SETTINGS;
	editorView: EditorView;

	async onload() {
		await this.loadSettings();

		const view = this.app.workspace.getActiveViewOfType(MarkdownView);

		this.registerEditorExtension(errorHighlightPlugin);

		this.registerView(COUNTER_VIEW_TYPE, (leaf) => {
			return new CounterView(leaf, this.settings);
		});

		this.activateView();
	}

	async onunload() {
		this.app.workspace.detachLeavesOfType(COUNTER_VIEW_TYPE);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, this.loadData());
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
