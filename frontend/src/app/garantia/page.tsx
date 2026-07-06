import type { Metadata } from "next";
import { ShieldCheck, Truck, RotateCcw, MessageCircle } from "lucide-react";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { LinkButton } from "@/components/ui/button";
import { BUSINESS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Garantía y Devoluciones",
  description: `Garantía de ${BUSINESS.guaranteeDays} días y Pago Contra Entrega — compra sin riesgo con ${BUSINESS.brand}.`,
};

export default function GarantiaPage() {
  return (
    <>
      <Section className="pb-8 pt-10 text-center sm:pt-14">
        <Eyebrow>Compra sin riesgo</Eyebrow>
        <h1 className="mx-auto max-w-2xl font-display text-4xl font-semibold text-ink sm:text-5xl">
          Garantía de {BUSINESS.guaranteeDays} Días
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink/70">
          Creemos tanto en {BUSINESS.brand} que si no sientes la diferencia, te devolvemos tu
          dinero. Sin preguntas complicadas.
        </p>
      </Section>

      <Section className="bg-mint-50/50">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-mint-100 bg-white p-6 text-center">
            <ShieldCheck className="mx-auto h-10 w-10 text-mint-600" />
            <p className="mt-3 font-bold text-ink">30 Días de Garantía</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Desde la fecha de entrega, tienes 30 días para decidir si {BUSINESS.brand} es para
              ti.
            </p>
          </div>
          <div className="rounded-2xl border border-mint-100 bg-white p-6 text-center">
            <Truck className="mx-auto h-10 w-10 text-mint-600" />
            <p className="mt-3 font-bold text-ink">Pago Contra Entrega</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Pagas en efectivo solo cuando el pedido llega a tu puerta. No se cobra nada en
              línea, nunca.
            </p>
          </div>
          <div className="rounded-2xl border border-mint-100 bg-white p-6 text-center">
            <RotateCcw className="mx-auto h-10 w-10 text-mint-600" />
            <p className="mt-3 font-bold text-ink">Devolución Simple</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Escríbenos por WhatsApp y coordinamos la devolución o el reembolso — sin trámites
              complicados.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Cómo funciona" title="Tu compra, paso a paso" />
        <ol className="mx-auto max-w-2xl space-y-4">
          {[
            "Haces tu pedido en el sitio — no se te cobra nada en ese momento.",
            "Un asesor de LÉGER confirma tu pedido por WhatsApp antes de despacharlo.",
            "Recibes tu pedido en 24–72 horas (Ciudad de Panamá) y pagas en efectivo al repartidor.",
            "Pruebas el producto con calma. Si en 30 días no sientes la diferencia, escríbenos y coordinamos tu devolución o reembolso.",
          ].map((step, i) => (
            <li key={step} className="flex gap-4 rounded-2xl border border-mint-100 bg-white p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <p className="text-ink/80">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-mint-50/50">
        <div className="mx-auto max-w-xl rounded-3xl bg-mint-900 p-8 text-center text-white">
          <MessageCircle className="mx-auto h-8 w-8" />
          <p className="mt-3 font-display text-xl font-semibold">
            ¿Necesitas iniciar una devolución?
          </p>
          <p className="mt-2 text-sm text-mint-100">
            Escríbenos a WhatsApp {BUSINESS.whatsappDisplay} y con gusto te ayudamos.
          </p>
          <LinkButton
            href={`https://wa.me/${BUSINESS.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
            className="mt-5"
          >
            Escribir por WhatsApp
          </LinkButton>
        </div>
      </Section>
    </>
  );
}
