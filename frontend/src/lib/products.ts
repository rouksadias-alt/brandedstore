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
  brand: "LÉGER",
  tagline: "Siéntete Léger",
  // Update NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local (international format,
  // no "+" or spaces) once you have your real WhatsApp Business number.
  // TODO: número temporal (Marruecos) — sustituir por el número real de
  // Panamá en cuanto esté disponible (P0.1 de LEGER_CRO_UPGRADE.md).
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
    name: "María Fernández",
    city: "Ciudad de Panamá",
    quote:
      "Trabajo 10 horas de pie en la farmacia y para las 6pm sentía que cargaba troncos. Con el Gel siento el frío de inmediato y mis piernas se sienten ligeras otra vez.",
    rating: 5,
    verified: true,
    product: "Gel Crioactivo",
  },
  {
    name: "Yaritza Gómez",
    city: "San Miguelito",
    quote:
      "Soy maestra y paso todo el día parada. Las medias de compresión son mi secreto — cómodas, no se notan bajo el pantalón y llego a casa sin esa hinchazón de siempre.",
    rating: 5,
    verified: true,
    product: "Compression 360°",
  },
  {
    name: "Carolina Ruiz",
    city: "Panamá Este",
    quote:
      "La Bruma vive en mi cartera. Un spray a media tarde y es como reiniciar las piernas. Pagué contra entrega y llegó en dos días, cero riesgo.",
    rating: 5,
    verified: true,
    product: "Bruma Instantánea",
  },
  {
    name: "Ana Lucía Prado",
    city: "Ciudad de Panamá",
    quote:
      "Compré el Kit Completo por curiosidad y ahora es parte de mi rutina diaria. Se nota que está pensado para el calor de aquí, no es una crema genérica de farmacia.",
    rating: 5,
    verified: true,
    product: "Kit Completo",
  },
];

export const products: Product[] = [
  {
    slug: "roll-on",
    shortName: "Gel Crioactivo",
    fullName:
      "Gel Frío de Centella Asiática y Castaño de Indias — Alivio Inmediato para Piernas Pesadas",
    tagline: "Lo sientes frío, lo sientes trabajando — en 60 segundos.",
    price: 39,
    heroPriceLabel: "Precio por unidad",
    heroHeadline: "Piernas ligeras en 60 segundos. Sin pastillas, sin farmacia.",
    heroSubheadline:
      "El Gel Crioactivo LÉGER combina Centella Asiática, Castaño de Indias y un efecto frío inmediato que drena la pesadez al instante — sientes el alivio desde la primera aplicación. Formulado para el calor de Panamá.",
    gradient: "from-mint-100 via-mint-50 to-frost",
    accent: "mint",
    emoji: "🧊",
    images: [
      "/images/roll-on-1.png",
      "/images/roll-on-2.png",
    ],
    demoVideo: {
      src: "/videos/roll-on-demo.mp4",
      poster: "/images/roll-on-1.png",
      aspectRatio: "9/16",
      caption: "Aplica el gel de tobillo a rodilla con un masaje suave — el frío se siente al instante.",
    },
    agitation: [
      "Subes las escaleras del Metro y sientes las piernas como si cargaras sacos de cemento.",
      "Llegas a casa y lo primero que haces es tirarte al sofá — no te quedan fuerzas ni para jugar con tus hijos.",
      "Te da pena ponerte sandalias o falda porque tus tobillos se ven hinchados y con la marca de la media.",
      "Te despiertas de madrugada con calambres en las pantorrillas — y te preocupa terminar con várices como tu mamá.",
    ],
    whyItHappens:
      "Cuando pasas muchas horas de pie o sentada, la circulación venosa de las piernas tiene que trabajar contra la gravedad para regresar la sangre al corazón. El calor tropical dilata los vasos y hace todo peor, retenido líquido se acumula y sientes pesadez, hinchazón y esa sensación de \"piernas de tronco\" al final del día.",
    howItWorks: [
      { step: "1", title: "Aplica", description: "Extiende el gel por tu pierna con un masaje suave, de tobillo hacia la rodilla." },
      { step: "2", title: "Siente el frío", description: "El efecto refrescante genera una sensación fría inmediata que descongestiona al instante." },
      { step: "3", title: "Piernas ligeras", description: "La Centella Asiática y el Castaño de Indias siguen trabajando en la microcirculación mientras sigues tu día." },
    ],
    ingredients: [
      { name: "Centella Asiática", icon: "leaf", benefit: "Estudiada por su efecto en la microcirculación venosa." },
      { name: "Castaño de Indias", icon: "shield", benefit: "Venotónico clásico — confort y tono venoso." },
      { name: "Ginkgo Biloba", icon: "wind", benefit: "Apoya la circulación y revitaliza las piernas cansadas." },
      { name: "Aloe Vera", icon: "droplets", benefit: "Hidrata y calma la piel mientras el frío hace su trabajo." },
    ],
    comparison: [
      { feature: "Ingredientes con nombre y estudio", leger: true, generic: false, nothing: false },
      { feature: "Sensación fría inmediata", leger: true, generic: false, nothing: false },
      { feature: "Pago contra entrega, cero riesgo", leger: true, generic: true, nothing: false },
      { feature: "Formulado para clima tropical", leger: true, generic: false, nothing: false },
      { feature: "Garantía de devolución 30 días", leger: true, generic: false, nothing: false },
    ],
    pricingTiers: [
      { id: "2x", label: "1 Gel Crioactivo", units: "30 días de uso", price: 39, isFeatured: true, image: "/images/roll-on-1.png" },
      { id: "duo", label: "Gel + Medias", units: "El dúo más completo", price: 49, compareAtPrice: 84, badge: "Ahorra $35", image: "/images/duo-rollon-medias.png" },
      { id: "kit", label: "Kit Completo", units: "Gel + Medias + Bruma", price: 59, compareAtPrice: 112, badge: "Mejor Valor", image: "/images/kit-completo-1.png" },
    ],
    faq: [
      { question: "¿Esto en verdad funciona o es otra crema más?", answer: "El Gel Crioactivo combina Centella Asiática y Castaño de Indias con un efecto frío que sientes trabajando desde el primer uso — no es una promesa vacía, es una sensación inmediata y real." },
      { question: "Ya he comprado cosas que no sirvieron, ¿por qué confiar en esto?", answer: "Por eso ofrecemos garantía de devolución de 30 días y pago contra entrega: pagas solo cuando lo recibes y compruebas que funciona." },
      { question: "¿Es seguro? ¿Tiene químicos raros?", answer: "Lista de ingredientes clara y transparente, libre de parabenos, de uso tópico y dermatológicamente apto." },
      { question: "¿Cuánto tarda en llegar a mi casa?", answer: "24–72 horas en Ciudad de Panamá; un poco más en el interior. Te confirmamos por WhatsApp antes de despachar." },
      { question: "¿Cómo pago?", answer: "Pago Contra Entrega — pagas en efectivo al repartidor cuando recibes tu pedido. Cero riesgo." },
    ],
  },
  {
    slug: "medias-compresion",
    shortName: "Compression 360°",
    fullName:
      "Medias de Compresión Graduada con Grafeno — Circulación Activa Todo el Día",
    tagline: "La misma tecnología que usan las aeromozas y enfermeras — ahora con estilo.",
    price: 39,
    heroPriceLabel: "Precio por unidad",
    heroHeadline: "La misma compresión que recetan los médicos — sin receta, sin sobreprecio.",
    heroSubheadline:
      "Compresión graduada real en fibra de bambú y grafeno: más apretado en el tobillo, disminuye hacia la rodilla, para circulación activa durante tu día completo. Sin ir a la farmacia.",
    gradient: "from-sand-100 via-sand-50 to-mint-50",
    accent: "sand",
    emoji: "🧦",
    images: [
      "/images/medias-1.png",
      "/images/medias-2.png",
    ],
    demoVideo: {
      src: "/videos/medias-demo.mp4",
      poster: "/images/medias-1.png",
      aspectRatio: "9/16",
      caption: "Compresión graduada del tobillo hacia la rodilla — activa la circulación todo el día.",
    },
    agitation: [
      "A las 3pm ya sientes los zapatos apretados — tus tobillos se hincharon otra vez dentro del turno.",
      "El viaje en bus o el vuelo te deja las piernas dormidas y \"cargadas\", y al bajarte casi no puedes caminar bien.",
      "Compraste medias \"de compresión\" baratas que a la semana se aflojaron y no comprimen nada.",
      "Ya notas venitas y arañas vasculares apareciendo — y sabes que sin hacer nada, solo van a empeorar.",
    ],
    whyItHappens:
      "La compresión graduada es una de las pocas intervenciones que médicos y farmacéuticos recomiendan de verdad: al aplicar más presión en el tobillo y menos hacia la rodilla, ayuda a que la sangre venosa suba más eficientemente contra la gravedad, reduciendo la hinchazón que se acumula durante horas de pie o sentada.",
    howItWorks: [
      { step: "1", title: "Ponte las medias", description: "Fibra de bambú transpirable, cómoda para clima tropical." },
      { step: "2", title: "Compresión activa", description: "El grafeno regula temperatura mientras la compresión graduada trabaja todo el día." },
      { step: "3", title: "Piernas ligeras al final del día", description: "Menos hinchazón, más energía al llegar a casa." },
    ],
    ingredients: [
      { name: "Fibra de Bambú", icon: "leaf", benefit: "Transpirable, ideal para el clima tropical de Panamá." },
      { name: "Hilo de Grafeno", icon: "shield", benefit: "Regula la temperatura y es antibacterial." },
      { name: "Compresión Graduada 15–20mmHg", icon: "droplets", benefit: "Más apretado en el tobillo, disminuye hacia la rodilla — mecanismo médico real." },
      { name: "Costura Plana", icon: "wind", benefit: "No se marca bajo el pantalón, cómoda para uso diario." },
    ],
    comparison: [
      { feature: "Compresión graduada real (mmHg)", leger: true, generic: false, nothing: false },
      { feature: "Transpirable para clima tropical", leger: true, generic: false, nothing: false },
      { feature: "Discreta bajo el pantalón", leger: true, generic: true, nothing: false },
      { feature: "Pago contra entrega, cero riesgo", leger: true, generic: true, nothing: false },
      { feature: "Garantía de devolución 30 días", leger: true, generic: false, nothing: false },
    ],
    pricingTiers: [
      { id: "2x", label: "1 Par de Medias", units: "Uso diario", price: 39, isFeatured: true, image: "/images/medias-2.png" },
      { id: "duo", label: "Medias + Gel", units: "El dúo más completo", price: 49, compareAtPrice: 84, badge: "Ahorra $35", image: "/images/duo-rollon-medias.png" },
      { id: "kit", label: "Kit Completo", units: "Gel + Medias + Bruma", price: 59, compareAtPrice: 112, badge: "Mejor Valor", image: "/images/kit-completo-1.png" },
    ],
    faq: [
      { question: "¿Es compresión real o solo elástico apretado?", answer: "Es compresión graduada real (15–20mmHg), más apretada en el tobillo y disminuye hacia la rodilla — el mismo mecanismo que usan enfermeras y aeromozas, no un elástico genérico." },
      { question: "¿Se nota bajo el pantalón?", answer: "No — costura plana y diseño discreto pensado para uso diario en oficina o turno de trabajo." },
      { question: "¿De qué talla son?", answer: "Talla única con compresión adaptable — cubre la mayoría de tallas de pantorrilla y pie femenino." },
      { question: "¿Cómo pago?", answer: "Pago Contra Entrega — pagas en efectivo al repartidor cuando recibes tu pedido." },
    ],
  },
  {
    slug: "bruma",
    shortName: "Bruma Instantánea",
    fullName: "Bruma Fría de Castaño de Indias y Mentol — Piernas Ligeras al Instante",
    tagline: "El refresh de piernas que cabe en tu cartera.",
    price: 34,
    heroPriceLabel: "Precio por unidad",
    heroHeadline: "A las 3pm, tus piernas ya lo sienten. La Bruma las resetea en segundos.",
    heroSubheadline:
      "Un spray frío de Castaño de Indias, Mentol y Cafeína Verde para ese \"bajón\" de piernas a media tarde — sin manos libres, sin rutina, en segundos. Cabe en tu cartera.",
    gradient: "from-mint-50 via-frost to-mint-100",
    accent: "mint",
    emoji: "💦",
    images: [
      "/images/bruma-1.png",
      "/images/bruma-2.png",
    ],
    demoVideo: {
      src: "/videos/bruma-demo.mp4",
      poster: "/images/bruma-1.png",
      aspectRatio: "9/16",
      caption: "Un spray a media tarde y las piernas se sienten frescas al instante — cabe en tu cartera.",
    },
    agitation: [
      "A media tarde, con el calor de la ciudad, sientes las piernas ardiendo y pulsando — y todavía te quedan horas de trabajo.",
      "Estás en la oficina, en el bus o en fila y no puedes quitarte los zapatos ni subir las piernas — necesitas alivio ahí mismo.",
      "Sales del trabajo directo a recoger a los niños o hacer diligencias — no hay tiempo para masajes ni rutinas.",
      "Quieres sentirte fresca para salir en la noche, pero tus piernas llegan \"muertas\" del día.",
    ],
    whyItHappens:
      "El calor tropical dilata los vasos sanguíneos y acelera la sensación de pesadez a medida que avanza el día. Una bruma fría con venotónicos como el Castaño de Indias refresca al instante y ayuda a la pared venosa, sin necesidad de manos libres para masajear.",
    howItWorks: [
      { step: "1", title: "Saca la Bruma de tu cartera", description: "Cabe en cualquier bolso, mochila o guantera." },
      { step: "2", title: "Rocía sobre la piel o la media", description: "Sensación fría instantánea, sin necesidad de frotar." },
      { step: "3", title: "Piernas ligeras al instante", description: "Castaño de Indias y Cafeína Verde siguen trabajando mientras sigues tu día." },
    ],
    ingredients: [
      { name: "Castaño de Indias (Aescina)", icon: "leaf", benefit: "Venotónico clásico europeo, refuerza la pared venosa." },
      { name: "Mentol", icon: "snowflake", benefit: "Frescor inmediato al contacto con la piel." },
      { name: "Cafeína Verde", icon: "coffee", benefit: "Apoya el efecto drenante durante el día." },
      { name: "Formato Spray de Bolsillo", icon: "wind", benefit: "Sin manos libres, se aplica en segundos, cabe en tu cartera." },
    ],
    comparison: [
      { feature: "Ingredientes venotónicos con nombre", leger: true, generic: false, nothing: false },
      { feature: "Se usa sin manos libres, en segundos", leger: true, generic: false, nothing: false },
      { feature: "Tamaño de bolsillo/cartera", leger: true, generic: false, nothing: false },
      { feature: "Pago contra entrega, cero riesgo", leger: true, generic: true, nothing: false },
      { feature: "Garantía de devolución 30 días", leger: true, generic: false, nothing: false },
    ],
    pricingTiers: [
      { id: "2x", label: "1 Bruma", units: "Tu dosis diaria", price: 34, isFeatured: true, image: "/images/bruma-1.png" },
      { id: "duo", label: "Bruma + Gel", units: "El dúo refrescante", price: 44, compareAtPrice: 74, badge: "Ahorra $30", image: "/images/duo-bruma-rollon.png" },
      { id: "kit", label: "Kit Completo", units: "Gel + Medias + Bruma", price: 59, compareAtPrice: 112, badge: "Mejor Valor", image: "/images/kit-completo-1.png" },
    ],
    faq: [
      { question: "¿Puedo usarla sobre la media de compresión?", answer: "Sí — la Bruma está formulada para usarse sobre la piel directamente o sobre la media, sin dejar residuos grasosos." },
      { question: "¿Es solo un refrescante o realmente ayuda a la circulación?", answer: "Contiene Castaño de Indias (Aescina), un venotónico estudiado por su efecto en la pared venosa — no es solo mentol para sentir frío." },
      { question: "¿Cuánto dura un frasco?", answer: "Con uso diario, aproximadamente 30 días." },
      { question: "¿Cómo pago?", answer: "Pago Contra Entrega — pagas en efectivo al repartidor cuando recibes tu pedido." },
    ],
  },
];

export const kitProduct = {
  slug: "kit-completo",
  name: "Kit LÉGER Piernas Ligeras Completo",
  tagline: "Los 3 productos, un solo ritual — ahorra $53",
  price: 59,
  compareAtPrice: 112,
  images: ["/images/kit-completo-1.png"],
  includes: products.map((p) => p.shortName),
  demoVideo: {
    src: "/videos/kit-demo.mp4",
    poster: "/images/kit-completo-1.png",
    aspectRatio: "9/16" as const,
    caption: "El ritual completo en 3 pasos: Gel frío, Medias de compresión, Bruma refrescante.",
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
    title: "Bruma + Gel Crioactivo",
    tagline: "Frío inmediato + refresco al instante — el dúo para piernas ligeras todo el día",
    heroHeadline: "Alivio en casa por la mañana, refresco instantáneo el resto del día",
    heroSubheadline:
      "El Gel Crioactivo drena la pesadez con frío profundo cuando tienes tiempo de aplicarlo con calma, y la Bruma te da ese mismo alivio en segundos, sin manos libres, dondequiera que estés — oficina, bus o fila del súper.",
    price: 44,
    compareAtPrice: 74,
    badge: "Ahorra $30",
    emoji: "💦",
    gradient: "from-mint-50 via-frost to-mint-100",
    images: ["/images/duo-bruma-rollon.png"],
    demoVideo: {
      src: "/videos/duo-bruma-rollon-demo.mp4",
      poster: "/images/duo-bruma-rollon.png",
      aspectRatio: "9/16" as const,
      caption: "Gel por la mañana, Bruma en el día — alivio frío continuo sin esfuerzo.",
    },
    productSlugs: ["bruma", "roll-on"],
    checkoutProductSlug: "bruma",
    checkoutPlanId: "duo",
    useCases: [
      {
        time: "Mañana / en casa",
        title: "Gel Crioactivo",
        desc: "Aplica con calma antes de salir — el efecto frío y la Centella Asiática drenan la pesadez desde temprano.",
      },
      {
        time: "Fuera de casa",
        title: "Bruma Instantánea",
        desc: "Rocía sobre la piel o la media en segundos, sin manos libres — tu alivio de bolsillo para el resto del día.",
      },
    ],
    faq: [
      {
        question: "¿Por qué comprar los dos en vez de uno solo?",
        answer: "Porque cubren momentos distintos: el Gel es ideal cuando tienes unos minutos para aplicarlo con calma (mañana o al llegar a casa), y la Bruma es tu solución rápida cuando estás fuera y no puedes detenerte — juntos cubren todo el día.",
      },
      {
        question: "¿Cuánto ahorro comprando el dúo?",
        answer: "El dúo cuesta $44 vs. $74 comprando cada producto por separado — un ahorro real de $30.",
      },
      {
        question: "¿Tiene la misma garantía que los productos individuales?",
        answer: "Sí — Garantía de 30 días y Pago Contra Entrega, igual que cualquier producto LÉGER.",
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
  bruma: "roll-on",
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
