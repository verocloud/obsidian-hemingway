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
        colorName: "Intesify colors",
        colorDescription:
          "Set the background and foreground colors for intensify",

        toggleName: "Intensify",
        toggleDescription: "Enable or disable the intensify filter",
        key: "intensify",
      },
      {
        colorName: "Passive colors",
        colorDescription:
          "Set the background and foreground colors for passive",

        toggleName: "Passive",
        toggleDescription: "Enable or disable the passive voice filter",
        key: "passive",
      },
      {
        colorName: "Profanities colors",
        colorDescription:
          "Set the background and foreground colors for profanities",

        toggleName: "Profanities",
        toggleDescription: "Enable or disable the profanities filter",
        key: "profanities",
      },
      {
        colorName: "Readability colors",
        colorDescription:
          "Set the background and foreground colors for readability",

        toggleName: "Readability",
        toggleDescription: "Enable or disable the readability filter",
        key: "readability",
      },
      {
        colorName: "Repeated words colors",
        colorDescription:
          "Set the background and foreground colors for repeated words",

        toggleName: "Repeated words",
        toggleDescription: "Enable or disable the repeated words filter",
        key: "repeated-words",
      },
      {
        colorName: "Sentence spacing colors",
        colorDescription:
          "Set the background and foreground colors for sentence spacing",

        toggleName: "Sentence spacing",
        toggleDescription: "Enable or disable the sentence spacing filter",
        key: "sentence-spacing",
      },
      {
        colorName: "Indefinite article colors",
        colorDescription:
          "Set the background and foreground colors for indefinite article",

        toggleName: "Indefinite article",
        toggleDescription: "Enable or disable the indefinite article filter",
        key: "indefinite-article",
      },
      {
        colorName: "Equality colors",
        colorDescription:
          "Set the background and foreground colors for equality",

        toggleName: "Equality",
        toggleDescription: "Enable or disable the equality filter",
        key: "equality",
      },
    ] as const;

    for (let colorSetting of colorSettings) {
      new Setting(containerEl)
        .setName(colorSetting.colorName)
        .setDesc(colorSetting.colorDescription)
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

      new Setting(containerEl)
        .setName(colorSetting.toggleName)
        .setDesc(colorSetting.toggleDescription)
        .addToggle((toggle) => {
          toggle
            .setValue(this.plugin.settings[colorSetting.key].enabled)
            .onChange(async (value) => {
              this.plugin.settings[colorSetting.key].enabled = value;
              await this.plugin.saveSettings();
            });
        });
    }
  }
}
