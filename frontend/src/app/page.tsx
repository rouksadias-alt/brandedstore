import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Sparkles, CheckCircle2 } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { ProductVisual } from "@/components/product-visual";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { TrustBar } from "@/components/trust-bar";
import { BUSINESS, products, kitProduct } from "@/lib/products";
import { formatUSD } from "@/lib/utils";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Section className="pb-10 pt-10 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>La marca #1 de piernas ligeras en Panamá</Eyebrow>
            <h1 className="font-display text-4xl font-semibold leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl">
              No es cansancio. Es tu circulación pidiendo ayuda.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink/70">
              El primer sistema de bienestar circulatorio diseñado para el clima tropical —
              formulado con Centella Asiática y Castaño de Indias, no una crema genérica más.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <LinkButton href="/kit-completo" size="lg">
                Ver el Kit Completo
              </LinkButton>
              <LinkButton href="/checkout" variant="outline" size="lg">
                Pedir Ahora
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
                <Sparkles className="h-4 w-4 text-mint-600" /> Hecho para el trópico
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ProductVisual
              emoji={products[0].emoji}
              gradient={products[0].gradient}
              className="col-span-2"
            />
            <ProductVisual emoji={products[1].emoji} gradient={products[1].gradient} size="sm" />
            <ProductVisual emoji={products[2].emoji} gradient={products[2].gradient} size="sm" />
          </div>
        </div>
      </Section>

      {/* Brand pillars */}
      <Section className="bg-mint-50/50">
        <SectionHeading
          eyebrow="Por qué LÉGER"
          title="Cinco razones por las que las panameñas confían en nosotros"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { title: "Ciencia real", desc: "Ingredientes estudiados, con nombre y explicados simplemente." },
            { title: "Sensación inmediata", desc: "El frío se siente desde el primer uso — la prueba de que funciona." },
            { title: "Hecho para el trópico", desc: "Formulado para el calor, la humedad y estar de pie todo el día." },
            { title: "Autoridad y transparencia", desc: "Ingredientes claros, garantía real, políticas honestas." },
            { title: "Pertenencia", desc: `+${BUSINESS.founderCount} mujeres ya confían en ${BUSINESS.brand}.` },
          ].map((pillar) => (
            <div key={pillar.title} className="rounded-2xl border border-mint-100 bg-white p-5">
              <CheckCircle2 className="h-6 w-6 text-mint-600" />
              <p className="mt-3 font-bold text-ink">{pillar.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </Section>

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
              <ProductVisual emoji={p.emoji} gradient={p.gradient} size="sm" />
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
            <span className="inline-block rounded-full bg-sand-500 px-3 py-1 text-xs font-bold uppercase tracking-wide">
              Más Popular
            </span>
            <p className="mt-3 font-display text-2xl font-semibold">{kitProduct.name}</p>
            <p className="mt-1 text-mint-200">{kitProduct.tagline}</p>
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
      </Section>

      {/* Testimonials */}
      <Section className="bg-mint-50/50">
        <SectionHeading eyebrow="Prueba social" title={`Las mujeres que ya confían en ${BUSINESS.brand}`} />
        <TestimonialsCarousel />
      </Section>

      {/* Trust bar */}
      <Section>
        <TrustBar />
      </Section>

      {/* Final CTA */}
      <Section className="pt-0">
        <div className="mx-auto max-w-3xl rounded-3xl bg-mint-900 px-6 py-14 text-center text-white sm:px-14">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Siéntete {BUSINESS.brand.charAt(0)}{BUSINESS.brand.slice(1).toLowerCase()}
          </h2>
          <p className="mt-4 text-mint-100">
            Pago Contra Entrega en toda {BUSINESS.country}. Pagas solo cuando lo recibes.
          </p>
          <div className="mt-8">
            <LinkButton href="/checkout" size="lg">
              Pedir Ahora
            </LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}
