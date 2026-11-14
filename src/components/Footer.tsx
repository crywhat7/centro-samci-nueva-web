import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDict, branches, social, categories } from "@/i18n/content";
import { href } from "@/i18n/routes";
import { Container } from "./ui";
import { FireText } from "./FireText";

export function Footer({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  return (
    <footer className="bg-ink text-paper">
      <Container className="pt-20">
        <div className="grid gap-14 border-b border-paper/15 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-blanco.svg" alt="Centro Samci — CCENTROSAMCI" width={925} height={215} className="h-auto w-[340px] max-w-full" />
            <p className="mt-6 max-w-sm text-paper/60">{d.footer.tagline}</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <p className="mb-5 text-[12px] uppercase tracking-[0.22em] text-paper/40">{d.footer.branches}</p>
              {branches.map((b) => (
                <div key={b.id} className="mb-6">
                  <p className="font-semibold">{b.city}</p>
                  {b.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="ulink block text-paper/70 hover:text-paper">{p}</a>
                  ))}
                </div>
              ))}
            </div>
            <div>
              <p className="mb-5 text-[12px] uppercase tracking-[0.22em] text-paper/40">{d.footer.links}</p>
              <ul className="space-y-2 text-paper/70">
                {([["/productos", d.nav.products], ["/servicios", d.nav.services], ["/nosotros", d.nav.about], ["/contacto", d.nav.contact]] as const).map(([h, l]) => (
                  <li key={h}><Link href={href(locale, h)} className="ulink hover:text-paper">{l}</Link></li>
                ))}
                {categories.map((c) => (
                  <li key={c.slug.es}><Link href={href(locale, `/productos/${c.slug.es}`)} className="ulink hover:text-paper">{c.name[locale]}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-5 text-[12px] uppercase tracking-[0.22em] text-paper/40">{d.footer.social}</p>
              <ul className="space-y-2 text-paper/70">
                <li><a href={social.facebook} target="_blank" rel="noopener" className="ulink hover:text-paper">Facebook</a></li>
                <li><a href={social.instagram} target="_blank" rel="noopener" className="ulink hover:text-paper">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-6">
          <FireText
            labels={
              locale === "es"
                ? { text: ["Desde", "1973"], hint: "Mantené presionado para apagar el fuego", hintTouch: "Tocá y arrastrá para apagar el fuego", done: "¡Fuego apagado!", doneSub: "Con el equipo correcto es así de fácil. Llevamos más de 50 años asegurándonos de eso.", again: "Volver a encender", cta: "Cotizar extintores", ctaHref: href(locale, "/contacto") }
                : { text: ["Since", "1973"], hint: "Hold to put out the fire", hintTouch: "Tap and drag to put out the fire", done: "Fire's out!", doneSub: "With the right equipment it's this easy. We've made sure of that for 50+ years.", again: "Light it again", cta: "Get a quote", ctaHref: href(locale, "/contacto") }
            }
          />
        </div>
        <div className="flex flex-col justify-between gap-2 py-8 text-[13px] text-paper/45 sm:flex-row">
          <span>© {new Date().getFullYear()} Centrosamci S. de R.L. de C.V. {d.footer.rights}</span>
          <span>Tegucigalpa · San Pedro Sula · Honduras</span>
        </div>
      </Container>
    </footer>
  );
}
