import { NextResponse, type NextRequest } from "next/server";
import { enToInternal, href } from "@/i18n/routes";

// Old static site URLs → new routes (301 keeps existing Google ranking)
const legacy: Record<string, string> = {
  "/index.html": "/",
  "/productos.html": "/productos",
  "/equipo_incendio.html": "/productos/equipo-contra-incendios",
  "/sistemas.html": "/productos/sistemas-de-deteccion-y-alarma",
  "/especiales.html": "/productos/senalizacion-e-hidrantes",
  "/servicios.html": "/servicios",
  "/contacto.html": "/contacto",
  "/quienes-somos.html": "/nosotros",
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const to = (p: string, status = 301) => NextResponse.redirect(new URL(p, req.url), status);

  if (legacy[pathname]) return to(legacy[pathname]);

  // /es/... is never public: Spanish lives at the root
  if (pathname === "/es" || pathname.startsWith("/es/")) return to(pathname.slice(3) || "/");

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const internal = enToInternal(pathname.slice(3));
    if (internal === null) {
      // Spanish segments used under /en → redirect to the translated URL
      const fixed = href("en", pathname.slice(3));
      if (fixed !== pathname && enToInternal(fixed.slice(3)) !== null) return to(fixed);
      return NextResponse.rewrite(new URL("/en/__not-found", req.url));
    }
    return NextResponse.rewrite(new URL("/en" + (internal === "/" ? "" : internal) + req.nextUrl.search, req.url));
  }

  return NextResponse.rewrite(new URL("/es" + (pathname === "/" ? "" : pathname) + req.nextUrl.search, req.url));
}

export const config = {
  matcher: ["/((?!_next|api|img|brand|og|icon|apple-icon|favicon|robots.txt|sitemap.xml|manifest.webmanifest|opengraph-image|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt|xml)$).*)", "/:page(.*\\.html)"],
};
