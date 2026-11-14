import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDict, categories, clientLogos } from "@/i18n/content";
import { buildMetadata } from "@/i18n/seo";
import { href } from "@/i18n/routes";
import { Arrow, CTA, Container, Label } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/JsonLd";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "/");
}

export default async function Home({ params }: P) {
  const { locale } = await params;
  const d = getDict(locale);
  const h = (p: string) => href(locale, p);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: d.home.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <JsonLd data={faqLd} />

      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden">
        <Container className="relative grid min-h-[calc(100svh-72px)] grid-rows-[1fr_auto] pb-8 pt-10 lg:pt-14">
          <div className="relative z-10 flex flex-col justify-center">
            <p className="fade-in mb-8 text-[12px] font-semibold uppercase tracking-[0.22em] text-mute" style={{ animationDelay: "100ms" }}>
              <span className="mr-3 inline-block h-px w-8 translate-y-[-4px] bg-fire" />
              {d.hero.kicker}
            </p>
            <h1 className="display text-[clamp(3.4rem,9.6vw,11rem)]">
              <span className="line"><span style={{ animationDelay: "200ms" }}>{d.hero.l1}</span></span>
              <span className="line"><span style={{ animationDelay: "320ms" }}>{d.hero.l2}</span></span>
              <span className="line text-fire"><span style={{ animationDelay: "440ms" }}>{d.hero.l3}</span></span>
            </h1>
          </div>

          {/* isotipo as a quiet, slow-turning seal — the brand's badge, not decoration */}
          <div aria-hidden className="pointer-events-none absolute -right-[12vw] top-[6%] w-[62vw] max-w-[820px] opacity-[0.09] sm:-right-[6vw] lg:right-[-9vw] lg:top-[3%] lg:w-[38vw] lg:opacity-100">
            <Image src="/brand/isotipo.svg" alt="" width={820} height={820} priority className="fade-in h-auto w-full" style={{ animationDelay: "500ms" }} />
          </div>

          <div className="relative z-10 mt-12 grid items-end gap-8 border-t border-line pt-8 lg:grid-cols-12">
            <p className="fade-in pretty max-w-xl text-lg text-ink/75 lg:col-span-6 lg:text-xl" style={{ animationDelay: "700ms" }}>{d.hero.sub}</p>
            <div className="fade-in flex flex-wrap items-center gap-6 lg:col-span-6 lg:justify-end" style={{ animationDelay: "850ms" }}>
              <Link href={h("/productos")} className="ulink text-[15px] font-semibold">{d.hero.cta2}</Link>
              <CTA href={h("/contacto")}>{d.hero.cta}</CTA>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── SIGNATURE: 1973 ───────── */}
      <section className="relative overflow-hidden bg-fire text-paper">
        <Container className="py-24 lg:py-36">
          <Reveal><Label n="01" light>{d.legacy.label}</Label></Reveal>
          <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal clip className="lg:col-span-8">
              <p aria-hidden className="display -ml-[0.04em] text-[clamp(8rem,33vw,30rem)] leading-[0.78] text-paper">1973</p>
            </Reveal>
            <div className="lg:col-span-4 lg:pb-8">
              <Reveal as="h2" className="font-serif text-[clamp(2rem,3.4vw,3.2rem)] italic leading-[1.05] balance">{d.legacy.title}</Reveal>
              <Reveal as="p" delay={120} className="pretty mt-6 text-paper/85">{d.legacy.p}</Reveal>
            </div>
          </div>
          <dl className="mt-16 grid gap-px border-t border-paper/25 sm:grid-cols-3">
            {d.legacy.facts.map((f, i) => (
              <Reveal key={f.l} delay={i * 100} className="pt-6 sm:pr-8">
                <dd className="display text-6xl">{f.n}</dd>
                <dt className="mt-3 text-[14px] text-paper/75">{f.l}</dt>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* ───────── PRODUCTS — editorial index ───────── */}
      <section className="py-24 lg:py-36">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal><Label n="02">{d.home.productsLabel}</Label></Reveal>
              <Reveal as="h2" className="display mt-6 text-[clamp(2.8rem,5.5vw,5.5rem)] balance">{d.home.productsTitle}</Reveal>
            </div>
            <ol className="border-t border-line lg:col-span-8">
              {categories.map((c, i) => (
                <Reveal as="li" key={c.slug.es} delay={i * 80} className="border-b border-line">
                  <Link href={h(`/productos/${c.slug.es}`)} className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-8 sm:gap-8 sm:py-10">
                    <span className="font-serif text-xl italic text-mute">0{i + 1}</span>
                    <span>
                      <span className="display block text-[clamp(2rem,4.4vw,4.2rem)] transition-colors duration-500 group-hover:text-fire">{c.name[locale]}</span>
                      <span className="mt-3 block text-[14px] uppercase tracking-[0.16em] text-mute">{c.kicker[locale]}</span>
                    </span>
                    <span className="relative hidden h-28 w-40 overflow-hidden rounded-sm sm:block">
                      <Image src={c.image} alt={c.name[locale]} fill sizes="160px" className="scale-110 object-cover grayscale transition duration-1000 [transition-timing-function:var(--ease-expo)] group-hover:scale-100 group-hover:grayscale-0" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ───────── FIRE CLASSES — dark chapter ───────── */}
      <section className="bg-ink py-24 text-paper lg:py-36">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal><Label n="03" light>{d.home.classesLabel}</Label></Reveal>
              <Reveal as="h2" className="display mt-6 text-[clamp(2.8rem,5.5vw,5.5rem)] balance">{d.home.classesTitle}</Reveal>
              <Reveal as="p" delay={100} className="pretty mt-8 max-w-md text-paper/70">{d.home.classesP}</Reveal>
            </div>
            <div className="lg:col-span-7">
              {d.home.classes.map((c, i) => (
                <Reveal key={c.k} delay={i * 90} className="grid grid-cols-[5.5rem_1fr] gap-6 border-t border-paper/15 py-7 sm:grid-cols-[7rem_1fr_auto] sm:items-center">
                  <span className="display text-[5.5rem] leading-[0.8] text-fire sm:text-[7rem]">{c.k}</span>
                  <div>
                    <h3 className="text-xl font-semibold">{c.t}</h3>
                    <p className="mt-1 text-paper/60">{c.d}</p>
                  </div>
                  <p className="col-start-2 text-[13px] uppercase tracking-[0.14em] text-paper/80 sm:col-start-auto sm:text-right">{c.a}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── SERVICES ───────── */}
      <section className="py-24 lg:py-36">
        <Container>
          <Reveal><Label n="04">{d.home.servicesLabel}</Label></Reveal>
          <Reveal as="h2" className="mt-6 max-w-5xl font-serif text-[clamp(2.4rem,5vw,4.8rem)] leading-[1.02] balance">{d.home.servicesTitle}</Reveal>
          <div className="mt-16 grid gap-px bg-line md:grid-cols-3">
            {d.services.items.map((s, i) => (
              <Reveal key={s.t} delay={i * 100} className="bg-paper pb-4 pr-8 pt-8 md:pt-0">
                <p className="font-serif text-lg italic text-fire">0{i + 1}</p>
                <h3 className="mt-4 text-2xl font-semibold">{s.t}</h3>
                <p className="pretty mt-3 text-ink/70">{s.long}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14"><Link href={h("/servicios")} className="ulink inline-flex items-center gap-2 font-semibold">{d.nav.services} <Arrow /></Link></Reveal>
        </Container>
      </section>

      {/* ───────── SEO LONG-FORM ───────── */}
      <section className="border-y border-line bg-paper-2 py-24 lg:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal><Label n="05">{d.home.seoLabel}</Label></Reveal>
            <Reveal as="h2" className="mt-6 text-[clamp(1.8rem,2.6vw,2.5rem)] font-semibold leading-tight balance">{d.home.seoTitle}</Reveal>
          </div>
          <div className="columns-1 gap-12 text-ink/80 md:columns-2 lg:col-span-8">
            {d.home.seo.map((p, i) => (
              <p key={i} className="pretty mb-6 break-inside-avoid first:first-letter:float-left first:first-letter:mr-3 first:first-letter:font-serif first:first-letter:text-[4.2rem] first:first-letter:leading-[0.8] first:first-letter:text-fire">{p}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────── CLIENTS ───────── */}
      <section className="overflow-hidden py-20">
        <Container><Label>{d.home.clientsLabel}</Label></Container>
        <div className="mt-10 flex w-max items-center gap-16 marquee will-change-transform">
          {[...clientLogos, ...clientLogos].map((f, i) => (
            <Image key={i} src={`/img/logos/${f}`} alt="" width={140} height={70} className="h-12 w-auto object-contain opacity-55 grayscale transition-opacity duration-500 hover:opacity-100" />
          ))}
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="border-t border-line py-24 lg:py-36">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal><Label n="06">{d.home.faqLabel}</Label></Reveal>
            <Reveal as="h2" className="display mt-6 text-[clamp(2.6rem,5vw,5rem)] balance">{d.home.faqTitle}</Reveal>
          </div>
          <div className="lg:col-span-8">
            {d.home.faq.map((f, i) => (
              <Reveal key={i} delay={i * 50}>
                <details className="group border-t border-line last:border-b">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-7">
                    <h3 className="text-xl font-semibold sm:text-2xl">{f.q}</h3>
                    <span className="plus mt-1 text-3xl leading-none text-fire transition-transform duration-500 [transition-timing-function:var(--ease-expo)]" aria-hidden>+</span>
                  </summary>
                  <p className="pretty max-w-3xl pb-8 text-ink/75">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="bg-ink text-paper">
        <Container className="grid gap-10 py-24 lg:grid-cols-12 lg:items-end lg:py-32">
          <Reveal as="h2" className="display text-[clamp(3rem,8vw,8rem)] lg:col-span-8">{d.home.ctaTitle}</Reveal>
          <div className="lg:col-span-4">
            <Reveal as="p" className="pretty text-paper/70">{d.home.ctaP}</Reveal>
            <Reveal delay={120} className="mt-8"><CTA href={h("/contacto")}>{d.hero.cta}</CTA></Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
