export type License = { id: string; price: number };
export type CartCatalogItem = { id: string; title: string; licenses: License[] };
export type CartItem = { beatId: string; licenseId: string; price: number };

function findLicense(catalog: CartCatalogItem[], beatId: string, licenseId: string) {
  const license = catalog.find((beat) => beat.id === beatId)?.licenses.find((item) => item.id === licenseId);
  if (!license) throw new Error("Unavailable beat or license");
  return license;
}

export function addCartItem(items: CartItem[], catalog: CartCatalogItem[], item: CartItem): CartItem[] {
  const license = findLicense(catalog, item.beatId, item.licenseId);
  const normalized = { beatId: item.beatId, licenseId: item.licenseId, price: license.price };
  return [...items.filter((entry) => entry.beatId !== item.beatId), normalized];
}

export function changeCartLicense(items: CartItem[], catalog: CartCatalogItem[], beatId: string, licenseId: string): CartItem[] {
  const license = findLicense(catalog, beatId, licenseId);
  return items.map((item) => item.beatId === beatId ? { beatId, licenseId, price: license.price } : item);
}

export function getCartTotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price, 0);
}
