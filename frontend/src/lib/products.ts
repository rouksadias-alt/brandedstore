export type PricingTier = {
  id: string;
  label: string;
  units: string;
  price: number;
  compareAtPrice?: number;
  badge?: string;
  isFeatured?: boolean;
  image?: string;
};

export type Ingredient = {
  name: string;
  icon: "leaf" | "snowflake" | "coffee" | "droplets" | "wind" | "shield";
  benefit: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  name: string;
  city: string;
  quote: string;
  rating: number;
  verified: boolean;
  product: string;
};

// Vídeo demo mudo (autoplay + loop) que se muestra en la sección "Cómo
// funciona" de cada página de producto. Si el fichero .mp4 no existe todavía
// en /public/videos/, el componente <DemoVideo> se oculta silenciosamente —
// por eso podemos dejar la ruta configurada de antemano y solo hay que
// depositar el vídeo (naming exacto) para que aparezca. Ver
// LEGER_VIDEOS_GUIDE.md para el flujo de compresión con FFmpeg.
export type DemoVideoData = {
  src: string;
  webm?: string;
  poster: string;
  aspectRatio?: "9/16" | "1/1" | "4/5" | "16/9";
  caption?: string;
};

export type Product = {
  slug: string;
  shortName: string;
  fullName: string;
  tagline: string;
  price: number;
  compareAtPrice?: number;
  heroPriceLabel?: string;
  heroHeadline: string;
  heroSubheadline: string;
  gradient: string;
  accent: string;
  emoji: string;
  images?: string[];
  demoVideo?: DemoVideoData;
  agitation: string[];
  whyItHappens: string;
  howItWorks: { step: string; title: string; description: string }[];
  ingredients: Ingredient[];
  comparison: { feature: string; leger: boolean; generic: boolean; nothing: boolean }[];
  pricingTiers: PricingTier[];
  faq: FAQItem[];
};

export const BUSINESS = {
  brand: "GLUTA",
  tagline: "Brilla desde adentro",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212664365298",
  whatsappDisplay: "+212 664 36 52 98",
  country: "Panamá",
  guaranteeDays: 30,
  founderCount: 500,
};

// Rating agregado mostrado en el hero y sobre la sección de reseñas — y
// usado en el JSON-LD (AggregateRating) de cada página de producto. Ver
// components/aggregate-rating-badge.tsx y components/product-json-ld.tsx.
export const AGGREGATE_RATING = { value: 4.8, count: 512 };

export const testimonials: Testimonial[] = [
  {
    name: "Valentina Torres",
    city: "Ciudad de Panamá",
    quote: "Llevo 3 semanas tomando el Colágeno + Glutatión y mi piel está más clara, más hidratada. Mis compañeras de trabajo me preguntan qué estoy usando. ¡No lo puedo creer!",
    rating: 5,
    verified: true,
    product: "Colágeno + Glutatión",
  },
  {
    name: "Mariana Espinoza",
    city: "San Miguelito",
    quote: "Empecé con el 5D Gluta por curiosidad y al mes ya notaba la diferencia. Mi piel más pareja, mis uñas más fuertes y me siento con más energía. Pagué al recibir, cero riesgo.",
    rating: 5,
    verified: true,
    product: "5D Gluta Colágeno",
  },
  {
    name: "Priscila Moreno",
    city: "Panamá Este",
    quote: "Compré el Kit completo y es lo mejor que he hecho. En 6 semanas mi piel cambió completamente — más luminosa, manchas menos visibles. Lo recomiendo a todas.",
    rating: 5,
    verified: true,
    product: "Kit Completo GLUTA",
  },
  {
    name: "Andrea Castillo",
    city: "La Chorrera",
    quote: "Tenía muchas dudas porque he comprado cosas que no funcionaron. Pero pagué contra entrega y en 4 semanas noté resultados reales. Mi piel nunca había estado tan bien.",
    rating: 5,
    verified: true,
    product: "Colágeno + Glutatión",
  },
];

export const products: Product[] = [
  {
    slug: "roll-on",
    shortName: "Colágeno + Glutatión",
    fullName: "Colágeno Hidrolizado + L-Glutatión + Vitamina C — Piel Clara y Luminosa",
    tagline: "Piel más clara, luminosa y firme — desde adentro.",
    price: 39,
    heroPriceLabel: "Precio por unidad",
    heroHeadline: "Piel más clara y luminosa en 30 días. Sin cremas, desde adentro.",
    heroSubheadline:
      "El Colágeno + Glutatión GLUTA combina Colágeno Hidrolizado, L-Glutatión y Vitamina C para aclarar manchas, unificar el tono y darte esa piel radiante que siempre quisiste — resultados visibles desde la primera semana.",
    gradient: "from-rose-100 via-pink-50 to-amber-50",
    accent: "mint",
    emoji: "✨",
    images: ["/images/roll-on-1.webp", "/images/roll-on-2.webp", "/images/roll-on-3.webp", "/images/roll-on-4.webp"],
    demoVideo: {
      src: "/videos/roll-on-demo.mp4",
      poster: "/images/roll-on-1.webp",
      aspectRatio: "9/16",
      caption: "Colágeno + Glutatión + Vitamina C — brilla desde adentro.",
    },
    agitation: [
      "Te miras al espejo y ves manchas, tono desigual y una piel apagada que no refleja cómo te sientes por dentro.",
      "Has probado cremas caras que prometen aclarar manchas — y no ves diferencia después de meses.",
      "El sol de Panamá y el calor dejan tu piel seca, sin brillo y con manchas que no desaparecen.",
      "Sientes que tu piel envejece más rápido de lo que debería — y quieres hacer algo real, no solo superficial.",
    ],
    whyItHappens:
      "Las manchas, el tono desigual y la falta de luminosidad se producen cuando la melanina se acumula de forma irregular. El Glutatión actúa directamente sobre la producción de melanina mientras el Colágeno repara la estructura de la piel y la Vitamina C potencia ambos efectos — juntos trabajan desde adentro, donde las cremas no llegan.",
    howItWorks: [
      { step: "1", title: "Toma tu dosis diaria", description: "1 o 2 cápsulas al día con agua, preferiblemente en la mañana." },
      { step: "2", title: "Actúa desde adentro", description: "El Glutatión reduce la melanina y el Colágeno repara la piel a nivel celular." },
      { step: "3", title: "Resultados visibles", description: "Semana 1–2: piel más hidratada. Semana 3–4: tono más parejo y luminoso." },
    ],
    ingredients: [
      { name: "L-Glutatión", icon: "shield", benefit: "Reduce la producción de melanina — aclara manchas desde adentro." },
      { name: "Colágeno Hidrolizado", icon: "shield", benefit: "Repara y firma la piel, reduce arrugas y flacidez." },
      { name: "Vitamina C", icon: "leaf", benefit: "Potencia el Glutatión y protege contra el daño solar." },
      { name: "Biotina", icon: "droplets", benefit: "Fortalece uñas y cabello — belleza completa." },
    ],
    comparison: [
      { feature: "Actúa desde adentro (no solo superficie)", leger: true, generic: false, nothing: false },
      { feature: "Glutatión + Colágeno + Vit C combinados", leger: true, generic: false, nothing: false },
      { feature: "Resultados visibles en 2–4 semanas", leger: true, generic: false, nothing: false },
      { feature: "Pago contra entrega, cero riesgo", leger: true, generic: true, nothing: false },
      { feature: "Garantía de devolución 30 días", leger: true, generic: false, nothing: false },
    ],
    pricingTiers: [
      { id: "2x", label: "1 frasco — 1 mes", units: "30 días de uso", price: 39, isFeatured: true, image: "/images/roll-on-1.webp" },
      { id: "duo", label: "2 frascos — 2 meses", units: "Resultados óptimos", price: 49, compareAtPrice: 78, badge: "Ahorra $29", image: "/images/roll-on-2.webp" },
      { id: "kit", label: "Kit 3 meses", units: "Transformación completa", price: 59, compareAtPrice: 117, badge: "Mejor Valor", image: "/images/kit-completo-1.png" },
    ],
    faq: [
      { question: "¿En cuánto tiempo veo resultados?", answer: "La mayoría nota la piel más hidratada y luminosa en la semana 1–2. Las manchas y el tono mejoran visiblemente entre la semana 3 y el mes 2 con uso constante." },
      { question: "¿Es seguro tomarlo todos los días?", answer: "Sí — ingredientes naturales a dosis seguras. Si estás embarazada o tomando medicamentos, consulta a tu médico primero." },
      { question: "¿Funciona para todo tipo de piel?", answer: "Sí — actúa desde adentro por lo que funciona independientemente del tipo de piel." },
      { question: "¿Cuánto tarda en llegar?", answer: "24–72 horas en Ciudad de Panamá. Te confirmamos por WhatsApp antes de despachar." },
      { question: "¿Cómo pago?", answer: "Pago Contra Entrega — pagas en efectivo al repartidor cuando recibes. Cero riesgo." },
    ],
  },
  {
    slug: "medias-compresion",
    shortName: "5D Gluta Colágeno",
    fullName: "5D Gluta Multi Colágeno — Fórmula Completa para Piel, Cabello y Uñas",
    tagline: "5 tipos de colágeno + Gluta — la fórmula más completa del mercado.",
    price: 39,
    heroPriceLabel: "Precio por unidad",
    heroHeadline: "5 tipos de colágeno + Glutatión. La fórmula que tu piel estaba esperando.",
    heroSubheadline:
      "El 5D Gluta Multi Colágeno combina 5 tipos de colágeno con L-Glutatión, Vitamina C, Biotina y Ácido Hialurónico — cobertura total para piel, cabello, uñas y articulaciones desde un solo frasco.",
    gradient: "from-purple-100 via-pink-50 to-rose-50",
    accent: "sand",
    emoji: "💎",
    images: ["/images/medias-1.webp", "/images/medias-2.webp", "/images/medias-3.webp", "/images/medias-4.webp", "/images/medias-5.webp"],
    demoVideo: {
      src: "/videos/medias-demo.mp4",
      poster: "/images/medias-1.webp",
      aspectRatio: "9/16",
      caption: "5 tipos de colágeno — piel, cabello, uñas y articulaciones en un solo frasco.",
    },
    agitation: [
      "Tu cabello cae más de lo normal y se ve sin brillo — aunque cuides tu alimentación.",
      "Tus uñas se rompen fácil y no crecen, sin importar cuántos tratamientos pruebas.",
      "Sientes la piel floja, sin firmeza — y las cremas no son suficientes para cambiar eso.",
      "Tienes dolor en rodillas o articulaciones y sabes que el colágeno se está perdiendo con los años.",
    ],
    whyItHappens:
      "A partir de los 25 años, el cuerpo produce menos colágeno cada año. Un solo tipo de colágeno no es suficiente — cada tejido (piel, cabello, uñas, articulaciones) necesita un tipo específico. El 5D Gluta cubre los 5 tipos más importantes en una sola fórmula potenciada con Glutatión y Vitamina C para máxima absorción.",
    howItWorks: [
      { step: "1", title: "1 dosis diaria", description: "Fácil de tomar, sin sabor fuerte — intégralo en tu rutina de mañana." },
      { step: "2", title: "Cobertura total", description: "Los 5 tipos de colágeno llegan a piel, cabello, uñas y articulaciones simultáneamente." },
      { step: "3", title: "Transformación visible", description: "Piel más firme, cabello más fuerte, uñas que no se rompen — en 4–8 semanas." },
    ],
    ingredients: [
      { name: "5 Tipos de Colágeno", icon: "shield", benefit: "Tipos I, II, III, V y X — cobertura total piel, cabello, uñas, articulaciones." },
      { name: "L-Glutatión", icon: "shield", benefit: "El antioxidante maestro — aclara y protege desde adentro." },
      { name: "Ácido Hialurónico", icon: "droplets", benefit: "Hidratación profunda — piel rellena y sin arrugas finas." },
      { name: "Biotina + Vit C", icon: "leaf", benefit: "Cabello y uñas fuertes, absorción máxima del colágeno." },
    ],
    comparison: [
      { feature: "5 tipos de colágeno en 1 frasco", leger: true, generic: false, nothing: false },
      { feature: "Glutatión + Ácido Hialurónico incluidos", leger: true, generic: false, nothing: false },
      { feature: "Piel + cabello + uñas + articulaciones", leger: true, generic: false, nothing: false },
      { feature: "Pago contra entrega, cero riesgo", leger: true, generic: true, nothing: false },
      { feature: "Garantía de devolución 30 días", leger: true, generic: false, nothing: false },
    ],
    pricingTiers: [
      { id: "2x", label: "1 frasco — 1 mes", units: "30 días de uso", price: 39, isFeatured: true, image: "/images/medias-1.webp" },
      { id: "duo", label: "2 frascos — 2 meses", units: "Resultados completos", price: 49, compareAtPrice: 78, badge: "Ahorra $29", image: "/images/medias-2.webp" },
      { id: "kit", label: "Kit 3 meses", units: "Transformación total", price: 59, compareAtPrice: 117, badge: "Mejor Valor", image: "/images/kit-completo-1.png" },
    ],
    faq: [
      { question: "¿Qué diferencia hay con el Colágeno + Glutatión?", answer: "El 5D Gluta incluye 5 tipos de colágeno y Ácido Hialurónico — es la fórmula más completa, ideal si quieres cubrir piel, cabello, uñas Y articulaciones al mismo tiempo." },
      { question: "¿Puedo tomar los dos productos juntos?", answer: "Sí — son complementarios. Muchas clientas toman el Kit completo para máximos resultados." },
      { question: "¿En cuánto tiempo veo resultados en el cabello?", answer: "El cabello suele responder entre la semana 4 y 8 — menos caída primero, luego más brillo y fuerza." },
      { question: "¿Cómo pago?", answer: "Pago Contra Entrega — pagas en efectivo al repartidor cuando recibes. Cero riesgo." },
    ],
  },
];

export const kitProduct = {
  slug: "kit-completo",
  name: "Kit GLUTA Belleza Completa — 2 Productos",
  tagline: "Los 2 frascos, el dúo completo de belleza — ahorra $29",
  price: 59,
  compareAtPrice: 112,
  images: ["/images/kit-completo-1.png"],
  includes: products.map((p) => p.shortName),
  demoVideo: {
    src: "/videos/kit-demo.mp4",
    poster: "/images/kit-completo-1.png",
    aspectRatio: "9/16" as const,
    caption: "El ritual completo GLUTA: Colágeno + Glutatión, 5D Multi Colágeno y Colágeno Líquido.",
  },
};

export type DuoOffer = {
  slug: string;
  title: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  price: number;
  compareAtPrice: number;
  badge: string;
  emoji: string;
  gradient: string;
  images: string[];
  demoVideo?: DemoVideoData;
  productSlugs: [string, string];
  checkoutProductSlug: string;
  checkoutPlanId: string;
  useCases: { time: string; title: string; desc: string }[];
  faq: FAQItem[];
};

// Dedicated landing pages for 2-product bundles — one step up from a single
// product, one step below the full Kit. Add new duos here and create a
// matching `app/<slug>/page.tsx` that renders <DuoLandingPage duo={...} />.
export const duoOffers: DuoOffer[] = [
  {
    slug: "bruma-rollon",
    title: "Colágeno + Glutatión + 5D Gluta",
    tagline: "El dúo más completo — piel clara, firme y luminosa desde adentro",
    heroHeadline: "Dos fórmulas, un solo objetivo: la piel que siempre quisiste",
    heroSubheadline:
      "El Colágeno + Glutatión aclara manchas y unifica el tono, mientras el 5D Gluta Multi Colágeno firma, hidrata y fortalece cabello y uñas — juntos cubren cada aspecto de tu belleza.",
    price: 49,
    compareAtPrice: 78,
    badge: "Ahorra $29",
    emoji: "✨",
    gradient: "from-rose-100 via-pink-50 to-purple-50",
    images: ["/images/duo-bruma-rollon.png"],
    demoVideo: {
      src: "/videos/duo-bruma-rollon-demo.mp4",
      poster: "/images/duo-bruma-rollon.png",
      aspectRatio: "9/16" as const,
      caption: "Colágeno + Glutatión de día, 5D Gluta para cobertura total — el dúo perfecto.",
    },
    productSlugs: ["roll-on", "medias-compresion"],
    checkoutProductSlug: "roll-on",
    checkoutPlanId: "duo",
    useCases: [
      {
        time: "Piel & Manchas",
        title: "Colágeno + Glutatión",
        desc: "Aclara manchas, unifica el tono y da luminosidad — ideal si tu objetivo es una piel más clara y pareja.",
      },
      {
        time: "Cobertura Total",
        title: "5D Gluta Multi Colágeno",
        desc: "5 tipos de colágeno para piel firme, cabello fuerte, uñas perfectas y articulaciones saludables.",
      },
    ],
    faq: [
      {
        question: "¿Por qué comprar los dos en vez de uno solo?",
        answer: "Son complementarios: el Colágeno + Glutatión ataca manchas y luminosidad, y el 5D Gluta cubre firmeza, cabello y uñas. Juntos dan resultados completos en menos tiempo.",
      },
      {
        question: "¿Cuánto ahorro comprando el dúo?",
        answer: "El dúo cuesta $49 vs. $78 comprando cada producto por separado — un ahorro real de $29.",
      },
      {
        question: "¿Tiene la misma garantía?",
        answer: "Sí — Garantía de 30 días y Pago Contra Entrega, igual que cualquier producto GLUTA.",
      },
      {
        question: "¿Cómo pago?",
        answer: "Pago Contra Entrega — pagas en efectivo al repartidor cuando recibes tu pedido. Cero riesgo.",
      },
    ],
  },
];

export function getDuoOfferBySlug(slug: string): DuoOffer | undefined {
  return duoOffers.find((d) => d.slug === slug);
}

// Post-purchase upsell: which product each "duo" plan is paired with, so we
// know what's *not* included yet and worth offering on the thank-you page.
const DUO_PAIR: Record<string, string> = {
  "roll-on": "medias-compresion",
  "medias-compresion": "roll-on",
};

export function getUpsellProducts(productSlug: string, planId: string | null): Product[] {
  if (productSlug === "kit-completo" || planId === "kit") {
    return []; // already has all 3 — nothing left to upsell.
  }
  const owned = new Set<string>([productSlug]);
  if (planId === "duo" && DUO_PAIR[productSlug]) {
    owned.add(DUO_PAIR[productSlug]);
  }
  return products.filter((p) => !owned.has(p.slug));
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export type CheckoutOption = {
  slug: string;
  name: string;
  emoji: string;
  image?: string;
  tiers: PricingTier[];
  allowBump: boolean;
};

export const checkoutOptions: CheckoutOption[] = [
  ...products.map((p) => ({
    slug: p.slug,
    name: p.shortName,
    emoji: p.emoji,
    image: p.images?.[0],
    tiers: p.pricingTiers,
    allowBump: p.slug !== "bruma",
  })),
  {
    slug: kitProduct.slug,
    name: kitProduct.name,
    emoji: "🎁",
    image: kitProduct.images[0],
    tiers: [
      {
        id: "kit",
        label: "Kit Completo",
        units: "Gel + Medias + Bruma",
        price: kitProduct.price,
        compareAtPrice: kitProduct.compareAtPrice,
        badge: "Más Popular",
        isFeatured: true,
        image: kitProduct.images[0],
      },
    ],
    allowBump: false,
  },
];

export function getCheckoutOption(slug: string): CheckoutOption {
  return checkoutOptions.find((o) => o.slug === slug) ?? checkoutOptions[0];
}

// Order-confirmation WhatsApp links are generated server-side now
// (backend/app/core/whatsapp.py) so the message always reflects the
// authoritative, server-computed total. This file only owns catalog/copy.

