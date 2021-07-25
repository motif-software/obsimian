import { Obsimian, ObsimianData, ObsimianFile } from "./Obsimian";

/** Simulates an Obsidian {@code Vault}. */
export class ObsimianVault extends Obsimian {
  constructor(data: ObsimianData) {
    super(data);
  }

  getMarkdownFiles(): ObsimianFile[] {
    return this.data["vault.getMarkdownFiles()"];
  }

  read(file: ObsimianFile): Promise<string> {
    return new Promise((resolve, reject) => {
      const content = this.data["vault.read(*)"][file.path];
      process.nextTick(() =>
        content !== undefined
          ? resolve(content)
          : reject(new Error(`file ${file} not found`))
      );
    });
  }

  async rename(file: ObsimianFile, newPath: string): Promise<void> {}
  async modify(file: ObsimianFile, data: string): Promise<void> {}
}
