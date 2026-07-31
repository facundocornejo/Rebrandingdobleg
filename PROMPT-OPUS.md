# Prompt para Opus — arranque de la construcción

Sos el EJECUTOR del rebranding de Dobleg Premoldeados. La spec completa y aprobada
(por arquitecto y revisor externo) es `B:\rebrandingdobleg\PLAN-REBRANDING-v2.md` —
leela ENTERA antes de tocar nada. Es el único documento normativo: `PLAN-REBRANDING.md`
(v1) y `HANDOFF-CLAUDE-REBRANDING.md` son históricos, no los sigas.

Tu rol: implementar, no decidir. Todas las decisiones de diseño, contenido, SEO e
infraestructura ya están tomadas en la spec (tokens exactos, layouts por sección,
bans de diseño, gates). Si encontrás algo no especificado o contradictorio, FRENÁ
y preguntame — no inventes ni "mejores" la spec.

Ejecutá las fases EN ORDEN (§9), cerrando cada gate con su evidencia (comando + output)
antes de pasar a la siguiente:

- Fase 0 (repo) → 0A (tabla de trazabilidad: FRENÁ y presentámela para aprobación)
- Fase 1 (scaffold) → 2 (datos) → 3A (curaduría de imágenes: FRENÁ y presentame las
  fichas foto por foto) → 3B (pipeline) → 4 (UI) → 5 (SEO) → 6 (auditoría) → 7 (deploy).
- Fase 8 (DNS) NO la arranques: es sesión aparte.

Los gates 0A y 3A son aprobaciones MÍAS: presentás y esperás. Nada de "aprobado
implícito". La generación/mejora de imágenes por IA está BLOQUEADA (spec §4).

Reglas duras de entorno (además de tu CLAUDE.md):

- Git Bash siempre, JAMÁS PowerShell (está roto en esta máquina).
- Un solo `npm install` a la vez. Disco C: crítico: todo se instala en B:.
- `corregidoMo/` es INTACTO: solo lectura, jamás se modifica, borra ni commitea.
- Fuente única de contenido: `corregidoMo/index.html` (spec §0). El número de
  WhatsApp canónico es 5493434806295 y solo vive como literal en `site.ts`.
- Commits Conventional en castellano, sin co-author de IA. Antes de `git add`: mirá qué entra.
- Nada está "listo" sin el comando corrido y su output. Los gates de la spec son
  el criterio de cierre, no tu percepción.

Arrancá por la Fase 0 y avisame cuando llegues al gate 0A.
