export type PricingTier = {
  id: string;
  label: string;
  units: string;
  price: number;
  compareAtPrice?: number;
  badge?: string;
  isFeatured?: boolean;
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
};

export type Product = {
  slug: string;
  shortName: string;
  fullName: string;
  tagline: string;
  price: number;
  compareAtPrice?: number;
  heroHeadline: string;
  heroSubheadline: string;
  gradient: string;
  accent: string;
  emoji: string;
  images?: string[];
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
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "50760000000",
  whatsappDisplay: "+507 6000-0000",
  country: "Panamá",
  guaranteeDays: 30,
  founderCount: 500,
};

export const testimonials: Testimonial[] = [
  {
    name: "María Fernández",
    city: "Ciudad de Panamá",
    quote:
      "Trabajo 10 horas de pie en la farmacia y para las 6pm sentía que cargaba troncos. Con el Roll-On siento el frío de inmediato y mis piernas se sienten ligeras otra vez.",
    rating: 5,
  },
  {
    name: "Yaritza Gómez",
    city: "San Miguelito",
    quote:
      "Soy maestra y paso todo el día parada. Las medias de compresión son mi secreto — cómodas, no se notan bajo el pantalón y llego a casa sin esa hinchazón de siempre.",
    rating: 5,
  },
  {
    name: "Carolina Ruiz",
    city: "Panamá Este",
    quote:
      "La Bruma vive en mi cartera. Un spray a media tarde y es como reiniciar las piernas. Pagué contra entrega y llegó en dos días, cero riesgo.",
    rating: 5,
  },
  {
    name: "Ana Lucía Prado",
    city: "Ciudad de Panamá",
    quote:
      "Compré el Kit Completo por curiosidad y ahora es parte de mi rutina diaria. Se nota que está pensado para el calor de aquí, no es una crema genérica de farmacia.",
    rating: 5,
  },
];

export const products: Product[] = [
  {
    slug: "roll-on",
    shortName: "Roll-On Crioactivo",
    fullName:
      "Roll-On Frío de Centella Asiática y Cafeína — Alivio Inmediato para Piernas Pesadas",
    tagline: "Lo sientes frío, lo sientes trabajando — en 60 segundos.",
    price: 29,
    compareAtPrice: 45,
    heroHeadline: "¿Tus piernas se sienten pesadas antes de que termine el día?",
    heroSubheadline:
      "El Roll-On Crioactivo LÉGER combina Centella Asiática, Cafeína y una bola aplicadora fría que drena la pesadez al instante — sientes el efecto desde la primera aplicación.",
    gradient: "from-mint-100 via-mint-50 to-frost",
    accent: "mint",
    emoji: "🧊",
    images: [
      "/images/roll-on-1.png",
      "/images/roll-on-2.png",
      "/images/roll-on-3.png",
    ],
    agitation: [
      "Al final del día sientes que cargas troncos en vez de piernas.",
      "Las medias o el pantalón te dejan marca en los tobillos.",
      "Te da pena usar sandalias porque tus piernas se ven hinchadas.",
      "Sientes que esto va a \"empeorar\" con los años y te preocupa.",
    ],
    whyItHappens:
      "Cuando pasas muchas horas de pie o sentada, la circulación venosa de las piernas tiene que trabajar contra la gravedad para regresar la sangre al corazón. El calor tropical dilata los vasos y hace todo peor, retenido líquido se acumula y sientes pesadez, hinchazón y esa sensación de \"piernas de tronco\" al final del día.",
    howItWorks: [
      { step: "1", title: "Aplica", description: "Desliza la bola de metal fría por tu pierna, de tobillo hacia la rodilla." },
      { step: "2", title: "Siente el frío", description: "El mentol y la bola metálica generan una sensación fría inmediata con micro-masaje de drenaje." },
      { step: "3", title: "Piernas ligeras", description: "La Centella Asiática y la Cafeína siguen trabajando en la microcirculación mientras sigues tu día." },
    ],
    ingredients: [
      { name: "Centella Asiática", icon: "leaf", benefit: "Estudiada por su efecto en la microcirculación venosa." },
      { name: "Cafeína", icon: "coffee", benefit: "Efecto drenante y descongestivo natural." },
      { name: "Mentol", icon: "snowflake", benefit: "Frío inmediato — la prueba sensorial de que está funcionando." },
      { name: "Bola Aplicadora Metálica", icon: "droplets", benefit: "Se siente fría al contacto y da micro-masaje de drenaje." },
    ],
    comparison: [
      { feature: "Ingredientes con nombre y estudio", leger: true, generic: false, nothing: false },
      { feature: "Sensación fría inmediata", leger: true, generic: false, nothing: false },
      { feature: "Pago contra entrega, cero riesgo", leger: true, generic: true, nothing: false },
      { feature: "Formulado para clima tropical", leger: true, generic: false, nothing: false },
      { feature: "Garantía de devolución 30 días", leger: true, generic: false, nothing: false },
    ],
    pricingTiers: [
      { id: "1x", label: "1 Unidad", units: "30 días de uso", price: 29 },
      { id: "2x", label: "2 Unidades", units: "60 días de uso", price: 46, compareAtPrice: 58, badge: "Ahorra $12" },
      { id: "kit", label: "Kit Completo", units: "Roll-On + Medias + Bruma", price: 59, compareAtPrice: 73, badge: "Más Popular", isFeatured: true },
    ],
    faq: [
      { question: "¿Esto en verdad funciona o es otra crema más?", answer: "El Roll-On combina Centella Asiática y Cafeína con una bola aplicadora fría que sientes trabajando desde el primer uso — no es una promesa vacía, es una sensación inmediata y real." },
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
    price: 25,
    compareAtPrice: 39,
    heroHeadline: "La misma tecnología que usan las aeromozas y enfermeras — ahora con estilo",
    heroSubheadline:
      "Compresión graduada real en fibra de bambú y grafeno: más apretado en el tobillo, disminuye hacia la rodilla, para circulación activa durante tu día completo.",
    gradient: "from-sand-100 via-sand-50 to-mint-50",
    accent: "sand",
    emoji: "🧦",
    images: [
      "/images/medias-1.png",
      "/images/medias-2.png",
      "/images/medias-3.png",
      "/images/medias-4.png",
      "/images/medias-5.png",
    ],
    agitation: [
      "Terminas tu turno con los pies y tobillos hinchados.",
      "Los vuelos largos o los turnos de pie te dejan las piernas \"cargadas\".",
      "Has probado medias \"de compresión\" baratas que en realidad no comprimen nada.",
      "Te preocupa que la mala circulación empeore con los años.",
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
      { id: "1x", label: "1 Par", units: "Día o noche", price: 25 },
      { id: "2x", label: "2 Pares", units: "Rotación semanal", price: 40, compareAtPrice: 50, badge: "Ahorra $10" },
      { id: "kit", label: "Kit Completo", units: "Roll-On + Medias + Bruma", price: 59, compareAtPrice: 73, badge: "Más Popular", isFeatured: true },
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
    price: 19,
    compareAtPrice: 29,
    heroHeadline: "El refresh de piernas que cabe en tu cartera",
    heroSubheadline:
      "Un spray frío de Castaño de Indias, Mentol y Cafeína Verde para ese \"bajón\" de piernas a media tarde — sin manos libres, sin rutina, en segundos.",
    gradient: "from-mint-50 via-frost to-mint-100",
    accent: "mint",
    emoji: "💦",
    images: [
      "/images/bruma-1.png",
      "/images/bruma-2.png",
      "/images/bruma-3.png",
      "/images/bruma-4.png",
      "/images/bruma-5.png",
    ],
    agitation: [
      "A media tarde sientes el \"bajón\" de piernas y no estás en casa para hacer nada.",
      "No tienes tiempo ni manos libres para una rutina de masaje.",
      "Sientes que necesitas algo rápido entre reuniones, en el bus o en un vuelo.",
      "Quieres sentirte fresca antes de salir en la noche, sin bañarte de nuevo.",
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
      { id: "1x", label: "1 Unidad", units: "Uso diario x 30 días", price: 19 },
      { id: "2x", label: "2 Unidades", units: "Casa + cartera", price: 30, compareAtPrice: 38, badge: "Ahorra $8" },
      { id: "kit", label: "Kit Completo", units: "Roll-On + Medias + Bruma", price: 59, compareAtPrice: 73, badge: "Más Popular", isFeatured: true },
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
  tagline: "Los 3 productos, un solo ritual — ahorra $14",
  price: 59,
  compareAtPrice: 73,
  includes: products.map((p) => p.shortName),
};

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export type CheckoutOption = {
  slug: string;
  name: string;
  emoji: string;
  tiers: PricingTier[];
  allowBump: boolean;
};

export const checkoutOptions: CheckoutOption[] = [
  ...products.map((p) => ({
    slug: p.slug,
    name: p.shortName,
    emoji: p.emoji,
    tiers: p.pricingTiers,
    allowBump: p.slug !== "bruma",
  })),
  {
    slug: kitProduct.slug,
    name: kitProduct.name,
    emoji: "🎁",
    tiers: [
      {
        id: "kit",
        label: "Kit Completo",
        units: "Roll-On + Medias + Bruma",
        price: kitProduct.price,
        compareAtPrice: kitProduct.compareAtPrice,
        badge: "Más Popular",
        isFeatured: true,
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
