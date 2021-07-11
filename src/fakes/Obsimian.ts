export interface ObsimianData {
  "vault.getMarkdownFiles()": any;
  "vault.read(*)": any;
  "metadataCache.getCache(*)": any;
  "metadataCache.getFirstLinkpathDest(*)": any;
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
