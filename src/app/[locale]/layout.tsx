import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Archivo, Instrument_Sans, Instrument_Serif } from "next/font/google";
import "../globals.css";
import { isLocale, locales, SITE_URL } from "@/i18n/config";
import { getDict } from "@/i18n/content";
import { buildMetadata, organizationJsonLd } from "@/i18n/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SmoothScroll } from "@/components/motion";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--f-display", display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--f-body", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--f-serif", display: "swap" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#f2ede4" };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL(SITE_URL),
    ...buildMetadata(locale, "/"),
    applicationName: "Centro Samci",
    authors: [{ name: "Centro Samci" }],
    category: "business",
    formatDetection: { telephone: true, email: true, address: true },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    verification: {
      // Google Search Console → método "Etiqueta HTML": define NEXT_PUBLIC_GSC_VERIFICATION en .env
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
      other: process.env.NEXT_PUBLIC_BING_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } : undefined,
    },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  return (
    <html lang={locale === "es" ? "es-HN" : "en"} className={`${display.variable} ${body.variable} ${serif.variable}`}>
      <body className="font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          {locale === "es" ? "Saltar al contenido" : "Skip to content"}
        </a>
        <JsonLd data={organizationJsonLd(locale)} />
        <SmoothScroll />
        <Header locale={locale} nav={d.nav} />
        <main id="main" className="pt-[72px]">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
