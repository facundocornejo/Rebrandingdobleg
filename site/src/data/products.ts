/**
 * The nine products, in the order they appear in the catalogue.
 *
 * Copy comes from the approved traceability table (TRAZABILIDAD-CONTENIDO.md),
 * which traces every line back to the legacy `corregidoMo/index.html`. Claims
 * are unchanged; only wording was polished.
 */
import type { ImageMetadata } from 'astro';

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
  /** Crop focus for the 4:3 frame, set by the image curation gate. */
  objectPosition?: string;
  /** True for galpones only. */
  featured?: boolean;
}

/**
 * Everything except the image. Phase 3B promotes this to `Product[]` once the
 * curation gate (3A) is approved and the assets land in `src/assets/`.
 */
export type ProductContent = Omit<Product, 'image' | 'objectPosition'>;

export const products: ProductContent[] = [
  {
    slug: 'galpones',
    title: 'Galpones industriales',
    shortDesc:
      'Estructuras robustas y personalizables para almacenamiento, producción industrial y uso agropecuario, con la máxima durabilidad.',
    features: ['Montaje eficiente y rápido', 'Diseños adaptados a tus necesidades'],
    imageAlt:
      'Galpón industrial de hormigón premoldeado construido por Dobleg en Entre Ríos',
    featured: true,
  },
  {
    slug: 'tambos',
    title: 'Tambos para lecherías',
    shortDesc:
      'Soluciones higiénicas y funcionales para la producción lechera, pensadas para cumplir las normas sanitarias y maximizar la eficiencia del ordeñe.',
    features: ['Fácil mantenimiento y limpieza', 'Construcción de alta durabilidad'],
    imageAlt: 'Instalación de tambo de hormigón premoldeado para lechería',
  },
  {
    slug: 'tanques-australianos',
    title: 'Tanques australianos',
    shortDesc:
      'Tanques cilíndricos de gran capacidad para almacenamiento de agua o uso industrial, con impermeabilidad garantizada y resistencia excepcional.',
    features: ['Alta capacidad de almacenamiento', 'Vida útil prolongada'],
    imageAlt: 'Tanque australiano de hormigón premoldeado para almacenamiento de agua',
  },
  {
    slug: 'tanques-bebederos',
    title: 'Tanques bebederos para animales',
    shortDesc:
      'Bebederos diseñados para el ganado, con capacidades variables y sistema de llenado automático que garantiza agua limpia y fresca de forma permanente.',
    features: ['Diferentes capacidades', 'Fácil limpieza y mantenimiento'],
    imageAlt: 'Tanque bebedero de hormigón para ganado en campo de Entre Ríos',
  },
  {
    slug: 'viviendas',
    title: 'Viviendas',
    shortDesc:
      'Hogares modernos y energéticamente eficientes, construidos con rapidez y acabados de primera calidad, listos para adaptarse a tu estilo de vida.',
    features: ['Construcción en tiempo récord', 'Diseño contemporáneo'],
    imageAlt: 'Vivienda premoldeada de hormigón terminada',
  },
  {
    slug: 'bateas',
    title: 'Bateas para bebederos o comederos',
    shortDesc:
      'Bateas de hormigón de 2 m × 60 cm y 300 litros. Se unen entre sí con caño de 2″ para ampliar la línea y funcionar con un solo flotante.',
    features: ['Acabados lisos que facilitan la limpieza', 'Resistentes a la intemperie'],
    imageAlt: 'Batea de hormigón de 2 metros para bebedero o comedero de ganado',
  },
  {
    slug: 'cerramientos',
    title: 'Cerramientos',
    shortDesc:
      'Cerramientos perimetrales de hormigón armado que dan seguridad y privacidad, con diseños modernos y gran resistencia a la intemperie.',
    features: ['Variedad de diseños y alturas', 'Instalación rápida y sencilla'],
    imageAlt: 'Cerramiento perimetral de hormigón premoldeado instalado',
  },
  {
    slug: 'piscinas',
    title: 'Piscinas',
    shortDesc:
      'Piscinas premoldeadas de hormigón armado con acabados de primera calidad, para el disfrute familiar, con máxima durabilidad y estética moderna.',
    features: ['Construcción rápida y eficiente', 'Múltiples tamaños y formas'],
    imageAlt: 'Piscina de hormigón premoldeado instalada en una vivienda',
  },
  {
    slug: 'tapiales',
    title: 'Tapiales',
    shortDesc:
      'Tapiales premoldeados para delimitar propiedades: solución económica y duradera. Un único modelo con una cara lisa y otra con terminación moldeada.',
    features: ['Solución económica y duradera', 'Instalación rápida y sencilla'],
    imageAlt: 'Tapial premoldeado de hormigón delimitando un terreno',
  },
];

/** Prefilled WhatsApp message for a product enquiry. */
export function quoteMessage(product: Pick<Product, 'title'>): string {
  return `Hola! Quiero cotizar: ${product.title}`;
}
