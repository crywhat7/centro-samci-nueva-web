import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDict, branches } from "@/i18n/content";
import { breadcrumbJsonLd, buildMetadata } from "@/i18n/seo";
import { abs } from "@/i18n/routes";
import { Container, PageHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/ContactForm";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale);
  return buildMetadata(locale, "/contacto", {
    title: locale === "es" ? "Contacto — Extintores en Tegucigalpa y San Pedro Sula" : "Contact — Fire extinguishers in Tegucigalpa and San Pedro Sula",
    description: d.contact.sub + " " + branches.map((b) => `${b.city}: ${b.phones[0]}`).join(" · "),
  });
}

export default async function Contact({ params }: P) {
  const { locale } = await params;
  const d = getDict(locale);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: d.nav.home, url: abs(locale, "/") }, { name: d.nav.contact, url: abs(locale, "/contacto") }])} />
      <PageHead label={d.contact.label} title={d.contact.title} sub={d.contact.sub} />
      <section className="py-20 lg:py-28">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="space-y-16 lg:col-span-5">
            {branches.map((b, i) => (
              <Reveal key={b.id} delay={i * 100}>
                <address className="not-italic">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-fire">{d.contact.branch}</p>
                  <h2 className="display mt-3 text-[clamp(2.6rem,4.5vw,4.4rem)]">{b.city}</h2>
                  <dl className="mt-6 divide-y divide-line border-y border-line">
                    <div className="grid grid-cols-[7rem_1fr] gap-4 py-4"><dt className="text-mute">{d.contact.address}</dt><dd>{b.street}, {b.city}, Honduras</dd></div>
                    <div className="grid grid-cols-[7rem_1fr] gap-4 py-4"><dt className="text-mute">{d.contact.phone}</dt><dd className="flex flex-col">{b.phones.map((p) => <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="ulink self-start font-semibold">{p}</a>)}</dd></div>
                    <div className="grid grid-cols-[7rem_1fr] gap-4 py-4"><dt className="text-mute">{d.contact.email}</dt><dd><a href={`mailto:${b.email}`} className="ulink break-all font-semibold">{b.email}</a></dd></div>
                  </dl>
                  <iframe title={`${b.city} — mapa`} loading="lazy" className="mt-6 h-56 w-full border-0 grayscale" src={`https://www.google.com/maps?q=${encodeURIComponent(`${b.street}, ${b.city}, Honduras`)}&output=embed`} />
                </address>
              </Reveal>
            ))}
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="lg:sticky lg:top-28">
              <ContactForm labels={d.contact.form} email={branches[0].email} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
