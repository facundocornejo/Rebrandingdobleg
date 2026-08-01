/** WCAG contrast for every text/background pair the site actually renders. */

function oklchToRgb(L, C, hDeg) {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h), b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map((v) => {
    const c = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(Math.max(v, 0), 1 / 2.4) - 0.055;
    return Math.min(1, Math.max(0, c));
  });
}

const relLum = ([r, g, b]) => {
  const f = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

const ratio = (a, b) => {
  const [hi, lo] = [relLum(a), relLum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const T = {
  'concrete-50': oklchToRgb(0.975, 0.004, 210),
  'concrete-100': oklchToRgb(0.945, 0.006, 210),
  'concrete-500': oklchToRgb(0.46, 0.018, 215),
  'concrete-900': oklchToRgb(0.24, 0.02, 220),
  'teal-100': oklchToRgb(0.95, 0.025, 200),
  'teal-600': oklchToRgb(0.52, 0.085, 202),
  'teal-800': oklchToRgb(0.36, 0.06, 208),
  'teal-light': oklchToRgb(0.96, 0.015, 200),
  'on-dark-muted': oklchToRgb(0.75, 0.03, 205),
  'wa-600': oklchToRgb(0.53, 0.14, 152),
  'wa-700': oklchToRgb(0.46, 0.13, 152),
  'error-600': oklchToRgb(0.5, 0.19, 28),
  link: oklchToRgb(0.45, 0.08, 205),
  surface: oklchToRgb(0.99, 0.002, 210),
  white: [1, 1, 1],
};

// [label, fg, bg, minimum required]
const PAIRS = [
  ['Texto principal sobre fondo', 'concrete-900', 'concrete-50', 4.5],
  ['Texto secundario sobre fondo', 'concrete-500', 'concrete-50', 4.5],
  ['Texto secundario sobre seccion alterna', 'concrete-500', 'concrete-100', 4.5],
  ['Texto principal sobre card', 'concrete-900', 'surface', 4.5],
  ['Kicker de seccion (teal, >=14px bold)', 'teal-600', 'concrete-50', 3.0],
  ['Kicker sobre seccion alterna', 'teal-600', 'concrete-100', 3.0],
  ['Link en texto corrido', 'link', 'concrete-50', 4.5],
  ['Chip 01-09 de la card', 'teal-600', 'surface', 3.0],
  ['CTA verde con texto blanco', 'white', 'wa-600', 4.5],
  ['CTA verde hover', 'white', 'wa-700', 4.5],
  ['Boton fantasma (texto teal sobre card)', 'teal-600', 'surface', 4.5],
  ['Boton fantasma hover (sobre teal-100)', 'teal-600', 'teal-100', 4.5],
  ['Texto sobre banda oscura', 'teal-light', 'teal-800', 4.5],
  ['Numeros de la banda oscura', 'teal-light', 'teal-800', 4.5],
  ['Detalle atenuado de la banda oscura', 'on-dark-muted', 'teal-800', 4.5],
  ['Footer: texto sobre teal-800', 'teal-light', 'teal-800', 4.5],
  ['Footer: linea legal atenuada', 'on-dark-muted', 'teal-800', 4.5],
  ['Footer: nombre del desarrollador', 'teal-light', 'teal-800', 4.5],
  ['Mensaje de error', 'error-600', 'concrete-50', 4.5],
  ['Mensaje de error sobre card', 'error-600', 'surface', 4.5],
];

let fails = 0;
console.log('par'.padEnd(44) + 'ratio'.padEnd(10) + 'minimo   resultado');
console.log('-'.repeat(78));
for (const [label, fg, bg, min] of PAIRS) {
  const r = ratio(T[fg], T[bg]);
  const ok = r >= min;
  if (!ok) fails++;
  console.log(
    label.padEnd(44) + `${r.toFixed(2)}:1`.padEnd(10) + `${min}:1`.padEnd(9) + (ok ? 'PASA' : '*** FALLA ***')
  );
}
console.log('-'.repeat(78));
console.log(fails === 0 ? `Los ${PAIRS.length} pares cumplen.` : `${fails} par(es) fallan.`);
