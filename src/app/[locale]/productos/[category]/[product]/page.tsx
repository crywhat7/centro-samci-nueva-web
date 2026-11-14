import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, SITE_URL, type Locale } from "@/i18n/config";
import { getDict, categories } from "@/i18n/content";
import { breadcrumbJsonLd, buildMetadata } from "@/i18n/seo";
import { abs, href } from "@/i18n/routes";
import { CTA, Container, Crumbs } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/JsonLd";

type P = { params: Promise<{ locale: Locale; category: string; product: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => categories.flatMap((c) => c.products.map((p) => ({ locale, category: c.slug.es, product: p.slug.es }))));
}

function find(category: string, product: string) {
  const c = categories.find((x) => x.slug.es === category);
  const p = c?.products.find((x) => x.slug.es === product);
  return c && p ? { c, p } : null;
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, category, product } = await params;
  const f = find(category, product);
  if (!f) return {};
  return buildMetadata(locale, `/productos/${f.c.slug.es}/${f.p.slug.es}`, {
    title: `${f.p.name[locale]} ${locale === "es" ? "en Honduras" : "in Honduras"}`,
    description: `${f.p.desc[locale]} ${locale === "es" ? "Venta, instalación y mantenimiento en Tegucigalpa y San Pedro Sula." : "Sales, installation and maintenance in Tegucigalpa and San Pedro Sula."}`,
    keywords: [f.p.name[locale], `${f.p.name[locale]} Tegucigalpa`, `${f.p.name[locale]} San Pedro Sula`, ...f.p.tags],
  });
}

export default async function ProductPage({ params }: P) {
  const { locale, category, product } = await params;
  const f = find(category, product);
  if (!f) notFound();
  const { c, p } = f;
  const d = getDict(locale);
  const path = `/productos/${c.slug.es}/${p.slug.es}`;

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name[locale],
    description: p.body[locale],
    image: `${SITE_URL}${c.image}`,
    url: abs(locale, path),
    category: c.name[locale],
    brand: { "@type": "Brand", name: "Centro Samci" },
  };

  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={breadcrumbJsonLd([
        { name: d.nav.home, url: abs(locale, "/") },
        { name: d.nav.products, url: abs(locale, "/productos") },
        { name: c.name[locale], url: abs(locale, `/productos/${c.slug.es}`) },
        { name: p.name[locale], url: abs(locale, path) },
      ])} />

      <article>
        <Container className="pt-12 sm:pt-16">
          <Crumbs items={[
            { label: d.nav.products, href: href(locale, "/productos") },
            { label: c.name[locale], href: href(locale, `/productos/${c.slug.es}`) },
            { label: p.name[locale] },
          ]} />
          <div className="grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-7">
              <span className="flex gap-1.5">{p.tags.map((t) => <span key={t} className="border border-line px-2 py-0.5 text-[12px] font-semibold">{t}</span>)}</span>
              <h1 className="display balance mt-8 text-[clamp(2.8rem,7vw,7rem)]">{p.name[locale]}</h1>
              <p className="pretty mt-8 max-w-2xl font-serif text-[clamp(1.4rem,2.2vw,2rem)] italic leading-snug text-ink/80">{p.desc[locale]}</p>
            </div>
            <Reveal clip className="relative aspect-[4/5] overflow-hidden lg:col-span-5">
              <Image src={c.image} alt={p.name[locale]} fill priority sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </Reveal>
          </div>
        </Container>

        <section className="border-t border-line py-20">
          <Container className="grid gap-12 lg:grid-cols-12">
            <Reveal as="p" className="pretty text-lg text-ink/80 lg:col-span-7">{p.body[locale]}</Reveal>
            <Reveal className="lg:col-span-4 lg:col-start-9">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.22em] text-mute">{d.products.uses}</h2>
              <ul className="mt-5 border-t border-line">
                {p.uses[locale].map((u) => <li key={u} className="border-b border-line py-3">{u}</li>)}
              </ul>
              <div className="mt-10"><CTA href={`${href(locale, "/contacto")}?producto=${encodeURIComponent(p.name[locale])}`}>{d.products.ask}</CTA></div>
            </Reveal>
          </Container>
        </section>
      </article>

      <section className="border-t border-line bg-paper-2 py-16">
        <Container>
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.22em] text-mute">{d.products.related}</h2>
          <ul className="mt-6 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {c.products.filter((x) => x !== p).map((x) => (
              <li key={x.slug.es} className="border-b border-line">
                <Link href={href(locale, `/productos/${c.slug.es}/${x.slug.es}`)} className="flex items-center justify-between py-4 text-lg font-semibold hover:text-fire">
                  {x.name[locale]} <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
