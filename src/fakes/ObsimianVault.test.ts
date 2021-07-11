import ObsimianVault from "./ObsimianVault";

const testData = require("../../test/data.json");

describe("ObsimianVault", () => {
  const vault = new ObsimianVault(testData);

  it("has test data", () => {
    expect(testData).not.toBeFalsy();
  });

  describe("read", () => {
    testData["plugin.app.vault.getMarkdownFiles()"].forEach((f) => {
      it(`can read ${f.path}`, () => {
        const file = { name: "", path: f.path };
        return expect(vault.read(file)).resolves.toEqual(
          testData["plugin.app.vault.read(*)"][f.path]
        );
      });
    });
  });

  it("can read a particular page", () => {
    const path = "Page Simple.md";
    const expected = testData["plugin.app.vault.read(*)"][path];
    expect(vault.read({ name: "", path })).resolves.toEqual("Simplest page.");
  });
});
