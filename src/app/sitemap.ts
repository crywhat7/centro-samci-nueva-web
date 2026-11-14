import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { categories } from "@/i18n/content";
import { abs } from "@/i18n/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { p: string; priority: number }[] = [
    { p: "/", priority: 1 },
    { p: "/productos", priority: 0.9 },
    { p: "/servicios", priority: 0.9 },
    { p: "/contacto", priority: 0.8 },
    { p: "/nosotros", priority: 0.6 },
    ...categories.flatMap((c) => [
      { p: `/productos/${c.slug.es}`, priority: 0.8 },
      ...c.products.map((x) => ({ p: `/productos/${c.slug.es}/${x.slug.es}`, priority: 0.7 })),
    ]),
  ];
  const now = new Date();
  return paths.flatMap(({ p, priority }) =>
    locales.map((l) => ({
      url: abs(l, p),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: l === "es" ? priority : Math.round(priority * 6) / 10,
      alternates: { languages: { "es-HN": abs("es", p), en: abs("en", p), "x-default": abs("es", p) } },
    }))
  );
}
