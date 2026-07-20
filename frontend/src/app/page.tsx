import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Sparkles, CheckCircle2 } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { ProductVisual } from "@/components/product-visual";
import { IngredientCard } from "@/components/ingredient-card";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { AggregateRatingBadge } from "@/components/aggregate-rating-badge";
import { BeforeAfterSection } from "@/components/before-after-section";
import { StatsStrip } from "@/components/stats-strip";
import { BrandComparisonTable } from "@/components/brand-comparison-table";
import { FaqAccordion } from "@/components/faq-accordion";
import { StickyCtaBar } from "@/components/sticky-cta-bar";
import { TrustBar } from "@/components/trust-bar";
import { BUSINESS, products, kitProduct, duoOffers, type FAQItem, type Ingredient } from "@/lib/products";
import { formatUSD } from "@/lib/utils";

const ritualSteps = [
  { time: "Mañana", title: "Gel Crioactivo", description: "Frío inmediato — activa la sensación y drena la pesadez desde temprano." },
  { time: "Día", title: "Medias 360°", description: "Compresión graduada 15–20 mmHg — sostiene la circulación todo el día." },
  { time: "Tarde", title: "Bruma Instantánea", description: "Refresca y \"reinicia\" las piernas en segundos, sin manos libres." },
];

const keyIngredients: Ingredient[] = [
  { name: "Centella Asiática", icon: "leaf", benefit: "Apoya la microcirculación venosa." },
  { name: "Castaño de Indias", icon: "shield", benefit: "Venotónico clásico — confort y tono venoso." },
  { name: "Mentol / efecto frío", icon: "snowflake", benefit: "Alivio inmediato — la prueba sensorial de que está funcionando." },
];

const homeFaq: FAQItem[] = [
  { question: "¿Cómo funciona el pago contra entrega?", answer: "Pagas en efectivo al recibir tu pedido. Cero riesgo, cero adelanto." },
  { question: "¿Cuánto tarda el envío?", answer: "24–48h en Ciudad de Panamá; 2–4 días al interior." },
  { question: "¿Cada cuánto uso los productos?", answer: "Gel por la mañana, Medias durante el día, Bruma cuando lo necesites." },
  { question: "¿Sirve si paso muchas horas de pie o sentada?", answer: "Sí, está diseñado justo para eso." },
  { question: "¿Es apto en el embarazo?", answer: "La fibra de bambú es suave y transpirable; aun así, consulta a tu médico." },
  { question: "¿Y si no me funciona?", answer: `Tienes garantía de ${BUSINESS.guaranteeDays} días.` },
  { question: "¿Qué tallas hay en las medias?", answer: "Talla única con compresión adaptable (S–XL) — cubre la mayoría de tallas de pantorrilla y pie femenino." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Section id="hero" className="pb-10 pt-10 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Ciencia Circulatoria de Grado Farmacéutico</Eyebrow>
            <h1 className="font-display text-4xl font-semibold leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl">
              No es cansancio. Es tu circulación pidiendo ayuda.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink/70">
              El único sistema de bienestar circulatorio formulado con ingredientes de grado
              farmacéutico — Centella Asiática, Castaño de Indias, Compresión Graduada — adaptado
              específicamente al clima tropical de Panamá. Sin intermediarios, sin sobreprecio de farmacia.
            </p>

            <AggregateRatingBadge className="mt-4" />

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <LinkButton href="/kit-completo" size="lg">
                Empieza a sentirte ligera hoy
              </LinkButton>
              <LinkButton href="/checkout" variant="outline" size="lg">
                Pedir con Pago Contra Entrega
              </LinkButton>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-ink/60">
              <span className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-mint-600" /> Pago Contra Entrega
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-mint-600" /> Garantía {BUSINESS.guaranteeDays} días
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-mint-600" /> Grado Farmacéutico
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ProductVisual
              emoji={products[0].emoji}
              gradient={products[0].gradient}
              images={products[0].images ? [products[0].images[0]] : undefined}
              className="col-span-2"
            />
            <ProductVisual
              emoji={products[1].emoji}
              gradient={products[1].gradient}
              images={products[1].images ? [products[1].images[0]] : undefined}
              size="sm"
            />
            <ProductVisual
              emoji={products[2].emoji}
              gradient={products[2].gradient}
              images={products[2].images ? [products[2].images[0]] : undefined}
              size="sm"
            />
          </div>
        </div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <StatsStrip />
      </Section>

      {/* Brand pillars */}
      <Section className="bg-mint-50/50">
        <SectionHeading
          eyebrow="Por qué LÉGER"
          title="La autoridad de una farmacia, sin el sobreprecio de una farmacia"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { title: "Grado farmacéutico", desc: "Ingredientes con nombre, mecanismo de acción y estudio — igual que te explicaría un farmacéutico." },
            { title: "Sensación inmediata", desc: "El frío se siente desde el primer uso — la prueba de que funciona." },
            { title: "Hecho para el trópico", desc: "Formulado para el calor, la humedad y estar de pie todo el día." },
            { title: "Transparencia radical", desc: "Ingredientes claros, garantía real, cero promesas vacías." },
            { title: "Comunidad", desc: `+${BUSINESS.founderCount} mujeres ya confían en ${BUSINESS.brand}.` },
          ].map((pillar) => (
            <div key={pillar.title} className="rounded-2xl border border-mint-100 bg-white p-5">
              <CheckCircle2 className="h-6 w-6 text-mint-600" />
              <p className="mt-3 font-bold text-ink">{pillar.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Brand story */}
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-mint-200 bg-white/70 p-6 text-center sm:p-8">
          <p className="font-display text-lg leading-relaxed text-ink/80 sm:text-xl">
            &ldquo;{BUSINESS.brand} nació para llevar el rigor de una farmacia directo a tu casa —
            sin intermediarios, sin sobreprecio— formulado para el calor y la humedad de{" "}
            {BUSINESS.country}.&rdquo;
          </p>
          <Link
            href="/nosotros"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-mint-700 hover:underline"
          >
            Conoce nuestra historia <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Section>

      {/* Comparación */}
      <Section>
        <SectionHeading
          eyebrow="La comparación"
          title={`${BUSINESS.brand} vs. farmacia vs. cremas genéricas`}
        />
        <BrandComparisonTable />
      </Section>

      {/* Cómo funciona — el ritual + la ciencia */}
      <Section>
        <SectionHeading
          eyebrow="Cómo funciona"
          title="Un producto para cada momento del día"
          subtitle="El ritual completo de piernas ligeras, respaldado por ingredientes con nombre y mecanismo de acción."
        />
        <div className="grid gap-6 sm:grid-cols-3">
          {ritualSteps.map((step) => (
            <div key={step.time} className="rounded-2xl border border-mint-100 bg-white p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-mint-600">{step.time}</p>
              <p className="mt-2 font-display text-lg font-semibold text-ink">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {keyIngredients.map((ing) => (
            <IngredientCard key={ing.name} ingredient={ing} />
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-ink/50">
          Resultados individuales pueden variar. LÉGER es un producto de bienestar y no sustituye el
          consejo ni el tratamiento médico.
        </p>
      </Section>

      <BeforeAfterSection />

      {/* Product showcase */}
      <Section>
        <SectionHeading
          eyebrow="Nuestros productos"
          title="Un sistema completo, no un producto suelto"
          subtitle="Tres productos, un solo problema, resuelto desde todos los ángulos."
        />
        <div className="grid gap-6 sm:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="group flex flex-col gap-4 rounded-3xl border border-mint-100 bg-white p-6 transition-shadow hover:shadow-xl"
            >
              <ProductVisual
                emoji={p.emoji}
                gradient={p.gradient}
                images={p.images ? [p.images[0]] : undefined}
                size="sm"
              />
              <div>
                <p className="font-display text-lg font-semibold text-ink">{p.shortName}</p>
                <p className="mt-1 text-sm text-ink/60">{p.tagline}</p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="text-lg font-bold text-mint-700">{formatUSD(p.price)}</span>
                <span className="flex items-center gap-1 text-sm font-semibold text-mint-700">
                  Ver producto <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bundle callout */}
        <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-3xl bg-mint-900 p-8 text-white sm:flex-row sm:p-10">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-block rounded-full bg-sand-500 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                Más Popular
              </span>
              <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Oferta de Lanzamiento
              </span>
            </div>
            <p className="mt-3 font-display text-2xl font-semibold">{kitProduct.name}</p>
            <p className="mt-1 text-mint-200">{kitProduct.tagline}</p>
            <p className="mt-2 text-xs font-semibold text-mint-300">Pídelo hoy y recíbelo en 24–48h.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-3xl font-extrabold">{formatUSD(kitProduct.price)}</p>
              <p className="text-sm text-mint-300 line-through">{formatUSD(kitProduct.compareAtPrice)}</p>
            </div>
            <LinkButton href="/kit-completo" size="lg">
              Ver el Kit
            </LinkButton>
          </div>
        </div>

        {/* Duo bundles */}
        {duoOffers.length > 0 && (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {duoOffers.map((duo) => (
              <Link
                key={duo.slug}
                href={`/${duo.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-mint-100 bg-white p-5 transition-shadow hover:shadow-lg"
              >
                <div>
                  <span className="inline-block rounded-full bg-mint-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-mint-700">
                    {duo.badge}
                  </span>
                  <p className="mt-2 font-display text-lg font-semibold text-ink">{duo.title}</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-mint-700">{formatUSD(duo.price)}</span>
                    <span className="text-sm text-ink/50 line-through">{formatUSD(duo.compareAtPrice)}</span>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-sm font-semibold text-mint-700">
                  Ver dúo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </Section>

      {/* Testimonials */}
      <Section className="bg-mint-50/50">
        <SectionHeading eyebrow="Prueba social" title={`Más de ${BUSINESS.founderCount} personas que ya confían en ${BUSINESS.brand}`} />
        <AggregateRatingBadge className="-mt-6 mb-8 justify-center" />
        <TestimonialsCarousel />
      </Section>

      {/* FAQ */}
      <Section className="bg-mint-50/50">
        <SectionHeading eyebrow="Preguntas Frecuentes" title="Todo lo que necesitas saber" />
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={homeFaq} />
        </div>
      </Section>

      {/* Trust bar */}
      <Section>
        <TrustBar />
      </Section>

      {/* Final CTA */}
      <Section className="pt-0">
        <div className="mx-auto max-w-3xl rounded-3xl bg-mint-900 px-6 py-14 text-center text-white sm:px-14">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Tus piernas merecen sentirse {BUSINESS.brand.charAt(0)}{BUSINESS.brand.slice(1).toLowerCase()}
          </h2>
          <p className="mt-4 text-mint-100">
            Pago Contra Entrega en toda {BUSINESS.country}. Pagas solo cuando lo recibes. Garantía de {BUSINESS.guaranteeDays} días.
          </p>
          <div className="mt-8">
            <LinkButton href="/checkout" size="lg">
              Quiero piernas ligeras — Pedir ahora
            </LinkButton>
          </div>
        </div>
      </Section>

      <div className="h-20 sm:hidden" aria-hidden />
      <StickyCtaBar
        price={kitProduct.price}
        compareAtPrice={kitProduct.compareAtPrice}
        productSlug="kit-completo"
        planId="kit"
        label="Pedir el Kit"
        unitLabel="Kit Completo"
      />
    </>
  );
}
