import { fromPairs, pick, zipObject } from "./util";

describe("pick", () => {
  const obj = { a: 1, b: 2, no: undefined };
  it("picks empty", () => {
    expect(pick({}, [])).toEqual({});
  });
  it("picks single key", () => {
    expect(pick(obj, ["a"])).toEqual({ a: 1 });
  });
  it("picks multiple keys", () => {
    expect(pick(obj, ["a", "b"])).toEqual({ a: 1, b: 2 });
  });
  it("ignored missing keys", () => {
    expect(pick(obj, ["nonexistent"])).toEqual({ nonexistent: undefined });
  });
});

describe("fromPairs", () => {
  it("handles empty", () => {
    expect(fromPairs([])).toEqual({});
  });
  it("handles single pair", () => {
    expect(fromPairs([["a", 1]])).toEqual({ a: 1 });
  });
  it("handles multiple pairs", () => {
    expect(
      fromPairs([
        ["a", 1],
        ["b", 2],
      ])
    ).toEqual({ a: 1, b: 2 });
  });
  it("handles longer keys", () => {
    expect(
      fromPairs([
        ["a", 1],
        ["b", undefined],
      ])
    ).toEqual({ a: 1, b: undefined });
  });
});

describe("zipObject", () => {
  it("zips empty", () => {
    expect(zipObject([], [])).toEqual({});
  });
  it("zips singleton array", () => {
    expect(zipObject(["a"], [1])).toEqual({ a: 1 });
  });
  it("zips multiple item arrays", () => {
    expect(zipObject(["a", 1], ["b", 2])).toEqual({ a: "b", 1: 2 });
  });
  it("zips longer left", () => {
    expect(zipObject(["a", "b", "c"], [1, 2])).toEqual({
      a: 1,
      b: 2,
      c: undefined,
    });
  });
  it("zips shorter left", () => {
    expect(zipObject(["a", "b"], [1, 2, 3])).toEqual({ a: 1, b: 2 });
  });
});
