import type { Metadata } from "next";
import { Leaf, MapPin, Users, ShieldCheck } from "lucide-react";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { LinkButton } from "@/components/ui/button";
import { TrustBar } from "@/components/trust-bar";
import { BUSINESS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Nosotros",
  description: `Conoce la historia de ${BUSINESS.brand}, la primera marca de bienestar circulatorio hecha para el clima tropical de Panamá.`,
};

export default function NosotrosPage() {
  return (
    <>
      <Section className="pb-8 pt-10 sm:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Nuestra historia</Eyebrow>
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
            Hecho para las piernas que cargan tu día
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            {BUSINESS.brand} nació de una idea simple: las mujeres panameñas que trabajan de pie,
            corren entre el hogar y la oficina, y viven bajo el calor tropical todo el año merecen
            algo mejor que una crema genérica de farmacia — merecen un sistema pensado
            específicamente para ellas.
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
              está tu vida. Casi todos los productos disponibles fueron formulados para climas
              fríos, con ingredientes genéricos y sin ningún tipo de innovación sensorial.
            </p>
            <p className="mt-4 text-ink/75 leading-relaxed">
              Decidimos construir la primera marca premium de bienestar circulatorio, formulada
              con ingredientes venotónicos reales y estudiados — Centella Asiática, Castaño de
              Indias — combinados en formatos que se sienten funcionando desde el primer uso.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Leaf, label: "Ciencia real, no promesas vacías" },
              { icon: MapPin, label: "Formulado para el trópico" },
              { icon: ShieldCheck, label: "Garantía y transparencia" },
              { icon: Users, label: "Comunidad de piernas ligeras" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 rounded-2xl border border-mint-100 bg-white p-6 text-center"
              >
                <Icon className="h-7 w-7 text-mint-600" />
                <p className="text-sm font-semibold text-ink/80">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Nuestra misión" title={`Que cada mujer en ${BUSINESS.country} se sienta "léger"`} />
        <p className="mx-auto max-w-2xl text-center text-ink/70">
          No vendemos una cura milagrosa — ofrecemos un ritual honesto, respaldado por ingredientes
          reales, para que termines el día sintiendo tus piernas ligeras, no como si cargaras el
          peso de todo el día.
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
