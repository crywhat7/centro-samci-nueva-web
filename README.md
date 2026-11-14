# Centro Samci — sitio web

Sitio de Centro Samci (CCENTROSAMCI), pioneros en protección contra incendios en Honduras desde 1973.
Next.js 15 (App Router) + Tailwind CSS 4, bilingüe con español como idioma principal.

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Idiomas y rutas

- Español en la raíz, sin prefijo: `/productos/equipo-contra-incendios/extintor-co2`
- Inglés bajo `/en` con rutas traducidas: `/en/products/fire-equipment/co2-extinguisher`
- Las carpetas de `src/app/[locale]` usan los slugs en español; `src/middleware.ts` reescribe las URLs públicas.
- Traducción de segmentos: `src/i18n/routes.ts`. Textos y catálogo: `src/i18n/content.ts`.
- `/es/...` redirige (301) a la raíz y las URLs del sitio viejo (`*.html`) redirigen a las nuevas.

## SEO

- Metadatos, Open Graph y Twitter por página (`src/i18n/seo.ts`), canonical y `hreflang` (es-HN, en, x-default).
- Imagen OG generada en `/og/es` y `/og/en`.
- JSON-LD: Organization, LocalBusiness por sucursal, WebSite, BreadcrumbList, ItemList, Product, Service y FAQPage.
- `sitemap.xml` con alternativas de idioma, `robots.txt` y `manifest.webmanifest`.

## Google Search Console

1. Copia `.env.example` a `.env` y define `NEXT_PUBLIC_SITE_URL` y `NEXT_PUBLIC_GSC_VERIFICATION`
   (método "Etiqueta HTML": solo el valor de `content`).
2. Despliega y verifica la propiedad.
3. Envía `https://centrosamci.hn/sitemap.xml`.

## Marca

Logos oficiales en `public/brand/` (isotipo y logo horizontal en sus variantes).
