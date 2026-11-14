import type { Metadata } from "next";
import { SITE_URL, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/content";
import { breadcrumbJsonLd, buildMetadata } from "@/i18n/seo";
import { abs, href } from "@/i18n/routes";
import { CTA, Container, PageHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/JsonLd";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale);
  return buildMetadata(locale, "/servicios", {
    title: locale === "es" ? "Recarga, mantenimiento e instalación de extintores" : "Extinguisher refill, maintenance & installation",
    description: d.services.sub,
    keywords:
      locale === "es"
        ? ["recarga de extintores Tegucigalpa", "recarga de extintores San Pedro Sula", "mantenimiento de extintores", "prueba hidrostática extintores", "instalación de sistemas contra incendios", "capacitación uso de extintores", "brigadas de emergencia"]
        : ["fire extinguisher refill Honduras", "hydrostatic testing", "fire system installation", "fire extinguisher training"],
  });
}

export default async function Services({ params }: P) {
  const { locale } = await params;
  const d = getDict(locale);
  const ld = d.services.items.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.t,
    description: s.long,
    provider: { "@id": `${SITE_URL}/#org` },
    areaServed: "Honduras",
  }));
  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={breadcrumbJsonLd([{ name: d.nav.home, url: abs(locale, "/") }, { name: d.nav.services, url: abs(locale, "/servicios") }])} />
      <PageHead label={d.services.label} title={d.services.title} sub={d.services.sub} />
      {d.services.items.map((s, i) => (
        <section key={s.t} className={`border-b border-line py-20 lg:py-28 ${i === 1 ? "bg-ink text-paper" : ""}`}>
          <Container className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-2"><p className="display text-[clamp(5rem,9vw,9rem)] text-fire">0{i + 1}</p></Reveal>
            <div className="lg:col-span-5">
              <Reveal as="h2" className="display text-[clamp(2.6rem,5vw,5rem)] balance">{s.t}</Reveal>
              <Reveal as="p" className={`pretty mt-6 font-serif text-2xl italic leading-snug ${i === 1 ? "text-paper/85" : "text-ink/80"}`}>{s.d}</Reveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal as="p" className={`pretty ${i === 1 ? "text-paper/75" : "text-ink/75"}`}>{s.long}</Reveal>
              <ul className={`mt-8 border-t ${i === 1 ? "border-paper/20" : "border-line"}`}>
                {s.points.map((pt) => (
                  <li key={pt} className={`flex items-center gap-3 border-b py-3 ${i === 1 ? "border-paper/20" : "border-line"}`}>
                    <span className="h-1.5 w-1.5 bg-fire" />{pt}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ))}
      <section className="py-24">
        <Container className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="display max-w-3xl text-[clamp(2.6rem,6vw,6rem)]">{d.home.ctaTitle}</h2>
          <CTA href={href(locale, "/contacto")}>{d.hero.cta}</CTA>
        </Container>
      </section>
    </>
  );
}
