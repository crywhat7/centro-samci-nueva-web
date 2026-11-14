export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://centrosamci.hn").replace(/\/$/, "");

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}
