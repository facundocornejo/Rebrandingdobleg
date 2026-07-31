# Brief de edición de fotos — para Codex

Ejecutor: Codex, con Facu aprobando. Contexto: rebranding de Dobleg Premoldeados.
La justificación de cada edición está en `CURADURIA-IMAGENES.md` (gate 3A).

## Reglas duras

1. **`B:\rebrandingdobleg\corregidoMo\` es de SOLO LECTURA.** Nunca se modifica, se borra
   ni se sobrescribe nada ahí adentro. Los originales quedan como están.
2. **Todas las salidas van a `B:\rebrandingdobleg\fotos-editadas\`** (crear la carpeta si no
   existe). Está en el `.gitignore`, así que no ensucia el repo.
3. **Formato de salida: WebP sin pérdida** (`lossless`, sin recompresión con pérdida). Las
   fuentes ya son WebP con pérdida; una segunda pasada lossy degrada visiblemente. La
   compresión final la hace Astro con sharp, no esta etapa.
4. **Nombre de salida: exactamente el indicado.** Fase 3B los busca por ese nombre.
5. **Ninguna edición generativa.** Solo recortar, redimensionar, ajustar color y —donde se
   pide explícitamente— clonar/parchear. Nada de expandir el encuadre, inventar fondo,
   upscalear ni «mejorar con IA».
6. **Los recortes son un punto de partida, no un dogma.** Las coordenadas salieron de mirar
   las fotos a escala reducida. Ajustalas a ojo hasta cumplir la *intención* descrita, pero
   **respetá la relación de aspecto final indicada**, que es lo que no puede fallar.
7. Si algo no se puede cumplir (el recorte rompe la foto, la relación no cierra), **frená y
   avisá**, no improvises otra cosa.

---

## EDICIÓN 1 — Tambos: sacar el montón de arena

- **Origen:** `corregidoMo\img\tambos.webp` (1280×960)
- **Salida:** `fotos-editadas\tambo-lecheria-hormigon.webp`
- **Intención:** eliminar el montón de arena del borde inferior (centro-derecha) sin perder
  el techo curvo ni los portones. La vaca del borde izquierdo, si entra, se queda.
- **Recorte sugerido:** `left 120 · top 0 · width 1040 · height 780`
- **Relación final obligatoria:** 4:3
- **Mínimo aceptable:** 800 px de ancho

## EDICIÓN 2 — Bebedero: sacar las bolsas de cemento

- **Origen:** `corregidoMo\img\bebedero.webp` (1600×1200)
- **Salida:** `fotos-editadas\tanque-bebedero-ganado.webp`
- **Intención:** eliminar las bolsas de cemento del primer plano inferior derecho. El tanque
  lleno de agua y el campo verde detrás son el sujeto y no se tocan.
- **Recorte sugerido:** `left 180 · top 0 · width 1227 · height 920`
- **Relación final obligatoria:** 4:3
- **Mínimo aceptable:** 800 px de ancho
- **OJO:** esta edición depende de una decisión de Facu que todavía está abierta (ver
  `CURADURIA-IMAGENES.md`, ficha 04). Si Facu elige quedarse con la foto de las vacas
  tomando, **esta edición se cancela** y no hay nada que hacer.

## EDICIÓN 3 — Batea: sacar la sombra del fotógrafo

- **Origen:** `corregidoMo\img\bateaultima.webp` (1040×780)
- **Salida:** `fotos-editadas\batea-comedero-hormigon.webp`
- **Intención:** eliminar la sombra del fotógrafo de la esquina inferior izquierda,
  conservando la batea completa en diagonal y la torre del molino de la derecha.
- **Recorte sugerido:** `left 60 · top 0 · width 880 · height 660`
- **Relación final obligatoria:** 4:3
- **Mínimo aceptable:** 800 px de ancho
- **Alternativa si el recorte come demasiada batea:** clonar/parchear la sombra sobre el
  suelo conservando el encuadre 1040×780 completo. Es la opción preferida si sale prolija.

## EDICIÓN 4 — Cerramiento: sacar la pared de ladrillo en ruinas

- **Origen:** `corregidoMo\img\cerramiento.webp` (1600×1207)
- **Salida:** `fotos-editadas\cerramiento-premoldeado.webp`
- **Intención:** el sujeto es el **muro de cerramiento premoldeado** (el gris claro, alto y
  limpio, a la izquierda). Hay que sacar de cuadro —o reducir al mínimo— la pared de
  ladrillo derruida de la derecha y los escombros del primer plano. El muro tiene que
  entrar entero: no cortarle ni el remate superior ni la base.
- **Recorte sugerido:** `left 60 · top 130 · width 1040 · height 780`
- **Relación final obligatoria:** 4:3
- **Mínimo aceptable:** 800 px de ancho
- **Es el recorte más difícil del set.** Si no se puede sacar la ruina sin destrozar el
  encuadre, frená y avisá: preferimos cambiar de foto antes que publicar un cerramiento que
  parece abandonado.

## EDICIÓN 5 — Piscina: sacar la sombra del fotógrafo

- **Origen:** `corregidoMo\img\piscinaultima2.webp` (1040×780)
- **Salida:** `fotos-editadas\piscina-hormigon-premoldeada.webp`
- **Intención:** eliminar la sombra del fotógrafo de la esquina inferior derecha. La pileta
  celeste terminada y el deck de madera son el sujeto.
- **Dos caminos, Facu elige:**
  - **A (recorte):** `left 0 · top 0 · width 800 · height 600`. Simple y seguro, pero queda
    justo para pantallas de alta densidad.
  - **B (retoque, preferido si sale prolijo):** clonar/parchear la sombra sobre las tablas
    del deck conservando el encuadre completo 1040×780. Las tablas son un patrón regular,
    debería salir limpio.
- **Relación final obligatoria:** 4:3

## EDICIÓN 6 — Logo: recortar, aligerar y hacer la variante clara

- **Origen:** `corregidoMo\img\doble_g_logo.webp` (1536×1024, 583 KB)
- **Salidas (tres archivos):**

  1. `fotos-editadas\logo-dobleg.webp` — versión oscura (la actual, wordmark negro).
     Recortar todo el margen blanco sobrante dejando un respiro parejo alrededor de la marca.
     Ancho ~600 px. **Tiene que pesar menos de 30 KB** (son colores planos, entra de sobra).
     Fondo **transparente**, no blanco: va sobre `--color-bg`, que no es blanco puro.

  2. `fotos-editadas\logo-dobleg-claro.webp` — la misma marca pero legible sobre fondo
     oscuro. El wordmark «Doble G / Premoldeados» pasa de negro a **`#eef6f7`**. El cuadrado
     teal con las «GG» se mantiene igual. Mismo tamaño y mismo recorte que la anterior, para
     que sean intercambiables. Va en el footer, que es teal oscuro.

  3. `fotos-editadas\marca-gg.png` — **solo el cuadrado teal con las «GG»**, recortado a
     cuadrado exacto, 512×512, PNG con fondo transparente. Es la base de los favicons.

- **PREGUNTA BLOQUEANTE antes de arrancar esta edición:** ¿existe el **original vectorial**
  del logo (`.svg`, `.ai`, `.eps`, `.pdf`)? Si existe, esta edición cambia por completo:
  se exporta desde el vector y el logo pesa ~3 KB con nitidez perfecta en cualquier tamaño,
  y además se puede generar el `favicon.svg` que pide la spec. Buscarlo antes de ponerse a
  recortar el WebP.

---

## Resumen para Facu

| # | Foto | Qué se hace | Estado |
|---|---|---|---|
| 1 | tambos | recorte inferior (montón de arena) | listo para ejecutar |
| 2 | bebedero | recorte inferior (bolsas de cemento) | **espera tu decisión** (ficha 04) |
| 3 | batea | recorte o retoque (sombra del fotógrafo) | listo para ejecutar |
| 4 | cerramiento | recorte lateral (pared en ruinas) | listo, pero puede fallar |
| 5 | piscina | recorte o retoque (sombra del fotógrafo) | **elegí camino A o B** |
| 6 | logo | recorte + variante clara + marca para favicon | **¿hay vector?** |

Sin edición (se copian tal cual en Fase 3B): `galponultima.webp` (hero),
`galponultuima2.webp` (01), `tanque-autraliano.webp` (03), `viviendas.webp` (05),
`tapiales.webp` (09), `galpones.webp` (why-us).
