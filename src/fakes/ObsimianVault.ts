import { Obsimian, ObsimianData, TFileish } from "./Obsimian";

/** Simulates an Obsidian {@code Vault}. */
export default class ObsimianVault extends Obsimian {
  constructor(data: ObsimianData) {
    super(data);
  }

  getMarkdownFiles(): TFileish[] {
    return this.data["plugin.app.vault.getMarkdownFiles()"];
  }

  read(file: TFileish): Promise<string> {
    return new Promise((resolve, reject) => {
      const content = this.data["plugin.app.vault.read(*)"][file.path];
      process.nextTick(() =>
        content !== undefined
          ? resolve(content)
          : reject(new Error(`file ${file} not found`))
      );
    });
  }
}
