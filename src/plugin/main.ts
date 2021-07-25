import { FileSystemAdapter, Plugin } from "obsidian";

import { exportData } from "src/plugin/export";
import { ObsimianExportPluginSettings, ObsimianExportPluginSettingsTab } from "./settings";

const DEFAULT_SETTINGS: ObsimianExportPluginSettings = {
  outDir: ".",
};

/** Provides an "Export data" command to dump an Obsimian-compatible data file. */
export default class ObsimianExportPlugin extends Plugin {
  settings: ObsimianExportPluginSettings;

  async onload() {
    console.log("loading ObsimianExportPlugin");

    await this.loadSettings();

    this.addCommand({
      id: "obsimian-export-data",
      name: "Export data for testing",
      callback: () => {
        const outPath = `${this.settings.outDir}/${this.app.vault.getName() + ".json"}`;
        exportData(this, outPath);
      },
    });

    this.addSettingTab(new ObsimianExportPluginSettingsTab(this.app, this));
  }

  async loadSettings() {
    this.settings = { ...DEFAULT_SETTINGS, ...(await this.loadData()) };
  }
}
