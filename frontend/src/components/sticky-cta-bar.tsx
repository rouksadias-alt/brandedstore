"use client";

import { ShieldCheck } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { formatUSD } from "@/lib/utils";

export function StickyCtaBar({
  price,
  productSlug,
  planId,
  label = "Pedir Ahora",
  unitLabel = "2 unidades",
}: {
  price: number;
  productSlug: string;
  planId?: string;
  label?: string;
  unitLabel?: string;
}) {
  const href = planId
    ? `/checkout?product=${productSlug}&plan=${planId}`
    : `/checkout?product=${productSlug}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-background/95 px-4 py-3 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.06)] sm:hidden">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-mint-600">{unitLabel}</p>
          <p className="text-lg font-bold text-ink">{formatUSD(price)}</p>
          <p className="flex items-center gap-1 text-[11px] font-medium text-ink/60">
            <ShieldCheck className="h-3 w-3 text-mint-600" /> Pago al recibir
          </p>
        </div>
        <LinkButton href={href} size="md" className="flex-1">
          {label}
        </LinkButton>
      </div>
    </div>
  );
}
