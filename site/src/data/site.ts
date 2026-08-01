/**
 * Single source of truth for business data.
 *
 * The WhatsApp number is defined exactly once, here. Every wa.me and tel: link
 * in the site is derived from it — never written out again. The legacy site had
 * two different numbers in circulation, which is the bug this prevents.
 */

/** Canonical WhatsApp number, digits only, country code included. */
const WHATSAPP_NUMBER = '5493434806295';

/**
 * Formats an Argentine mobile number for display: country code, the mobile `9`,
 * a three-digit area code, then the subscriber number.
 */
function formatArMobile(digits: string): string {
  return [
    `+${digits.slice(0, 2)}`,
    digits.slice(2, 3),
    digits.slice(3, 6),
    digits.slice(6),
  ].join(' ');
}

/** Builds a wa.me link, optionally with a prefilled message. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export interface OpeningHours {
  /** Schema.org day names, for the LocalBusiness JSON-LD. */
  days: string[];
  /** Human label, for the contact section. */
  label: string;
  opens: string;
  closes: string;
}

export const openingHours: OpeningHours[] = [
  {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    label: 'Lunes a viernes',
    opens: '08:00',
    closes: '18:00',
  },
  {
    days: ['Saturday'],
    label: 'Sábados',
    opens: '08:00',
    closes: '13:00',
  },
];

export const site = {
  name: 'Dobleg Premoldeados',
  url: 'https://www.doblegpremoldeados.com.ar',

  title: 'Dobleg Premoldeados | Galpones y Tanques de Hormigón en Paraná',
  description:
    'Fabricamos galpones, tambos, tanques y viviendas de hormigón premoldeado en Paraná, Entre Ríos. 23 años de experiencia, montaje incluido. Cotizá por WhatsApp.',

  whatsapp: {
    /** Digits only — for building links. */
    number: WHATSAPP_NUMBER,
    /** Formatted for display. */
    display: formatArMobile(WHATSAPP_NUMBER),
    /** Bare link with no prefilled message. */
    href: whatsappUrl(),
    /** `tel:` link, same number. */
    tel: `tel:+${WHATSAPP_NUMBER}`,
  },

  email: 'rgermangomez@gmail.com',

  social: {
    instagram: 'https://www.instagram.com/premoldeados_dobleg/',
    facebook: 'https://www.facebook.com/premoldeados.dobleG',
  },

  address: {
    locality: 'Paraná',
    region: 'Entre Ríos',
    country: 'AR',
  },

  areaServed: 'Entre Ríos, Argentina',

  /** Formspree endpoint for the contact form. */
  formEndpoint: 'https://formspree.io/f/xldlnvwa',

  /** Studio credit in the footer. */
  author: {
    name: 'Facundo Cornejo',
    url: 'https://fromdevdiego.com/',
  },

  /** Claims approved by the client. Migrated verbatim from the legacy site. */
  claims: {
    fasterPct: 50,
    fasterDetail: 'Un galpón de 2,5 × 5 m, listo en un día y medio.',
    cheaperPct: 40,
    cheaperDetail: 'Sin sacrificar calidad ni durabilidad.',
    adaptablePct: 100,
    adaptableDetail: 'A tus medidas y necesidades exactas.',
    yearsExperience: 23,
    projectsDone: 500,
  },
} as const;
