import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { isLocale } from "@/i18n/config";
import { getDict } from "@/i18n/content";

export const dynamic = "force-static";
export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export async function GET(_: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = getDict(isLocale(locale) ? locale : "es");
  const svg = await readFile(path.join(process.cwd(), "public/brand/isotipo.svg"), "utf8");
  const logo = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f2ede4", color: "#16120f", padding: 64, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: "#c4161c" }}>{`Centro Samci · ${d.hero.kicker}`}</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3, textTransform: "uppercase" }}>
            <span>{d.hero.l1}</span>
            <span>{d.hero.l2}</span>
            <span style={{ color: "#c4161c" }}>{d.hero.l3}</span>
          </div>
          <div style={{ fontSize: 24, color: "#6b6159" }}>Tegucigalpa · San Pedro Sula · centrosamci.hn</div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={330} height={330} alt="" />
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
