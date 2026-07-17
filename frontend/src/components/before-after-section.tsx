import { XCircle, CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";

// No hay fotos reales de "antes/después" todavía (mismo bloqueo que las
// fotos de producto limpias, P0.2) — en vez de fabricar una foto falsa de
// resultados, usamos una comparación honesta en texto/íconos. En cuanto
// haya fotos reales de clientas, se pueden añadir aquí con next/image
// (mismo patrón centralizado que ProductVisual).
const beforePoints = [
  "Piernas pesadas e hinchadas al final del día",
  "Sensación de \"troncos\" al subir escaleras",
  "Tobillos hinchados, marca de la media al quitártela",
];

const afterPoints = [
  "Piernas más ligeras desde la primera semana",
  "Frío inmediato que se siente trabajando al instante",
  "Menos hinchazón y más energía al llegar a casa",
];

export function BeforeAfterSection() {
  return (
    <Section className="bg-mint-50/50">
      <SectionHeading
        eyebrow="Antes / Después"
        title="Resultados reales, no promesas."
        subtitle="Piernas menos hinchadas y más ligeras desde la primera semana."
      />
      <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-black/10 bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-ink/40">Antes</p>
          <ul className="mt-4 space-y-3">
            {beforePoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-ink/70">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border-2 border-mint-600 bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-mint-600">Después</p>
          <ul className="mt-4 space-y-3">
            {afterPoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-ink/80">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mint-600" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-ink/50">
        Resultados individuales pueden variar. LÉGER es un producto de bienestar y no sustituye el
        consejo ni el tratamiento médico.
      </p>
    </Section>
  );
}
