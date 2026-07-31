# SPEC v2 — Rebranding Dobleg Premoldeados (Astro + Cloudflare Pages)

> **Versión 2** — incorpora la auditoría de Codex (`HANDOFF-CLAUDE-REBRANDING.md`). Reemplaza a `PLAN-REBRANDING.md` (v1, se preserva como histórico). Escrita por Fable (arquitecto), corregida según revisión de Codex, a ejecutar por Opus (obrero). **Opus NO toma decisiones de diseño ni de contenido: todo está decidido acá.** Si algo no está especificado, se pregunta a Facu antes de inventar.
> Alcance de este documento: especificación. No implementa, no deploya, no toca DNS, no envía formularios reales, no edita ni genera imágenes.

---

## 0. FUENTES DE VERDAD (normativo)

1. **`corregidoMo/index.html` es la ÚNICA fuente de contenido**: textos, productos, claims, datos de contacto, mensajes de WhatsApp y assets. Es equivalente a producción (verificado contra `https://www.doblegpremoldeados.com.ar/` el 31/07/2026) más un parche de `<head>` que nunca se subió.
2. **El cliente (vía Facu) aprueba claims y datos comerciales.** Los claims existentes ya están aprobados y se migran textuales; cualquier claim nuevo requiere aprobación.
3. **`corregidoMo/pro-landing/` (Next.js) NO es normativo.** No es producción, no se usa para migrar contenido ni configuración. Solo puede consultarse como evidencia no vinculante.
4. El proyecto nuevo es una **reescritura estática en Astro**; no se limpia el legado incrementalmente.
5. Datos canónicos (fuente única en código: `site/src/data/site.ts`):
   - WhatsApp canónico: **`5493434806295`**. Todo enlace `wa.me` se DERIVA de esta constante — jamás se hardcodea. (Bug del legado: los 9 CTA de producto usan `543434806295` sin el 9; NO migrar ese número.)
   - Email: `rgermangomez@gmail.com` · IG: `instagram.com/premoldeados_dobleg` · FB: `facebook.com/premoldeados.dobleG`
   - Horarios: Lun–Vie 8:00–18:00 · Sáb 8:00–13:00 · Ubicación: Paraná, Entre Ríos (dirección exacta pendiente, no bloquea)
   - Dominio canónico: **`https://www.doblegpremoldeados.com.ar/`**
   - Claims aprobados (migrar textuales): "50% más rápido" (galpón 2,5×5 m listo en día y medio), "40% más económico", "100% adaptable", "23+ años", "500+ proyectos", "presupuesto cerrado sin sorpresas", "montaje incluido".

## 1. Decisiones cerradas

| Decisión | Valor |
|---|---|
| Stack | **Astro 7** + Tailwind CSS 4 (`@tailwindcss/vite`) + `@astrojs/sitemap`. Estático puro, sin framework cliente. *(Corregido el 31/07/2026 con aprobación de Facu: la spec decía "Astro 5", pero el `latest` del registro es 7.1.6 y el dist-tag `legacy` es 4.16.19 — Astro 5 quedó dos majors atrás. `@astrojs/sitemap` 3.7.3 no declara peer sobre `astro`, y todo lo que usa esta spec son APIs estables de `astro:assets`.)* |
| Estructura | Single-page con anclas (`/#galpones`); `products.ts` con slugs para futura iteración multi-page |
| Repo | `https://github.com/facundocornejo/Rebrandingdobleg.git`; `corregidoMo/` NO se commitea |
| Formulario | Formspree se MANTIENE (`https://formspree.io/f/xldlnvwa`) — requisito duro |
| WhatsApp | Central e intocable — requisito duro |
| Analítica | **Cloudflare Web Analytics** (decidido por Facu 31/07): gratis, sin cookies, sin banner de consentimiento. Mide visitas, páginas y Core Web Vitals. **Limitación aceptada y documentada:** no instrumenta eventos custom por CTA — la atribución fina de clics de WhatsApp NO se mide en v1 (si se necesita, iteración futura) |
| Se elimina | Bootstrap, Font Awesome (→ SVG inline), AOS (→ CSS + IntersectionObserver mínimo), jQuery |

## 2. DIRECCIÓN DE ARTE (se conserva de v1, con correcciones)

### 2.1 Concepto

**Voz de marca: sólido, trabajador, directo.** Referencia física: cartel de chapa pintada de corralón/taller argentino — tipografía grande, sin vueltas, legible desde la ruta. Tono **industrial-honesto**. Las fotos reales del cliente son el activo principal (autenticidad = venta); la UI las enmarca, no las tapa. **Tema claro**: el público (productores agropecuarios, industriales, particulares de Entre Ríos) abre el link desde WhatsApp a plena luz del día.

### 2.2 Tipografía

**Una sola familia variable: `Archivo`** (ejes wght + wdth), self-hosted vía `@fontsource-variable/archivo`, `font-display: swap` + fallback con metrics override (`size-adjust`) para minimizar CLS. Justificación: grotesca industrial de Omnibus-Type (fundición argentina), un solo woff2, el eje de ancho da el contraste display/texto sin segunda fuente.

| Rol | Especificación |
|---|---|
| Display (H1, números) | weight 800, `font-stretch: 120%`, lh 1.05, ls −0.015em |
| H2 sección | weight 750, `font-stretch: 110%`, lh 1.1 |
| H3 producto | weight 650, 1.25rem, lh 1.2 |
| Body | weight 400, 1rem, lh 1.6, `max-width: 65ch` |
| Kicker | 0.8125rem, uppercase, ls 0.08em, weight 600 |

Escala fluida solo headings: H1 `clamp(2.5rem, 6vw + 1rem, 4.25rem)` · H2 `clamp(1.75rem, 3vw + 0.75rem, 2.5rem)` · stats `clamp(2.75rem, 7vw, 4.5rem)` con `tabular-nums`. Body/UI fijos (1 / 0.875 / 0.8125 rem).

**Nota de compatibilidad (checklist Codex §3):** si `font-stretch` con la variable de @fontsource no responde en algún browser target, fijar instancias con `font-variation-settings: 'wdth' 120` — verificar en Fase 4 en Chrome/Firefox/Safari iOS y dejar el que funcione en los tres.

### 2.3 Paleta (OKLCH, tema claro) — contrastes MEDIDOS

Hue de marca: teal ~200–210 (evoluciona el `#4DA1A9` del logo). Neutros "hormigón" tintados a teal. Acento de conversión: verde WhatsApp oscurecido, SOLO en acciones que abren WhatsApp.

```css
/* Primitivos */
--concrete-50:  oklch(97.5% 0.004 210);  /* fondo página */
--concrete-100: oklch(94.5% 0.006 210);  /* fondo sección alternada */
--concrete-200: oklch(90% 0.008 210);    /* bordes, divisores */
--concrete-500: oklch(46% 0.018 215);    /* texto secundario — 6.6:1 sobre concrete-50 (AA normal, medido) */
--concrete-900: oklch(24% 0.02 220);     /* texto principal — 15.3:1 (medido) */
--teal-600:     oklch(52% 0.085 202);    /* marca — 4.9:1 sobre fondo (AA large/UI, medido) */
--teal-800:     oklch(36% 0.06 208);     /* fondos oscuros (diferenciales, footer) */
--teal-100:     oklch(93% 0.025 200);    /* tint suave */
--teal-light:   oklch(96% 0.015 200);    /* texto sobre teal-800 — 9.5:1 (medido) */
--wa-600:       oklch(53% 0.14 152);     /* CTA — 4.95:1 con texto blanco (AA, medido) */
--wa-700:       oklch(46% 0.13 152);     /* hover/active */
--error-600:    oklch(50% 0.19 28);
/* Semánticos */
--color-bg: var(--concrete-50);  --color-surface: oklch(99% 0.002 210);
--color-text: var(--concrete-900);  --color-text-muted: var(--concrete-500);
--color-brand: var(--teal-600);  --color-brand-deep: var(--teal-800);
--color-cta: var(--wa-600);  --color-cta-hover: var(--wa-700);
```

Reglas duras:
- 60-30-10: 60% neutros / 30% teal / 10% verde CTA (solo WhatsApp, nunca decorativo).
- `--teal-600` NUNCA para texto menor a 18px/14px-bold (es AA large, no AA normal). Links en texto corrido: usar `--teal-600` solo con weight ≥600 y tamaño ≥1rem, o oscurecer a `oklch(45% 0.08 205)`.
- **Gate de contraste (Fase 4):** verificar en NAVEGADOR (DevTools + WebAIM) cada par texto/fondo del sitio construido, incluyendo texto sobre fotos con scrim (medir sobre el punto más claro de la foto bajo el texto). Si un par falla, ajustar SOLO lightness del token.
- Sobre `--teal-800` el texto es `--teal-light`, jamás gris ni blanco puro.
- PROHIBIDO: gradient text (`background-clip: text`), `border-left/right >1px` como acento, glassmorphism, glow neón, cian-sobre-oscuro, sombras negras puras (tintar hacia `--concrete-900`), cards idénticas con ícono ×3, fila de "hero metrics", contadores animados, parallax, bounce/elastic.

### 2.4 Espaciado, profundidad, radios

- Escala 4pt semántica (`--space-2xs:4px … --space-3xl:96px`). Secciones: `clamp(4rem, 9vw, 7rem)`. Más espacio ENTRE grupos que dentro.
- Separar por espacio y fondo antes que bordes; si hay borde: `1px --concrete-200`.
- Sombras: 2 niveles dobles (contacto+ambiente) tintadas. Radios: 8px cards/inputs, 6px botones, full chips; radio anidado = exterior − padding.
- Container `max-width: 72rem`, padding lateral `clamp(1rem, 4vw, 2rem)`.

### 2.5 Layout por sección (mobile-first, 375px primero)

Orden: **Header → Hero → Diferenciales → Catálogo → Por qué elegirnos → FAQ → Contacto → Footer + FAB.**

1. **Header** sticky, fondo `--color-bg`, borde inferior 1px al scrollear. Mobile: logo (36px) + CTA compacto "WhatsApp" (verde, glifo SVG). Sin hamburguesa ni JS de menú. Desktop ≥1024px: + links de ancla (Productos, Nosotros, Preguntas, Contacto), weight 500.
2. **Hero**: foto real full-bleed con scrim `--teal-800` desde abajo (0.85→0). Contenido abajo-izquierda: kicker "PARANÁ, ENTRE RÍOS · MÁS DE 23 AÑOS", **H1 = "Premoldeados de hormigón armado en Entre Ríos"** (único H1; claim emocional como subhead, no segundo H1), CTA primario "Cotizar por WhatsApp" (verde, full-width mobile) + secundario "Ver catálogo" (link con ↓). Desktop: contenido a la izquierda `max-width: 36rem`, NO centrado. **La foto y su crop salen de la curaduría aprobada (Fase 3A)** — fuente real máx. 1600px: `<Picture>` avif/webp `widths={[640, 960, 1280, 1600]}` (NO 1920: no se inventa detalle que la fuente no tiene), `loading="eager"`, `fetchpriority="high"`. Presupuesto: variante mobile <100 KB.
3. **Diferenciales**: banda `--teal-800`, SIN cards. Tres números display (50% / 40% / 100%) con label a baseline; mobile apilados con divisor 1px, desktop fila asimétrica (el 50% más grande). Microcopy: "Un galpón de 2,5 × 5 m, listo en un día y medio."
4. **Catálogo** (protagonista): kicker + H2 "Nuestros productos". Card destacada (Galpones): horizontal en desktop (imagen 60/texto 40), primera en mobile. Los otros 8: mobile lista vertical full-width; desktop `repeat(auto-fit, minmax(340px, 1fr))` — **verificar en Fase 4 que la featured no genere huecos en anchos intermedios (~768–1100px); si los hay, fijar grid de 2 columnas con `@media` y featured en `grid-column: 1 / -1`**. Card: imagen 4:3 con `object-position` POR PRODUCTO según curaduría (§4), chip "01"–"09" tabular-nums, H3, desc 1-2 líneas, 2-3 features con check SVG, CTA. Jerarquía CTA: featured = botón sólido verde; estándar = botón fantasma weight 600 `--color-brand` con glifo WA, target ≥44px. Mensaje prellenado por producto (de la tabla de trazabilidad §3). Cards `--color-surface` + `--shadow-sm`; hover `--shadow-md` + `translateY(-2px)` solo desktop.
5. **Por qué elegirnos**: fondo `--concrete-100`. Desktop split asimétrico: texto institucional (65ch) + 4 beneficios (entrega rápida, montaje incluido, asesoramiento directo, presupuesto cerrado) con SVG lineal | foto real. Mobile: texto → foto → beneficios. Stats (23+ años · 500+ proyectos) como línea tipográfica fuerte integrada, sin contadores.
6. **FAQ**: `<details>/<summary>` nativos, cero JS. 6 preguntas (plazos, cobertura, montaje, pagos, durabilidad, cómo cotizar) en `faqs.ts` — misma fuente que el JSON-LD.
7. **Contacto**: 2 columnas desktop / apilado mobile. Izquierda: canales directos (WhatsApp dominante, teléfono, email, redes, horarios, ubicación) con formato real, no `Label: valor`. Derecha: formulario (§6).
8. **Footer**: `--teal-800`, texto `--teal-light`: logo claro, bajada, ubicación, anclas, redes SVG, © año dinámico.
9. **FAB WhatsApp**: fijo abajo-derecha, 56px, verde, `--shadow-md`, `aria-label`. Oculto cuando #contacto está en viewport (IntersectionObserver).

### 2.6 Motion y JS

- Hero: fade+rise escalonado CSS puro (60ms stagger), una vez. Reveal on scroll: un IntersectionObserver (~15 líneas) que agrega `.is-visible` (opacity + translateY 12px, ease-out 450ms). `prefers-reduced-motion: reduce` desactiva todo.
- **Presupuesto JS propio: <5 KB sin comprimir**, vanilla, un `<script>`: form + observer + FAB. El beacon de Cloudflare Web Analytics es el único tercero.

## 3. FASE 0A — Trazabilidad de contenido (BLOQUEANTE antes de UI)

El implementador construye esta tabla extrayendo TODO de `corregidoMo/index.html` (líneas ~471–810 para productos) y la presenta a Facu para aprobación **antes de la Fase 4 (UI)**:

| # | Producto (slug) | Copy fuente (extracto index.html) | Asset original | Alt final | Mensaje WhatsApp |
|---|---|---|---|---|---|
| 01 | galpones | (extraer) | `galponultuima2.webp` | (proponer) | (proponer) |
| 02 | tambos | (extraer) | `tambos.webp` | … | … |
| 03 | tanques-australianos | (extraer) | `tanque-autraliano.webp` | … | … |
| 04 | tanques-bebederos | (extraer) | `tanquebebederoo.webp` | … | … |
| 05 | viviendas | (extraer) | `viviendas.webp` | … | … |
| 06 | bateas | (extraer) | `bateaultima.webp` | … | … |
| 07 | cerramientos | (extraer) | `cerramiento.webp` | … | … |
| 08 | piscinas | (extraer) | `pisicinaultima.webp` | … | … |
| 09 | tapiales | (extraer) | `tapiales.webp` | … | … |

Reglas: copys se migran con pulido de redacción SIN cambiar claims; detalles técnicos valiosos se conservan (bateas 2 m × 60 cm, 300 L, unibles con caño de 2" y un solo flotante; tapiales cara lisa/cara moldeada). Los mensajes WA se derivan de `site.ts` + título del producto (`Hola! Quiero cotizar: <producto>`). Modelo de datos:

```ts
export interface Product {
  slug: string;          // ancla #slug y futura /productos/[slug]
  title: string;
  shortDesc: string;     // 1-2 líneas
  features: string[];    // 2-3 bullets
  image: ImageMetadata;  // import desde src/assets
  imageAlt: string;
  objectPosition?: string; // foco del crop 4:3, de la curaduría §4
  featured?: boolean;    // true solo galpones
}
```

## 4. FASE 3A — Curaduría de imágenes (BLOQUEANTE antes de copiar/renombrar/optimizar/retocar/generar)

**Nada se modifica ni se genera sin aprobación foto por foto de Facu.** El implementador presenta una ficha por imagen: uso propuesto, crop mobile y desktop, `object-position`/foco, alt, tratamiento solicitado. Recién con el OK se ejecuta el pipeline (Fase 3B).

Hechos medidos (31/07/2026) que condicionan la curaduría:
- Fotos reales: máximo **1600×1200** (`galpon3.webp`, `galponultuima2.webp`, `viviendas.webp`). No existe fuente 1920px; no se exige ni se inventa.
- `galponIA.png` (hero actual): **1024×1536 VERTICAL**, 2,86 MB — descartado como hero.
- Fuentes 16:9 que requieren foco definido antes del crop 4:3: `tanquebebederoo.webp` (1280×720), `pisicinaultima.webp` (1080×608).
- `piletas.webp` ≡ `piscina.webp` (idénticos byte a byte): se usa UNO (`pisicinaultima.webp` es el referenciado por producción; los duplicados no entran).
- Candidatas a hero (elegir en curaduría): `galpon3.webp` o `galponultuima2.webp` (1600×1200).
- **Mejora/generación de hero por IA: PENDIENTE BLOQUEADO por aprobación explícita de Facu.** No es tarea automática de nadie. Si se aprueba, se especificará por separado.

Pipeline (Fase 3B, post-aprobación): copiar solo las aprobadas a `site/src/assets/` con estos renames SEO (tabla completa y autosuficiente); originales de `corregidoMo/img/` quedan INTACTOS:

| Original (`corregidoMo/img/`) | Destino (`site/src/assets/`) | Uso |
|---|---|---|
| `galponultuima2.webp` | `galpon-industrial-premoldeado.webp` | producto 01 |
| `tambos.webp` | `tambo-lecheria-hormigon.webp` | producto 02 |
| `tanque-autraliano.webp` | `tanque-australiano-hormigon.webp` | producto 03 |
| `tanquebebederoo.webp` | `tanque-bebedero-ganado.webp` | producto 04 (16:9 → foco de §4) |
| `viviendas.webp` | `vivienda-premoldeada-hormigon.webp` | producto 05 |
| `bateaultima.webp` | `batea-comedero-hormigon.webp` | producto 06 |
| `cerramiento.webp` | `cerramiento-premoldeado.webp` | producto 07 |
| `pisicinaultima.webp` | `piscina-hormigon-premoldeada.webp` | producto 08 (16:9 → foco de §4) |
| `tapiales.webp` | `tapial-premoldeado-hormigon.webp` | producto 09 |
| `galpon3.webp` **o** `galponultuima2.webp` (se elige en curaduría 3A) | `hero-galpon-obra.webp` | hero (fuente 1600×1200) |
| `doble_g_logo.webp` (583 KB) | `logo-dobleg.webp` (<30 KB) | header/footer + base de favicons |

Derivados a crear (no son copias): `public/favicon.svg` + `public/favicon.ico` (32px) + `public/apple-touch-icon.png` (180px) desde el logo; `public/og-cover.jpg` (1200×630) desde la foto hero aprobada + logo + leyenda (§4 último párrafo).

**Exclusiones — NO entran al proyecto:** `galponIA.png` (hero viejo, vertical), `bateaIA.webp` (2,6 MB sin uso), `piletas.webp` y `piscina.webp` (duplicados byte a byte entre sí y reemplazados por `pisicinaultima.webp`), `galpon.webp`, `galpones.webp`, `galponultima.webp`, `piscinaultima2.webp`, `bebedero.webp`, `logo.webp` (si la curaduría 3A no los rescata explícitamente). `<Image>` productos `widths={[400, 800]}`, lazy, `decoding="async"`, ratio 4:3 por CSS + `object-position` de la ficha. Hero según §2.5. Logo `doble_g_logo.webp` (583 KB) → optimizado <30 KB + favicons (`favicon.svg`, `favicon.ico` 32px, `apple-touch-icon.png` 180px). `og-cover.jpg` **1200×630 JPG** compuesto desde la foto hero aprobada + logo + "Galpones y estructuras de hormigón · Paraná, ER" — también pasa por la ficha de aprobación.

## 5. SEO, headers y analítica

- `<html lang="es-AR">`. Title ≤60: `Dobleg Premoldeados | Galpones y Tanques de Hormigón en Paraná`. Description ~150: `Fabricamos galpones, tambos, tanques y viviendas de hormigón premoldeado en Paraná, Entre Ríos. 23 años de experiencia, montaje incluido. Cotizá por WhatsApp.`
- Canonical `https://www.doblegpremoldeados.com.ar/` UNA vez. Sin hreflang, sin meta keywords. OG + Twitter Card una vez, `og:locale es_AR`, `og:image` URL absoluta a `/og-cover.jpg`.
- **JSON-LD** (`JsonLd.astro`) generado desde `site.ts`/`products.ts`/`faqs.ts` — semántica sincronizada con el contenido visible; **no se promete rich results** (eso lo decide Google). `LocalBusiness` (@id, tel, email, address, horarios, sameAs; `geo` cuando haya dirección), `ItemList` con los 9 → `url: …/#<slug>` (anclas reales), `FAQPage` (la FAQ ES visible).
- Headings: 1×H1, H2 por sección, H3 productos. `id` real por card + `scroll-margin-top`.
- `@astrojs/sitemap` → `sitemap-index.xml`; `robots.txt` apunta al sitemap.
- **Analítica: Cloudflare Web Analytics** — beacon en `Layout.astro`, antes de `</body>`. Forma canónica: `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "<TOKEN>"}'></script>` — pero **manda el snippet EXACTO que entrega el dashboard** (Web Analytics → Manage site, la doc oficial no lo publica); si difiere de la forma canónica, usar el del dashboard y ajustar la CSP si hiciera falta. `<TOKEN>` se obtiene en Fase 7 al crear el sitio en Cloudflare; hasta entonces el script queda condicional (no renderizar si no hay token configurado). Sin cookies → sin banner de consentimiento.
- `public/_headers`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`. CSP: `default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https://formspree.io https://cloudflareinsights.com; form-action 'self' https://formspree.io; frame-ancestors 'none'`. **Decisión cerrada para v1: se acepta `'unsafe-inline'` en `script-src`** (los scripts inline de Astro y el estado del form lo requieren); el gate es validar la CSP en preview Y en producción sin errores de consola ni recursos bloqueados. Migrar a CSP con hashes queda como iteración futura, no bloquea.
- **`public/_redirects`: SOLO paths del mismo sitio (probablemente vacío en v1). PROHIBIDO poner redirects entre hostnames ahí — Cloudflare Pages no los soporta en `_redirects`** (verificado en docs oficiales). Los redirects de dominio van por reglas de zona (§8).
- Sin cache headers custom: Pages ya cachea por deploy correctamente.
- Accesibilidad: skip-link, `aria-label` en FAB/íconos, focus visible SIEMPRE, navegación completa por teclado, contraste verificado en navegador (§2.3).

## 6. Formulario (spec de comportamiento + pruebas)

**Base no-JS (progressive enhancement):** `<form action="https://formspree.io/f/xldlnvwa" method="POST">` nativo — con JS deshabilitado el submit funciona igual y Formspree muestra su página de confirmación. El JS intercepta y mejora, nunca reemplaza la base.

Campos: nombre*, teléfono/WhatsApp* (`type=tel`), email (opcional), producto de interés (select desde `products.ts` + "Otro"), mensaje*. Honeypot `_gotcha` oculto. Validación HTML5 + mensajes propios con texto e ícono (nunca solo color).

Comportamiento JS: `fetch` POST con `FormData` + `Accept: application/json`, **`AbortController` con timeout de 10 s**, **botón disabled durante el envío (prevención de doble submit)** con spinner. Estados con **`aria-live="polite"`**:
- Éxito → reemplazar form por confirmación con CTA suave "¿Urgente? Escribinos por WhatsApp".
- Error/timeout → mensaje accionable, **los campos conservan sus valores**, y aparece un **botón MANUAL** "Enviar por WhatsApp" que arma el texto con los campos cargados. **PROHIBIDO abrir WhatsApp automáticamente desde una promesa rechazada.**

**Gates de prueba (3 pruebas independientes, con evidencia):**
1. POST real exitoso → mail recibido en la casilla de Formspree.
2. Formspree bloqueado/erróneo CON conectividad (simular: bloquear el host en DevTools o apuntar a endpoint inválido en una build de prueba) → estado de error correcto + fallback manual WA funcional + campos preservados.
3. JavaScript deshabilitado → submit nativo llega a Formspree y muestra confirmación.
(NO se usa "sin red" como gate del fallback: sin red WhatsApp tampoco completa la conversación.)

## 7. Repositorio y estructura

```
B:\rebrandingdobleg\
├── corregidoMo\              # legacy: gitignored, INTACTO
├── PLAN-REBRANDING.md        # v1 (histórico)  ├── PLAN-REBRANDING-v2.md  # esta spec
├── HANDOFF-CLAUDE-REBRANDING.md  # auditoría de Codex
├── .gitignore  ├── README.md
└── site\                     # Astro — Root directory en Cloudflare Pages
    ├── astro.config.mjs      # site: 'https://www.doblegpremoldeados.com.ar', sitemap, tailwind
    ├── public\               # robots.txt, _headers, _redirects, favicons, og-cover.jpg
    └── src\  (assets/ · data/{site,products,faqs}.ts · layouts/Layout.astro ·
          components/{Header,Hero,Differentials,ProductCard,ProductGrid,WhyUs,Faq,
          ContactSection,ContactForm,Footer,WhatsAppFab,JsonLd}.astro + icons/ ·
          styles/global.css · pages/index.astro)
```

**Fase 0 — antes de `git init`:** inventariar la raíz (`ls -la`), decidir qué se versiona. Decisiones tomadas: `.atl/` NO se versiona (metadata de tooling local → `.gitignore`); se versionan `site/`, los tres `.md` de planificación, `.gitignore`, `README.md`. `.gitignore`: `corregidoMo/`, `.atl/`, `site/node_modules/`, `site/dist/`, `site/.astro/`. Antes del primer commit: **`git status --ignored`** para confirmar que no entra nada indebido. Chequeo del remote (en este orden, porque tras `git init` aún no existe `origin`): `git ls-remote https://github.com/facundocornejo/Rebrandingdobleg.git` — si devuelve refs (contenido previo), frenar y consultar a Facu; si está vacío, `git remote add origin https://github.com/facundocornejo/Rebrandingdobleg.git` y verificar con `git remote -v`. Commits: Conventional en castellano, sin co-author de IA.

## 8. Cloudflare: deploy, dominio y DNS (receta cerrada)

**Fase 7 — Deploy a Pages:** push a GitHub → conectar repo en Pages: Root directory `site`, build `npm run build`, output `dist`. Crear el sitio de Web Analytics y pegar el token del beacon. Probar `*.pages.dev` en celular físico + compartir por WA (preview OG).

**Fase 8 — Dominio y DNS (sesión propia, con gates):**
1. **Gate de inventario DNS (antes de tocar nameservers):** exportar/registrar TODOS los registros actuales del dominio en DonWeb: A, AAAA, CNAME, MX, TXT (SPF/DKIM/verificaciones), CAA y subdominios. Verificar con `dig` externo además del panel. Si existe DNSSEC activo (registro DS en el registro), **desactivarlo/planificarlo ANTES de migrar NS** (migrar NS con DS activo rompe la resolución). Documentar los NS actuales para rollback.
2. Agregar la zona `doblegpremoldeados.com.ar` en Cloudflare Free → cargar TODOS los registros inventariados → comparar 1:1 contra el export.
3. Cambiar NS en DonWeb a los de Cloudflare. Ventana: hacerlo en horario de baja actividad; propagación minutos–24 h. Rollback: restaurar NS de DonWeb (por eso se documentan).
4. En Pages → Custom domains: agregar `www.doblegpremoldeados.com.ar` Y el apex (Cloudflare crea los CNAME proxied).
5. **Redirects de host (NO en `_redirects`):** Redirect Rule de zona: apex → `https://www.doblegpremoldeados.com.ar` (301, preservando path y query). **Decisión: `*.pages.dev` SÍ se redirige al canónico** vía Bulk Redirects (per docs de Cloudflare) una vez que el dominio esté verde, para no dividir SEO.
6. "Always Use HTTPS" activado. **HSTS: NO activar** hasta que apex, www y pages.dev respondan correctos en HTTPS durante al menos una semana de verificación.
7. **Gate de verificación final:** `curl -sI` de las 6 variantes (`http/https` × `apex/www` + `pages.dev`) → todas terminan en `https://www.doblegpremoldeados.com.ar/` con 301/200 correctos; mail y servicios externos del inventario siguen resolviendo (verificar MX/TXT con `dig`).
8. Post-DNS: Search Console (property nueva) + enviar sitemap. Hosting viejo de DonWeb queda obsoleto; DonWeb sigue solo como registrador.

## 9. Fases de ejecución (orden y gates autocontenidos)

> Reglas transversales: Git Bash (JAMÁS PowerShell en esta máquina) · un solo `npm install` a la vez · instalar en B: · `corregidoMo/` intacto · sin secretos en repo · commits Conventional en castellano. Todos los gates son comandos/checklists de este documento — sin dependencias de scripts o skills externos.

| # | Fase | Contenido | Gate (evidencia) |
|---|---|---|---|
| 0 | Repo | Inventario raíz, `.gitignore` (§7), `git init`, remote check, commit inicial | `git status --ignored` limpio; `git log --oneline` |
| 0A | Trazabilidad | Tabla §3 completa desde `index.html` | **Aprobación de Facu** de la tabla |
| 1 | Scaffold | `npm create astro@latest site` (minimal, TS strict) + tailwind + sitemap + fontsource; `global.css` con tokens §2.3/§2.4 | `cd site && npx astro build` verde |
| 2 | Datos | `site.ts`, `products.ts` (9, desde tabla 0A), `faqs.ts` (6) | `npx astro check` verde; `rg -F '543434806295' site/src` NO devuelve resultados (el número erróneo no existe); `rg -F '5493434806295' site/src` aparece SOLO en `data/site.ts` (única definición literal del canónico — todo el resto lo deriva) |
| 3A | Curaduría | Fichas por imagen (§4) | **Aprobación foto por foto de Facu** |
| 3B | Pipeline img | Copiar+renombrar aprobadas, favicons, og-cover.jpg | build sin warnings; derivados en `dist/_astro/`; hero mobile <100 KB (medir bytes del archivo generado) |
| 4 | UI | Layout + 12 componentes + index.astro según §2 | `astro build && astro preview`; revisión 375/768/1440; grid featured sin huecos; contraste en navegador OK; checklist: 1 foco primario por sección, estados hover/focus/disabled/error visibles, touch targets ≥44px, sin ban de §2.3 |
| 5 | SEO | JsonLd, metadata, robots, `_headers`, `_redirects` (solo paths) | grep en `dist/index.html`: 1 H1, 1 set OG, canonical `.com.ar`; JSON-LD validado en validator.schema.org; sitemap generado |
| 6 | Auditoría | Las 3 pruebas del form (§6) + Lighthouse mobile contra `astro preview` + celular físico vía IP LAN con throttling "Slow 4G" | Lighthouse ≥95 ×4; registrar: bytes transferidos del hero, LCP, INP, CLS (objetivo: LCP <2.5 s, INP <200 ms, CLS <0.1); mail de Formspree recibido |
| 7 | Deploy | §8 Fase 7 | pages.dev operativa en celular físico; preview OG correcto en WhatsApp; analytics registrando |
| 8 | DNS | §8 Fase 8, con sus 8 pasos y gates | `curl -sI` de las 6 variantes → canónico; MX/TXT intactos; GSC acepta sitemap |

**Medición post-deploy (gate de rendimiento real):** además de Lighthouse, correr la URL de producción en PageSpeed Insights (datos de laboratorio + campo cuando haya tráfico) y verificar CWV en el panel de Cloudflare Web Analytics tras la primera semana.

## 10. Pendientes bloqueados (requieren decisión/aprobación de Facu, no del implementador)

- Aprobación de la tabla de trazabilidad (gate 0A).
- Aprobación foto por foto de la curaduría (gate 3A).
- Mejora/generación de hero por IA: bloqueado hasta aprobación explícita; no es tarea automática.
- Dirección física del taller (para `geo` del LocalBusiness) — no bloquea.
- Si el `.com` también le pertenece a Facu → sumar esa zona y Bulk Redirect al `.com.ar` — no bloquea.
- Iteración 2: `/productos/[slug]` (slugs ya preparados) y eventos custom de CTA si se necesita atribución fina.
- Iteración post-v1 (decidido 31/07): sección de testimonios / galería "obras entregadas" con material REAL del cliente (2-3 testimonios + fotos de obras terminadas). Facu se lo pide al cliente una vez terminado el proyecto; PROHIBIDO inventar testimonios o usar placeholders. No afecta nada de la v1.
