export interface ObsimianData {
  "plugin.app.vault.getMarkdownFiles()": any; //map(mds, TFileToPojo),
  "plugin.app.vault.read(*)": any; //zipObject(paths, await contents),
  "plugin.app.metadataCache.getFileCache(*)": any; //zipObject(paths, metadatas),
  "plugin.app.metadataCache.getFirstLinkpathDest(*)": any; //zipObject(paths, linkpathMaps),
}

export abstract class Obsimian {
  data: ObsimianData;

  constructor(data: ObsimianData) {
    this.data = data;
  }
}

export interface TFileish {
  name: string;
  path: string;
}
