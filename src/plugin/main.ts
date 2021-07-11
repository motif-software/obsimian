import { FileSystemAdapter, Plugin } from "obsidian";

import * as path from "path";
import { exportData } from "src/plugin/export";
import {
  ObsimianExportPluginSettings,
  ObsimianExportPluginSettingsTab,
} from "./settings";

/** Provides an "Export data" command to dump an Obsimian-compatible data file. */
export default class ObsimianExportPlugin extends Plugin {
  settings: ObsimianExportPluginSettings;

  async onload() {
    console.log("loading ObsimianExportPlugin");

    await this.loadSettings();

    this.addCommand({
      id: "obsimian-export",
      name: "Export data for testing",
      callback: () => {
        exportData(
          this,
          path.join(this.settings.outDir, this.app.vault.getName() + ".json")
        );
      },
    });

    this.addSettingTab(new ObsimianExportPluginSettingsTab(this.app, this));
  }

  async loadSettings() {
    const defaults: ObsimianExportPluginSettings = {
      splitData: false,
      outDir: this.basePath(),
    };
    this.settings = Object.assign({}, defaults, await this.loadData());
  }

  /** Returns the path to the vault. */
  basePath(): string {
    return (this.app.vault.adapter as FileSystemAdapter).getBasePath();
  }
}
