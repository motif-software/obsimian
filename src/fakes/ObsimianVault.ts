import { Obsimian, ObsimianData, TFileish } from "./Obsimian";

/** Simulates an Obsidian {@code Vault}. */
export class ObsimianVault extends Obsimian {
  constructor(data: ObsimianData) {
    super(data);
  }

  getMarkdownFiles(): TFileish[] {
    return this.data["vault.getMarkdownFiles()"];
  }

  read(file: TFileish): Promise<string> {
    return new Promise((resolve, reject) => {
      const content = this.data["vault.read(*)"][file.path];
      process.nextTick(() =>
        content !== undefined
          ? resolve(content)
          : reject(new Error(`file ${file} not found`))
      );
    });
  }

  async rename(file: TFileish, newPath: string): Promise<void> {}
  async modify(file: TFileish, data: string): Promise<void> {}
}
