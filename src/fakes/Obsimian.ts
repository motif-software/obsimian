export interface ObsimianData {
  "vault.getMarkdownFiles()": ObsimianFile[];
  "vault.read(*)": { [key: string]: string };
  "metadataCache.getCache(*)": { [key: string]: any };
  "metadataCache.getFirstLinkpathDest(*)": {
    [key: string]: { [key: string]: ObsimianFile };
  };
}

/** An Obsimian component with fake data. */
export abstract class Obsimian {
  data: ObsimianData;

  constructor(data: ObsimianData) {
    this.data = data;
  }
}

export interface ObsimianFolder {
  name: string;
  path: string;
}

export interface ObsimianFile {
  name: string;
  path: string;
  parent?: ObsimianFolder;
}
