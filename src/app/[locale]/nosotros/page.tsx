import Image from "next/image";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n/content";
import { breadcrumbJsonLd, buildMetadata } from "@/i18n/seo";
import { abs } from "@/i18n/routes";
import { Container, Label } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/JsonLd";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale);
  return buildMetadata(locale, "/nosotros", {
    title: locale === "es" ? "Nosotros — Pioneros contra incendios desde 1973" : "About — Fire protection pioneers since 1973",
    description: d.about.p[1],
  });
}

export default async function About({ params }: P) {
  const { locale } = await params;
  const d = getDict(locale);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: d.nav.home, url: abs(locale, "/") }, { name: d.nav.about, url: abs(locale, "/nosotros") }])} />
      <header className="overflow-hidden border-b border-line">
        <Container className="grid gap-10 pb-16 pt-16 sm:pt-24 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Label>{d.about.label}</Label>
            <h1 className="display balance mt-8 text-[clamp(3.2rem,9vw,9rem)]">{d.about.title}</h1>
          </div>
          <div className="lg:col-span-5">
            <Image src="/brand/isotipo.svg" alt="Centro Samci — Desde 1973" width={520} height={520} priority className="fade-in mx-auto h-auto w-[70%] max-w-[460px] lg:w-full" />
          </div>
        </Container>
      </header>
      <section className="py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal as="p" className="pretty font-serif text-[clamp(1.8rem,3vw,2.8rem)] italic leading-[1.1] lg:col-span-5">{d.about.p[0]}</Reveal>
          <div className="space-y-6 text-lg text-ink/80 lg:col-span-6 lg:col-start-7">
            {d.about.p.slice(1).map((p, i) => <Reveal as="p" key={i} className="pretty">{p}</Reveal>)}
          </div>
        </Container>
      </section>
      <section className="bg-fire py-20 text-paper lg:py-28">
        <Container className="grid gap-px bg-paper/25 sm:grid-cols-2 lg:grid-cols-4">
          {d.about.values.map((v, i) => (
            <Reveal key={v.t} delay={i * 90} className="bg-fire p-2 pb-8 sm:p-8">
              <p className="font-serif text-lg italic text-paper/70">0{i + 1}</p>
              <h2 className="display mt-6 text-4xl">{v.t}</h2>
              <p className="pretty mt-4 text-paper/85">{v.d}</p>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
