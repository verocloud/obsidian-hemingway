import { App, PluginSettingTab, Setting, SettingTab } from "obsidian";
import RetexterPlugin from "./main";
import { PLUGINS } from "./retext-plugins";

type DefaultSetting = {
  enabled: boolean;
  background: string;
  foreground: string;
};

type Keys = typeof PLUGINS[number]["settingsKey"];
export type ObsidianReadabilitySettings = {
  [key in Keys]: DefaultSetting;
};

export const DEFAULT_SETTINGS = PLUGINS.reduce<
  Partial<ObsidianReadabilitySettings>
>((acc, plugin) => {
  acc[plugin.settingsKey] = {
    enabled: true,
    background: plugin.defaultBackgroundColor,
    foreground: plugin.defaultForegroundColor,
  };
  return acc;
}, {});

export class SettingsTab extends PluginSettingTab {
  app: App;
  plugin: RetexterPlugin;

  constructor(app: App, plugin: RetexterPlugin) {
    super(app, plugin);
  }

  display() {
    const { containerEl } = this;

    containerEl.empty();

    for (let colorSetting of PLUGINS) {
      const lowerCaseName = colorSetting.name.toLocaleLowerCase();
      const colorDescription = `Set the background and foreground colors for ${lowerCaseName}`;
      const toggleDescription = `Enable or disable the ${lowerCaseName} filter`;

      new Setting(containerEl)
        .setName(colorSetting.name)
        .setDesc(colorDescription)
        .addColorPicker((colorPicker) => {
          colorPicker
            .setValue(this.plugin.settings[colorSetting.settingsKey].background)
            .onChange(async (value) => {
              this.plugin.settings[colorSetting.settingsKey].background = value;
              await this.plugin.saveSettings();
            });
        })
        .addColorPicker((colorPicker) => {
          colorPicker
            .setValue(this.plugin.settings[colorSetting.settingsKey].foreground)
            .onChange(async (value) => {
              this.plugin.settings[colorSetting.settingsKey].foreground = value;
              await this.plugin.saveSettings();
            });
        });

      new Setting(containerEl)
        .setName(colorSetting.name)
        .setDesc(toggleDescription)
        .addToggle((toggle) => {
          toggle
            .setValue(this.plugin.settings[colorSetting.settingsKey].enabled)
            .onChange(async (value) => {
              this.plugin.settings[colorSetting.settingsKey].enabled = value;
              await this.plugin.saveSettings();
            });
        });
    }
  }
}
