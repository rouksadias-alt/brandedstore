import type { Metadata } from "next";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { FaqAccordion } from "@/components/faq-accordion";
import { LinkButton } from "@/components/ui/button";
import { BUSINESS, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description: `Resolvemos todas tus dudas sobre pedidos, pago contra entrega, envíos y garantía de ${BUSINESS.brand}.`,
};

const generalFaq = [
  {
    question: "¿Cómo funciona el Pago Contra Entrega?",
    answer:
      "Haces tu pedido en el sitio sin ingresar tarjeta ni pagar nada en línea. Un asesor te confirma por WhatsApp, y pagas en efectivo directamente al repartidor cuando recibes tu pedido.",
  },
  {
    question: "¿Cuánto tarda la entrega?",
    answer:
      "24–72 horas en Ciudad de Panamá. En el resto del país puede tomar un poco más — te damos un estimado exacto al confirmar tu pedido por WhatsApp.",
  },
  {
    question: "¿Hacen envíos a todo Panamá?",
    answer:
      "Sí, hacemos envíos a nivel nacional. Actualmente los tiempos más rápidos son en Ciudad de Panamá y áreas cercanas.",
  },
  {
    question: "¿Qué pasa si no estoy en casa cuando llega el repartidor?",
    answer:
      "El repartidor te contactará antes de llegar. Si necesitas reprogramar, puedes coordinar directamente por WhatsApp con nuestro equipo.",
  },
  {
    question: "¿Los productos tienen garantía?",
    answer: `Sí — todos los productos ${BUSINESS.brand} tienen garantía de devolución de ${BUSINESS.guaranteeDays} días. Ver más en nuestra página de Garantía.`,
  },
  {
    question: "¿Puedo cambiar o cancelar mi pedido?",
    answer:
      "Sí, mientras no se haya despachado. Escríbenos por WhatsApp lo antes posible con tu nombre y número de pedido.",
  },
  {
    question: "¿Cómo sé cuál producto es para mí?",
    answer:
      "Si buscas alivio inmediato de piernas pesadas, empieza con el Roll-On. Si estás de pie todo el día, las Medias de Compresión son ideales. Si quieres algo rápido para llevar contigo, prueba la Bruma. O ahorra con el Kit Completo, que incluye los tres.",
  },
];

export default function FaqPage() {
  return (
    <>
      <Section className="pb-6 pt-10 text-center sm:pt-14">
        <Eyebrow>Estamos para ayudarte</Eyebrow>
        <h1 className="mx-auto max-w-2xl font-display text-4xl font-semibold text-ink sm:text-5xl">
          Preguntas Frecuentes
        </h1>
      </Section>

      <Section>
        <SectionHeading title="Sobre pedidos y envíos" center={false} />
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={generalFaq} />
        </div>
      </Section>

      <Section className="bg-mint-50/50">
        <SectionHeading title="Sobre cada producto" center={false} />
        <div className="mx-auto max-w-3xl space-y-8">
          {products.map((p) => (
            <div key={p.slug}>
              <p className="mb-3 font-display text-lg font-semibold text-ink">
                {p.shortName}
              </p>
              <FaqAccordion items={p.faq} />
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-xl text-center">
          <p className="font-display text-xl font-semibold text-ink">
            ¿No encontraste tu respuesta?
          </p>
          <p className="mt-2 text-ink/65">Escríbenos directamente por WhatsApp.</p>
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
