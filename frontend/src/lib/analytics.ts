/**
 * Thin wrappers around Meta Pixel (fbq), TikTok Pixel (ttq) and Snap Pixel
 * (snaptr) so the rest of the app doesn't need to know which ad platforms
 * are wired up. Every platform is optional — nothing fires (and nothing
 * crashes) if its NEXT_PUBLIC_*_PIXEL_ID env var isn't set (see
 * components/analytics/pixels.tsx).
 *
 * Dedup with the backend's Conversions API (app/services/capi/) relies on
 * sending the *same* event_id from both the browser pixel and the server
 * call for a given conversion — see the eventID/event_id/client_dedup_id
 * params below. We never hash anything in the browser: Meta/TikTok/Snap's
 * own pixel scripts hash raw values themselves before they leave the
 * browser, and the backend independently SHA-256-hashes PII again for its
 * server-side Conversions API calls.
 */
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      identify: (data: Record<string, unknown>) => void;
      track: (event: string, params?: Record<string, unknown>) => void;
    };
    snaptr?: (...args: unknown[]) => void;
  }
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function getQueryParam(name: string): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(name);
}

function generateEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

/**
 * Snapshot of every browser/click identifier the ad platforms use for
 * matching, read once per call site. `fbc` falls back to deriving the
 * value from a `fbclid` URL param in case the Meta pixel script hasn't set
 * the `_fbc` cookie yet (e.g. this fires before fbevents.js finishes).
 */
export function getClickIds() {
  const fbclid = getQueryParam("fbclid");
  const fbc = getCookie("_fbc") ?? (fbclid ? `fb.1.${Date.now()}.${fbclid}` : null);

  return {
    fbp: getCookie("_fbp"),
    fbc,
    ttp: getCookie("_ttp"),
    ttclid: getQueryParam("ttclid"),
    scClickId: getQueryParam("ScCid") ?? getQueryParam("sccid") ?? getCookie("_scid"),
  };
}

type EventParams = {
  value: number;
  content_name: string;
  content_category?: string;
};

/**
 * Fired once when a customer lands on /checkout. Fires the client pixels
 * immediately (with a fresh event_id) and, in parallel, asks the backend to
 * mirror the same event via each platform's Conversions API — same
 * event_id on both sides so Meta/TikTok/Snap deduplicate the two into one.
 */
export function trackInitiateCheckout(params: EventParams) {
  if (typeof window === "undefined") return;
  const eventId = generateEventId();
  const { fbp, fbc, ttp, ttclid, scClickId } = getClickIds();

  window.fbq?.(
    "track",
    "InitiateCheckout",
    {
      value: params.value,
      currency: "USD",
      content_name: params.content_name,
      content_category: params.content_category ?? "COD Order",
    },
    { eventID: eventId }
  );
  window.ttq?.track("InitiateCheckout", {
    value: params.value,
    currency: "USD",
    content_name: params.content_name,
    event_id: eventId,
  });
  window.snaptr?.("track", "START_CHECKOUT", {
    client_dedup_id: eventId,
    currency: "USD",
    price: params.value,
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  fetch(`${apiUrl}/api/track/initiate-checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventId,
      value: params.value,
      currency: "USD",
      contentName: params.content_name,
      fbp,
      fbc,
      ttp,
      ttclid,
      scClickId,
      eventSourceUrl: window.location.href,
    }),
    keepalive: true,
  }).catch(() => {
    // Best-effort analytics call — never surface this to the customer.
  });
}

/**
 * Updates each pixel's advanced-matching user data (raw phone — the pixel
 * scripts hash it themselves before sending). Call this once the phone
 * number is known (checkout submit) and before firing trackPurchase, so
 * the Purchase event itself carries the strongest possible match signal.
 */
export function identifyUser(phone: string | null | undefined) {
  if (typeof window === "undefined" || !phone) return;
  const digits = phone.replace(/\D/g, "");
  if (!digits) return;
  const e164 = digits.length <= 8 ? `+507${digits}` : `+${digits}`;

  window.fbq?.("init", process.env.NEXT_PUBLIC_FB_PIXEL_ID, { ph: digits });
  window.ttq?.identify({ phone_number: e164 });
  window.snaptr?.("init", process.env.NEXT_PUBLIC_SNAPCHAT_PIXEL_ID, { user_phone_number: digits });
}

/**
 * Fired on /gracias once an order is successfully created (Pago Contra
 * Entrega, not yet actually paid). `eventId` MUST be the same id the
 * checkout form sent to POST /api/orders (and that the backend used for its
 * Purchase CAPI call) for cross-channel deduplication to work.
 */
export function trackPurchase(params: EventParams & { eventId: string; phone?: string | null }) {
  if (typeof window === "undefined") return;
  identifyUser(params.phone);

  window.fbq?.(
    "track",
    "Purchase",
    {
      value: params.value,
      currency: "USD",
      content_name: params.content_name,
      content_category: params.content_category ?? "COD Order",
    },
    { eventID: params.eventId }
  );
  // TikTok's closest standard event to "order placed, payment on delivery".
  window.ttq?.track("CompletePayment", {
    value: params.value,
    currency: "USD",
    content_name: params.content_name,
    event_id: params.eventId,
  });
  window.snaptr?.("track", "PURCHASE", {
    client_dedup_id: params.eventId,
    currency: "USD",
    price: params.value,
  });
}
