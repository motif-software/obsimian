import { ObsimianMetadataCache } from "./ObsimianMetadataCache";

const testData = require("../../test/vault.json");

describe("ObsimianMetadataCache", () => {
  const cache = new ObsimianMetadataCache(testData);

  describe("getCache", () => {
    it("can read metadata", () => {
      const data = cache.getCache("Simple.md");
      expect(data).toEqual(testData["metadataCache.getCache(*)"]["Simple.md"]);
      expect(data.sections[0].position.start).toEqual({
        line: 0,
        col: 0,
        offset: 0,
      });
    });
  });
});
