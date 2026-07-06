import { Check, X, Minus } from "lucide-react";
import { BUSINESS } from "@/lib/products";
import type { Product } from "@/lib/products";

function Cell({ value }: { value: boolean }) {
  return value ? (
    <Check className="mx-auto h-5 w-5 text-mint-600" />
  ) : (
    <X className="mx-auto h-5 w-5 text-ink/25" />
  );
}

export function ComparisonTable({ rows }: { rows: Product["comparison"] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-mint-100">
      <table className="w-full min-w-[520px] border-collapse bg-white text-sm">
        <thead>
          <tr className="border-b border-mint-100 bg-mint-50/60">
            <th className="p-4 text-left font-semibold text-ink/70">&nbsp;</th>
            <th className="p-4 text-center font-bold text-mint-700">{BUSINESS.brand}</th>
            <th className="p-4 text-center font-semibold text-ink/60">Cremas Genéricas</th>
            <th className="p-4 text-center font-semibold text-ink/60">No Hacer Nada</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature} className="border-b border-mint-50 last:border-0">
              <td className="p-4 font-medium text-ink/80">{row.feature}</td>
              <td className="p-4">
                <Cell value={row.leger} />
              </td>
              <td className="p-4">
                <Cell value={row.generic} />
              </td>
              <td className="p-4">
                <Minus className="mx-auto h-5 w-5 text-ink/25" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
