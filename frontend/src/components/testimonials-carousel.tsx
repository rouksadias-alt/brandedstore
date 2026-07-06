import { Star } from "lucide-react";
import { testimonials, type Testimonial } from "@/lib/products";

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex h-full min-w-[280px] flex-col gap-3 rounded-2xl border border-mint-100 bg-white p-6 shadow-sm sm:min-w-0">
      <div className="flex gap-0.5">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-sand-500 text-sand-500" />
        ))}
      </div>
      <p className="flex-1 text-sm leading-relaxed text-ink/80">&ldquo;{t.quote}&rdquo;</p>
      <div>
        <p className="text-sm font-bold text-ink">{t.name}</p>
        <p className="text-xs text-ink/50">{t.city}, Panamá</p>
      </div>
    </div>
  );
}

export function TestimonialsCarousel({ items = testimonials }: { items?: Testimonial[] }) {
  return (
    <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
      {items.map((t) => (
        <TestimonialCard key={t.name} t={t} />
      ))}
    </div>
  );
}
