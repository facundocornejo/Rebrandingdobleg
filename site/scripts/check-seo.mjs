import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');

const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
console.log(`Bloques JSON-LD: ${blocks.length}`);

let data;
try {
  data = JSON.parse(blocks[0][1]);
  console.log('JSON parsea OK');
} catch (e) {
  console.log('*** JSON INVALIDO: ' + e.message);
  process.exit(1);
}

const graph = data['@graph'] ?? [];
console.log(`@context: ${data['@context']}`);
console.log(`Tipos en @graph: ${graph.map((n) => n['@type']).join(', ')}\n`);

let fails = 0;
const check = (label, ok, extra = '') => {
  if (!ok) fails++;
  console.log(`  ${ok ? 'OK  ' : '*** FALLA'} ${label}${extra ? ' -> ' + extra : ''}`);
};

const biz = graph.find((n) => n['@type'] === 'LocalBusiness');
console.log('LocalBusiness:');
check('@id', Boolean(biz?.['@id']), biz?.['@id']);
check('telephone', /^\+\d{10,15}$/.test(biz?.telephone ?? ''), biz?.telephone);
check('email', Boolean(biz?.email), biz?.email);
check('address completo', Boolean(biz?.address?.addressLocality && biz?.address?.addressRegion && biz?.address?.addressCountry));
check('horarios', biz?.openingHoursSpecification?.length === 2);
check('sameAs', biz?.sameAs?.length === 2);
check('image absoluta', biz?.image?.startsWith('https://'), biz?.image);

const list = graph.find((n) => n['@type'] === 'ItemList');
console.log('\nItemList:');
check('9 productos', list?.itemListElement?.length === 9, String(list?.itemListElement?.length));
check('posiciones 1..9 correlativas', list?.itemListElement?.every((it, i) => it.position === i + 1));

// The important one: every declared anchor must exist in the rendered page.
const missing = [];
for (const item of list?.itemListElement ?? []) {
  const slug = item.url.split('#')[1];
  if (!html.includes(`id="${slug}"`)) missing.push(slug);
}
check('todas las anclas existen en el HTML', missing.length === 0, missing.join(', ') || 'las 9');

const faq = graph.find((n) => n['@type'] === 'FAQPage');
console.log('\nFAQPage:');
check('6 preguntas', faq?.mainEntity?.length === 6, String(faq?.mainEntity?.length));
check('todas con respuesta', faq?.mainEntity?.every((q) => q.acceptedAnswer?.text?.length > 20));

// The FAQ must be visible, not markup-only.
const invisible = (faq?.mainEntity ?? []).filter((q) => !html.includes(q.name));
check('todas las preguntas son VISIBLES en la pagina', invisible.length === 0, invisible.map((q) => q.name).join(' | ') || 'las 6');

console.log('\n' + (fails === 0 ? 'Sin fallas.' : `${fails} falla(s).`));
process.exit(fails === 0 ? 0 : 1);
