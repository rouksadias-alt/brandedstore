import { AGGREGATE_RATING, BUSINESS } from "@/lib/products";

const stats = [
  { value: `+${BUSINESS.founderCount}`, label: "Clientas felices" },
  { value: `${AGGREGATE_RATING.value}★`, label: "Valoración" },
  { value: "24–48h", label: "Envío" },
  { value: `${BUSINESS.guaranteeDays} días`, label: "Garantía" },
];

export function StatsStrip({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-3xl font-bold text-mint-700 sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink/50">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
