import { ObsimianMetadataCache } from "./ObsimianMetadataCache";

const testData = require("../../test/vault.json");

describe("ObsimianMetadataCache", () => {
  const cache = new ObsimianMetadataCache(testData);

  describe("getCache", () => {
    it("reads metadata", () => {
      const data = cache.getCache("Simple.md");
      expect(data).toEqual(testData["metadataCache.getCache(*)"]["Simple.md"]);
      expect(data.sections[0].position.start).toEqual({
        line: 0,
        col: 0,
        offset: 0,
      });
    });
    it("reads frontmatter", () => {
      const data = cache.getCache("Frontmatter.md");
      expect(data).toEqual(testData["metadataCache.getCache(*)"]["Frontmatter.md"]);
      expect(data.frontmatter.slug).toEqual("/front");
    });
  });
});
