/**
 * The nine products, in the order they appear in the catalogue.
 *
 * Copy comes from the approved traceability table (TRAZABILIDAD-CONTENIDO.md),
 * which traces every line back to the legacy `corregidoMo/index.html`. Claims
 * are unchanged; only wording was polished. Images come from the approved image
 * curation (CURADURIA-IMAGENES.md).
 */
import type { ImageMetadata } from 'astro';

import galponImg from '../assets/galpon-industrial-premoldeado.webp';
import tamboImg from '../assets/tambo-lecheria-hormigon.webp';
import tanqueAustralianoImg from '../assets/tanque-australiano-hormigon.webp';
import bebederoImg from '../assets/tanque-bebedero-ganado.webp';
import viviendaImg from '../assets/vivienda-premoldeada-hormigon.webp';
import bateaImg from '../assets/batea-comedero-hormigon.webp';
import cerramientoImg from '../assets/cerramiento-premoldeado.webp';
import piscinaImg from '../assets/piscina-hormigon-premoldeada.webp';
import tapialImg from '../assets/tapial-premoldeado-hormigon.webp';

export interface Product {
  /** Anchor id (`#galpones`) and future `/productos/[slug]` route. */
  slug: string;
  title: string;
  /** One or two lines. */
  shortDesc: string;
  /** Two or three bullets. */
  features: string[];
  image: ImageMetadata;
  imageAlt: string;
  /**
   * Crop focus for the 4:3 frame. Only set where the source is not already 4:3,
   * or where the frame is not 4:3 (the featured card is wider on desktop).
   */
  objectPosition?: string;
  /** True for galpones only. */
  featured?: boolean;
}

export const products: Product[] = [
  {
    slug: 'galpones',
    title: 'Galpones industriales',
    shortDesc:
      'Estructuras robustas y personalizables para almacenamiento, producción industrial y uso agropecuario, con la máxima durabilidad.',
    features: ['Montaje eficiente y rápido', 'Diseños adaptados a tus necesidades'],
    image: galponImg,
    imageAlt:
      'Galpón industrial de hormigón premoldeado construido por Dobleg en Entre Ríos',
    // The featured card is wider than 4:3 on desktop, so it crops vertically:
    // bias downward to keep the portón and eat sky instead of structure.
    objectPosition: 'center 55%',
    featured: true,
  },
  {
    slug: 'tambos',
    title: 'Tambos para lecherías',
    shortDesc:
      'Soluciones higiénicas y funcionales para la producción lechera, pensadas para cumplir las normas sanitarias y maximizar la eficiencia del ordeñe.',
    features: ['Fácil mantenimiento y limpieza', 'Construcción de alta durabilidad'],
    image: tamboImg,
    imageAlt: 'Instalación de tambo de hormigón premoldeado para lechería',
  },
  {
    slug: 'tanques-australianos',
    title: 'Tanques australianos',
    shortDesc:
      'Tanques cilíndricos de gran capacidad para almacenamiento de agua o uso industrial, con impermeabilidad garantizada y resistencia excepcional.',
    features: ['Alta capacidad de almacenamiento', 'Vida útil prolongada'],
    image: tanqueAustralianoImg,
    imageAlt: 'Tanque australiano de hormigón premoldeado junto a un molino de viento',
  },
  {
    slug: 'tanques-bebederos',
    title: 'Tanques bebederos para animales',
    shortDesc:
      'Bebederos diseñados para el ganado, con capacidades variables y sistema de llenado automático que garantiza agua limpia y fresca de forma permanente.',
    features: ['Diferentes capacidades', 'Fácil limpieza y mantenimiento'],
    image: bebederoImg,
    imageAlt: 'Tanque bebedero de hormigón con vacas tomando agua en un campo de Entre Ríos',
    // Source is 16:9, so the 4:3 frame crops the sides. The tank is centred.
    objectPosition: 'center',
  },
  {
    slug: 'viviendas',
    title: 'Viviendas',
    shortDesc:
      'Hogares modernos y energéticamente eficientes, construidos con rapidez y acabados de primera calidad, listos para adaptarse a tu estilo de vida.',
    features: ['Construcción en tiempo récord', 'Diseño contemporáneo'],
    image: viviendaImg,
    imageAlt: 'Vivienda premoldeada de hormigón con galería, terminada',
  },
  {
    slug: 'bateas',
    title: 'Bateas para bebederos o comederos',
    shortDesc:
      'Bateas de hormigón de 2 m × 60 cm y 300 litros. Se unen entre sí con caño de 2″ para ampliar la línea y funcionar con un solo flotante.',
    features: ['Acabados lisos que facilitan la limpieza', 'Resistentes a la intemperie'],
    image: bateaImg,
    imageAlt: 'Batea de hormigón de 2 metros para bebedero o comedero de ganado',
  },
  {
    slug: 'cerramientos',
    title: 'Cerramientos',
    shortDesc:
      'Cerramientos perimetrales de hormigón armado que dan seguridad y privacidad, con diseños modernos y gran resistencia a la intemperie.',
    features: ['Variedad de diseños y alturas', 'Instalación rápida y sencilla'],
    image: cerramientoImg,
    imageAlt: 'Cerramiento perimetral de hormigón premoldeado instalado en un campo',
    // Source is slightly taller than 4:3: bias upward to keep the wall's top
    // edge and crop the rubble at its base.
    objectPosition: 'center 40%',
  },
  {
    slug: 'piscinas',
    title: 'Piscinas',
    shortDesc:
      'Piscinas premoldeadas de hormigón armado con acabados de primera calidad, para el disfrute familiar, con máxima durabilidad y estética moderna.',
    features: ['Construcción rápida y eficiente', 'Múltiples tamaños y formas'],
    image: piscinaImg,
    imageAlt: 'Piscina de hormigón premoldeado terminada, con deck de madera',
  },
  {
    slug: 'tapiales',
    title: 'Tapiales',
    shortDesc:
      'Tapiales premoldeados para delimitar propiedades: solución económica y duradera. Un único modelo con una cara lisa y otra con terminación moldeada.',
    features: ['Solución económica y duradera', 'Instalación rápida y sencilla'],
    image: tapialImg,
    imageAlt: 'Tapial premoldeado blanco delimitando el patio de una vivienda',
  },
];

/** Prefilled WhatsApp message for a product enquiry. */
export function quoteMessage(product: Pick<Product, 'title'>): string {
  return `Hola! Quiero cotizar: ${product.title}`;
}
