import { describe, it, expect } from "@jest/globals";
import matcher from "./match";

describe("url matching", () => {
  it("should properly match with or without leading and last slash", () => {
    const match = matcher("path");
    expect(match.exec("path")).toBeTruthy();
    expect(match.exec("/path")).toBeTruthy();
    expect(match.exec("path/")).toBeTruthy();
    expect(match.exec("/path/")).toBeTruthy();
    expect(match.exec("/")).toBeFalsy();

    const match2 = matcher("/path");
    expect(match.exec("path")).toBeTruthy();
    expect(match2.exec("/path")).toBeTruthy();
    expect(match.exec("path/")).toBeTruthy();
    expect(match2.exec("/path/")).toBeTruthy();
    expect(match2.exec("/")).toBeFalsy();

    const match3 = matcher("/path/");
    expect(match.exec("path")).toBeTruthy();
    expect(match3.exec("/path")).toBeTruthy();
    expect(match.exec("path/")).toBeTruthy();
    expect(match3.exec("/path/")).toBeTruthy();
    expect(match3.exec("/")).toBeFalsy();
  });

  it("should properly register parameters", () => {
    const match = matcher(":chapter/:page");
    const expectedMatch = { chapter: "3", page: "42" };
    expect(match.exec("3/42")?.groups).toMatchObject(expectedMatch);
    expect(match.exec("/3/42")?.groups).toMatchObject(expectedMatch);
    expect(match.exec("3/42/")?.groups).toMatchObject(expectedMatch);
    expect(match.exec("/3/42/")?.groups).toMatchObject(expectedMatch);

    const match2 = matcher("/:chapter/:page/");
    expect(match2.exec("3/42")?.groups).toMatchObject(expectedMatch);
    expect(match2.exec("/3/42")?.groups).toMatchObject(expectedMatch);
    expect(match2.exec("3/42/")?.groups).toMatchObject(expectedMatch);
    expect(match2.exec("/3/42/")?.groups).toMatchObject(expectedMatch);
  });
});
