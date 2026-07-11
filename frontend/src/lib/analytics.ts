/**
 * Thin wrappers around Meta Pixel (fbq) and TikTok Pixel (ttq) so the rest
 * of the app doesn't need to know which ad platforms are wired up. Both
 * pixels are optional — nothing fires (and nothing crashes) if their
 * NEXT_PUBLIC_*_PIXEL_ID env vars aren't set (see components/analytics/pixels.tsx).
 */
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void;
    };
  }
}

type EventParams = {
  value: number;
  content_name: string;
  content_category?: string;
};

/** Fired when a customer lands on /checkout with a product/plan selected. */
export function trackInitiateCheckout(params: EventParams) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "InitiateCheckout", {
    value: params.value,
    currency: "USD",
    content_name: params.content_name,
    content_category: params.content_category ?? "COD Order",
  });
  window.ttq?.track("InitiateCheckout", {
    value: params.value,
    currency: "USD",
    content_name: params.content_name,
  });
}

/** Fired on /gracias once an order is successfully created (Pago Contra Entrega, not yet paid). */
export function trackPurchase(params: EventParams & { order_id?: string }) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Purchase", {
    value: params.value,
    currency: "USD",
    content_name: params.content_name,
    content_category: params.content_category ?? "COD Order",
  });
  // TikTok's closest standard event to "order placed, payment on delivery".
  window.ttq?.track("PlaceAnOrder", {
    value: params.value,
    currency: "USD",
    content_name: params.content_name,
  });
}
