"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PartyPopper, MessageCircle, Gift, RefreshCcw, Sparkles, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { LinkButton } from "@/components/ui/button";
import { BUSINESS, getUpsellProducts } from "@/lib/products";
import { formatUSD } from "@/lib/utils";
import { trackPurchase } from "@/lib/analytics";

export function GraciasContent() {
  const searchParams = useSearchParams();
  const wa = searchParams.get("wa");
  const name = searchParams.get("name");
  const product = searchParams.get("product");
  const total = searchParams.get("total");
  const productSlug = searchParams.get("productSlug");
  const planId = searchParams.get("planId");

  const upsellProducts = productSlug ? getUpsellProducts(productSlug, planId) : [];

  useEffect(() => {
    if (!wa) return;
    const timer = setTimeout(() => {
      window.open(wa, "_blank", "noopener,noreferrer");
    }, 900);
    return () => clearTimeout(timer);
  }, [wa]);

  // Order already exists in the DB by the time this page renders (checkout-form
  // only redirects here after a successful POST /orders), so this is a safe
  // place to fire the ad-platform conversion event — even though it's Pago
  // Contra Entrega and not yet actually paid.
  useEffect(() => {
    if (!product || !total) return;
    trackPurchase({ value: Number(total), content_name: product });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once per page load
  }, []);

  return (
    <Section className="pb-24 pt-12">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint-100">
          <PartyPopper className="h-8 w-8 text-mint-700" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-semibold text-ink sm:text-4xl">
          ¡Gracias{name ? `, ${name}` : ""}! Tu pedido fue recibido 🎉
        </h1>
        <p className="mt-4 text-lg text-ink/70">
          {product && total
            ? `Pedimos ${product} por un total de ${formatUSD(Number(total))}, pago contra entrega.`
            : "Tu pedido fue registrado con éxito, pago contra entrega."}
        </p>

        <div className="mt-8 rounded-2xl border border-mint-100 bg-mint-50/60 p-6 text-left">
          <p className="flex items-center gap-2 font-bold text-ink">
            <MessageCircle className="h-5 w-5 text-mint-600" /> Un paso más — confirma por WhatsApp
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            Para agilizar tu entrega, confirma tu pedido con nuestro equipo por WhatsApp. Si no se
            abrió automáticamente, toca el botón de abajo.
          </p>
          {wa && (
            <LinkButton
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              className="mt-4 w-full"
            >
              <MessageCircle className="h-5 w-5" /> Confirmar por WhatsApp
            </LinkButton>
          )}
        </div>

        {upsellProducts.length > 0 && (
          <div className="mt-6 rounded-2xl border-2 border-dashed border-mint-400 bg-white p-6 text-left">
            <p className="flex items-center gap-2 font-bold text-ink">
              <Sparkles className="h-5 w-5 text-mint-600" /> Antes de irte — completa tu ritual
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Muchas clientas piden esto también para cubrir cada momento del día. Un pedido
              rápido y aparte, pago contra entrega igual que el anterior.
            </p>
            <div className={`mt-4 grid gap-3 ${upsellProducts.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {upsellProducts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/checkout?product=${p.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-mint-100 bg-mint-50/50 p-3 transition-shadow hover:shadow-md"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white">
                    {p.images?.[0] ? (
                      <Image src={p.images[0]} alt={p.shortName} fill className="object-cover" sizes="56px" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-2xl">{p.emoji}</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-ink">{p.shortName}</p>
                    <p className="text-xs text-ink/60">
                      {formatUSD(p.price)} — {p.heroPriceLabel ?? "2 unidades"}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-mint-600 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-mint-100 bg-white p-5 text-left">
            <Gift className="h-6 w-6 text-mint-600" />
            <p className="mt-2 font-bold text-ink">Regala $5, Recibe $5</p>
            <p className="mt-1 text-sm text-ink/65">
              Comparte {BUSINESS.brand} con una amiga — cuando ella pida, ambas reciben $5 de
              crédito en su próximo pedido. Te enviaremos tu código por WhatsApp.
            </p>
          </div>
          <div className="rounded-2xl border border-mint-100 bg-white p-5 text-left">
            <RefreshCcw className="h-6 w-6 text-mint-600" />
            <p className="mt-2 font-bold text-ink">¿Necesitas más pronto?</p>
            <p className="mt-1 text-sm text-ink/65">
              El Roll-On y la Bruma duran 30–45 días — te avisaremos por WhatsApp cuando sea hora
              de tu próximo pedido, con un descuento especial de reorden.
            </p>
          </div>
        </div>

        <p className="mt-8 text-sm text-ink/50">
          ¿Alguna pregunta? Escríbenos a WhatsApp {BUSINESS.whatsappDisplay}
        </p>
      </div>
    </Section>
  );
}
