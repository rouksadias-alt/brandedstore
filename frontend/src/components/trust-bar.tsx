import { Truck, ShieldCheck, Banknote, FlaskConical } from "lucide-react";
import { BUSINESS } from "@/lib/products";

const items = [
  { icon: FlaskConical, label: "Ingredientes Grado Farmacéutico" },
  { icon: Banknote, label: "Pago Contra Entrega" },
  { icon: ShieldCheck, label: `Garantía de ${BUSINESS.guaranteeDays} Días` },
  { icon: Truck, label: "Envío Rápido en Panamá" },
];

export function TrustBar({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {items.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 rounded-2xl border border-mint-100 bg-white/70 px-3 py-4 text-center shadow-sm"
          >
            <Icon className="h-5 w-5 text-mint-600" />
            <span className="text-xs font-semibold leading-tight text-ink/80">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
