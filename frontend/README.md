# LÉGER — Piernas Ligeras Store (Frontend)

A Next.js 16 (App Router) + TypeScript + Tailwind CSS storefront for **LÉGER**, a premium
Cash-on-Delivery (COD) circulatory-wellness brand built for Panama. This is the `frontend/`
half of the monorepo — see the [root README](../README.md) for the overall architecture and
the `backend/` FastAPI service that powers checkout and the admin dashboard.

## What's included

- **Landing pages** for the 3 SKUs (message-matched for ad campaigns) + a bundle page:
  - `/roll-on` — Roll-On Crioactivo (hero product)
  - `/medias-compresion` — Medias de Compresión 360°
  - `/bruma` — Bruma Instantánea
  - `/kit-completo` — bundle-anchored landing page (push most ad spend here once validated)
  - `/` — homepage (brand story, 3-product showcase, trust bar)
- **COD checkout system**:
  - `/checkout` — order form (product + plan/quantity selector, order-bump, delivery details)
  - Submits to the backend's `POST /api/orders` (see `../backend`), which validates the order,
    computes the total server-side, stores it in Postgres, and returns a pre-filled WhatsApp
    confirmation link
  - `/gracias` — thank-you page that auto-opens the WhatsApp confirmation + shows the referral/
    reorder upsell copy from the strategy doc
- **Trust & legal pages**: `/garantia`, `/preguntas-frecuentes`, `/nosotros`,
  `/politica-privacidad`, `/terminos`
- Sticky mobile "Pedir con Pago Contra Entrega" bar, floating WhatsApp button, testimonials,
  ingredient callouts, comparison table, and FAQ accordion — all data-driven from
  `src/lib/products.ts` so copy/pricing can be edited without touching JSX.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Make sure the backend is running too (see
`../backend/README` or the root README) — the checkout form calls it directly.

## Configuration

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_API_URL` — base URL of the backend API (e.g. `http://localhost:8000` locally, or
  your deployed backend's public URL in production).
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — your real WhatsApp Business number (international format, no
  `+` or spaces, e.g. `50760000000`). Also update `BUSINESS.whatsappDisplay` in
  `src/lib/products.ts` to match (the human-readable version shown in the UI).

Editing products, prices, and copy: everything lives in `src/lib/products.ts` (`products` array,
`kitProduct`, `testimonials`, `BUSINESS`). **If you change a price or plan here, also update the
matching entry in `../backend/app/core/catalog.py`** — the backend is the authoritative source
for pricing and never trusts a client-sent total.

**Analytics/Pixels** (not wired up yet — add before running paid ads) — drop your Meta Pixel,
TikTok Pixel, GA4, and Microsoft Clarity snippets into `src/app/layout.tsx`.

## Order flow (how COD works here)

1. Customer fills out `/checkout` (no card, no online payment).
2. The form POSTs to the backend's `/api/orders`, which validates the input, looks up the
   authoritative price server-side, stores the order in Postgres, and returns a `wa.me` deep link
   pre-filled with the order summary.
3. Customer is redirected to `/gracias`, which auto-opens WhatsApp so they can confirm with your
   team — this is the human confirmation step that keeps COD confirmation/delivery rates high.
4. Your team confirms the order over WhatsApp (and can upsell at this exact moment), updates its
   status in the admin dashboard (`/admin` on the backend), then dispatches it.

## Tech stack

- **Next.js 16** (App Router, React 19, TypeScript), built with `output: "standalone"` for Docker
- **Tailwind CSS v4** with a custom LÉGER theme (mint/aqua + warm sand palette) in
  `src/app/globals.css`
- **lucide-react** for icons

## Project structure

```
src/
  app/
    page.tsx                  Home
    roll-on/, medias-compresion/, bruma/   Individual product landing pages
    kit-completo/              Bundle landing page
    checkout/                  COD order form page
    gracias/                   Thank-you page
    garantia/, preguntas-frecuentes/, nosotros/, politica-privacidad/, terminos/
  components/                  Shared UI (header, footer, product landing template, etc.)
  lib/
    products.ts                Single source of truth for products, pricing, copy, testimonials
    order-schema.ts            Panama provinces list (shared with the checkout form UI)
    utils.ts                   cn() class helper, currency formatting
```

## Next steps before launch

- Replace the placeholder gradient/emoji product visuals (`src/components/product-visual.tsx`)
  with real product photography once samples arrive.
- Set your real WhatsApp Business number and `NEXT_PUBLIC_API_URL` for production.
- Add Meta/TikTok Pixel + Conversions API, GA4, and Microsoft Clarity.
- Pursue `registro sanitario` (APA/MINSA) for the topical products and display the real
  registration number once issued (huge trust signal).
- Swap the placeholder testimonials in `src/lib/products.ts` for real ones once your "Grupo
  Fundador" of testers has feedback — never fabricate reviews.
