import { Obsimian, ObsimianData } from "./Obsimian";
import { ObsimianMetadataCache } from "./ObsimianMetadataCache";
import { ObsimianVault } from "./ObsimianVault";

/** Simulates an Obsidian {@code App}. */
export class ObsimianApp extends Obsimian {
  _vault: ObsimianVault;
  _cache: ObsimianMetadataCache;

  constructor(data: ObsimianData) {
    super(data);

    this._vault = new ObsimianVault(data);
    this._cache = new ObsimianMetadataCache(data);
  }

  get vault(): ObsimianVault {
    return this._vault;
  }
  get metadataCache(): ObsimianMetadataCache {
    return this._cache;
  }
}
