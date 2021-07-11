import ObsimianApp from "./ObsimianApp";

const testData = require("../../test/data.json");

describe("ObsimianApp", () => {
  const app = new ObsimianApp(testData);

  it("has vault", () => {
    return expect(app.vault).not.toBeFalsy();
  });

  it("has cache", () => {
    return expect(app.metadataCache).not.toBeFalsy();
  });
});
