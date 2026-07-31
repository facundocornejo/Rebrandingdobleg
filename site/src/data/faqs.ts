/**
 * Frequently asked questions. Same source for the visible FAQ section and the
 * FAQPage JSON-LD, so the two can never drift apart.
 *
 * Every answer traces back to content already published on the legacy site —
 * three of them are migrated verbatim from its (invisible) FAQPage JSON-LD.
 * No new commercial claims. See TRAZABILIDAD-CONTENIDO.md for the line-by-line
 * sourcing.
 */
import { site } from './site';

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: '¿Cuánto tardan en fabricar y entregar?',
    answer:
      'El premoldeado es un 50% más rápido que la construcción tradicional: un galpón de 2,5 × 5 m está listo en un día y medio. Los plazos de fabricación están optimizados y el montaje se planifica en obra.',
  },
  {
    question: '¿En qué zonas trabajan?',
    answer:
      'Atendemos principalmente Entre Ríos y zonas cercanas. Estamos en Paraná. Consultanos por logística a otras provincias.',
  },
  {
    question: '¿El montaje está incluido?',
    answer:
      'Sí. El montaje lo realiza nuestro equipo profesional, con tiempos optimizados y planificación en obra.',
  },
  {
    question: '¿Trabajan medidas y diseños personalizados?',
    answer:
      'Adaptamos cada proyecto a las medidas y prestaciones que necesitás, manteniendo normas de calidad y seguridad. Incluye diseño personalizado y asesoramiento técnico.',
  },
  {
    question: '¿Cuánto dura una estructura de hormigón premoldeado?',
    answer:
      'Fabricamos en hormigón armado con materiales de primera calidad: son estructuras de vida útil prolongada, resistentes a la intemperie y a las condiciones climáticas adversas.',
  },
  {
    question: '¿Cómo pido un presupuesto?',
    answer: `Escribinos por WhatsApp al ${site.whatsapp.display} contándonos qué necesitás y las medidas aproximadas, o completá el formulario. Te pasamos un presupuesto cerrado, sin sorpresas. Atendemos de lunes a viernes de 8 a 18 y los sábados de 8 a 13.`,
  },
];
