# Estado del proyecto

> Última actualización: 05/08/2026. **Leer esto primero al retomar.**

## Dónde está todo

**El sitio está EN LÍNEA:** https://rebrandingdobleg.pages.dev/
**El dominio real todavía NO apunta acá.** `doblegpremoldeados.com.ar` sigue en DonWeb
mostrando el sitio viejo.

- Repo: `https://github.com/facundocornejo/Rebrandingdobleg` · rama `main` · 19 commits.
- Deploy: Cloudflare Pages, build automático desde `main`.
- Spec normativa: `PLAN-REBRANDING-v2.md`. Es el único documento vigente.

## Fases 0 a 7: COMPLETADAS

| Fase | Estado |
|---|---|
| 0 · Repo | ✅ |
| 0A · Trazabilidad de contenido | ✅ aprobada (`TRAZABILIDAD-CONTENIDO.md`) |
| 1 · Scaffold + tokens | ✅ Astro 7 (no 5, ver §1 de la spec) |
| 2 · Datos | ✅ |
| 3A · Curaduría de imágenes | ✅ aprobada (`CURADURIA-IMAGENES.md`) |
| 3B · Pipeline de imágenes | ✅ |
| 4 · UI | ✅ con deuda (ver abajo) |
| 5 · SEO y datos estructurados | ✅ |
| 6 · Auditoría | ✅ con pendientes (`AUDITORIA-FASE6.md`) |
| 7 · Deploy | ✅ verificado en producción |

### Verificado en producción el 01/08/2026

```
página              200 · 61 KB · 0,24 s
cabeceras           CSP, X-Frame-Options, X-Content-Type-Options,
                    Referrer-Policy y Permissions-Policy aplicadas
og-cover.jpg        200      favicon.ico         200
robots.txt          200      sitemap-index.xml   200
hero (avif 640w)    200 · 14,8 KB
prueba 2 del form   15/15 OK contra pages.dev
```

Lighthouse mobile (contra `astro preview`): **99 / 100 / 100 / 100**.
LCP 2,2 s · CLS 0,011 · TBT 0 ms · 344 KB en 9 requests · cero terceros.

## Fase 8 — DNS: EN CURSO (pasos 1-3 hechos el 05/08/2026)

Todo el detalle en `INVENTARIO-DNS.md`. Estado al cerrar la sesión:

- **Paso 1 (inventario): CERRADO.** 19 registros relevados desde afuera (DoH doble
  fuente) y cruzados 1:1 contra el panel de DonWeb. Sin DNSSEC. DKIM verificado por
  script. Rollback: `ns1/ns2.donweb.com` (= `ns3/ns4.hostmar.com`, mismas IPs).
- **Paso 2 (zona en Cloudflare): CERRADO.** Zona Free creada, 16 registros verificados
  por diff contra el export BIND (`zona-cloudflare.txt`). TODO en DNS-only (nube gris):
  el mail sigue en DonWeb y el switch de NS es neutro. Desvíos intencionales:
  `autodiscover`/`autoconfig` → `mail` (no al apex). NS asignados:
  `arushi.ns.cloudflare.com` y `odin.ns.cloudflare.com`.
- **Paso 3 (cambio de NS en DonWeb): EJECUTADO, esperando propagación.** Facu cargó los
  NS de Cloudflare el 05/08 ~19:30. Cloudflare quedó en "Waiting for your registrar";
  avisa por mail al pasar a "Active" (1-2 h típico, tope 24 h).

**Primer paso de la próxima sesión:** verificar desde afuera que la delegación ya
apunte a `arushi`/`odin` y que la zona esté "Active". Recién entonces **paso 4**:
Pages → Custom domains → agregar `www.doblegpremoldeados.com.ar` y el apex. Después
pasos 5-8 de la spec §8 (redirects, HTTPS, gate de verificación de 6 variantes con
MX/TXT intactos, Search Console).

**OJO:** NO activar "Only allow Cloudflare IPs at origin" ni HSTS todavía; el mail y
el FTP están DNS-only contra DonWeb.

## Pendientes que no bloquean

1. **Prueba 1 del formulario** (POST real → mail recibido): decidida como **no se hace**.
   Riesgo asentado: el endpoint de Formspree nunca se verificó de punta a punta. Si está
   caído o filtrando, los leads se pierden en silencio. Alternativa sin tocar la casilla
   del cliente: crear un form propio de Formspree, probar contra ese, y devolver el
   endpoint al del cliente en `site.ts`.
2. **Prueba 3 completa** (submit nativo con JS apagado): mismo motivo. La base sin JS sí
   está verificada, lo único que falta es el envío real.
3. **Revisión responsive a 375 y 768 px.** Nunca se verificó: la herramienta de navegador
   falló. 1440 sí está revisado a fondo.
4. **Celular físico con throttling Slow 4G.** Lighthouse emula un Moto G Power.
5. **`validator.schema.org`** contra la URL de producción.
6. **Token de Cloudflare Web Analytics:** si todavía no se cargó `PUBLIC_CF_BEACON_TOKEN`
   como variable de entorno en Pages, el beacon no se renderiza y no se mide nada.
   Requiere redeploy después de cargarlo.

## Iteración post-v1 (ya decidida, no empezada)

- Testimonios y galería de obras entregadas, con material REAL del cliente. Prohibido
  inventar testimonios o usar placeholders.
- Pedirle al cliente: **foto de cerramientos** (la actual tiene una pared en ruinas que
  ningún recorte salva) y fotos propias de **tambos y bateas**, para reemplazar las dos
  imágenes generadas por IA.
- El **logo en vectorial**, si aparece: hoy no existe y por eso se bajó el `favicon.svg`
  de la spec §5.
- `/productos/[slug]` (los slugs ya están preparados) y eventos custom de CTA.

## Gates re-corribles

Desde `site/`:

```bash
npm run check:contrast   # 21 pares texto/fondo contra AA
npm run check:seo        # JSON-LD + anclas reales + FAQ visible (necesita build previo)
npm run check:form       # prueba 2 del formulario; acepta una URL como argumento
npm run check:nojs       # base sin JS + que el reveal funcione con JS
```

**Correr `check:contrast` cada vez que se toque un token de color.** Ya atajó dos fallos
reales.

## Lecciones de esta sesión

- **No curar imágenes sin abrirlas.** La spec eligió los assets por metadata y tenía tres
  errores: hero y producto 01 eran la misma foto, la piscina elegida estaba en obra, y la
  sección why-us no tenía foto asignada.
- **Un dev server de horas puede podrirse.** Devolvía `MissingSharp` mientras sharp
  funcionaba perfecto en proceso nuevo y en el build. Reiniciarlo lo resolvió — pero
  primero se verificó con evidencia que no faltara la dependencia.
- **Verificar el verificador.** El validador de SEO marcó las 6 preguntas como invisibles;
  el bug era del validador (buscaba `question`, la propiedad es `name`).
- **Ningún build detecta lo que se rompe sin JavaScript.** 18 bloques quedaban en
  `opacity: 0`; apareció solo al probar con JS apagado.
- **`padding` en un botón lo agranda y descentra su etiqueta.** Para separarlo de lo de
  arriba va margen en el elemento anterior.
- **Para que algo destaque, apagá lo que lo rodea.** Es como se resolvió el crédito del
  footer sin romper la regla de color de la spec.
