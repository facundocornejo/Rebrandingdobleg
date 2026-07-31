# SPEC — Rebranding Dobleg Premoldeados (Astro + Cloudflare Pages)

> **Rol de este documento:** spec de arquitectura y diseño. Escrita por Fable (arquitecto), a revisar por Codex (revisor), a ejecutar por Opus (obrero). Opus NO toma decisiones de diseño: todo está decidido acá. Si algo no está especificado, Opus pregunta antes de inventar.
> **Al aprobarse este plan, el primer paso es copiar esta spec a `B:\rebrandingdobleg\PLAN-REBRANDING.md`** (raíz del proyecto) para que Codex pueda leerla y anotarle observaciones.

---

## 1. Contexto

Landing de cliente real: **Dobleg Premoldeados** — fabricante de premoldeados de hormigón armado (galpones, tambos, tanques, viviendas, bateas, cerramientos, piscinas, tapiales) en Paraná, Entre Ríos. 23+ años, 500+ proyectos. Facu migra el hosting de DonWeb a **Cloudflare Pages** (gratis, sitio estático) y hace un **rebranding completo**.

Objetivos: mobile-first, enfocado en VENTA, funciona como **catálogo compartible por WhatsApp** (9 productos con foto), SEO a fondo, performance real (hoy el LCP es un PNG de 2.73 MB), y que **no parezca la típica página hecha por IA**.

Sitio actual en `B:\rebrandingdobleg\corregidoMo\` (HTML+Bootstrap, 1265 líneas) con deuda seria: OG tags/scripts/CSS duplicados, dominio inconsistente, dos números de WhatsApp, assets 404 (og-cover, favicon, hero responsive), headings invertidos (productos en H5), FAQ en JSON-LD sin contenido visible, 8.5 MB de imágenes con typos en los nombres.

## 2. Decisiones cerradas (confirmadas por Facu)

| Decisión | Valor |
|---|---|
| Stack | **Astro 5** + **Tailwind CSS 4** (`@tailwindcss/vite`) + `@astrojs/sitemap` |
| Dominio canónico | **`https://www.doblegpremoldeados.com.ar/`** |
| Estructura | **Single-page** con anclas por producto (`/#galpones`); `products.ts` con slugs para futura iteración multi-page |
| Repo | `https://github.com/facundocornejo/Rebrandingdobleg.git`; `corregidoMo/` va al `.gitignore` (NO se commitea) |
| Formulario | **Formspree se MANTIENE** (`https://formspree.io/f/xldlnvwa`) — requisito duro de Facu |
| WhatsApp | **Intocable y central** — requisito duro. Número unificado: **5493434806295** (los CTA de producto hoy usan 543434806295 sin el 9: bug a corregir) |
| Se elimina | Bootstrap, Font Awesome (→ SVG inline), AOS (→ CSS + IntersectionObserver mínimo), jQuery-style JS legacy |

## 3. Datos canónicos (fuente única: `site/src/data/site.ts`)

- WhatsApp: `5493434806295` → `https://wa.me/5493434806295?text=<encodeURIComponent(mensaje)>`
- Email: `rgermangomez@gmail.com`
- Instagram: `https://instagram.com/premoldeados_dobleg` · Facebook: `https://facebook.com/premoldeados.dobleG`
- Horarios: Lun–Vie 8:00–18:00 · Sáb 8:00–13:00
- Ubicación: Paraná, Entre Ríos, Argentina (dirección exacta pendiente — no bloquea)
- Claims aprobados por el cliente (mantener textual): "50% más rápido" (galpón 2.5×5 m listo en día y medio), "40% más económico", "100% adaptable", "23+ años", "500+ proyectos", "presupuesto cerrado sin sorpresas", "montaje incluido".

---

## 4. DIRECCIÓN DE ARTE (decidida con skills `impeccable` + `refactoring-ui`)

### 4.1 Concepto

**Voz de marca (3 palabras): sólido, trabajador, directo.** Objeto físico de referencia: el cartel de chapa pintada de un corralón/taller metalúrgico argentino — tipografía grande, sin vueltas, hecha para leerse desde la ruta. La página debe transmitir "esta gente fabrica cosas pesadas que duran", no "esta es una startup". Tono: **industrial-honesto**, ni minimalismo boutique ni maximalismo. Las fotos reales del cliente son el activo principal (autenticidad = venta); el diseño las enmarca, no las tapa.

**Tema: claro** (light). Público: productores agropecuarios, industriales y particulares de Entre Ríos que abren el link desde WhatsApp a plena luz del día, a menudo en gama media/baja con sol de frente. Fondo claro, contraste alto, tipografía grande.

### 4.2 Tipografía

**Una sola familia variable: `Archivo` (variable, ejes wght + wdth)** — self-hosted vía `@fontsource-variable/archivo`. Justificación: grotesca de origen tipográfico industrial, diseñada por Omnibus-Type (**fundición argentina** — coherencia real con la marca), un solo archivo woff2 = performance, y el eje de ancho da el contraste display/texto que normalmente exige una segunda fuente. Prohibido caer en Inter/Roboto/etc. (lista de reflejos de la skill).

| Rol | Especificación |
|---|---|
| Display (H1, números de stats) | Archivo, `font-weight: 800`, `font-stretch: 120%`, `line-height: 1.05`, `letter-spacing: -0.015em` |
| H2 sección | Archivo, `font-weight: 750`, `font-stretch: 110%`, `line-height: 1.1` |
| H3 producto | Archivo, `font-weight: 650`, `1.25rem`, `line-height: 1.2` |
| Body | Archivo, `font-weight: 400`, `1rem`, `line-height: 1.6`, `max-width: 65ch` |
| Kicker/overline | `0.8125rem`, uppercase, `letter-spacing: 0.08em`, `font-weight: 600` |

Escala fluida solo en headings (ratio ~1.333):
- H1: `clamp(2.5rem, 6vw + 1rem, 4.25rem)`
- H2: `clamp(1.75rem, 3vw + 0.75rem, 2.5rem)`
- Stats display: `clamp(2.75rem, 7vw, 4.5rem)`, `font-variant-numeric: tabular-nums`
- Body y UI: tamaños fijos rem (1 / 0.875 / 0.8125).

Carga: `@fontsource-variable/archivo` con `font-display: swap` + fallback con `size-adjust` (metrics override) para minimizar CLS.

### 4.3 Paleta (OKLCH, tema claro)

Hue de marca: **teal ~200-210** (deriva del logo actual `#4DA1A9` — se conserva la familia para no romper el reconocimiento del logo, se profundiza para ganar contraste y sacarle lo "pastel"). Neutros = "hormigón": grises tintados hacia el teal (chroma 0.004–0.012). Acento de conversión: **verde WhatsApp oscurecido** — honesto (todos los CTA primarios abren WhatsApp) y con contraste AA real, cosa que el `#25D366` puro no tiene.

Tokens (capa primitiva + semántica, en `global.css` con `@theme` de Tailwind 4):

```css
/* Primitivos */
--concrete-50:  oklch(97.5% 0.004 210);  /* fondo página */
--concrete-100: oklch(94.5% 0.006 210);  /* fondo sección alternada */
--concrete-200: oklch(90% 0.008 210);    /* bordes suaves, divisores */
--concrete-500: oklch(46% 0.018 215);    /* texto secundario  (≥7:1 sobre 50) */
--concrete-900: oklch(24% 0.02 220);     /* texto principal (≈14:1) — nunca #000 */
--teal-600:     oklch(52% 0.085 202);    /* marca: links, focos, detalles */
--teal-800:     oklch(36% 0.06 208);     /* banda diferenciales, footer (fondos oscuros) */
--teal-100:     oklch(93% 0.025 200);    /* tint suave de marca (chips, hover) */
--wa-600:       oklch(53% 0.14 152);     /* CTA primario (verde WhatsApp profundo, texto blanco AA) */
--wa-700:       oklch(46% 0.13 152);     /* hover/active del CTA */
--error-600:    oklch(50% 0.19 28);
/* Semánticos */
--color-bg: var(--concrete-50);  --color-surface: oklch(99% 0.002 210);
--color-text: var(--concrete-900);  --color-text-muted: var(--concrete-500);
--color-brand: var(--teal-600);  --color-brand-deep: var(--teal-800);
--color-cta: var(--wa-600);  --color-cta-hover: var(--wa-700);
```

Reglas duras:
- **Regla 60-30-10:** 60% neutros hormigón / 30% teal (estructura, headings sobre fondo oscuro, detalles) / 10% verde CTA. El verde SOLO en acciones que abren WhatsApp — nunca decorativo.
- Contraste **AA verificado** (WebAIM) para cada par texto/fondo antes de dar por cerrada la Fase 2; si un par falla, se ajusta SOLO la lightness del token.
- Sobre `--teal-800` el texto es un teal clarísimo (`oklch(96% 0.015 200)`), **jamás gris ni blanco puro**.
- PROHIBIDO (skill impeccable, bans absolutos): gradient text (`background-clip: text`), `border-left/right >1px` como acento de tarjeta, glassmorphism, glow neón, paleta cian-sobre-oscuro, sombras negras puras (tintar hacia `--concrete-900`).

### 4.4 Espaciado, profundidad, radios

- Escala 4pt con nombres semánticos: `--space-2xs:4px … --space-3xl:96px`. Espaciado entre secciones: `clamp(4rem, 9vw, 7rem)`. Más espacio ENTRE grupos que dentro de un grupo.
- Separación por **espacio y fondo antes que bordes**; si hay borde, `1px --concrete-200`.
- Sombras: 2 niveles, dobles (contacto + ambiente), tintadas: `--shadow-sm`, `--shadow-md`. Sutiles.
- Radios: `8px` (cards, inputs), `6px` (botones), `full` (chips). Radio anidado = exterior − padding.
- Container: `max-width: 72rem`, padding lateral `clamp(1rem, 4vw, 2rem)`.

### 4.5 Layout por sección (mobile-first: se especifica 375px primero)

Orden (embudo de venta): **Header → Hero → Diferenciales → Catálogo (protagonista) → Por qué elegirnos → FAQ → Contacto → Footer + FAB WhatsApp.**

1. **Header** (sticky, fondo `--color-bg` con borde inferior 1px al scrollear):
   - Mobile: logo (izq, alto 36px) + botón CTA compacto "WhatsApp" (verde, con glifo SVG). **Sin hamburguesa ni JS de menú**: es single-page, el usuario scrollea.
   - Desktop (≥1024px): se agregan links de ancla (Productos, Nosotros, Preguntas, Contacto) entre logo y CTA, `font-weight: 500`.
2. **Hero** (el LCP se decide acá):
   - Mobile: foto real full-bleed (galpón) con scrim de gradiente `--teal-800` desde abajo (opacidad 0.85→0), contenido abajo-izquierda: kicker "PARANÁ, ENTRE RÍOS · MÁS DE 23 AÑOS", H1 `Estructuras de hormigón que duran generaciones` (texto final lo valida Facu; alternativa: mantener "Premoldeados de Hormigón Armado" por SEO en H1 y el claim emocional como subhead — **decisión: H1 = "Premoldeados de hormigón armado en Entre Ríos"** por SEO, claim grande visual arriba), subhead 1-2 líneas, CTA primario "Cotizar por WhatsApp" (verde, ancho completo en mobile) + CTA secundario "Ver catálogo" (link con flecha ↓, texto claro).
   - Desktop: misma foto, contenido alineado a la izquierda en `max-width: 36rem`, NO centrado.
   - Presupuesto: **imagen hero mobile < 100 KB** (`<Picture>` avif/webp, widths 640/1024/1440/1920, `loading="eager"`, `fetchpriority="high"`).
3. **Diferenciales** — banda oscura `--teal-800`, SIN cards (patrón "3 cards con ícono" = slop banned):
   - Tres números display (50% / 40% / 100%) en Archivo expanded con label alineado a baseline: "más rápido que la construcción tradicional" / "más económico" / "adaptable a tu proyecto". Mobile: apilados con divisor 1px teal claro; desktop: fila asimétrica (números no equidistantes, el 50% más grande). Microcopy debajo: "Un galpón de 2,5 × 5 m, listo en un día y medio."
4. **Catálogo (protagonista)** — fondo `--color-bg`, kicker + H2 "Nuestros productos":
   - **Card destacada** (producto estrella: Galpones): full-width horizontal en desktop (imagen 60% / texto 40%), primera y más alta en mobile.
   - Los otros 8: mobile = lista vertical de cards full-width (imagen 4:3 arriba, contenido abajo); desktop = grid `repeat(auto-fit, minmax(340px, 1fr))`.
   - Anatomía de card: imagen (ratio 4:3 fijo, `object-cover`), chip numerado "01"–"09" (catálogo real, tabular-nums, esquina de la imagen), H3, descripción 1-2 líneas, 2-3 features con check SVG pequeño, CTA.
   - **Jerarquía de CTA (evita 9 botones verdes):** card destacada = botón sólido verde "Cotizar por WhatsApp"; cards estándar = botón fantasma/texto `font-weight: 600` color `--color-brand` con glifo WA, área táctil ≥44px. Cada CTA lleva mensaje prellenado: `Hola! Quiero cotizar: <producto>`.
   - Cards: `--color-surface` + `--shadow-sm`, hover `--shadow-md` + `translateY(-2px)` (solo desktop).
5. **Por qué elegirnos** (fusiona "beneficios" + "nosotros"; muere la columna vacía del sitio viejo):
   - Fondo `--concrete-100`. Desktop: split asimétrico — izquierda texto institucional breve (65ch) + lista de 4 beneficios (entrega rápida, montaje incluido, asesoramiento directo, presupuesto cerrado) con SVG lineal pequeño; derecha foto real del taller/obra. Mobile: texto → foto → beneficios.
   - Stats (23+ años · 500+ proyectos) integrados como línea tipográfica fuerte dentro del bloque de texto, NO como fila de "hero metrics" (patrón banned). Sin contadores animados.
6. **FAQ** — `<details>/<summary>` nativos, cero JS. 6 preguntas: plazos de entrega, zona de cobertura, montaje incluido, formas de pago, mantenimiento/durabilidad, cómo cotizar. Contenido en `faqs.ts`, mismo origen que el JSON-LD `FAQPage` (nunca divergen).
7. **Contacto** — 2 columnas en desktop, apilado en mobile:
   - Izquierda: canales directos — WhatsApp (dominante), teléfono, email, IG/FB, horarios, ubicación. Texto con formato real (el número SE VE como número), no `Label: valor`.
   - Derecha: formulario Formspree. Campos: nombre* , teléfono/WhatsApp* , email (opcional), producto de interés (select desde `products.ts` + "Otro"), mensaje* . Honeypot `_gotcha`. Estados obligatorios: enviando (spinner en botón + disabled), éxito (mensaje verde con ícono), error (mensaje + **fallback: botón "Enviar por WhatsApp"** con el mensaje armado). Errores de validación con texto + ícono, nunca solo color. Focus ring visible SIEMPRE.
8. **Footer** — `--teal-800`, texto teal claro: logo blanco/claro, bajada de una línea, ubicación, links de ancla, redes (SVG), © año dinámico.
9. **FAB WhatsApp** — fijo abajo-derecha, 56px, verde, sombra md, `aria-label`. Oculto cuando la sección contacto está en viewport (IntersectionObserver, 3 líneas).

### 4.6 Motion (mínimo, CSS-first)

- Entrada del hero: fade+rise escalonado (kicker→H1→subhead→CTAs, 60ms de stagger) una sola vez, CSS puro.
- Reveal on scroll de secciones: IntersectionObserver que agrega `.is-visible` (opacity+translateY 12px, `ease-out`, 450ms). Un solo observer, ~15 líneas.
- `@media (prefers-reduced-motion: reduce)`: todo desactivado.
- Prohibido: bounce/elastic, animar width/height/padding, parallax.

### 4.7 Presupuesto JS total

**< 5 KB sin comprimir**, vanilla, un solo `<script>` en `index.astro`: (1) fetch del form + estados, (2) IntersectionObserver de reveal + FAB. Nada más. Sin islands, sin framework client-side.

---

## 5. Arquitectura del proyecto

```
B:\rebrandingdobleg\
├── corregidoMo\              # legacy, gitignored, solo referencia local
├── PLAN-REBRANDING.md        # esta spec (para revisión de Codex)
├── .gitignore                # corregidoMo/, site/node_modules/, site/dist/, site/.astro/
├── README.md                 # breve: qué es, cómo correr, cómo deployar
└── site\                     # proyecto Astro — Root directory en Cloudflare Pages
    ├── astro.config.mjs      # site: 'https://www.doblegpremoldeados.com.ar', sitemap, tailwind vite
    ├── package.json / tsconfig.json (strict)
    ├── public\
    │   ├── robots.txt  ├── _headers  ├── _redirects
    │   ├── favicon.svg  ├── favicon.ico  ├── apple-touch-icon.png
    │   └── og-cover.jpg      # 1200×630 JPG (WhatsApp/FB no siempre toman webp)
    └── src\
        ├── assets\           # imágenes optimizables por astro:assets (§6)
        ├── data\
        │   ├── site.ts       # tipo SiteConfig: contacto, redes, horarios, dominio, claims
        │   ├── products.ts   # tipo Product (§5.1) — migrar textos desde corregidoMo/pro-landing/components/Products.tsx
        │   └── faqs.ts       # tipo Faq { question, answer }
        ├── layouts\Layout.astro          # head completo: meta, OG/Twitter (UNA vez), fonts, JsonLd
        ├── components\
        │   ├── Header.astro  Hero.astro  Differentials.astro
        │   ├── ProductCard.astro  ProductGrid.astro
        │   ├── WhyUs.astro  Faq.astro  ContactSection.astro  ContactForm.astro
        │   ├── Footer.astro  WhatsAppFab.astro  JsonLd.astro
        │   └── icons\        # SVG inline como componentes .astro (wa, check, phone, mail, ig, fb, pin, clock)
        ├── styles\global.css # @import tailwindcss + @theme con TODOS los tokens de §4
        └── pages\index.astro
```

### 5.1 Modelo de datos

```ts
// products.ts
export interface Product {
  slug: string;              // 'galpones' — ancla #slug y futura /productos/[slug]
  title: string;             // 'Galpones industriales'
  shortDesc: string;         // 1-2 líneas para la card
  features: string[];        // 2-3 bullets
  image: ImageMetadata;      // import desde src/assets
  imageAlt: string;          // alt descriptivo SEO
  waMessage: string;         // texto prellenado del CTA
  featured?: boolean;        // true solo en galpones
}
```
Los 9 productos (orden de venta): galpones (featured), tambos, tanques-australianos, tanques-bebederos, viviendas, bateas, cerramientos, piscinas, tapiales. **Textos: migrar los aprobados por el cliente** desde `corregidoMo/pro-landing/components/Products.tsx` y `corregidoMo/index.html` (no reescribir claims, solo pulir redacción).

## 6. Pipeline de imágenes

Solo entran las usadas, renombradas SEO-friendly a `site/src/assets/`:

| Original (`corregidoMo/img/`) | Nuevo nombre |
|---|---|
| `galponultuima2.webp` | `galpon-industrial-premoldeado.webp` |
| `tambos.webp` | `tambo-lecheria-hormigon.webp` |
| `tanque-autraliano.webp` | `tanque-australiano-hormigon.webp` |
| `tanquebebederoo.webp` | `tanque-bebedero-ganado.webp` |
| `viviendas.webp` | `vivienda-premoldeada-hormigon.webp` |
| `bateaultima.webp` | `batea-comedero-hormigon.webp` |
| `cerramiento.webp` | `cerramiento-premoldeado.webp` |
| `pisicinaultima.webp` | `piscina-hormigon-premoldeada.webp` |
| `tapiales.webp` | `tapial-premoldeado-hormigon.webp` |
| `galpon.webp` o `galpon3.webp` (elegir la mejor a ojo) | `hero-galpon-obra.webp` |
| `doble_g_logo.webp` (583 KB!) | recortar/optimizar → `logo-dobleg.webp` (<30 KB) + derivar favicons |

- **Hero:** foto real con scrim (§4.5). `galponIA.png` (2.73 MB) se DESCARTA. Si en la revisión visual la foto real no aguanta 1920px, **encargo a Codex**: regenerar hero IA ≥1920px, luz natural, galpón terminado en campo entrerriano, sin artefactos (queda anotado como pendiente, no bloquea).
- Productos: `<Image>` widths `[400, 800]`, `format="webp"`, ratio 4:3 por CSS, `loading="lazy"`, `decoding="async"`.
- `og-cover.jpg` 1200×630: componer desde la foto hero + logo + "Galpones y estructuras de hormigón · Paraná, ER". Referenciada con **URL absoluta** en OG.
- Favicons: `favicon.svg` (derivado del logo), `favicon.ico` 32px, `apple-touch-icon.png` 180px.
- No usadas (10 archivos, incl. `bateaIA.webp` 2.59 MB y `piletas.webp` duplicado byte a byte de `piscina.webp`): NO entran al proyecto.

## 7. SEO (spec completa)

- `<html lang="es-AR">`. Title ≤60: `Dobleg Premoldeados | Galpones y Tanques de Hormigón en Paraná`. Description ~150: `Fabricamos galpones, tambos, tanques y viviendas de hormigón premoldeado en Paraná, Entre Ríos. 23 años de experiencia, montaje incluido. Cotizá por WhatsApp.`
- Canonical `https://www.doblegpremoldeados.com.ar/` — **UNA vez**. Sin hreflang (un solo idioma/región: innecesario). Sin meta keywords.
- OG + Twitter Card (`summary_large_image`) **una sola vez**, `og:locale: es_AR`, `og:image` absoluta a `/og-cover.jpg`.
- **JSON-LD** en `JsonLd.astro`, generado desde `site.ts`/`products.ts`/`faqs.ts` (imposible que diverja del contenido visible):
  - `LocalBusiness` (`@id`, name, telephone, email, address Paraná/ER, openingHoursSpecification, sameAs IG+FB, image, url). `geo` cuando Facu pase la dirección.
  - `ItemList` con los **9** productos → `url: https://…/#<slug>` (anclas reales del DOM).
  - `FAQPage` con las 6 preguntas — legítimo porque la FAQ ES visible.
- Headings: 1×H1 (hero), H2 por sección, H3 en productos. Anclas: `id` real en cada card (`id="galpones"`) + `scroll-margin-top` por el header sticky.
- `@astrojs/sitemap` (genera `sitemap-index.xml`); `public/robots.txt` → `Sitemap: https://www.doblegpremoldeados.com.ar/sitemap-index.xml`.
- `public/_headers`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy` mínima. CSP simple: `default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://formspree.io; form-action 'self' https://formspree.io`.
- `public/_redirects`: variantes de host → canónico (301). El `.htaccess` muere con DonWeb.
- Accesibilidad: skip-link, `aria-label` en FAB e íconos, focus visible en TODO, contraste AA verificado.

## 8. Formulario (spec)

POST `fetch` a `https://formspree.io/f/xldlnvwa` con `FormData` + header `Accept: application/json`. Estados: idle → enviando (botón disabled + spinner) → éxito (reemplaza el form por mensaje de confirmación con CTA suave "¿Urgente? Escribinos por WhatsApp") → error (mensaje accionable + botón fallback "Enviar por WhatsApp" que arma el texto con los campos cargados — misma lógica que el sitio viejo, número unificado). Validación HTML5 (`required`, `type=tel/email`) + mensajes propios. Honeypot `_gotcha` oculto.

## 9. Fases de ejecución para Opus (con gate de verificación cada una)

> Reglas duras transversales: Git Bash (JAMÁS PowerShell en esta máquina) · un solo `npm install` a la vez · todo se instala en B: · no borrar NADA de `corregidoMo/` · commits Conventional en castellano SIN co-author de IA · secretos jamás en repo (acá no hay: Formspree endpoint es público por diseño).

| # | Fase | Contenido | Gate (evidencia que la cierra) |
|---|---|---|---|
| 0 | Preparación | Ejecutar cleanup de la skill impeccable (`node .agents/skills/impeccable/scripts/cleanup-deprecated.mjs` si aplica); copiar spec a `PLAN-REBRANDING.md`; `git init` + `.gitignore` + commit inicial | `git log --oneline` muestra commit; `PLAN-REBRANDING.md` en raíz |
| 1 | Scaffold | `npm create astro@latest site` (minimal, TS strict) + `npx astro add tailwind` + `@astrojs/sitemap` + `@fontsource-variable/archivo`; `global.css` con TODOS los tokens §4 | `cd site && npx astro build` verde |
| 2 | Datos | `site.ts`, `products.ts` (9, textos migrados), `faqs.ts` (6) | `astro check` verde; grep: única forma de WhatsApp = `5493434806295` |
| 3 | Imágenes | Copiar+renombrar (§6), favicons, og-cover.jpg | build sin warnings de assets; `dist/_astro/` con derivados avif/webp; hero mobile <100 KB |
| 4 | UI | Layout.astro + los 12 componentes + index.astro, siguiendo §4 AL PIE DE LA LETRA (tokens, bans, estados, mobile-first 375px primero) | `astro build && astro preview`; revisión visual 375/768/1440; squint test; checklist refactoring-ui (Definition of Done) |
| 5 | SEO | JsonLd, metadata, robots, _headers, _redirects | grep en `dist/index.html`: 1 H1, 1 set OG, canonical `.com.ar`; JSON-LD validado (validator.schema.org); sitemap generado |
| 6 | Auditoría | Lighthouse **mobile** contra `astro preview` (no dev); envío REAL de Formspree; fallback WA sin red; celular físico vía IP LAN | Lighthouse ≥95 ×4; LCP <2.5s; mail de Formspree recibido |
| 7 | Deploy | Push a GitHub → Cloudflare Pages: Root dir `site`, build `npm run build`, output `dist` → probar `*.pages.dev` en celular + compartir por WA (preview OG) | URL pages.dev operativa con OG correcto |
| 8 | DNS (sesión futura) | Dominio a Cloudflare Free → cambiar NS en DonWeb → custom domain www+apex → redirect apex→www → Always HTTPS → Search Console + sitemap | `curl -I` de cada variante → 301 al canónico; GSC acepta sitemap |

## 10. Checklist de revisión para Codex

1. ¿La paleta §4.3 pasa AA en todos los pares declarados? (verificar con calculadora de contraste, no a ojo)
2. ¿El H1 elegido balancea bien SEO vs venta? ¿Title/description óptimos para "premoldeados Paraná / Entre Ríos"?
3. ¿`font-stretch` con Archivo variable via @fontsource funciona en todos los browsers target o conviene fijar instancias?
4. ¿La CSP propuesta rompe algo de Astro/fonts inline? ¿`unsafe-inline` en script-src es evitable con hashes?
5. ¿El grid `auto-fit minmax(340px)` con card featured genera huecos raros en anchos intermedios?
6. ¿Falta algún caso en el form (doble submit, timeout de Formspree, JS deshabilitado → necesita `<form action>` nativo como no-JS fallback)?
7. ¿Los renames de imágenes §6 cubren todo lo que la UI referencia? ¿og-cover.jpg en public/ vs assets/ correcto?
8. ¿`_redirects` de Pages soporta redirect de host cruzado o eso va por Bulk Redirects de Cloudflare?
9. Riesgos de la migración DNS DonWeb→Cloudflare que falten en §9 fase 8.
10. Cualquier "AI slop tell" que se me haya escapado en §4.

## 11. Pendientes que no bloquean

- Dirección física exacta del taller (para `geo` del LocalBusiness).
- Si el `.com` también es de Facu → Bulk Redirect al `.com.ar`.
- Hero IA regenerado por Codex si la foto real no aguanta (§6).
- Iteración 2: `/productos/[slug]` para SEO local por producto (los slugs ya quedan listos).
