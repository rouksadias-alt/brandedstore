"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { cn, formatUSD } from "@/lib/utils";

export function StickyCtaBar({
  price,
  compareAtPrice,
  productSlug,
  planId,
  label = "Pedir Ahora",
  unitLabel = "Precio por unidad",
}: {
  price: number;
  compareAtPrice?: number;
  productSlug: string;
  planId?: string;
  label?: string;
  unitLabel?: string;
}) {
  // Hidden until the visitor has scrolled a bit, and hidden again while the
  // hero (which already has its own CTA) or the footer is in view — no point
  // duplicating the CTA right next to another one. Looks for #hero and the
  // page's single <footer> (see app/layout.tsx).
  const [scrolledEnough, setScrolledEnough] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledEnough(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const footer = document.querySelector("footer");

    const heroObserver = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    const footerObserver = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );

    if (hero) heroObserver.observe(hero);
    if (footer) footerObserver.observe(footer);

    return () => {
      heroObserver.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  const hidden = !scrolledEnough || heroVisible || footerVisible;

  const href = planId
    ? `/checkout?product=${productSlug}&plan=${planId}`
    : `/checkout?product=${productSlug}`;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-background/95 px-4 py-3 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.06)] transition-transform duration-300 sm:hidden",
        hidden ? "translate-y-full" : "translate-y-0"
      )}
      aria-hidden={hidden}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-mint-600">{unitLabel}</p>
          <div className="flex items-baseline gap-1.5">
            <p className="text-lg font-bold text-ink">{formatUSD(price)}</p>
            {compareAtPrice && (
              <p className="text-xs font-medium text-ink/40 line-through">{formatUSD(compareAtPrice)}</p>
            )}
          </div>
          <p className="flex items-center gap-1 text-[11px] font-medium text-ink/60">
            <ShieldCheck className="h-3 w-3 text-mint-600" /> Pago contra entrega
          </p>
        </div>
        <LinkButton href={href} size="md" className="flex-1">
          {label}
        </LinkButton>
      </div>
    </div>
  );
}
