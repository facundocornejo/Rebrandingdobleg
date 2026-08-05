# Inventario DNS — doblegpremoldeados.com.ar

> Gate 1 de la Fase 8 (spec §8). Relevado el **05/08/2026** desde afuera, con doble
> fuente: DoH de Google (`dns.google`) y DoH de Cloudflare (`cloudflare-dns.com`).
> Ambos resolvedores devolvieron exactamente lo mismo en todos los registros clave.
> (`dig` no está instalado en esta máquina; DoH externo cumple el mismo propósito.)

## Nameservers actuales (ROLLBACK — anotar antes de tocar nada)

```
ns3.hostmar.com.
ns4.hostmar.com.
```

Si algo sale mal tras migrar a Cloudflare, el rollback es volver a estos dos NS en DonWeb.

## DNSSEC: NO ACTIVO ✅

La consulta de registro **DS devuelve vacío** (Status 0, sin Answer). No hay DNSSEC que
desactivar antes de migrar los NS. El riesgo que la spec marca en el paso 1 no aplica.

## Registros del apex

| Tipo | TTL | Valor |
|---|---|---|
| A | 14400 | `200.58.111.123` |
| AAAA | 14400 | `2800:6c0:2::c:287` |
| MX | 14400 | `0 mail.doblegpremoldeados.com.ar.` |
| MX | 14400 | `20 mx1.doblegpremoldeados.com.ar.` |
| TXT (SPF) | 14400 | `v=spf1 include:comp.hostmar.com -all` |
| TXT | 3600 | `google-site-verification=BGYggtXYv67J_eE6e1jCTKeGbFke5osbkBsXRT7SP14` |
| SOA | 14400 | `ns3.hostmar.com. root.hostmar.com. 2026072800 28800 7200 2000000 86400` |
| CAA | — | no existe (respuesta vacía) |

## Subdominios

| Nombre | Tipo | TTL | Valor |
|---|---|---|---|
| `www` | CNAME | 14400 | `doblegpremoldeados.com.ar.` |
| `mail` | A | 14400 | `200.58.111.123` |
| `mail` | AAAA | 14400 | `2800:6c0:2::c:287` |
| `mx1` | A | 14400 | `200.58.122.206` |
| `ftp` | A | 14400 | `200.58.111.123` |
| `ftp` | AAAA | 14400 | `2800:6c0:2::c:287` |
| `autodiscover` | CNAME | 14400 | `doblegpremoldeados.com.ar.` |
| `autoconfig` | CNAME | 14400 | `doblegpremoldeados.com.ar.` |
| `_dmarc` | TXT | — | `v=DMARC1; p=none` |
| `mail._domainkey` | TXT (DKIM) | — | ver bloque completo abajo |

Consultados y **NO existen**: `webmail`, `smtp`, `pop`, `pop3`, `imap`, `cpanel`,
`localhost`, `default._domainkey`, `donweb._domainkey`.

### DKIM completo (`mail._domainkey`, selector `mail`)

```
v=DKIM1; g=*; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnGJf4oXUa4jxkE46prRe5WkicfJnbBfGl9/Rm95GWshiU8ANeKzHAevMLm1CDxLAAgarag9NnwWvAB9UHJ1QPR6Sy0cPc9BFcPNcFjqFWnDI8OSMNKgLJj5VnO4tHuhq7VFTiXHXw8S/wa3+dzauN+5Mcbjrpz51BW0vtoUPaO6cQgcwlThZr1vD0NP/yGTi6XC9x5ln6BaIjaICDFEKWGz9W7KSiKrQyHhqTq1k9jFEp6C2zZJPhoDwpLxHXm0O0b/AVxM7roRZZcCYQWRr2wPkypOT5tYU7fJxLsaJtQHlk+h8FYZd6FLNr+PH9L10S/cZKvihMUA4hY/wODYkwwIDAQAB
```

## Análisis crítico para la migración

1. **El mail del cliente vive en el MISMO hosting de DonWeb** (`mail.` apunta a
   `200.58.111.123`, la misma IP que la web; `mx1.` es un secundario en
   `200.58.122.206`). Al migrar los NS a Cloudflare, la web pasa a Pages pero el mail
   SIGUE en DonWeb: los registros `mail`, `mx1`, ambos MX, SPF, DKIM y DMARC deben
   copiarse EXACTOS a la zona de Cloudflare.
2. **`mail`, `mx1` y `ftp` van DNS-only (nube gris) en Cloudflare.** Si quedan proxied
   (nube naranja), el mail y el FTP dejan de funcionar: el proxy de Cloudflare solo
   pasa HTTP.
3. **El SPF (`include:comp.hostmar.com`) y el DKIM son de la infraestructura de
   DonWeb/Hostmar.** Mientras el mail siga ahí, se copian tal cual.
4. `autodiscover` y `autoconfig` (autoconfiguración de clientes de mail) apuntan al
   apex. Tras la migración el apex deja de ser el servidor de DonWeb, así que en
   Cloudflare conviene apuntarlos como CNAME **DNS-only a `mail`** (mismo destino
   final hoy: `200.58.111.123`). Anotado para decidir en el paso 2.
5. La `google-site-verification` existente se copia tal cual (verificación vieja de
   Search Console — no se pierde la propiedad).

## Pendiente para cerrar el gate 1

- [ ] **Export desde el panel de DonWeb (lo hace Facu — requiere login).** La consulta
      externa no puede ver subdominios que no se conocen de antemano: si en el panel
      hay algún registro con un nombre no estándar, solo aparece ahí. Comparar el
      panel 1:1 contra este documento y anotar cualquier diferencia acá.
