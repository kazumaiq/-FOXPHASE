import { expect, it } from "vitest";
import { getPaymentMode } from "./payment";

it("uses manual review without a configured payment provider", () => {
  expect(getPaymentMode({})).toBe("manual_review");
});

it("does not mark a configured provider as paid before webhook verification", () => {
  expect(getPaymentMode({ PAYMENT_PROVIDER: "stripe" })).toBe("provider_pending");
});
