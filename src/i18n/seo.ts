import type { Metadata } from "next";
import { SITE_URL, type Locale } from "./config";
import { getDict, branches, social } from "./content";
import { abs, alternates } from "./routes";

export function buildMetadata(
  locale: Locale,
  internal: string,
  opts: { title?: string; description?: string; keywords?: string[]; image?: string } = {}
): Metadata {
  const d = getDict(locale);
  const title = opts.title ? `${opts.title} | Centro Samci` : d.meta.title;
  const description = opts.description || d.meta.description;
  const image = opts.image || `${SITE_URL}/og/${locale}`;
  return {
    title: { absolute: title },
    description,
    keywords: [...(opts.keywords || []), ...d.meta.keywords],
    alternates: alternates(locale, internal),
    openGraph: {
      type: "website",
      siteName: "Centro Samci",
      locale: locale === "es" ? "es_HN" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_HN"],
      url: abs(locale, internal),
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function organizationJsonLd(locale: Locale) {
  const d = getDict(locale);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "Centro Samci",
        legalName: "Compañía Centroamericana de Servicios, Acoplamientos y Materiales Contra Incendios, S. de R.L. de C.V.",
        alternateName: ["CCENTROSAMCI", "Centrosamci"],
        url: SITE_URL,
        logo: `${SITE_URL}/brand/isotipo.svg`,
        foundingDate: "1973",
        description: d.meta.description,
        sameAs: [social.facebook, social.instagram],
        areaServed: { "@type": "Country", name: "Honduras" },
      },
      ...branches.map((b) => ({
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#${b.id}`,
        name: `Centro Samci ${b.city}`,
        parentOrganization: { "@id": `${SITE_URL}/#org` },
        image: `${SITE_URL}/brand/isotipo.svg`,
        url: abs(locale, "/contacto"),
        telephone: b.phones[0],
        email: b.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: b.street,
          addressLocality: b.city,
          addressRegion: b.region,
          ...(b.postal ? { postalCode: b.postal } : {}),
          addressCountry: "HN",
        },
        areaServed: "Honduras",
      })),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Centro Samci",
        inLanguage: ["es-HN", "en"],
        publisher: { "@id": `${SITE_URL}/#org` },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
  };
}
