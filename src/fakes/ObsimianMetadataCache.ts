import { Obsimian, ObsimianData } from "./Obsimian";

/** Simulates an Obsidian {@code MetadataCache}. */
export default class ObsimianMetadataCache extends Obsimian {
  constructor(data: ObsimianData) {
    super(data);
  }

  getCache(path: string): any /*CachedMetadata*/ | null {
    return this.data["metadataCache.getCache(*)"][path];
  }

  getFileCache(file: any /*TFile*/): any /*CachedMetadata*/ | null {
    return this.getCache(file.path);
  }

  getFirstLinkpathDest(
    linkpath: string,
    sourcePath: string
  ): any /*TFile*/ | null {
    return this.data["metadataCache.getFirstLinkpathDest(*)"][sourcePath][
      linkpath
    ];
  }
}
