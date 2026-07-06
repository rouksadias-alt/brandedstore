"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PartyPopper, MessageCircle, Gift, RefreshCcw } from "lucide-react";
import { Section } from "@/components/ui/section";
import { LinkButton } from "@/components/ui/button";
import { BUSINESS } from "@/lib/products";
import { formatUSD } from "@/lib/utils";

export function GraciasContent() {
  const searchParams = useSearchParams();
  const wa = searchParams.get("wa");
  const name = searchParams.get("name");
  const product = searchParams.get("product");
  const total = searchParams.get("total");

  useEffect(() => {
    if (!wa) return;
    const timer = setTimeout(() => {
      window.open(wa, "_blank", "noopener,noreferrer");
    }, 900);
    return () => clearTimeout(timer);
  }, [wa]);

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
