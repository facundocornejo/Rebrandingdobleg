# Gate 3A — Curaduría de imágenes

> Requiere aprobación **foto por foto** de Facu antes de copiar, renombrar, optimizar o
> retocar nada (spec `PLAN-REBRANDING-v2.md` §4). `corregidoMo/img/` queda INTACTO.
> Las ediciones aprobadas las ejecuta Codex según `EDICION-FOTOS-CODEX.md`.

## Inventario medido (31/07/2026, sharp)

| Archivo | Peso | Dimensiones | Ratio |
|---|---|---|---|
| `galponultima.webp` | 50 KB | 1280×720 | 16:9 |
| `galpones.webp` | 75 KB | 1040×780 | 4:3 |
| `galpon3.webp` | 153 KB | 1600×1200 | 4:3 |
| `galponultuima2.webp` | 136 KB | 1600×1200 | 4:3 |
| `galpon.webp` | 241 KB | 1280×966 | 4:3 |
| `tambos.webp` | 63 KB | 1280×960 | 4:3 |
| `tanque-autraliano.webp` | 247 KB | 1600×1200 | 4:3 |
| `tanquebebederoo.webp` | 65 KB | 1280×720 | 16:9 |
| `bebedero.webp` | 190 KB | 1600×1200 | 4:3 |
| `viviendas.webp` | 262 KB | 1600×1200 | 4:3 |
| `bateaultima.webp` | 80 KB | 1040×780 | 4:3 |
| `cerramiento.webp` | 445 KB | 1600×1207 | ~4:3 |
| `pisicinaultima.webp` | 40 KB | 1080×608 | 16:9 |
| `piscinaultima2.webp` | 55 KB | 1040×780 | 4:3 |
| `piscina.webp` ≡ `piletas.webp` | 85 KB | 1600×1200 | 4:3 |
| `tapiales.webp` | 63 KB | 1040×780 | 4:3 |
| `doble_g_logo.webp` | 583 KB | 1536×1024 | 3:2 |
| `galponIA.png` | 2794 KB | 1024×1536 | VERTICAL |
| `bateaIA.webp` | 2653 KB | 1024×1536 | VERTICAL |

---

## Tres correcciones a la spec §4

La spec eligió los assets por metadata, sin ver las fotos. Al mirarlas aparecen tres
problemas. **Ninguna de las tres es una decisión mía: las tres se aprueban abajo.**

### A. El hero y el producto 01 eran la misma foto

`galpon3.webp` y `galponultuima2.webp` son **el mismo galpón, misma sesión, casi el mismo
encuadre**. La spec proponía uno como hero y el otro como producto 01: la misma imagen dos
veces en la misma pantalla.

Propuesta: el hero pasa a `galponultima.webp` (un galpón distinto, 16:9 nativo, cielo azul
profundo, portón abierto — la mejor foto del set). El producto 01 queda en
`galponultuima2.webp` como decía la spec. `galpon3.webp` no se usa.

### B. La piscina elegida no vende

La spec eligió `pisicinaultima.webp` «porque es la que referencia producción». Es una
piscina **en obra**: sin deck, con montículos de tierra, mangueras y agua verdosa.
`piscina.webp` (la otra candidata) está peor: es el cascarón vacío sin agua.

`piscinaultima2.webp` —que la spec tenía en la lista de exclusiones— es la única
**terminada**: pintada de celeste, con deck de madera, día de sol. Se rescata.

### C. La sección «Por qué elegirnos» no tiene foto asignada

La spec §2.5 punto 5 pide una foto real en esa sección, pero la tabla de assets de §4 no
tiene ninguna entrada para ella. Propuesta: `galpones.webp` (galpón largo, pasto verde,
maquinaria agrícola adelante, cielo con nubes). Es cálida, es campo y es un tercer galpón
distinto — no repite ni el hero ni el producto 01.

---

## Fichas

Notación: el **foco** es el `object-position` del encuadre. Cuando la fuente ya es 4:3 y el
marco es 4:3 no hay recorte y el foco es irrelevante — se indica «n/a».

### HERO — `galponultima.webp` → `hero-galpon-obra.webp`

- **Uso:** hero full-bleed con scrim `--teal-800` de abajo hacia arriba (0.85 → 0).
- **Fuente:** 1280×720, 16:9, 50 KB. Galpón blanco grande, portón abierto, cielo azul
  profundo, playón de hormigón. Perspectiva fuerte en 3/4.
- **Crop mobile:** el marco del hero es más alto que 16:9; se recorta a los lados.
  Foco `center 45%` (mantiene el portón y el vértice del galpón, sacrifica playón).
- **Crop desktop:** sin recorte, 16:9 nativo. El texto va abajo-izquierda, sobre el playón
  y el pasto — zona de bajo detalle, buena para el scrim.
- **Alt:** `Galpón de hormigón premoldeado con portón abierto, construido por Dobleg en Entre Ríos`
- **Tratamiento:** ninguno. Solo conversión a avif/webp por Astro.
- **Límite conocido:** la fuente es 1280 de ancho, no 1600. El set de `widths` del hero baja
  a `[640, 960, 1280]`. En desktop grande el navegador escala 1280 → no se inventa detalle
  (la spec prohíbe upscalear). Es el precio de usar la mejor foto.

### 01 — `galponultuima2.webp` → `galpon-industrial-premoldeado.webp` · DESTACADO

- **Uso:** card destacada del catálogo. Desktop horizontal (imagen 60 / texto 40), primera
  en mobile.
- **Fuente:** 1600×1200, 4:3, 136 KB. Galpón grande en 3/4, cielo limpio, suelo de tierra.
- **Crop mobile (4:3):** sin recorte. Foco n/a.
- **Crop desktop (card horizontal, ~3:2):** se recorta arriba y abajo. Foco `center 55%`
  para conservar el portón y el faldón, y comer cielo antes que estructura.
- **Alt:** `Galpón industrial de hormigón premoldeado construido por Dobleg en Entre Ríos`
- **Tratamiento:** ninguno.

### 02 — `tambos.webp` → `tambo-lecheria-hormigon.webp`

- **Uso:** card de producto (4:3).
- **Fuente:** 1280×960, 4:3, 63 KB. Tambo de techo curvo, portones abiertos, una vaca
  asomando en el borde izquierdo.
- **Problema:** montón de arena en el borde inferior, centro-derecha. Ensucia el encuadre.
- **Crop propuesto:** recortar la franja inferior. Salida ~1040×780 (sigue 4:3). Foco n/a.
- **Alt:** `Instalación de tambo de hormigón premoldeado para lechería`
- **Tratamiento:** recorte inferior. **→ EDICIÓN 1**

### 03 — `tanque-autraliano.webp` → `tanque-australiano-hormigon.webp`

- **Uso:** card de producto (4:3).
- **Fuente:** 1600×1200, 4:3, 247 KB. Tanque australiano con **molino de viento** a la
  derecha, campo abierto. La foto más «Entre Ríos» del set.
- **Crop:** sin recorte. Foco n/a. (Hay bastante cielo, pero el molino lo justifica: si se
  recorta arriba se pierde.)
- **Alt:** `Tanque australiano de hormigón premoldeado junto a un molino de viento`
- **Tratamiento:** ninguno. Solo recomprimir (247 KB es alto para lo que muestra).

### 04 — `bebedero.webp` → `tanque-bebedero-ganado.webp` ⚠️ CAMBIO PROPUESTO

- **Uso:** card de producto (4:3).
- **Decisión pendiente, dos opciones reales:**

  | | `tanquebebederoo.webp` (la de la spec) | `bebedero.webp` (propuesta) |
  |---|---|---|
  | Dimensiones | 1280×720 (16:9) | **1600×1200 (4:3 nativo)** |
  | Calidad | baja, parece frame de video | buena |
  | Día | niebla, barro, gris | **sol, campo verde** |
  | Vende | **sí: las vacas están tomando** | no hay animales |
  | Defecto | — | bolsas de cemento en primer plano |

- **Recomendación:** `bebedero.webp` recortando las bolsas. Gana resolución, luz y color.
  **Pero se pierde el ganado usando el producto, que es el argumento de venta.** Si preferís
  el argumento por sobre la calidad, decilo y vuelvo a `tanquebebederoo.webp` con foco `center`.
- **Crop propuesto:** recortar la franja inferior con las bolsas. Salida ~1227×920 (4:3).
- **Alt:** `Tanque bebedero de hormigón lleno de agua en un campo de Entre Ríos`
- **Tratamiento:** recorte inferior. **→ EDICIÓN 2**

### 05 — `viviendas.webp` → `vivienda-premoldeada-hormigon.webp`

- **Uso:** card de producto (4:3).
- **Fuente:** 1600×1200, 4:3, 262 KB. Vivienda con galería, cielo azul con nubes, pasto
  verde en primer plano, alambrado.
- **Crop:** sin recorte. Foco n/a.
- **Alt:** `Vivienda premoldeada de hormigón con galería, terminada`
- **Tratamiento:** ninguno. Solo recomprimir.

### 06 — `bateaultima.webp` → `batea-comedero-hormigon.webp`

- **Uso:** card de producto (4:3).
- **Fuente:** 1040×780, 4:3, 80 KB. Batea en primer plano en diagonal, campo, torre de
  molino a la derecha.
- **Problema:** **la sombra del fotógrafo** está en la esquina inferior izquierda.
- **Crop propuesto:** recortar la franja inferior (se lleva la sombra) y ajustar a 4:3.
  Salida ~880×660. Foco n/a.
- **Alt:** `Batea de hormigón de 2 metros para bebedero o comedero de ganado`
- **Tratamiento:** recorte. **→ EDICIÓN 3**

### 07 — `cerramiento.webp` → `cerramiento-premoldeado.webp`

- **Uso:** card de producto (4:3).
- **Fuente:** 1600×1207, ~4:3, 445 KB. Muro de cerramiento premoldeado alto y limpio…
- **Problema:** …pegado a **una pared de ladrillo en ruinas** que ocupa media foto a la
  derecha, más escombros en primer plano. Lee «abandonado», no «producto nuevo».
- **Crop propuesto:** recortar por derecha para dejar el muro premoldeado como sujeto y
  sacar la ruina. Es el recorte más agresivo del set.
- **Alt:** `Cerramiento perimetral de hormigón premoldeado instalado en un campo`
- **Tratamiento:** recorte lateral. **→ EDICIÓN 4**

### 08 — `piscinaultima2.webp` → `piscina-hormigon-premoldeada.webp` ⚠️ CAMBIO PROPUESTO

- **Uso:** card de producto (4:3).
- **Fuente:** 1040×780, 4:3, 55 KB. Piscina **terminada**, celeste, deck de madera, sol.
- **Problema:** sombra del fotógrafo en la esquina inferior derecha.
- **Crop propuesto:** dos caminos, elegís vos:
  - **Recorte** a 800×600 sacando la esquina. Simple, pero queda justo para pantallas 2x.
  - **Retoque** de la sombra conservando el encuadre completo (1040×780). Mejor resultado,
    pero es retocar una foto — decisión tuya.
- **Alt:** `Piscina de hormigón premoldeado terminada, con deck de madera`
- **Tratamiento:** recorte o retoque. **→ EDICIÓN 5**

### 09 — `tapiales.webp` → `tapial-premoldeado-hormigon.webp`

- **Uso:** card de producto (4:3).
- **Fuente:** 1040×780, 4:3, 63 KB. Tapial blanco impecable, cielo azul, arboleda, deck y
  pileta con agua en primer plano. La foto más linda del set.
- **Crop:** sin recorte. Foco n/a.
- **Alt:** `Tapial premoldeado blanco delimitando el patio de una vivienda`
- **Tratamiento:** ninguno.
- **Nota:** es el mismo domicilio que la foto 08 (mismo deck, misma pileta). No molesta —
  son secciones distintas del catálogo— pero conviene saberlo.

### WHY-US — `galpones.webp` → `galpon-campo-entre-rios.webp` ⚠️ ASSET NUEVO

- **Uso:** foto de la sección «Por qué elegirnos» (spec §2.5 punto 5). La spec pedía la foto
  pero no la asignaba.
- **Fuente:** 1040×780, 4:3, 75 KB. Galpón largo de techo curvo, portón abierto, pasto
  verde, maquinaria agrícola en primer plano, cielo con nubes.
- **Crop:** sin recorte. Foco n/a.
- **Alt:** `Galpón de hormigón premoldeado en un campo de Entre Ríos con maquinaria agrícola`
- **Tratamiento:** ninguno.

### LOGO — `doble_g_logo.webp` → `logo-dobleg.webp` + variante clara

- **Fuente:** 1536×1024, **583 KB**. Marca «GG» en cuadrado teal + wordmark «Doble G /
  Premoldeados» en negro, sobre blanco, con muchísimo margen vacío alrededor.
- **Problemas:** 583 KB para colores planos es absurdo; el margen desperdicia píxeles; y el
  wordmark es **negro**, ilegible sobre el footer `--teal-800` que pide la spec §2.5 punto 8.
- **Tratamiento:** recortar el margen, redimensionar, y generar una **variante clara** para
  el footer. **→ EDICIÓN 6**
- **Pregunta bloqueante:** ¿existe el **original vectorial** (SVG/AI/PDF) del logo? Con eso
  el `favicon.svg` que pide la spec §5 sale perfecto y el logo pesa ~3 KB. Sin vector, el
  `favicon.svg` no se puede hacer bien desde un WebP y habría que rehacer la marca a mano.

---

## Exclusiones confirmadas

No entran al proyecto: `galponIA.png` (vertical, 2,8 MB), `bateaIA.webp` (vertical, 2,6 MB,
sin uso), `piletas.webp` y `piscina.webp` (idénticos entre sí, piscina en obra sin agua),
`pisicinaultima.webp` (reemplazada por la 08 terminada), `galpon3.webp` (duplicado visual
del producto 01), `galpon.webp` (galpón oscuro y manchado, sin uso asignado),
`logo.webp` (duplicado del logo).

## Imágenes generadas por IA — aprobadas por Facu (31/07/2026)

El bloqueo de la spec §4 se levanta **solo** para estas dos, por decisión explícita de Facu.
Se documentan acá para que quede trazable qué es foto real y qué no.

| Producto | Archivo fuente | Reemplaza a |
|---|---|---|
| 02 · tambos | `imagenes-generadas/tambo-lecheria-concepto-ia-v2-forma-real.png` | la foto real editada |
| 06 · bateas | `imagenes-generadas/batea-comedero-concepto-ia-v2-forma-real.png` | la foto real editada |

Ambas 1448×1086 (4:3 nativo), convertidas a WebP q92 y copiadas a `site/src/assets/` con
los mismos nombres SEO. Respetan la geometría real del sistema de paneles Dobleg: el tambo
conserva el techo curvo y los portones corredizos; la batea conserva la tapa del flotante,
la artesa y las patas de apoyo, y resuelve la reserva anotada más arriba (en la foto real
la batea quedaba pegada al borde inferior).

**Riesgo asentado:** son fotorrealistas y ocupan el lugar de obra entregada en el catálogo.
Un comprador las va a leer como trabajo real. **7 de las 9 fotos de producto siguen siendo
reales.** Cuando el cliente aporte material propio de tambos y bateas, se reemplazan sin
tocar nada más que el archivo.

## Bloqueado — no se toca

`imagenes-generadas/galpon-industrial-retoque-v1.png` y `galpon3-retoque-ambiental-v1.png`
(retoques por IA, 1448×1086). La spec §4 los mantiene **bloqueados** hasta aprobación
explícita. No los evalué ni los propongo.

---

## Resolución del gate (31/07/2026, verificada en disco)

Codex ejecutó el brief. **Originales intactos**: los 21 archivos de `corregidoMo/img/`
conservan peso y dimensiones idénticos al inventario previo.

| Edición | Resultado | Estado |
|---|---|---|
| 1 · tambos | `tambo-lecheria-hormigon.webp` 920×690, 4:3. Arena eliminada; el tambo ahora llena el cuadro. Mejor que el original. | ✅ aprobada |
| 2 · bebederos | Cancelada por decisión de Facu: se conserva `tanquebebederoo.webp` sin tocar (las vacas tomando pesan más que la calidad). | ✅ resuelta |
| 3 · batea | `batea-comedero-hormigon.webp` 880×660, 4:3. Sombra del fotógrafo eliminada. | ✅ aprobada, con reserva (ver abajo) |
| 4 · cerramiento | Codex no pudo. Verificado de forma independiente: la ruina de ladrillo arranca en x≈870, así que **ningún recorte 4:3 que la excluya llega a 800 px de ancho**. El recorte que sí la saca convierte la foto en una textura de hormigón sin contexto. | ⚠️ ver decisión |
| 5 · piscina | El retoque (camino B) dejaba unión visible y Codex lo descartó bien. Se ejecutó el camino A, que estaba pre-aprobado en el brief: `piscina-hormigon-premoldeada.webp` 800×600, 4:3, sombra eliminada. | ✅ aprobada |
| 6 · logo | `logo-dobleg.webp` 4 KB y `logo-dobleg-claro.webp` 13 KB, ambos 600×188 con alfa real; `marca-gg.png` 512×512 RGBA. Compuestos sobre `--teal-800` y `--concrete-50` reales: **sin halo blanco**. | ✅ aprobada |

**No existe original vectorial del logo.**

### Reserva sobre la batea (no bloquea)

El recorte cumple: sombra fuera, 4:3, 880 px. Pero la batea quedó pegada al borde inferior y
el campo vacío ocupa el 70% del cuadro — como card de producto, el producto es lo más chico
de la foto. Probé un encuadre cerrado (640×480) donde la batea SÍ es el sujeto, pero 640 px
no alcanza para el escalón de 800 del pipeline y habría que upscalear, cosa que la spec
prohíbe. **Se queda el de 880×660.** Si el cliente aporta una foto mejor de bateas, se cambia.

### Decisión abierta: cerramientos

Ninguna edición salva esta foto. Tres caminos:

1. **Usarla tal cual, con la ruina.** Es honesta: muro nuevo al lado de una construcción
   vieja. Se banca. Es la opción recomendada para no bloquear la v1.
2. **Usar el recorte cerrado** (770×577): limpio pero no comunica «cerramiento perimetral»,
   y queda bajo el escalón de 800.
3. **Pedirle al cliente una foto de cerramientos.** Es la solución real, pero bloquea.

Recomiendo la 1 y sumar «foto de cerramientos» al pedido de material que ya está previsto
para la iteración post-v1.

### Decisión abierta: `favicon.svg`

La spec §5 pide `favicon.svg`, pero sin vector no se puede generar bien desde un WebP de
colores planos. Recrear la marca a mano sería inventar tipografía. Propuesta: **bajar el
`favicon.svg`** y publicar `favicon.ico` (32px) + `apple-touch-icon.png` (180px) +
`favicon-96.png`, todos derivados de `marca-gg.png`. Es un set de favicons completo y
estándar; el SVG es un lujo, no un requisito. Si el cliente aparece con el vector, se suma
después sin tocar nada más.

---

## Derivados a generar en Fase 3B (no son copias)

- `public/favicon.svg`, `public/favicon.ico` (32px), `public/apple-touch-icon.png` (180px)
  desde la marca «GG».
- `public/og-cover.jpg` 1200×630, compuesto desde la foto hero aprobada + logo + la leyenda
  «Galpones y estructuras de hormigón · Paraná, ER». Lo armo yo con sharp en 3B usando los
  tokens de marca; también pasa por tu aprobación.
