import { App, Plugin, PluginSettingTab, Setting } from "obsidian";

/** Settings that configure the Obsimian plugin. */
export interface ObsimianExportPluginSettings {
  /**
   * The directory to write export data into.
   *
   * Relative paths are resolved relative to the vault directory.
   */
  outDir: string;
}

/** An Obsidian Plugin that has Obsimian settings. */
interface SettingsPlugin extends Plugin {
  settings: ObsimianExportPluginSettings;
}

/** A plugin settings tab for Obsimian settings. */
export class ObsimianExportPluginSettingsTab extends PluginSettingTab {
  plugin: SettingsPlugin;

  constructor(app: App, plugin: SettingsPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  /** Returns an {@code onChange} function that saves the new value to settings. */
  onChangeSave(name: string): (value: any) => any {
    return async (value: any) => {
      this.plugin.settings[name] = value;
      this.plugin.saveData(this.plugin.settings);
    };
  }

  /** Renders the settings page. */
  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Export directory")
      .setDesc(
        "The directory to write export data into. Relative paths are resolved relative to the vault directory."
      )
      .addText((text) => {
        text.inputEl.style.width = "100%";
        text
          .setPlaceholder("/path/to/export/directory")
          .setValue(this.plugin.settings.outDir)
          .onChange(this.onChangeSave("outDir"));
      });
  }
}
