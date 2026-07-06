# LÉGER — Backend

FastAPI + PostgreSQL service for the LÉGER store. Handles COD order submission and a
login-protected admin dashboard. See the [root README](../README.md) for the overall monorepo
architecture.

## Structure

```
app/
  main.py              FastAPI app, CORS, error-shape handlers, admin dashboard route
  core/
    config.py          Env settings (pydantic-settings)
    catalog.py          Authoritative product/plan/pricing data (mirrors frontend/src/lib/products.ts)
    whatsapp.py          Builds the wa.me order-confirmation deep link
    admin_auth.py        Stateless HMAC-signed admin session tokens
  db/
    models.py            SQLAlchemy models (Order)
    session.py            Async engine/session, create_tables() on startup
  schemas/
    orders.py             Pydantic request/response models + field validation
    admin.py               Login/status-update request/response models
  api/
    orders.py              POST /api/orders
    admin.py                Admin login, orders list/filter/search, status update
    health.py                GET /api/health
  admin/
    dashboard.html            Single-file admin UI (Tailwind CDN, no build step)
```

## Getting started

```bash
cp .env.example .env   # edit DATABASE_URL, ADMIN_*, WHATSAPP_NUMBER, FRONTEND_ORIGIN
pip install -r requirements.txt
fastapi dev app/main.py
```

API docs: `http://localhost:8000/docs`. Tables are created automatically on startup
(`Base.metadata.create_all` — no migration tool needed for this simple schema).

## Endpoints

- `POST /api/orders` — creates an order. Body: `{ name, phone, address, city, province,
  productSlug, planId, bump, notes }`. Validates and prices the order server-side; on success
  returns `{ ok, whatsappLink, total }`; on validation failure returns `400` with
  `{ message, fieldErrors }`.
- `GET /api/health` — health check.
- `POST /api/admin/login` — `{ username, password }` → `{ token, expires_at }`. Send the token as
  `Authorization: Bearer <token>` on the endpoints below.
- `GET /api/admin/summary` — KPIs (orders, revenue, AOV) for a date range.
- `GET /api/admin/orders` — paginated, filterable (`status`, `q`, `start`, `end`) order list.
- `PATCH /api/admin/orders/{id}` — `{ status }` to update an order's status.
- `GET /admin` — the admin dashboard UI (login form + orders table + status editor).

## Keeping pricing in sync

`app/core/catalog.py` is the source of truth for what the backend charges — it intentionally does
not trust a client-sent price. If you add a product, plan, or change a price in
`frontend/src/lib/products.ts`, mirror the change here too.

## Admin dashboard

Visit `/admin`, log in with `ADMIN_USERNAME` / `ADMIN_PASSWORD`. It's a single static HTML file
(no separate frontend build) that talks to the `/api/admin/*` endpoints above, with a token stored
in `localStorage`. Change `ADMIN_PASSWORD` and `ADMIN_SECRET_KEY` before deploying.
