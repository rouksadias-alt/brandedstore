import { CheckCircle2, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { ProductVisual } from "@/components/product-visual";
import { IngredientCard } from "@/components/ingredient-card";
import { DemoVideo } from "@/components/demo-video";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { AggregateRatingBadge } from "@/components/aggregate-rating-badge";
import { ProductJsonLd } from "@/components/product-json-ld";
import { ComparisonTable } from "@/components/comparison-table";
import { PricingTiers } from "@/components/pricing-tiers";
import { FaqAccordion } from "@/components/faq-accordion";
import { StickyCtaBar } from "@/components/sticky-cta-bar";
import { TrustBar } from "@/components/trust-bar";
import { BUSINESS, type Product } from "@/lib/products";
import { cn, formatUSD } from "@/lib/utils";

export function ProductLandingPage({ product }: { product: Product }) {
  return (
    <>
      <ProductJsonLd
        product={{
          slug: product.slug,
          name: product.fullName,
          description: product.tagline,
          price: product.price,
          images: product.images,
          reviewTag: product.shortName,
        }}
      />

      {/* 1. Hero */}
      <Section id="hero" className="pb-10 pt-8 sm:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{product.shortName}</Eyebrow>
            <h1 className="font-display text-4xl font-semibold leading-[1.1] text-balance text-ink sm:text-5xl">
              {product.heroHeadline}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">
              {product.heroSubheadline}
            </p>

            <AggregateRatingBadge className="mt-4" />

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <LinkButton href={`/checkout?product=${product.slug}`} size="lg">
                Pedir con Pago Contra Entrega
              </LinkButton>
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-mint-600">
                  {product.heroPriceLabel ?? "Precio por unidad"}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-mint-700">
                    {formatUSD(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-base text-ink/50 line-through">
                      {formatUSD(product.compareAtPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-ink/60">
              <span className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-mint-600" /> Pago Contra Entrega
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-mint-600" /> Garantía {BUSINESS.guaranteeDays} días
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-mint-600" /> Envío rápido en Panamá
              </span>
            </div>
          </div>

          <ProductVisual
            emoji={product.emoji}
            gradient={product.gradient}
            images={product.images}
          />
        </div>
      </Section>

      {/* 1.5 Teaser de ofertas — atajo para compradores decididos */}
      <Section className="py-0 sm:py-0">
        <div className="rounded-3xl border border-mint-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {product.pricingTiers.map((tier) => (
              <a
                key={tier.id}
                href="#oferta"
                className={cn(
                  "relative flex flex-col items-center gap-0.5 rounded-2xl border-2 px-2 py-3 text-center transition-all sm:px-4 sm:py-4",
                  tier.isFeatured
                    ? "border-mint-600 bg-mint-50"
                    : "border-black/10 bg-white hover:border-mint-300"
                )}
              >
                {tier.badge && (
                  <span
                    className={cn(
                      "absolute -top-2.5 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white sm:text-[10px]",
                      tier.isFeatured ? "bg-sand-500" : "bg-mint-600"
                    )}
                  >
                    {tier.badge}
                  </span>
                )}
                <p className="mt-1 text-xs font-bold leading-tight text-ink sm:text-sm">{tier.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-extrabold text-mint-700 sm:text-xl">
                    {formatUSD(tier.price)}
                  </span>
                  {tier.compareAtPrice && (
                    <span className="text-[11px] text-ink/50 line-through">
                      {formatUSD(tier.compareAtPrice)}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
          <p className="mt-3 text-center text-[11px] font-medium text-ink/50">
            Toca una oferta para ver los detalles y pedir ↓
          </p>
        </div>
      </Section>

      {/* 2. Problema (agitar) */}
      <Section className="mt-14 bg-mint-50/50 sm:mt-20">
        <SectionHeading
          eyebrow="¿Te pasa esto?"
          title="Sabes exactamente de qué hablamos"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {product.agitation.map((point) => (
            <div
              key={point}
              className="flex items-start gap-3 rounded-2xl border border-mint-100 bg-white p-5"
            >
              <span className="mt-0.5 text-xl">😩</span>
              <p className="text-ink/80">{point}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Por qué pasa */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>La ciencia, simple</Eyebrow>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            ¿Por qué pasa esto?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            {product.whyItHappens}
          </p>
        </div>
      </Section>

      {/* 4. La solución + cómo funciona */}
      <Section className="bg-mint-50/50">
        <SectionHeading
          eyebrow="Cómo funciona"
          title={`De aplicar a sentirte ${BUSINESS.tagline.split(" ").pop()} en 3 pasos`}
        />
        {product.demoVideo && (
          <DemoVideo video={product.demoVideo} className="mb-10 sm:mb-12" />
        )}
        <div className="grid gap-6 sm:grid-cols-3">
          {product.howItWorks.map((step) => (
            <div key={step.step} className="rounded-2xl border border-mint-100 bg-white p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-mint-600 font-display text-xl font-bold text-white">
                {step.step}
              </div>
              <p className="font-bold text-ink">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Ingredientes */}
      <Section>
        <SectionHeading
          eyebrow="Ingredientes con nombre y apellido"
          title="Ciencia real, no promesas vacías"
          subtitle="Nunca decimos solo 'ingredientes naturales' — así es exactamente lo que lleva."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {product.ingredients.map((ing) => (
            <IngredientCard key={ing.name} ingredient={ing} />
          ))}
        </div>
      </Section>

      {/* 6. Prueba social */}
      <Section className="bg-mint-50/50">
        <SectionHeading
          eyebrow="Prueba social"
          title={`Las mujeres que ya confían en ${BUSINESS.brand}`}
        />
        <AggregateRatingBadge className="-mt-6 mb-8 justify-center" />
        <TestimonialsCarousel />
      </Section>

      {/* 7. Comparación */}
      <Section>
        <SectionHeading
          eyebrow="La comparación"
          title={`${BUSINESS.brand} vs. cremas genéricas vs. no hacer nada`}
        />
        <ComparisonTable rows={product.comparison} />
      </Section>

      {/* 8. Oferta y cantidad */}
      <Section className="bg-mint-50/50" id="oferta">
        <SectionHeading eyebrow="Elige tu plan" title="Entre más llevas, más ahorras" />
        <div className="mx-auto max-w-3xl">
          <PricingTiers tiers={product.pricingTiers} productSlug={product.slug} />
        </div>
      </Section>

      {/* 9. Garantía */}
      <Section>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-mint-100 bg-white p-8 text-center">
            <ShieldCheck className="h-10 w-10 text-mint-600" />
            <p className="font-display text-xl font-semibold text-ink">
              Garantía de {BUSINESS.guaranteeDays} Días
            </p>
            <p className="text-sm leading-relaxed text-ink/65">
              Si no sientes la diferencia, te devolvemos tu dinero. Sin preguntas complicadas.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-mint-100 bg-white p-8 text-center">
            <Truck className="h-10 w-10 text-mint-600" />
            <p className="font-display text-xl font-semibold text-ink">Pago Contra Entrega</p>
            <p className="text-sm leading-relaxed text-ink/65">
              Pagas en efectivo solo cuando el pedido llega a tu puerta. Cero riesgo, cero tarjeta.
            </p>
          </div>
        </div>
      </Section>

      {/* 10. FAQ */}
      <Section className="bg-mint-50/50">
        <SectionHeading eyebrow="Preguntas Frecuentes" title="Todo lo que necesitas saber" />
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={product.faq} />
        </div>
      </Section>

      {/* 11. CTA final */}
      <Section>
        <div className="mx-auto max-w-3xl rounded-3xl bg-mint-900 px-6 py-14 text-center text-white sm:px-14">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            {product.tagline}
          </h2>
          <p className="mt-4 text-mint-100">
            Únete a las +{BUSINESS.founderCount} mujeres que ya sienten sus piernas ligeras con {BUSINESS.brand}.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <LinkButton href={`/checkout?product=${product.slug}`} size="lg" variant="primary">
              Pedir con Pago Contra Entrega
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
        price={product.price}
        compareAtPrice={product.compareAtPrice}
        productSlug={product.slug}
        unitLabel={product.heroPriceLabel}
      />
    </>
  );
}
