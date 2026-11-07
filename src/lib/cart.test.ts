import { describe, expect, it } from "vitest";
import { addCartItem, changeCartLicense, getCartTotal } from "./cart";

const catalog = [{ id: "signal", title: "Signal", licenses: [{ id: "basic", price: 29 }, { id: "exclusive", price: 249 }] }];

describe("cart pricing", () => {
  it("uses the catalog license price instead of a browser-supplied price", () => {
    const cart = addCartItem([], catalog, { beatId: "signal", licenseId: "basic", price: 0 });
    expect(getCartTotal(cart)).toBe(29);
  });

  it("rejects a product or license absent from the catalog", () => {
    expect(() => addCartItem([], catalog, { beatId: "missing", licenseId: "basic", price: 29 })).toThrow("Unavailable");
  });

  it("re-prices an existing item when its license changes", () => {
    const cart = changeCartLicense([{ beatId: "signal", licenseId: "basic", price: 29 }], catalog, "signal", "exclusive");
    expect(getCartTotal(cart)).toBe(249);
  });
});
