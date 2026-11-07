export const locales = ["en", "ru"] as const;
export type Locale = (typeof locales)[number];

export function safeLocale(value: unknown): Locale {
  return value === "ru" ? "ru" : "en";
}
