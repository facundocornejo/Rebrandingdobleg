# Handoff para Claude — corrección de `PLAN-REBRANDING.md`

## Encargo

Revisá y corregí el plan de rebranding de Dobleg Premoldeados. Debés preservar `PLAN-REBRANDING.md` como original y crear una propuesta nueva llamada **`PLAN-REBRANDING-v2.md`**. No implementes la landing, no despliegues, no modifiques DNS, no envíes formularios reales y no edites ni generes imágenes.

El resultado tiene que ser **decisión-completo**: una persona que lo implemente no debe tener que resolver infraestructura, fuentes de contenido, imágenes, formularios ni gates de QA por su cuenta.

## Contexto confirmado y fuentes de verdad

- El sitio que ve el cliente hoy es `corregidoMo/index.html`: HTML estático con jQuery/Bootstrap/AOS y sin las optimizaciones del plan. Es equivalente a producción más un parche de `<head>` que nunca llegó a subirse.
- `corregidoMo/index.html` es la fuente de verdad para textos, productos, contacto, mensajes de WhatsApp y assets del rebranding.
- `corregidoMo/pro-landing/` es un intento paralelo en Next.js. No es producción ni fuente normativa: no usarlo para migrar contenido o configuración. Puede consultarse solo como evidencia no vinculante.
- El proyecto nuevo seguirá siendo una reescritura estática en Astro + Cloudflare Pages. No corresponde limpiar incrementalmente el legado.

## Veredicto de la auditoría

**REQUIERE CORRECCIONES ANTES DE EJECUTAR.**

La dirección de arte, Astro estático, los datos centralizados y el embudo catálogo → WhatsApp son buenas decisiones que deben conservarse. La spec actual, sin embargo, deja errores de procedencia de contenido, redirects, imágenes, formulario, DNS y repositorio. Corregilos en la v2.

## Evidencia comprobada

| Hecho | Evidencia / impacto |
|---|---|
| Fuente real | `corregidoMo/index.html` contiene los nueve productos y el formulario activo; la app Next no es producción. |
| WhatsApp | Los nueve CTA de producto usan `543434806295`, sin el `9` argentino. Los CTA general y contacto usan `5493434806295`, que es el número canónico. |
| Deuda del legado | El HTML carga Bootstrap, AOS y `scripts.js` duplicados; tiene metadata/OG duplicada. `styles.css` tiene 3.363 líneas y `scripts.js` 850. |
| Hero actual | `galponIA.png` mide 1024×1536 y pesa 2,86 MB; debe descartarse como LCP. |
| Fotos reales | Las candidatas de galpones alcanzan como máximo 1600×1200. Una derivación Astro no puede inventar detalle real a 1920 px. |
| Assets | `piletas.webp` y `piscina.webp` son idénticos byte a byte. Tanques Bebederos y Piscinas tienen fuentes 16:9, por lo que un crop 4:3 sin foco puede cortar el producto. |
| Contraste | Con los OKLCH declarados, texto/fondo ≈15,25:1, teal/fondo ≈4,93:1, CTA/fondo ≈4,95:1 y claro/teal oscuro ≈9,49:1. `concrete-500`/fondo ≈6,59:1: pasa AA para texto normal, pero no el “≥7:1” afirmado en la spec. |

## Cambios obligatorios para `PLAN-REBRANDING-v2.md`

### 1. Origen de contenido y datos

- Añadí una sección **Fuentes de verdad** al comienzo: el HTML estático es la única fuente de contenido; el cliente aprueba claims y datos comerciales; Next es referencia no normativa.
- Reemplazá toda instrucción de migrar textos desde `pro-landing/components/Products.tsx` por extracción desde `corregidoMo/index.html`.
- Agregá una Fase 0A con una tabla de trazabilidad obligatoria: producto, copy fuente, asset original, alt final, CTA y mensaje WhatsApp. Debe cubrir los nueve productos y aprobarse antes de UI.
- Conservá el número canónico `5493434806295` como única fuente en `site.ts`; todo enlace debe derivarse de él.

### 2. Imágenes: autorización y tratamiento

- Insertá **Fase 3A — Curaduría de imágenes**, bloqueante antes de copiar, renombrar, optimizar, retocar o generar cualquier imagen.
- La fase debe presentar cada foto con: uso propuesto, crop móvil y desktop, `object-position`/foco, alt y tratamiento solicitado. Requiere aprobación explícita foto por foto del usuario antes de cualquier modificación o generación.
- El hero inicial debe usar una foto real aprobada con máximo efectivo de 1600 px y variantes menores. No debe establecerse un requisito ficticio de fuente 1920 px.
- Si se considera edición, mejora o generación de hero, dejarlo como pendiente bloqueado por aprobación, nunca como tarea automática de Codex.
- Mantener originales sin modificar fuera de los assets procesados; resolver duplicados y definir focos antes de imponer ratio 4:3.

### 3. Cloudflare, dominio y DNS

- Quitá de `_redirects` cualquier redirect entre hostnames. Cloudflare Pages usa `_redirects` para paths, no para redirects por dominio.
- Definí una receta cerrada: `www` y apex como custom domains; Redirect Rule de zona para apex → `www` con path y query preservados; decisión explícita para redirigir `pages.dev` al canónico; verificación final de HTTP/HTTPS, apex, www y `pages.dev`.
- Mantener `_redirects` solo para redirects de paths, si se necesitan.
- Antes de cambiar nameservers, agregar un gate de inventario/export de A, AAAA, CNAME, MX, TXT, CAA y subdominios; carga y comparación en Cloudflare; revisión de DNSSEC/DS; validación de correo, servicios y resolvers externos; ventana y procedimiento de rollback.
- No activar HSTS hasta que los hosts, certificados y redirects estén verificados en producción.

### 4. Formulario y accesibilidad

- Mantener Formspree y el endpoint existente.
- Especificar tres pruebas independientes: POST exitoso real; Formspree bloqueado/error con conectividad disponible; JavaScript deshabilitado. No usar “fallback WhatsApp sin red” como gate, porque sin red WhatsApp tampoco completa la conversación.
- Definir `AbortController` con timeout, prevención de doble submit, mensajes con `aria-live`, preservación de campos tras error y un botón manual de fallback a WhatsApp. No abrir WhatsApp automáticamente desde una promesa rechazada.
- Definir un fallback no-JS funcional: submit nativo compatible con Formspree y confirmación/redirección válida, o CTA WhatsApp alternativo visible.
- Comprobar validación HTML, errores con texto, foco visible y navegación por teclado.

### 5. Repositorio, SEO, medición y QA

- En la Fase 0, antes de `git init`, inventariar la raíz y decidir qué se versiona. Evaluar explícitamente `.atl/`; no asumir que su metadata debe entrar al repo. Revisar `git status --ignored` antes del primer commit y confirmar el estado del remote de destino.
- Corregir el comentario de contraste de `concrete-500` a AA normal o ajustar su lightness para lograr 7:1; verificar en navegador todos los estados, incluidas fotos con scrim.
- Tratar JSON-LD como semántica sincronizada, no como garantía de rich results. Mantener FAQ visible y usar misma fuente de datos para contenido y schema.
- Definir si habrá analítica. Si se aprueba, especificar proveedor, consentimiento y eventos mínimos para CTA de hero, CTA de producto, FAB, éxito de formulario y fallback; actualizar CSP. Si no se aprueba, documentar que no se mide atribución.
- Reemplazar gates dependientes de scripts/skills locales no presentes por checklists autocontenidas y comandos reproducibles.
- El gate de rendimiento debe medir build desplegada, dispositivo físico y red móvil simulada; Lighthouse no es la única prueba. Registrar tamaño transferido de hero, LCP, INP y CLS.

## Decisiones que deben conservarse

- Astro 5, Tailwind 4, sitio estático y JavaScript mínimo sin framework cliente.
- Catálogo de nueve productos con anclas, CTA contextual de WhatsApp y datos centralizados.
- Tema claro e identidad industrial-honesta; fotos reales como recurso principal, no decoración tapada por la UI.
- Un solo H1 local orientado a “Premoldeados de hormigón armado en Entre Ríos”; claim emocional como apoyo, no segundo H1.
- FAQ con `<details>/<summary>` y JSON-LD generado desde la misma fuente de datos.
- Reglas de accesibilidad: skip-link, focos visibles, contraste AA, textos alternativos descriptivos y objetivos táctiles adecuados.

## Fuentes externas verificadas

- [Cloudflare Pages — Redirects](https://developers.cloudflare.com/pages/configuration/redirects/): `_redirects` no admite redirects por dominio.
- [Cloudflare Pages — redirigir `pages.dev` a un dominio propio](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/): utiliza Bulk Redirects.
- [Cloudflare — URL forwarding](https://developers.cloudflare.com/rules/url-forwarding/): las reglas requieren DNS proxied por Cloudflare.
- [Cloudflare Pages — serving y caching](https://developers.cloudflare.com/pages/configuration/serving-pages/): Pages ya entrega caché por deploy; no sumar cache custom sin una necesidad comprobada.

## Entregable esperado de Claude

Crear `PLAN-REBRANDING-v2.md`, preservando el original y sin implementar. La v2 debe incorporar todos los cambios obligatorios, conservar las decisiones válidas y cerrar estos puntos sin preguntas abiertas para el implementador:

1. fuente única de contenido;
2. aprobación de imágenes;
3. redirects de dominios y DNS seguro;
4. comportamiento y pruebas del formulario;
5. contenido/versionado; y
6. gates de SEO, accesibilidad, rendimiento y despliegue.
