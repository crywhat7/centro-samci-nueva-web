"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/content";
import { href, parsePublic } from "@/i18n/routes";

export function Header({ locale, nav }: { locale: Locale; nav: Dict["nav"] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || "/";
  const { internal } = parsePublic(pathname);
  const other: Locale = locale === "es" ? "en" : "es";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const links = [
    { i: "/productos", label: nav.products },
    { i: "/servicios", label: nav.services },
    { i: "/nosotros", label: nav.about },
    { i: "/contacto", label: nav.contact },
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-700 [transition-timing-function:var(--ease-expo)] ${scrolled || open ? "border-b border-line bg-paper/90 backdrop-blur-md" : "border-b border-transparent"}`}>
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href={href(locale, "/")} aria-label="Centro Samci — inicio" className="fade-in flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/isotipo.svg" alt="" width={40} height={40} className="h-10 w-10" />
          <span className="leading-none">
            <span className="block font-display text-[19px] font-extrabold uppercase tracking-tight [font-variation-settings:'wdth'_80]">Centro Samci</span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-mute">{locale === "es" ? "Desde 1973" : "Since 1973"}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Principal">
          {links.map((l, i) => {
            const active = internal.startsWith(l.i);
            return (
              <Link key={l.i} href={href(locale, l.i)} style={{ animationDelay: `${600 + i * 70}ms` }} className={`fade-in ulink text-[15px] ${active ? "text-fire" : "text-ink/80 hover:text-ink"}`} aria-current={active ? "page" : undefined}>
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link href={href(other, internal)} hrefLang={other} className="fade-in rounded-full px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/70 hover:text-fire" aria-label={other === "en" ? "English" : "Español"}>
            {other}
          </Link>
          <Link href={href(locale, "/contacto")} className="fade-in hidden rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-paper transition-colors duration-500 hover:bg-fire sm:inline-block">
            {nav.quote}
          </Link>
          <button onClick={() => setOpen(!open)} className="flex h-10 items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] lg:hidden" aria-expanded={open} aria-controls="mnav">
            {open ? nav.close : nav.menu}
          </button>
        </div>
      </div>

      <nav id="mnav" className={`overflow-hidden bg-paper transition-[max-height] duration-700 [transition-timing-function:var(--ease-expo)] lg:hidden ${open ? "max-h-[80vh]" : "max-h-0"}`}>
        <ul className="px-5 pb-8 pt-2 sm:px-8">
          {links.map((l) => (
            <li key={l.i} className="border-b border-line">
              <Link href={href(locale, l.i)} className="display block py-4 text-[2.6rem] hover:text-fire">{l.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
