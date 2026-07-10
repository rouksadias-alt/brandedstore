"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatUSD } from "@/lib/utils";
import { LinkButton } from "@/components/ui/button";
import type { PricingTier } from "@/lib/products";

export function PricingTiers({
  tiers,
  productSlug,
}: {
  tiers: PricingTier[];
  productSlug: string;
}) {
  const [selected, setSelected] = useState(
    tiers.find((t) => t.isFeatured)?.id ?? tiers[0].id
  );
  const selectedTier = tiers.find((t) => t.id === selected) ?? tiers[0];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {tiers.map((tier) => {
          const isSelected = tier.id === selected;
          return (
            <button
              key={tier.id}
              onClick={() => setSelected(tier.id)}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-2xl border-2 text-center transition-all",
                isSelected
                  ? "border-mint-600 bg-mint-50 shadow-md"
                  : "border-black/10 bg-white hover:border-mint-300"
              )}
            >
              {tier.badge && (
                <span
                  className={cn(
                    "absolute left-1/2 top-2 z-10 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white",
                    tier.isFeatured ? "bg-sand-500" : "bg-mint-600"
                  )}
                >
                  {tier.badge}
                </span>
              )}
              {tier.image && (
                <div className="relative aspect-square w-full">
                  <Image
                    src={tier.image}
                    alt={tier.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 90vw, 320px"
                  />
                </div>
              )}
              <div className="flex flex-col items-center gap-1 px-4 py-4">
                <div
                  className={cn(
                    "mb-1 flex h-5 w-5 items-center justify-center rounded-full border-2",
                    isSelected ? "border-mint-600 bg-mint-600" : "border-black/20"
                  )}
                >
                  {isSelected && <Check className="h-3.5 w-3.5 text-white" />}
                </div>
                <p className="font-bold text-ink">{tier.label}</p>
                <p className="text-xs text-ink/50">{tier.units}</p>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-mint-700">
                    {formatUSD(tier.price)}
                  </span>
                  {tier.compareAtPrice && (
                    <span className="text-sm text-ink/40 line-through">
                      {formatUSD(tier.compareAtPrice)}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <LinkButton
        href={`/checkout?product=${productSlug}&plan=${selectedTier.id}`}
        size="lg"
        className="mt-6 w-full"
      >
        Pedir {selectedTier.label} — Pago Contra Entrega
      </LinkButton>
      <p className="mt-3 text-center text-xs font-medium text-ink/50">
        Pagas solo cuando lo recibes. Sin tarjeta, sin riesgo.
      </p>
    </div>
  );
}
