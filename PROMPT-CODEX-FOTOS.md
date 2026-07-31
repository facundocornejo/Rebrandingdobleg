# Prompt para Codex — edición de fotos del rebranding

> Antes de pegarlo: completá el bloque DECISIONES. Sin eso, Codex tiene que frenar.

---

Sos el editor de imágenes del rebranding de Dobleg Premoldeados. Tu trabajo es ejecutar
un brief ya escrito y aprobado, no rediseñar nada ni decidir por tu cuenta.

**Leé entero `B:\rebrandingdobleg\EDICION-FOTOS-CODEX.md` antes de tocar un solo archivo.**
Ese documento es normativo: tiene las 6 ediciones con origen, destino, recorte sugerido y
relación de aspecto obligatoria. El porqué de cada una está en
`B:\rebrandingdobleg\CURADURIA-IMAGENES.md` (leelo si necesitás contexto, no es ejecutable).

## Reglas duras — si rompés una de estas, el trabajo no sirve

1. **`B:\rebrandingdobleg\corregidoMo\` es SOLO LECTURA.** No modifiques, borres ni
   sobrescribas nada ahí adentro. Son los originales del cliente y son irrecuperables.
2. **Todas las salidas van a `B:\rebrandingdobleg\fotos-editadas\`**, con el nombre exacto
   que indica el brief. Ni una salida fuera de esa carpeta.
3. **WebP sin pérdida** (`lossless`), salvo `marca-gg.png` que es PNG con transparencia.
   Las fuentes ya son WebP con pérdida: una segunda pasada lossy las degrada visiblemente.
   La compresión final la hace Astro, no vos.
4. **Nada generativo.** Solo recortar, redimensionar, ajustar color y clonar/parchear donde
   el brief lo pide. Prohibido expandir el encuadre, inventar fondo, upscalear o "mejorar
   con IA". Si una foto no da, no la inventes.
5. **Los recortes del brief son un punto de partida.** Salieron de mirar las fotos a escala
   reducida. Ajustalos a ojo hasta cumplir la intención descrita, pero **la relación de
   aspecto final es obligatoria** y no se negocia.
6. **Verificá lo que entregás.** Al terminar, listá cada archivo de salida con sus
   dimensiones reales, su peso y su relación de aspecto. Si algo no cumple, decilo.
7. **Ante la duda, frená y preguntá.** No improvises un camino alternativo en silencio.

## DECISIONES (Facu completa antes de mandar esto)

- **Edición 2 — bebederos:** ¿se usa `bebedero.webp` (recortando las bolsas) o se cancela y
  queda `tanquebebederoo.webp` sin tocar?
  → RESPUESTA: `_______________`

- **Edición 5 — piscina:** ¿camino **A** (recorte a 800×600) o camino **B** (retocar la
  sombra clonando las tablas del deck, conservando 1040×780)?
  → RESPUESTA: `_______________`

- **Edición 6 — logo:** ¿existe el original vectorial (`.svg`, `.ai`, `.eps`, `.pdf`)?
  → RESPUESTA: `_______________`
  → Si existe: **exportá desde el vector**, ignorá el recorte del WebP, y generá además
    `fotos-editadas\logo-dobleg.svg` y `fotos-editadas\marca-gg.svg`.
  → Si no existe: seguí el brief tal cual y avisá que el `favicon.svg` va a tener que
    resolverse de otra forma.

Si alguna respuesta quedó vacía, **frená antes de esa edición y preguntá**. Las demás
ediciones se pueden ejecutar igual.

## Entregable

Los archivos en `fotos-editadas\` más un resumen de una línea por edición: qué hiciste, qué
recorte final aplicaste y si hubo que apartarse del brief. Si alguna edición no se pudo
hacer sin arruinar la foto —el caso más probable es la 4, el cerramiento con la pared en
ruinas— no la fuerces: reportalo y seguimos con otra foto.
