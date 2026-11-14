import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { getDict, categories } from "@/i18n/content";
import { breadcrumbJsonLd, buildMetadata } from "@/i18n/seo";
import { abs, href } from "@/i18n/routes";
import { CTA, Container, Crumbs } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/JsonLd";

type P = { params: Promise<{ locale: Locale; category: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => categories.map((c) => ({ locale, category: c.slug.es })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, category } = await params;
  const c = categories.find((x) => x.slug.es === category);
  if (!c) return {};
  return buildMetadata(locale, `/productos/${c.slug.es}`, {
    title: `${c.name[locale]} ${locale === "es" ? "en Honduras" : "in Honduras"}`,
    description: `${c.intro[locale]} ${c.kicker[locale]}.`,
    keywords: c.products.map((p) => `${p.name[locale]} Honduras`),
  });
}

export default async function CategoryPage({ params }: P) {
  const { locale, category } = await params;
  const d = getDict(locale);
  const c = categories.find((x) => x.slug.es === category);
  if (!c) notFound();
  const base = `/productos/${c.slug.es}`;

  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: c.name[locale],
    itemListElement: c.products.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(locale, `${base}/${p.slug.es}`), name: p.name[locale] })),
  };

  return (
    <>
      <JsonLd data={list} />
      <JsonLd data={breadcrumbJsonLd([{ name: d.nav.home, url: abs(locale, "/") }, { name: d.nav.products, url: abs(locale, "/productos") }, { name: c.name[locale], url: abs(locale, base) }])} />

      <header className="border-b border-line pt-12 sm:pt-16">
        <Container>
          <Crumbs items={[{ label: d.nav.home, href: href(locale, "/") }, { label: d.nav.products, href: href(locale, "/productos") }, { label: c.name[locale] }]} />
          <div className="mt-10 grid gap-10 pb-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-fire">{c.kicker[locale]}</p>
              <h1 className="display balance mt-6 text-[clamp(3rem,8vw,8rem)]">{c.name[locale]}</h1>
            </div>
            <p className="pretty text-lg text-ink/75 lg:col-span-5 lg:text-xl">{c.intro[locale]}</p>
          </div>
        </Container>
        <Reveal clip className="relative h-[42vh] min-h-[280px] w-full overflow-hidden">
          <Image src={c.image} alt={c.name[locale]} fill priority sizes="100vw" className="object-cover" />
        </Reveal>
      </header>

      <section className="py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-6 text-lg text-ink/80 lg:col-span-7 lg:col-start-4">
            {c.body[locale].map((p, i) => <Reveal as="p" key={i} className="pretty">{p}</Reveal>)}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-paper-2 py-20 lg:py-28">
        <Container>
          <div className="grid gap-px bg-line md:grid-cols-2">
            {c.products.map((p, i) => (
              <Reveal key={p.slug.es} delay={(i % 2) * 100} className="bg-paper-2">
                <Link href={href(locale, `${base}/${p.slug.es}`)} className="group flex h-full flex-col p-8 lg:p-12">
                  <span className="flex gap-1.5">{p.tags.map((t) => <span key={t} className="border border-line px-2 py-0.5 text-[12px] font-semibold">{t}</span>)}</span>
                  <h2 className="mt-8 font-serif text-[clamp(1.9rem,3vw,2.8rem)] leading-[1.05] transition-colors duration-500 group-hover:text-fire">{p.name[locale]}</h2>
                  <p className="pretty mt-4 flex-1 text-ink/70">{p.desc[locale]}</p>
                  <span className="mt-8 text-[14px] font-semibold uppercase tracking-[0.14em] text-fire">{d.products.see} →</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-6">
              {categories.filter((x) => x !== c).map((x) => (
                <Link key={x.slug.es} href={href(locale, `/productos/${x.slug.es}`)} className="ulink text-lg font-semibold">{x.name[locale]}</Link>
              ))}
            </div>
            <CTA href={href(locale, "/contacto")}>{d.hero.cta}</CTA>
          </div>
        </Container>
      </section>
    </>
  );
}
