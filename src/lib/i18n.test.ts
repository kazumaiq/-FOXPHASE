import { describe, expect, it } from "vitest";
import { safeLocale } from "./i18n";

describe("safeLocale", () => {
  it("falls back to English for malformed locale storage", () => {
    expect(safeLocale("de")).toBe("en");
  });
});
