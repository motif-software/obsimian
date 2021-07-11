import { TFileish } from "./Obsimian";
import ObsimianVault from "./ObsimianVault";

const testData = require("../../test/vault.json");

describe("ObsimianVault", () => {
  const vault = new ObsimianVault(testData);

  describe("read", () => {
    testData["vault.getMarkdownFiles()"].forEach((f) => {
      it(`can read ${f.path}`, () => {
        const file: TFileish = { name: "", path: f.path };
        return expect(vault.read(file)).resolves.toEqual(
          testData["vault.read(*)"][f.path]
        );
      });
    });
  });

  it("can read a particular note", () => {
    const path = "Simple.md";
    const expected = testData["vault.read(*)"][path];
    expect(vault.read({ name: "", path })).resolves.toEqual(
      "The simplest possible note."
    );
  });
});
