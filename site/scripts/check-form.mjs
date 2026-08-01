/**
 * Phase 6, form test 2 (spec §6): Formspree failing WITH connectivity.
 *
 * The point is not that the request fails — it is what the visitor is left
 * with when it does: an actionable message, their typed values still there,
 * and a MANUAL WhatsApp button. WhatsApp must never open by itself off a
 * rejected promise.
 *
 * Nothing is ever sent to Formspree: the request is intercepted in the browser
 * and answered with a 500 locally.
 *
 * Usage: node scripts/check-form.mjs [url]
 */
import { launch } from 'chrome-launcher';
import puppeteer from 'puppeteer-core';

const URL_UNDER_TEST = process.argv[2] ?? 'http://localhost:4322/';

const FIXTURE = {
  nombre: 'Prueba Automatizada',
  telefono: '3434000000',
  mensaje: 'Necesito un galpon de 10x20 para acopio.',
};

let fails = 0;
const check = (label, ok, extra = '') => {
  if (!ok) fails++;
  console.log(`  ${ok ? 'OK  ' : '*** FALLA'} ${label}${extra ? ` -> ${extra}` : ''}`);
};

const chrome = await launch({ chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'] });
const browser = await puppeteer.connect({
  browserURL: `http://localhost:${chrome.port}`,
  defaultViewport: { width: 390, height: 844, isMobile: true },
});

try {
  const page = await browser.newPage();

  // Fail every Formspree call locally. Nothing leaves this machine.
  let formspreeHits = 0;
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (req.url().includes('formspree.io')) {
      formspreeHits++;
      return req.respond({ status: 500, contentType: 'application/json', body: '{"error":"simulado"}' });
    }
    req.continue();
  });

  await page.goto(URL_UNDER_TEST, { waitUntil: 'networkidle2' });

  console.log('Prueba 2 — Formspree responde error, CON conectividad\n');

  await page.type('input[name="nombre"]', FIXTURE.nombre);
  await page.type('input[name="telefono"]', FIXTURE.telefono);
  await page.type('textarea[name="mensaje"]', FIXTURE.mensaje);
  await page.select('select[name="producto"]', 'Tanques australianos');

  await page.click('[data-form-submit]');
  await page.waitForFunction(
    () => !document.querySelector('[data-form-status]')?.hidden &&
          document.querySelector('[data-form-status]')?.dataset.tone === 'error',
    { timeout: 15000 }
  );

  const state = await page.evaluate(() => {
    const form = document.querySelector('[data-contact-form]');
    const status = document.querySelector('[data-form-status]');
    const fallback = document.querySelector('[data-form-fallback]');
    const link = document.querySelector('[data-form-fallback-link]');
    const submit = document.querySelector('[data-form-submit]');
    return {
      statusText: status?.textContent?.trim() ?? '',
      statusTone: status?.dataset.tone ?? '',
      ariaLive: status?.getAttribute('aria-live') ?? '',
      fallbackVisible: fallback ? !fallback.hasAttribute('hidden') : false,
      fallbackHref: link?.getAttribute('href') ?? '',
      formStillVisible: form ? !form.hidden : false,
      submitEnabled: submit ? !submit.hasAttribute('disabled') : false,
      values: {
        nombre: document.querySelector('input[name="nombre"]')?.value ?? '',
        telefono: document.querySelector('input[name="telefono"]')?.value ?? '',
        mensaje: document.querySelector('textarea[name="mensaje"]')?.value ?? '',
        producto: document.querySelector('select[name="producto"]')?.value ?? '',
      },
    };
  });

  check('el POST salio hacia Formspree', formspreeHits > 0, `${formspreeHits} intento(s)`);
  check('se muestra un mensaje de error', state.statusTone === 'error' && state.statusText.length > 20);
  check('el mensaje es accionable (menciona WhatsApp)', /whatsapp/i.test(state.statusText));
  check('el estado es aria-live="polite"', state.ariaLive === 'polite');
  check('el formulario sigue en pantalla', state.formStillVisible);
  check('el boton vuelve a habilitarse', state.submitEnabled);

  check('conserva el nombre', state.values.nombre === FIXTURE.nombre);
  check('conserva el telefono', state.values.telefono === FIXTURE.telefono);
  check('conserva el mensaje', state.values.mensaje === FIXTURE.mensaje);
  check('conserva el producto elegido', state.values.producto === 'Tanques australianos');

  check('aparece el boton MANUAL de WhatsApp', state.fallbackVisible);
  check('el link usa el numero canonico', state.fallbackHref.includes('wa.me/5493434806295'));
  check('el link NO usa el numero erroneo del legado', !state.fallbackHref.includes('wa.me/543434806295'));
  const decoded = decodeURIComponent(state.fallbackHref);
  check('el texto prellenado lleva los datos cargados', decoded.includes(FIXTURE.nombre) && decoded.includes(FIXTURE.mensaje));

  // The one that matters most: a rejected promise must never open WhatsApp.
  const navigatedAway = !page.url().startsWith(URL_UNDER_TEST.split('#')[0]);
  const extraPages = (await browser.pages()).length;
  check('NO se abrio WhatsApp solo', !navigatedAway && extraPages <= 2, `paginas abiertas: ${extraPages}`);

  console.log('\n' + (fails === 0 ? 'Prueba 2: sin fallas.' : `Prueba 2: ${fails} falla(s).`));
} finally {
  await browser.disconnect();
  try {
    // On Windows chrome-launcher throws EPERM wiping its own temp profile.
    // That is cleanup noise, never a test result — it must not decide the exit
    // code of a gate script.
    await chrome.kill();
  } catch {
    /* ignored on purpose */
  }
}

process.exit(fails === 0 ? 0 : 1);
