# Fase 6 — Auditoría

Corrida el 01/08/2026 contra `astro preview` (build de producción), no contra `dev`.
Reproducible con los scripts del proyecto: `npm run check:contrast`, `check:seo`,
`check:form`, `check:nojs`.

## Lighthouse mobile

Lighthouse 13.4.1, preset mobile por defecto (Moto G Power emulado, throttling
simulado Slow 4G).

| Categoría | Puntaje | Gate |
|---|---|---|
| Performance | **99** | ≥95 ✅ |
| Accessibility | **100** | ≥95 ✅ |
| Best Practices | **100** | ≥95 ✅ |
| SEO | **100** | ≥95 ✅ |

## Core Web Vitals (laboratorio)

| Métrica | Medido | Objetivo |
|---|---|---|
| Largest Contentful Paint | **2,2 s** | < 2,5 s ✅ |
| Cumulative Layout Shift | **0,011** | < 0,1 ✅ |
| Total Blocking Time | **0 ms** | proxy de INP ✅ |
| First Contentful Paint | 0,8 s | — |

INP no se puede medir en laboratorio: necesita interacción real. Se verifica en campo,
en el panel de Cloudflare Web Analytics, tras la primera semana de tráfico.

## Peso transferido

**344,2 KB en 9 requests.** Sin terceros.

| Tipo | Requests | Peso |
|---|---|---|
| Imágenes | 6 | 238,5 KB |
| Fuente | 1 | 88,3 KB |
| Documento | 1 | 10,7 KB |
| CSS | 1 | 6,7 KB |
| JavaScript | 0 | 0 KB (inline en el documento, 2.074 bytes) |
| Terceros | 0 | 0 KB |

**Hero, bytes reales descargados en mobile: 24,5 KB** (`hero-galpon-obra…avif`, variante
640w). Presupuesto de la spec: < 100 KB. ✅

**Nota de peso:** la fuente son 88,3 KB porque `@fontsource-variable/archivo` distribuye el
eje de ancho en un archivo aparte (90 KB) del de solo peso (35 KB), y la dirección de arte
depende de ese eje. Es el segundo activo más pesado del sitio. Si alguna vez hay que
recortar, ese es el lugar — pero cuesta la jerarquía tipográfica de §2.2.

## Formulario (spec §6)

### Prueba 2 — Formspree falla CON conectividad ✅

`npm run check:form`. La request a Formspree se intercepta en el navegador y se responde
500 localmente: **no sale nada hacia afuera**.

```
OK   el POST salio hacia Formspree -> 1 intento(s)
OK   se muestra un mensaje de error
OK   el mensaje es accionable (menciona WhatsApp)
OK   el estado es aria-live="polite"
OK   el formulario sigue en pantalla
OK   el boton vuelve a habilitarse
OK   conserva el nombre / telefono / mensaje / producto elegido
OK   aparece el boton MANUAL de WhatsApp
OK   el link usa el numero canonico
OK   el link NO usa el numero erroneo del legado
OK   el texto prellenado lleva los datos cargados
OK   NO se abrio WhatsApp solo
```

El último es el que la spec marca como prohibido: abrir WhatsApp automáticamente desde una
promesa rechazada. No ocurre.

### Prueba 3 — JavaScript deshabilitado ⚠️ PARCIAL

`npm run check:nojs`. Verifica la base sin JS **sin enviar el formulario**:

```
OK   el form postea nativo a Formspree -> https://formspree.io/f/xldlnvwa
OK   method POST
OK   campos obligatorios presentes -> nombre, telefono, mensaje
OK   honeypot presente
OK   select con los 9 productos + Otro -> 10
OK   las 9 cards se renderizan sin JS -> 9
OK   la FAQ funciona sin JS (details nativos) -> 6
OK   un solo H1
OK   links de WhatsApp presentes -> 15
```

**Falta**: el submit real con JS apagado, que envía un mail de verdad. Bloqueado por
decisión de Facu.

### Prueba 1 — POST real exitoso ⛔ NO EJECUTADA

Bloqueada por decisión de Facu: manda un mail real a la casilla del cliente. Es el único
gate de la Fase 6 que queda abierto.

## Bug encontrado y corregido en esta auditoría

**Con JavaScript deshabilitado, 18 bloques quedaban en `opacity: 0`.** El reveal on scroll
arrancaba oculto y solo el IntersectionObserver lo mostraba: sin JS, media página era
invisible. No lo detectaba ningún build ni ningún typecheck — apareció al probar el sitio
con JS apagado.

Corregido envolviendo el estado oculto en `@media (scripting: enabled)`. Un navegador que
no conozca esa media feature simplemente no anima y muestra el contenido, que es el modo de
fallo correcto. No agrega un segundo `<script>`, así que se respeta el presupuesto de §2.6.

Verificado en las dos direcciones:

```
sin JS:  nada queda invisible
con JS:  18/18 bloques revelados, 0 invisibles tras scrollear
```

## Contraste

`npm run check:contrast`: los 17 pares texto/fondo del sitio cumplen AA. Detalle y el fallo
corregido (hover del botón fantasma, 4,35:1 → 4,62:1) en el commit de la Fase 4.

## Pendiente de esta fase

1. **Prueba 1 del formulario** (POST real → mail recibido). Requiere OK de Facu.
2. **Prueba 3 completa** (submit nativo con JS apagado). Mismo motivo.
3. **Celular físico con throttling Slow 4G.** Lighthouse emula un Moto G Power; la spec pide
   además un dispositivo real. El dev server queda expuesto en la LAN para eso.
4. **Revisión responsive a 375 y 768 px**, deuda heredada de la Fase 4.
