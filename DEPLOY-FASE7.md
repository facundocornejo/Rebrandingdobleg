# Fase 7 — Deploy a Cloudflare Pages

Estado: **código pusheado, falta la parte del dashboard.**
Commit en `origin/main`: `edb4513`.

Los pasos del dashboard los hace Facu: requieren login y eso no lo ejecuta el agente.

---

## 1. Crear el proyecto en Pages

Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** →
repositorio `facundocornejo/Rebrandingdobleg`, rama `main`.

Configuración de build — estos cuatro valores son los que importan:

| Campo | Valor |
|---|---|
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| **Root directory** | **`site`** |

**El Root directory es el que más se olvida.** El proyecto Astro no está en la raíz del
repo, está en `site/`. Sin eso el build no encuentra el `package.json`.

## 2. Variable de entorno del build

| Variable | Valor |
|---|---|
| `NODE_VERSION` | `22` |

`package.json` declara `engines.node >= 22.12.0`. Si Cloudflare usa una versión anterior el
build falla, y el mensaje no siempre lo dice claro.

**Verificado antes de pushear:** el lockfile incluye los binarios Linux de `sharp`
(16 entradas `@img/*-linux*`) y de `lightningcss`, así que el build en Linux no va a fallar
por dependencias nativas aunque el lockfile se haya generado en Windows.

**Opcional:** las devDependencies incluyen `lighthouse` y `puppeteer-core`, que solo sirven
para los gates locales y engordan el build. Se pueden saltear con `NPM_FLAGS=--omit=dev`,
pero **no lo probé**: si lo activás y el build falla, sacalo.

## 3. Analytics

Cloudflare → **Web Analytics** → **Add a site** → hostname del proyecto.

Copiar el **token** del snippet que entrega el dashboard y cargarlo como variable de
entorno del proyecto de Pages:

| Variable | Valor |
|---|---|
| `PUBLIC_CF_BEACON_TOKEN` | el token del dashboard |

Después **volver a deployar** (las variables no se aplican a builds ya hechos).

Sin token el beacon simplemente no se renderiza, así que el sitio funciona igual desde el
primer deploy. Sin cookies → sin banner de consentimiento.

> **Chequeo:** la spec §5 pide usar el snippet **exacto** del dashboard. El código arma la
> forma canónica:
> `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "…"}'></script>`
> Si el dashboard entrega algo distinto, avisame y lo ajusto (y reviso la CSP).

## 4. Verificación post-deploy

- [ ] La `*.pages.dev` carga en un **celular físico**.
- [ ] Las 13 imágenes se ven.
- [ ] Los links de WhatsApp abren el chat con el mensaje prellenado.
- [ ] La CSP no rompe nada: consola del navegador **sin errores** ni recursos bloqueados
      (es el gate que la spec §5 dejó explícito al aceptar `'unsafe-inline'`).
- [ ] Analytics registrando visitas en el panel.
- [ ] `validator.schema.org` contra la URL de `pages.dev` → JSON-LD sin errores
      (esto quedó pendiente de la Fase 5 a propósito, para correrlo contra una URL viva).

### Sobre el preview de WhatsApp — leer antes de probar

El gate de la spec pide compartir la `pages.dev` por WhatsApp y ver el preview de OG.
**La imagen no va a cargar todavía, y es correcto que no cargue.**

`og:image` y `canonical` apuntan al dominio final `www.doblegpremoldeados.com.ar`, que
todavía no resuelve. Eso es lo que corresponde para SEO: si apuntaran a `pages.dev`,
Google indexaría el dominio equivocado.

Lo que **sí** se puede verificar ahora: que `https://<proyecto>.pages.dev/og-cover.jpg`
devuelva la imagen. El preview completo en WhatsApp se valida recién en la Fase 8, con el
dominio andando.

## 5. Pruebas del formulario contra `pages.dev`

Decidido con Facu: se corren contra `pages.dev`, y **el mail no se envía**.

- **Prueba 2** (Formspree falla con conectividad): `npm run check:form -- https://<proyecto>.pages.dev/`
  El script intercepta la request y responde 500 localmente, así que no sale nada.
- **Prueba 3** (sin JS): `npm run check:nojs` apuntado a la URL de producción.
- **Prueba 1** (POST real → mail recibido): **no se ejecuta.**

### Riesgo asentado

Sin la prueba 1, el endpoint de Formspree nunca se verifica de punta a punta. Si estuviera
caído, mal configurado o filtrando como spam, **los leads se pierden en silencio**: el
visitante ve "recibimos tu consulta" y el mail no llega nunca.

Alternativa que no toca la casilla del cliente: crear un form gratuito de Formspree propio,
correr una prueba real contra ese endpoint, confirmar que el camino completo funciona, y
después devolver el endpoint al del cliente en `site.ts`.

## 6. Lo que NO se hace en esta fase

Nada de DNS. No se tocan nameservers, no se agrega la zona, no se configuran dominios
custom. Todo eso es la Fase 8, que tiene su propio gate de inventario DNS y ventana de
rollback.
