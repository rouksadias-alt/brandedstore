import type { Metadata } from "next";
import { FlaskConical, MapPin, ShieldCheck, FileCheck } from "lucide-react";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { LinkButton } from "@/components/ui/button";
import { TrustBar } from "@/components/trust-bar";
import { BUSINESS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Nosotros",
  description: `Conoce la historia de ${BUSINESS.brand}, la primera línea de bienestar circulatorio de grado farmacéutico hecha para el clima tropical de Panamá.`,
};

export default function NosotrosPage() {
  return (
    <>
      <Section className="pb-8 pt-10 sm:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Ciencia Circulatoria</Eyebrow>
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
            La autoridad de una farmacia, sin el intermediario de una farmacia
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            {BUSINESS.brand} nació de una idea simple: las mujeres panameñas que trabajan de pie,
            corren entre el hogar y la oficina, y viven bajo el calor tropical todo el año merecen
            ingredientes de grado farmacéutico — con nombre, mecanismo de acción y respaldo — no
            una crema genérica ni una promesa vacía de redes sociales.
          </p>
        </div>
      </Section>

      <Section className="bg-mint-50/50">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <SectionHeading center={false} title="Por qué existimos" />
            <p className="text-ink/75 leading-relaxed">
              El clima tropical de Panamá agrava la pesadez y la hinchazón de piernas — el calor
              dilata los vasos sanguíneos y hace que el problema empeore justo cuando más activa
              está tu vida. La mayoría de los productos disponibles en farmacia fueron formulados
              para climas fríos, con markups de intermediarios que triplican el precio del
              ingrediente activo real.
            </p>
            <p className="mt-4 text-ink/75 leading-relaxed">
              Decidimos construir la primera línea de bienestar circulatorio de grado
              farmacéutico vendida directo al consumidor — con los mismos ingredientes
              venotónicos que recomendaría un farmacéutico (Centella Asiática, Castaño de
              Indias, Compresión Graduada 15–20mmHg), sin el sobreprecio de la cadena de
              distribución tradicional.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: FlaskConical, label: "Grado farmacéutico, no genérico" },
              { icon: MapPin, label: "Formulado para el trópico" },
              { icon: ShieldCheck, label: "Garantía y transparencia" },
              { icon: FileCheck, label: "Ingredientes con nombre y estudio" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 rounded-2xl border border-mint-100 bg-white p-6 text-center"
              >
                <Icon className="h-7 w-7 text-mint-700" />
                <p className="text-sm font-semibold text-ink/80">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Nuestra misión" title={`Que cada mujer en ${BUSINESS.country} se sienta "léger"`} />
        <p className="mx-auto max-w-2xl text-center text-ink/70">
          No vendemos una cura milagrosa — ofrecemos un ritual honesto, con ingredientes de
          grado farmacéutico y respaldo real, para que termines el día sintiendo tus piernas
          ligeras, no como si cargaras el peso de todo el día. Vendemos directo, sin
          intermediario de farmacia, y respondemos por tu compra: pago contra entrega y garantía
          de {BUSINESS.guaranteeDays} días.
        </p>
      </Section>

      <Section className="bg-mint-50/50">
        <TrustBar />
      </Section>

      <Section>
        <div className="mx-auto max-w-xl text-center">
          <p className="font-display text-xl font-semibold text-ink">
            Únete a las +{BUSINESS.founderCount} mujeres que ya confían en {BUSINESS.brand}
          </p>
          <LinkButton href="/kit-completo" size="lg" className="mt-6">
            Conoce el Kit Completo
          </LinkButton>
        </div>
      </Section>
    </>
  );
}
