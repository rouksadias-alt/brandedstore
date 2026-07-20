import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, CheckCircle2 } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { ProductVisual } from "@/components/product-visual";
import { DemoVideo } from "@/components/demo-video";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { AggregateRatingBadge } from "@/components/aggregate-rating-badge";
import { ProductJsonLd } from "@/components/product-json-ld";
import { ValueStack } from "@/components/value-stack";
import { FaqAccordion } from "@/components/faq-accordion";
import { StickyCtaBar } from "@/components/sticky-cta-bar";
import { TrustBar } from "@/components/trust-bar";
import { BUSINESS, products, kitProduct } from "@/lib/products";
import { formatUSD } from "@/lib/utils";

export const metadata: Metadata = {
  title: kitProduct.name,
  description: kitProduct.tagline,
};

const separatePrice = kitProduct.compareAtPrice;

const kitFaq = [
  {
    question: "¿El Kit realmente ahorra dinero vs. comprar por separado?",
    answer: `Sí — comprado por separado suma ${formatUSD(separatePrice)}. El Kit Completo cuesta ${formatUSD(kitProduct.price)}, un ahorro real de ${formatUSD(separatePrice - kitProduct.price)}.`,
  },
  {
    question: "¿Cómo uso los 3 productos juntos?",
    answer:
      "Gel en la mañana o al llegar del trabajo, Medias de Compresión durante el día activo, y Bruma en cualquier momento que sientas el 'bajón' de piernas — un ritual completo para cada momento del día.",
  },
  {
    question: "¿Tiene la misma garantía que los productos individuales?",
    answer: `Sí — Garantía de ${BUSINESS.guaranteeDays} días sobre todo el kit y Pago Contra Entrega, igual que cualquier producto LÉGER.`,
  },
  {
    question: "¿Cómo pago?",
    answer: "Pago Contra Entrega — pagas en efectivo al repartidor cuando recibes tu pedido. Cero riesgo.",
  },
];

export default function KitCompletoPage() {
  return (
    <>
      <ProductJsonLd
        product={{
          slug: kitProduct.slug,
          name: kitProduct.name,
          description: kitProduct.tagline,
          price: kitProduct.price,
          images: kitProduct.images,
          reviewTag: "Kit Completo",
        }}
      />

      <Section id="hero" className="pb-10 pt-8 sm:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Oferta Ancla — Más Popular</Eyebrow>
            <h1 className="font-display text-4xl font-semibold leading-[1.1] text-balance text-ink sm:text-5xl">
              {kitProduct.name}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">
              Un ritual completo para piernas ligeras todo el día: frío inmediato en la mañana,
              compresión activa durante el día y refresco instantáneo en cualquier momento.
            </p>

            <AggregateRatingBadge className="mt-4" />

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <LinkButton href="/checkout?product=kit-completo&plan=kit" size="lg">
                Pedir el Kit Completo
              </LinkButton>
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-mint-600">
                  Los 3 productos juntos
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-mint-700">
                    {formatUSD(kitProduct.price)}
                  </span>
                  <span className="text-base text-ink/50 line-through">
                    {formatUSD(separatePrice)}
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-2 text-sm font-bold text-mint-700">
              Ahorras {formatUSD(separatePrice - kitProduct.price)} vs. comprar por separado
            </p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-ink/60">
              <span className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-mint-600" /> Pago Contra Entrega
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-mint-600" /> Garantía {BUSINESS.guaranteeDays} días
              </span>
            </div>
          </div>

          <ProductVisual
            emoji="🎁"
            gradient="from-mint-100 via-mint-50 to-sand-50"
            images={kitProduct.images}
          />
        </div>
      </Section>

      {/* Qué incluye */}
      <Section className="bg-mint-50/50">
        <SectionHeading eyebrow="Qué incluye" title="Los 3 productos, un solo ritual" />
        <div className="grid gap-5 sm:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="group flex flex-col gap-4 rounded-2xl border border-mint-100 bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <ProductVisual
                emoji={p.emoji}
                gradient={p.gradient}
                images={p.images ? [p.images[0]] : undefined}
                size="sm"
              />
              <div>
                <p className="font-bold text-ink">{p.shortName}</p>
                <p className="mt-1 text-sm text-ink/60">{p.tagline}</p>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-mint-600">
                    {p.heroPriceLabel ?? "Precio por unidad"}
                  </p>
                  <span className="text-sm font-bold text-mint-700">{formatUSD(p.price)}</span>
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-mint-700 opacity-0 transition-opacity group-hover:opacity-100">
                  Ver más <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Ritual del día */}
      <Section>
        <SectionHeading eyebrow="Tu ritual diario" title="Un producto para cada momento del día" />
        {kitProduct.demoVideo && (
          <DemoVideo video={kitProduct.demoVideo} className="mb-10 sm:mb-12" />
        )}
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { time: "Mañana", product: products[0], desc: "Aplica el Gel frío para empezar el día con piernas activas." },
            { time: "Durante el día", product: products[1], desc: "Usa las Medias de Compresión en tu turno, oficina o viaje." },
            { time: "Cuando lo necesites", product: products[2], desc: "Refresca al instante con la Bruma, sin manos libres." },
          ].map((step) => (
            <div key={step.time} className="rounded-2xl border border-mint-100 bg-white p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-mint-600">{step.time}</p>
              <p className="mt-2 font-display text-lg font-semibold text-ink">{step.product.shortName}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{step.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonios */}
      <Section className="bg-mint-50/50">
        <SectionHeading eyebrow="Prueba social" title={`Las mujeres que ya confían en ${BUSINESS.brand}`} />
        <AggregateRatingBadge className="-mt-6 mb-8 justify-center" />
        <TestimonialsCarousel />
      </Section>

      {/* Oferta */}
      <Section id="oferta">
        <div className="mx-auto max-w-xl rounded-3xl border-2 border-mint-600 bg-mint-50 p-6 sm:p-8 text-center shadow-lg">
          <span className="inline-block rounded-full bg-sand-500 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Más Popular
          </span>
          <p className="mt-4 font-display text-2xl font-semibold text-ink">{kitProduct.name}</p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="text-4xl font-extrabold text-mint-700">{formatUSD(kitProduct.price)}</span>
            <span className="text-lg text-ink/50 line-through">{formatUSD(separatePrice)}</span>
          </div>
          <p className="mt-1 text-sm font-semibold text-mint-700">
            Ahorras {formatUSD(separatePrice - kitProduct.price)}
          </p>
          <ValueStack
            className="mt-6"
            items={products.map((p) => ({ label: p.shortName, price: p.price }))}
            total={separatePrice}
            price={kitProduct.price}
          />
          <LinkButton href="/checkout?product=kit-completo&plan=kit" size="lg" className="mt-7 w-full">
            Pedir el Kit Completo
          </LinkButton>
          <p className="mt-3 text-xs font-medium text-ink/50">
            Pago Contra Entrega — pagas solo cuando lo recibes.
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-mint-50/50">
        <SectionHeading eyebrow="Preguntas Frecuentes" title="Todo lo que necesitas saber" />
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={kitFaq} />
        </div>
      </Section>

      {/* CTA final */}
      <Section>
        <div className="mx-auto max-w-3xl rounded-3xl bg-mint-900 px-6 py-14 text-center text-white sm:px-14">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            El ritual completo para piernas ligeras
          </h2>
          <p className="mt-4 text-mint-100">
            Únete a las +{BUSINESS.founderCount} mujeres que ya sienten sus piernas ligeras con {BUSINESS.brand}.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <LinkButton href="/checkout?product=kit-completo&plan=kit" size="lg">
              Pedir el Kit Completo
            </LinkButton>
            <p className="flex items-center gap-2 text-xs text-mint-200">
              <CheckCircle2 className="h-4 w-4" /> Pagas solo cuando lo recibes
            </p>
          </div>
        </div>
        <TrustBar className="mt-10" />
      </Section>

      <div className="h-20 sm:hidden" aria-hidden />
      <StickyCtaBar
        price={kitProduct.price}
        compareAtPrice={kitProduct.compareAtPrice}
        productSlug="kit-completo"
        planId="kit"
        label="Pedir el Kit Completo"
        unitLabel="Kit Completo"
      />
    </>
  );
}
