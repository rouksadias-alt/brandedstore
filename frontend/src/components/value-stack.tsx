import { cn, formatUSD } from "@/lib/utils";

/** Desglose de valor del Kit — ver LEGER_CRO_UPGRADE.md P1.3. `total` y
 * `price` are passed in explicitly (not summed here) so the displayed
 * math always matches the caller's source of truth (kitProduct). */
export function ValueStack({
  items,
  total,
  price,
  className,
}: {
  items: { label: string; price: number }[];
  total: number;
  price: number;
  className?: string;
}) {
  const savings = total - price;

  return (
    <div className={cn("rounded-2xl border border-mint-100 bg-white p-5 text-left sm:p-6", className)}>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.label} className="flex items-center justify-between text-sm text-ink/70">
            <span>{item.label}</span>
            <span className="font-medium">{formatUSD(item.price)}</span>
          </li>
        ))}
      </ul>
      <div className="my-3 border-t border-dashed border-mint-200" />
      <div className="flex items-center justify-between text-sm text-ink/50">
        <span>Valor total</span>
        <span className="line-through">{formatUSD(total)}</span>
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <span className="font-bold text-ink">Hoy pagas</span>
        <span className="text-2xl font-extrabold text-mint-700">{formatUSD(price)}</span>
      </div>
      <p className="mt-1 text-right text-sm font-bold text-sand-600">Ahorras {formatUSD(savings)}</p>
    </div>
  );
}
