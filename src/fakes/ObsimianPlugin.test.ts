import ObsimianPlugin from "./ObsimianPlugin";

const testData = require("../../test/vault.json");

describe("ObsimianPlugin", () => {
  const plugin = new ObsimianPlugin(testData);

  it("has app", () => {
    return expect(plugin.app).not.toBeFalsy();
  });
});
