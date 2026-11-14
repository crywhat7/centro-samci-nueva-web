import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDict, categories } from "@/i18n/content";
import { breadcrumbJsonLd, buildMetadata } from "@/i18n/seo";
import { abs, href } from "@/i18n/routes";
import { Container, PageHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/JsonLd";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale);
  return buildMetadata(locale, "/productos", {
    title: locale === "es" ? "Extintores y equipo contra incendios" : "Fire extinguishers and fire protection equipment",
    description: d.products.sub,
  });
}

export default async function Products({ params }: P) {
  const { locale } = await params;
  const d = getDict(locale);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: d.nav.home, url: abs(locale, "/") }, { name: d.nav.products, url: abs(locale, "/productos") }])} />
      <PageHead label={d.products.label} title={d.products.title} sub={d.products.sub} />
      {categories.map((c, ci) => (
        <section key={c.slug.es} className={`py-20 lg:py-28 ${ci % 2 ? "bg-paper-2" : ""}`}>
          <Container className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal><p className="font-serif text-xl italic text-fire">0{ci + 1}</p></Reveal>
              <Reveal as="h2" className="display mt-4 text-[clamp(2.6rem,5vw,5rem)] balance">
                <Link href={href(locale, `/productos/${c.slug.es}`)} className="hover:text-fire">{c.name[locale]}</Link>
              </Reveal>
              <Reveal as="p" className="pretty mt-6 text-ink/75">{c.intro[locale]}</Reveal>
              <Reveal clip className="relative mt-10 aspect-[4/3] overflow-hidden">
                <Image src={c.image} alt={c.name[locale]} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
              </Reveal>
            </div>
            <ul className="border-t border-line lg:col-span-7">
              {c.products.map((p, i) => (
                <Reveal as="li" key={p.slug.es} delay={i * 60} className="border-b border-line">
                  <Link href={href(locale, `/productos/${c.slug.es}/${p.slug.es}`)} className="group grid gap-2 py-7 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
                    <span>
                      <h3 className="text-2xl font-semibold transition-colors duration-500 group-hover:text-fire">{p.name[locale]}</h3>
                      <p className="pretty mt-2 text-ink/65">{p.desc[locale]}</p>
                    </span>
                    <span className="flex gap-1.5">
                      {p.tags.slice(0, 3).map((t) => <span key={t} className="border border-line px-2 py-0.5 text-[12px] font-semibold">{t}</span>)}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ))}
    </>
  );
}
