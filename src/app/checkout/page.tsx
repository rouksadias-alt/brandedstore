import type { Metadata } from "next";
import { Suspense } from "react";
import { Section, Eyebrow } from "@/components/ui/section";
import { CheckoutForm } from "@/components/checkout-form";
import { ShieldCheck, Truck, Lock } from "lucide-react";
import { BUSINESS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Finalizar Pedido — Pago Contra Entrega",
  description:
    "Completa tu pedido LÉGER. Pagas solo cuando lo recibes, sin tarjeta, sin riesgo.",
};

export default function CheckoutPage() {
  return (
    <Section className="pb-24 pt-8 sm:pt-12">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <Eyebrow>Último paso</Eyebrow>
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Finaliza tu pedido
          </h1>
          <p className="mt-3 text-ink/70">
            Completa tus datos — un asesor de {BUSINESS.brand} confirmará tu pedido por WhatsApp
            antes de despacharlo.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-ink/60">
          <span className="flex items-center gap-1.5">
            <Truck className="h-4 w-4 text-mint-600" /> Pago Contra Entrega
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-mint-600" /> Garantía {BUSINESS.guaranteeDays} días
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-mint-600" /> Tus datos están protegidos
          </span>
        </div>

        <Suspense fallback={<div className="mt-10 h-96 animate-pulse rounded-3xl bg-mint-50" />}>
          <CheckoutForm />
        </Suspense>
      </div>
    </Section>
  );
}
