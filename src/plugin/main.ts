import { FileSystemAdapter, Plugin } from "obsidian";

import * as path from "path";
import { exportData } from "src/plugin/export";
import {
  ObsimianExportPluginSettings,
  ObsimianExportPluginSettingsTab,
} from "./settings";

const DEFAULT_SETTINGS: ObsimianExportPluginSettings = {
  outDir: ".",
  splitData: false,
};

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
          path.join(this.resolveOutDir(), this.app.vault.getName() + ".json")
        );
      },
    });

    this.addSettingTab(new ObsimianExportPluginSettingsTab(this.app, this));
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  resolveOutDir(): string {
    let dir = this.settings.outDir;
    if (dir[0] === "~") {
      dir = process.env.HOME + dir.substr(1);
    }
    return path.resolve(this.basePath(), dir);
  }

  /** Returns the path to the vault. */
  basePath(): string {
    return (this.app.vault.adapter as FileSystemAdapter).getBasePath();
  }
}
