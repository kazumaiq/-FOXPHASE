import { describe, expect, it } from "vitest";
import { getAdminPassword, createAdminToken, verifyAdminToken } from "./admin-store";

describe("admin authentication", () => {
  it("uses default password or environment", () => {
    expect(getAdminPassword().length).toBeGreaterThan(0);
  });

  it("verifies matching token", () => {
    const token = createAdminToken();
    expect(verifyAdminToken(token)).toBe(true);
    expect(verifyAdminToken("invalid")).toBe(false);
  });
});
