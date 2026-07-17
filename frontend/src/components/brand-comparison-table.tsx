import { Check, X, AlertTriangle } from "lucide-react";
import { BUSINESS } from "@/lib/products";

type Cell = "yes" | "no" | "partial";

const rows: { feature: string; leger: Cell; pharmacy: Cell; generic: Cell }[] = [
  { feature: "Grado farmacéutico", leger: "yes", pharmacy: "yes", generic: "no" },
  { feature: "Formulado para clima tropical", leger: "yes", pharmacy: "no", generic: "no" },
  { feature: "Sistema completo (3 pasos)", leger: "yes", pharmacy: "no", generic: "no" },
  { feature: "Pago contra entrega", leger: "yes", pharmacy: "no", generic: "partial" },
  { feature: "Precio directo (sin sobreprecio)", leger: "yes", pharmacy: "no", generic: "yes" },
  { feature: "Garantía de 30 días", leger: "yes", pharmacy: "no", generic: "no" },
];

function CellIcon({ value }: { value: Cell }) {
  if (value === "yes") return <Check className="mx-auto h-5 w-5 text-mint-600" />;
  if (value === "partial") return <AlertTriangle className="mx-auto h-5 w-5 text-sand-500" />;
  return <X className="mx-auto h-5 w-5 text-ink/25" />;
}

export function BrandComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-mint-100">
      <table className="w-full min-w-[520px] border-collapse bg-white text-sm">
        <thead>
          <tr className="border-b border-mint-100 bg-mint-50/60">
            <th className="p-4 text-left font-semibold text-ink/70">&nbsp;</th>
            <th className="p-4 text-center font-bold text-mint-700">{BUSINESS.brand}</th>
            <th className="p-4 text-center font-semibold text-ink/60">Farmacia</th>
            <th className="p-4 text-center font-semibold text-ink/60">Cremas Genéricas</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature} className="border-b border-mint-50 last:border-0">
              <td className="p-4 font-medium text-ink/80">{row.feature}</td>
              <td className="p-4">
                <CellIcon value={row.leger} />
              </td>
              <td className="p-4">
                <CellIcon value={row.pharmacy} />
              </td>
              <td className="p-4">
                <CellIcon value={row.generic} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
