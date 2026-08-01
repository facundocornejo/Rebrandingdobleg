import { launch } from 'chrome-launcher';
import puppeteer from 'puppeteer-core';

const chrome = await launch({ chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'] });
const browser = await puppeteer.connect({ browserURL: `http://localhost:${chrome.port}`, defaultViewport: { width: 390, height: 844 } });
let fails = 0;
const check = (l, ok, x = '') => { if (!ok) fails++; console.log(`  ${ok ? 'OK  ' : '*** FALLA'} ${l}${x ? ' -> ' + x : ''}`); };

try {
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(false);
  await page.goto('http://localhost:4323/', { waitUntil: 'networkidle2' });

  console.log('Prueba 3 (parcial) — con JavaScript DESHABILITADO\n');

  const r = await page.evaluate(() => {
    const f = document.querySelector('[data-contact-form]');
    const req = [...document.querySelectorAll('[required]')].map((e) => e.getAttribute('name'));
    return {
      action: f?.getAttribute('action') ?? '',
      method: (f?.getAttribute('method') ?? '').toUpperCase(),
      required: req,
      hasSubmit: Boolean(document.querySelector('[data-form-submit]')),
      honeypot: Boolean(document.querySelector('input[name="_gotcha"]')),
      productos: document.querySelectorAll('select[name="producto"] option').length,
      // Content must not depend on the script.
      cards: document.querySelectorAll('article[id]').length,
      faqs: document.querySelectorAll('details').length,
      h1: document.querySelectorAll('h1').length,
      waLinks: document.querySelectorAll('a[href*="wa.me"]').length,
      // The reveal must not leave content invisible without JS.
      hiddenByReveal: [...document.querySelectorAll('[data-reveal]')]
        .filter((e) => getComputedStyle(e).opacity === '0').length,
    };
  });

  check('el form postea nativo a Formspree', r.action === 'https://formspree.io/f/xldlnvwa', r.action);
  check('method POST', r.method === 'POST');
  check('campos obligatorios presentes', ['nombre', 'telefono', 'mensaje'].every((n) => r.required.includes(n)), r.required.join(', '));
  check('boton de envio presente', r.hasSubmit);
  check('honeypot presente', r.honeypot);
  check('select con los 9 productos + Otro', r.productos === 10, String(r.productos));
  check('las 9 cards se renderizan sin JS', r.cards === 9, String(r.cards));
  check('la FAQ funciona sin JS (details nativos)', r.faqs === 6, String(r.faqs));
  check('un solo H1', r.h1 === 1);
  check('links de WhatsApp presentes', r.waLinks >= 10, String(r.waLinks));

  console.log('\n' + (fails === 0 ? 'Base sin JS: intacta.' : `${fails} falla(s).`));
  if (r.hiddenByReveal > 0) {
    console.log(`\n  *** ATENCION: ${r.hiddenByReveal} bloque(s) con data-reveal quedan en opacity 0 sin JS.`);
    fails++;
  }

  // The counterpart: with JS on, the reveal must still actually run.
  console.log('\nContraparte — con JavaScript HABILITADO\n');
  const jsPage = await browser.newPage();
  await jsPage.goto('http://localhost:4323/', { waitUntil: 'networkidle2' });
  await jsPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 1200));

  const withJs = await jsPage.evaluate(() => {
    const all = [...document.querySelectorAll('[data-reveal]')];
    return {
      total: all.length,
      revealed: all.filter((e) => e.classList.contains('is-visible')).length,
      invisible: all.filter((e) => getComputedStyle(e).opacity === '0').length,
    };
  });

  check('el reveal se dispara con JS', withJs.revealed > 0, `${withJs.revealed}/${withJs.total} revelados`);
  check('nada queda invisible tras scrollear', withJs.invisible === 0, `${withJs.invisible} invisible(s)`);
} finally {
  await browser.disconnect();
  try { chrome.kill(); } catch { /* EPERM de limpieza en Windows */ }
}
process.exit(fails === 0 ? 0 : 1);
