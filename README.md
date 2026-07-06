# LÉGER — Piernas Ligeras Store

A Next.js 16 (App Router) + TypeScript + Tailwind CSS storefront for **LÉGER**, a premium
Cash-on-Delivery (COD) circulatory-wellness brand built for Panama. See
`../LEGER_BRAND_POSITIONING_AND_STORE_BLUEPRINT.md` and `../PANAMA_COD_STORE_STRATEGY.md` in the
parent folder for the full brand/product/marketing strategy this store implements.

## What's included

- **Landing pages** for the 3 SKUs (message-matched for ad campaigns) + a bundle page:
  - `/roll-on` — Roll-On Crioactivo (hero product)
  - `/medias-compresion` — Medias de Compresión 360°
  - `/bruma` — Bruma Instantánea
  - `/kit-completo` — bundle-anchored landing page (push most ad spend here once validated)
  - `/` — homepage (brand story, 3-product showcase, trust bar)
- **COD checkout system**:
  - `/checkout` — order form (product + plan/quantity selector, order-bump, delivery details)
  - `POST /api/orders` — validates the order (Zod), computes the total server-side, stores it in
    Postgres (if configured), and returns a pre-filled WhatsApp confirmation link
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

Open [http://localhost:3000](http://localhost:3000).

## Configuration

1. **WhatsApp number** — copy `.env.example` to `.env.local` and set
   `NEXT_PUBLIC_WHATSAPP_NUMBER` to your real WhatsApp Business number (international format, no
   `+` or spaces, e.g. `50760000000`). Also update `BUSINESS.whatsappDisplay` in
   `src/lib/products.ts` to match (the human-readable version shown in the UI).

2. **Postgres database (order storage, optional but recommended)**:
   - Set `DATABASE_URL` in `.env.local` to your connection string, e.g.
     `postgres://user:password@host:5432/dbname?sslmode=disable`.
   - Run `npm run db:migrate` to create the `orders` table (applies `db/schema.sql`).
   - Without `DATABASE_URL`, `/api/orders` still works end-to-end (it builds the WhatsApp
     confirmation link and logs the order to the server console) — it just won't persist orders to
     a database, which is fine for local testing but not recommended once you're taking real
     orders.
   - **Note on Docker-internal hostnames**: if your `DATABASE_URL` host looks like
     `something_database` (a Docker Compose/Coolify service name), it will only resolve from
     *inside* that same Docker network — not from your local machine or from Vercel. This is
     expected: it will connect successfully once the app itself is deployed in that same network
     (e.g. as another service on the same Coolify/Dokploy project). To develop or migrate locally
     against it, either run the app inside that Docker network too, expose the database on a
     public host/port, or use an SSH tunnel to the server.
   - The connection string is only ever used server-side (`src/lib/db.ts`, called from the route
     handler) — it is never exposed to the browser.

3. **Editing products, prices, and copy** — everything lives in `src/lib/products.ts`
   (`products` array, `kitProduct`, `testimonials`, `BUSINESS`). Update prices, ingredients,
   FAQs, and testimonials there instead of editing page files directly.

4. **Analytics/Pixels** (not wired up yet — add before running paid ads) — drop your Meta Pixel,
   TikTok Pixel, GA4, and Microsoft Clarity snippets into `src/app/layout.tsx`.

## Order flow (how COD works here)

1. Customer fills out `/checkout` (no card, no online payment).
2. `POST /api/orders` validates the input, looks up the authoritative price server-side (never
   trusts the client-sent price), stores the order in Postgres, and returns a `wa.me` deep link
   pre-filled with the order summary.
3. Customer is redirected to `/gracias`, which auto-opens WhatsApp so they can confirm with your
   team — this is the human confirmation step that keeps COD confirmation/delivery rates high (see
   the strategy doc's "COD Operational Playbook").
4. Your team confirms the order over WhatsApp (and can upsell at this exact moment — see the
   strategy doc's "WhatsApp confirmation-call upsell" section), then dispatches it.

## Tech stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS v4** with a custom LÉGER theme (mint/aqua + warm sand palette) in
  `src/app/globals.css`
- **Zod** for order validation (`src/lib/order-schema.ts`)
- **pg** (node-postgres) for order storage
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
    api/orders/route.ts        Order submission API route
  components/                  Shared UI (header, footer, product landing template, etc.)
  lib/
    products.ts                Single source of truth for products, pricing, copy, testimonials
    order-schema.ts            Zod schema + Panama provinces list
    db.ts                      Server-only Postgres connection pool
    utils.ts                   cn() class helper, currency formatting
db/schema.sql                   SQL to create the `orders` table
scripts/migrate.mjs             Applies db/schema.sql against DATABASE_URL (npm run db:migrate)
```

## Next steps before launch

- Replace the placeholder gradient/emoji product visuals (`src/components/product-visual.tsx`)
  with real product photography once samples arrive.
- Set your real WhatsApp Business number and confirm the database is reachable from your
  deployment (see Configuration above).
- Add Meta/TikTok Pixel + Conversions API, GA4, and Microsoft Clarity.
- Pursue `registro sanitario` (APA/MINSA) for the topical products and display the real
  registration number once issued (huge trust signal — see the blueprint doc, Section 4.3).
- Swap the placeholder testimonials in `src/lib/products.ts` for real ones once your "Grupo
  Fundador" of testers has feedback — never fabricate reviews.
