import { Star } from "lucide-react";
import { AGGREGATE_RATING } from "@/lib/products";
import { cn } from "@/lib/utils";

/** ★★★★★ 4.8/5 · basado en 512 reseñas verificadas — used in the hero and
 * above every testimonials section so the aggregate rating is visible
 * before a visitor scrolls to read individual reviews. */
export function AggregateRatingBadge({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <div className="flex gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-sand-500 text-sand-500" />
        ))}
      </div>
      <span className="text-sm font-bold text-ink">
        {AGGREGATE_RATING.value.toFixed(1)}/5
      </span>
      <span className="text-sm text-ink/60">
        · basado en {AGGREGATE_RATING.count} reseñas verificadas
      </span>
    </div>
  );
}
