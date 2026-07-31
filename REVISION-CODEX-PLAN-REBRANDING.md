# Revisión adversarial — PLAN-REBRANDING

**Fecha:** 2026-07-31  
**Alcance:** revisión de solo lectura del plan, del sitio estático que el usuario confirmó como fuente de verdad (`corregidoMo/`) y de sus activos. No se modificó `PLAN-REBRANDING.md`, no se desplegó nada y no se generó ni alteró ninguna imagen.

## Veredicto

**REQUIERE CORRECCIONES ANTES DE EJECUTAR.**

La dirección de arte es inusualmente concreta, la migración a Astro está bien justificada y la idea de usar fotos reales como activo principal es correcta. Pero hay decisiones de infraestructura, formulario, procedencia de contenido e imágenes que están abiertas o son inviables tal como están escritas. Si Opus ejecuta la spec literalmente, puede publicar contenido incompleto, no canónico o con un hero que contradice la condición de aprobación de imágenes.

## Base comprobada

- La fuente funcional es el sitio estático `corregidoMo/index.html`; la app Next dentro de `corregidoMo/pro-landing/` es una iteración separada e incompleta. No debe ser la fuente de textos ni configuración de la migración.
- El estático sí contiene nueve productos y el endpoint Formspree real. Sus nueve CTA de producto usan un WhatsApp erróneo; el CTA general y contacto usan el correcto.
- El HTML estático carga Bootstrap, AOS y `scripts.js` duplicados; su CSS tiene 3.363 líneas y el JS 850. La reescritura, y no una limpieza incremental, es la decisión correcta.
- Las fotos candidatas de galpones reales disponibles llegan a 1600×1200. Hay una imagen IA PNG vertical de 1024×1536 y 2,86 MB que no debe ser LCP. Dos archivos de piscina son idénticos byte a byte.
- El contraste calculado a partir de los tokens declarados pasa AA para texto normal en los pares principales: texto/fondo 15,25:1, marca/fondo 4,93:1, CTA/fondo 4,95:1 y claro sobre teal oscuro 9,49:1. El valor declarado para `concrete-500` no alcanza el “≥7:1” prometido: da aproximadamente 6,59:1. Pasa AA normal, pero no el umbral escrito.

## Hallazgos prioritarios

### P1 — La fuente de migración de textos está equivocada

**Evidencia:** §5.1 ordena migrar textos desde `pro-landing/components/Products.tsx`, pero el usuario confirmó que el estático es el sitio real. Ese archivo Next es una iteración paralela; su contenido no es una autoridad de negocio y diverge del HTML estático en detalle de productos, formulario y SEO.

**Riesgo:** se pueden perder correcciones reales o volver a introducir copy, URLs y estructuras no vigentes.

**Corrección requerida:** reemplazar esa instrucción por: “La fuente de verdad de contenido es `corregidoMo/index.html`; extraer los nueve productos, mensajes de WhatsApp, datos de contacto y textos aprobados desde allí. `pro-landing/` solo sirve como referencia no normativa.” Crear una tabla de trazabilidad `producto → texto fuente → asset → CTA` y aprobarla antes de codificar.

### P1 — El canonical entre `www`, apex y `pages.dev` no puede quedar en `_redirects`

**Evidencia:** Cloudflare Pages no admite redirects por hostname en `_redirects`; ese archivo solo cubre rutas. La propia documentación recomienda reglas de redirect a nivel de zona/Bulk Redirects para dominios y para desviar `pages.dev` al dominio final.

**Riesgo:** contenido duplicado accesible en apex, `www` o `pages.dev`, o un gate de DNS “verde” que no prueba la topología real.

**Corrección requerida:** convertir la Fase 8 en una receta cerrada: agregar ambos hostnames como custom domains; crear una Redirect Rule de zona para `doblegpremoldeados.com.ar` → `www.doblegpremoldeados.com.ar` preservando path y query; decidir explícitamente si `pages.dev` redirige al canónico; y verificar HTTP/HTTPS, apex, www y `pages.dev` con `curl -I` después de propagación. `_redirects` queda solo para paths futuros, si existieran.

### P1 — El plan de hero viola la condición de aprobación de imágenes

**Evidencia:** las mejores fotos reales candidatas de galpones son 1600×1200. Astro puede derivar tamaños menores, pero no crea detalle real a 1920 px. §6 propone encargar un hero IA si no aguanta, sin un gate de consentimiento y revisión.

**Riesgo:** se publica una imagen sintética o retocada sin aprobación del cliente/usuario, o se degrada el LCP por intentar servir un tamaño que la fuente no soporta.

**Corrección requerida:** agregar una fase **3A — curaduría de imágenes**, bloqueante para el hero: presentar cada foto candidata con uso propuesto, crop mobile/desktop y tratamiento permitido. Solo tras una aprobación explícita se permite editar, mejorar o generar una variante. Mientras tanto, implementar el hero real con máximo efectivo 1600 px y `srcset` menor; no inventar una fuente 1920.

### P1 — La prueba de fallback del formulario es imposible como está redactada

**Evidencia:** “fallback WA sin red” es ambiguo: sin conectividad tampoco se puede completar una conversación de WhatsApp. Además, un `fetch` sin timeout puede quedar esperando; abrir WhatsApp automáticamente desde una promesa fallida puede ser bloqueado por el navegador.

**Riesgo:** el caso que más importa —Formspree caído o bloqueado— no se prueba de manera real y el usuario puede perder lo que escribió.

**Corrección requerida:** probar por separado: (a) POST exitoso real a Formspree; (b) request a Formspree bloqueado o respondido con error, manteniendo conectividad; (c) JS deshabilitado. Añadir `AbortController` con timeout, `aria-live` para estados, valores preservados tras error y un botón visible que el usuario toca para abrir WhatsApp. Definir el fallback sin JS: envío nativo a Formspree con página/redirect de confirmación compatible o CTA WhatsApp alternativo visible.

### P1 — La migración DNS no protege los registros ajenos al sitio

**Evidencia:** la fase de cambio de nameservers no exige inventario ni restauración de la zona DNS. El contacto usa Gmail, pero no prueba que no existan correo con dominio, verificaciones, subdominios o servicios externos.

**Riesgo:** corte de correo, SPF/DKIM/DMARC, verificaciones o servicios que no pertenecen a la landing.

**Corrección requerida:** antes de tocar NS, exportar/inventariar todos los registros del proveedor actual (A, AAAA, CNAME, MX, TXT, CAA y subdominios), cargar y comparar la zona en Cloudflare, verificar DNSSEC/DS con el registrador y recién entonces cambiar delegación. Mantener una ventana de rollback y validar resolución desde resolvers externos antes de activar reglas/HSTS.

### P1 — El repositorio raíz puede incorporar archivos de trabajo sin querer

**Evidencia:** actualmente la raíz no tiene `.git` ni `.gitignore`; contiene `.atl/`, el plan y el legado. La Fase 0 solo ignora `corregidoMo/` y artefactos de `site/`.

**Riesgo:** se versiona metadata local de agentes o, peor, se oculta un archivo que debía preservarse sin una decisión explícita.

**Corrección requerida:** antes de `git init`, listar todo lo existente y decidir qué se versiona. Añadir una regla explícita para `.atl/` si es metadata local, revisar con `git status --ignored` y usar un primer commit limitado a la lista aprobada. Confirmar además que el remote de destino está vacío o que su historia debe adoptarse; no asumirlo.

### P2 — El presupuesto de imágenes no especifica crops ni focos

**Evidencia:** hay fuentes 4:3, pero Tanques Bebederos y Piscinas son 16:9; imponer `object-fit: cover` a 4:3 puede cortar el producto. El plan no fija `object-position` ni una revisión por breakpoint.

**Corrección requerida:** para los nueve assets definir `focalPoint`, crop 4:3, versión móvil si difiere y el alt final basado en lo visible. Las fotos reales deben conservarse como originales no destructivos fuera de `src/assets`.

### P2 — La afirmación de contraste secundario es incorrecta

**Evidencia:** el plan afirma `concrete-500` “≥7:1 sobre 50”; los valores OKLCH declarados dan aproximadamente 6,59:1.

**Corrección requerida:** o bien corregir el comentario a “AA para texto normal”, o bajar la lightness de `concrete-500` hasta lograr 7:1 si ese es un requisito real. Probar los colores convertidos por el navegador en la implementación final, incluidos hover, focus, disabled, error y texto sobre foto/scrim.

### P2 — Faltan requisitos de SEO y medición que afectan ventas

**Evidencia:** la spec valida HTML y JSON-LD, pero no define Search Console, analítica, consentimiento/privacidad ni cómo medir el objetivo principal: contactos por WhatsApp y formulario. Tampoco debe depender de resultados enriquecidos de FAQ para posicionar.

**Corrección requerida:** definir si se usará analítica; si sí, acordar proveedor, consentimiento, eventos mínimos (`wa_hero`, `wa_producto`, `wa_fab`, `form_success`, `form_fallback`) y actualizar CSP. En SEO, tratar JSON-LD como semántica consistente, no como promesa de rich results; verificar indexación, canonical efectivo y sitemap en Search Console tras DNS.

### P2 — La referencia a herramientas no es ejecutable ni verificable

**Evidencia:** la Fase 0 manda ejecutar un script local de una skill que no existe en este proyecto, y la Fase 4 exige una checklist de `refactoring-ui` sin adjuntarla.

**Corrección requerida:** eliminar esas referencias o anexar una checklist autocontenida. Un gate debe poder verificarse sin depender de una instalación personal del agente.

### P3 — Se necesitan dos definiciones editoriales antes de UI

- “50% más rápido”, “40% más económico” y “100% adaptable” son claims comerciales fuertes. Conservarlos solo donde el cliente los aprobó y vincular cada uno a su alcance; evitar extenderlos a todos los productos.
- El H1 propuesto es correcto para intención local. Mantener el claim emocional como copy de apoyo, no como otro pseudo-H1. Definir antes de maquetar el nombre de empresa visible, área de cobertura verificable y dirección/ausencia de dirección.

## Cambios concretos al plan, en orden

1. Añadir al inicio una sección **Fuentes de verdad**: estático para contenido y activos; el cliente para claims y datos; Next solo referencia no normativa.
2. Insertar Fase 0A: inventario del contenido/activos del estático, `.gitignore` aprobado y remote confirmado.
3. Insertar Fase 3A bloqueante: curaduría y autorización imagen por imagen, incluido hero y crops. Ninguna generación/edición de foto antes de esa aprobación.
4. Reemplazar la decisión de redirects de host por una Redirect Rule/Bulk Redirects de Cloudflare; dejar `_redirects` para paths.
5. Reescribir Fase 6 con pruebas separadas de formulario, validación asistiva, caso sin JS y verificación de eventos/medición si se aprueba analítica.
6. Reescribir Fase 8 como migración DNS con inventario, DNSSEC, correo y rollback, no como solo cambio de nameservers.
7. Cambiar el gate de rendimiento: Lighthouse es una señal, no la única. Validar en dispositivo físico y red móvil simulada; registrar tamaño transferido del hero y LCP/INP/CLS de la build desplegada.

## Lo que conviene conservar

- Astro estático, datos centralizados y componentes sin framework cliente son una buena base para este alcance.
- El embudo catálogo → consulta por WhatsApp es coherente con el caso de uso.
- La identidad “industrial-honesta” es específica y evita los patrones genéricos del sitio actual.
- Usar una misma fuente de datos para FAQ visible y JSON-LD previene la divergencia que ya existe en el estático.
- El plan detecta correctamente deuda concreta: etiquetas duplicadas, rutas inexistentes, jerarquía de headings, número de WhatsApp inconsistente y assets sobredimensionados.

## Fuentes externas verificadas

- [Cloudflare Pages: Redirects](https://developers.cloudflare.com/pages/configuration/redirects/) — `_redirects` no admite redirects por dominio.
- [Cloudflare Pages: redirigir `pages.dev` a dominio propio](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/) — usa Bulk Redirects.
- [Cloudflare: reglas de redirect](https://developers.cloudflare.com/rules/url-forwarding/) — requieren DNS proxied por Cloudflare.
- [Cloudflare Pages: serving y caching](https://developers.cloudflare.com/pages/configuration/serving-pages/) — Pages ya aplica caching por deploy; no agregar cache custom sin necesidad.

## Próximo paso recomendado

Corregir el plan primero con los P1 anteriores. Después, iniciar la Fase 0A y la curaduría de fotos. La evaluación foto por foto debe ocurrir antes de cualquier pedido de edición o generación de imágenes.
