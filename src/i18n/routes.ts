import { SITE_URL, type Locale } from "./config";
import { categories } from "./content";

/**
 * Internal paths are always the Spanish ones (they match the folders in app/[locale]).
 * Spanish is served at the root without prefix (/productos), English under /en with
 * translated segments (/en/products).
 */
const esToEn: Record<string, string> = {
  productos: "products",
  servicios: "services",
  nosotros: "about",
  contacto: "contact",
};
for (const c of categories) {
  esToEn[c.slug.es] = c.slug.en;
  for (const p of c.products) esToEn[p.slug.es] = p.slug.en;
}
const enToEs: Record<string, string> = Object.fromEntries(Object.entries(esToEn).map(([a, b]) => [b, a]));

const segs = (p: string) => p.split("/").filter(Boolean);

/** Public href for an internal (Spanish) path. */
export function href(locale: Locale, internal = "/"): string {
  const s = segs(internal);
  if (locale === "es") return "/" + s.join("/");
  return "/en" + (s.length ? "/" + s.map((x) => esToEn[x] ?? x).join("/") : "");
}

export const abs = (locale: Locale, internal = "/") => SITE_URL + (href(locale, internal) === "/" ? "" : href(locale, internal));

/** English public path (without /en) → internal Spanish path, or null if a segment is unknown/untranslated. */
export function enToInternal(publicPath: string): string | null {
  const out: string[] = [];
  for (const x of segs(publicPath)) {
    if (enToEs[x]) out.push(enToEs[x]);
    else return null;
  }
  return "/" + out.join("/");
}

/** Current public pathname → { locale, internal } */
export function parsePublic(pathname: string): { locale: Locale; internal: string } {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return { locale: "en", internal: enToInternal(pathname.slice(3)) ?? "/" };
  }
  return { locale: "es", internal: pathname || "/" };
}

export function alternates(locale: Locale, internal: string) {
  return {
    canonical: abs(locale, internal),
    languages: { "es-HN": abs("es", internal), en: abs("en", internal), "x-default": abs("es", internal) },
  };
}
