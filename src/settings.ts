import { App, PluginSettingTab, Setting, SettingTab } from "obsidian";
import RetexterPlugin from "./main";

export const DEFAULT_SETTINGS = {
  intensify: {
    enabled: true,
    background: "#246A7355",
    foreground: "#fff",
  },
  passive: {
    enabled: true,
    background: "#2AFC9855",
    foreground: "#000",
  },
  profanities: {
    enabled: true,
    background: "#C4A29E55",
    foreground: "#000000",
  },
  readability: {
    enabled: true,
    background: "#B68CB855",
    foreground: "#000000",
  },
  "repeated-words": {
    enabled: true,
    background: "#F038FF55",
    foreground: "#000000",
  },
  "sentence-spacing": {
    enabled: true,
    background: "#C6CCB255",
    foreground: "#000000",
  },
  "indefinite-article": {
    enabled: true,
    background: "#F5B0CB55",
    foreground: "#000000",
  },
  equality: {
    enabled: true,
    background: "#ffcc0055",
    foreground: "#000000",
  },
};

export type ObsidianReadabilitySettings = typeof DEFAULT_SETTINGS;

export class SettingsTab extends PluginSettingTab {
  app: App;
  plugin: RetexterPlugin;

  constructor(app: App, plugin: RetexterPlugin) {
    super(app, plugin);
  }

  display() {
    const { containerEl } = this;

    containerEl.empty();

    const colorSettings = [
      {
        name: "Intesify colors",
        description: "Set the background and foreground colors for intensify",
        key: "intensify",
      },
      {
        name: "Passive colors",
        description: "Set the background and foreground colors for passive",
        key: "passive",
      },
      {
        name: "Profanities colors",
        description: "Set the background and foreground colors for profanities",
        key: "profanities",
      },
      {
        name: "Readability colors",
        description: "Set the background and foreground colors for readability",
        key: "readability",
      },
      {
        name: "Repeated words colors",
        description:
          "Set the background and foreground colors for repeated words",
        key: "repeated-words",
      },
      {
        name: "Sentence spacing colors",
        description:
          "Set the background and foreground colors for sentence spacing",
        key: "sentence-spacing",
      },
      {
        name: "Indefinite article colors",
        description:
          "Set the background and foreground colors for indefinite article",
        key: "indefinite-article",
      },
      {
        name: "Equality colors",
        description: "Set the background and foreground colors for equality",
        key: "equality",
      },
    ] as const;

    for (let colorSetting of colorSettings) {
      new Setting(containerEl)
        .setName(colorSetting.name)
        .setDesc(colorSetting.description)
        .addColorPicker((colorPicker) => {
          colorPicker
            .setValue(this.plugin.settings[colorSetting.key].background)
            .onChange(async (value) => {
              this.plugin.settings[colorSetting.key].background = value;
              await this.plugin.saveSettings();
            });
        })
        .addColorPicker((colorPicker) => {
          colorPicker
            .setValue(this.plugin.settings[colorSetting.key].foreground)
            .onChange(async (value) => {
              this.plugin.settings[colorSetting.key].foreground = value;
              await this.plugin.saveSettings();
            });
        });
    }
  }
}
