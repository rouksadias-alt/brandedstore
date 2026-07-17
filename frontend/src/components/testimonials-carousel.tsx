import { BadgeCheck, Star } from "lucide-react";
import { testimonials, type Testimonial } from "@/lib/products";

// Consistent, sober rotation of brand colors for the avatar initial — no
// stock photos or fabricated "customer" portraits, just an honest visual
// anchor per reviewer (real photos can replace this per-review once available).
const AVATAR_COLORS = ["bg-mint-600", "bg-sand-500", "bg-mint-800", "bg-sand-600"];

function Avatar({ name, index }: { name: string; index: number }) {
  const initial = name.trim().charAt(0).toUpperCase();
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${color} font-display text-lg font-semibold text-white`}
      aria-hidden
    >
      {initial}
    </div>
  );
}

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  return (
    <div className="flex h-full min-w-[280px] flex-col gap-3 rounded-2xl border border-mint-100 bg-white p-6 shadow-sm sm:min-w-0">
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-sand-500 text-sand-500" />
          ))}
        </div>
        {t.verified && (
          <span className="flex items-center gap-1 rounded-full bg-mint-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-mint-700">
            <BadgeCheck className="h-3.5 w-3.5" /> Compra verificada
          </span>
        )}
      </div>
      <p className="flex-1 text-sm leading-relaxed text-ink/80">&ldquo;{t.quote}&rdquo;</p>
      <span className="inline-block w-fit rounded-full bg-sand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-sand-700">
        {t.product}
      </span>
      <div className="flex items-center gap-3 pt-1">
        <Avatar name={t.name} index={index} />
        <div>
          <p className="text-sm font-bold text-ink">{t.name}</p>
          <p className="text-xs text-ink/50">{t.city}, Panamá</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsCarousel({ items = testimonials }: { items?: Testimonial[] }) {
  return (
    <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
      {items.map((t, i) => (
        <TestimonialCard key={t.name} t={t} index={i} />
      ))}
    </div>
  );
}
