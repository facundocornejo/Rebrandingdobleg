# Dobleg Premoldeados — sitio

Rebranding del sitio de Dobleg Premoldeados (Paraná, Entre Ríos): reescritura
estática en Astro, desplegada en Cloudflare Pages.

- **Dominio canónico:** https://www.doblegpremoldeados.com.ar/
- **Stack:** Astro 5 + Tailwind CSS 4 + `@astrojs/sitemap`. Sin framework cliente.
- **Spec normativa:** [`PLAN-REBRANDING-v2.md`](PLAN-REBRANDING-v2.md). Es el único
  documento vigente; `PLAN-REBRANDING.md` (v1) y `HANDOFF-CLAUDE-REBRANDING.md`
  (auditoría) se conservan como histórico.

## Estructura

```
site/          # proyecto Astro (Root directory en Cloudflare Pages)
corregidoMo/   # sitio legacy — solo lectura, no versionado
```

## Desarrollo

```bash
cd site
npm install
npm run dev      # servidor local
npm run build    # build de producción a site/dist
npm run preview  # servir el build
```

## Deploy

Cloudflare Pages conectado a este repositorio:

| Setting | Valor |
|---|---|
| Root directory | `site` |
| Build command | `npm run build` |
| Output directory | `dist` |
