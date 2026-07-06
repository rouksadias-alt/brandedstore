# LÉGER — Piernas Ligeras — Monorepo

DTC Cash-on-Delivery (COD) e-commerce store for Panama. Circulatory-wellness brand ("piernas
ligeras" — light legs): a roll-on, compression socks, and an instant cooling mist.

## Structure

```
brandedstore/
├── frontend/        Next.js 16 App Router + TypeScript + Tailwind CSS
├── backend/         FastAPI + PostgreSQL (orders API + admin dashboard)
├── docker-compose.yml
└── docker-compose.dev.yml   (local Postgres only, for development)
```

## Quick start

```bash
# 1. Local database (optional — or point DATABASE_URL at a remote one)
docker compose -f docker-compose.dev.yml up -d

# 2. Backend
cd backend
cp .env.example .env   # then edit DATABASE_URL / ADMIN_* / WHATSAPP_NUMBER
pip install -r requirements.txt
fastapi dev app/main.py   # http://localhost:8000, admin at /admin

# 3. Frontend (new terminal)
cd frontend
cp .env.example .env.local   # then edit NEXT_PUBLIC_API_URL / NEXT_PUBLIC_WHATSAPP_NUMBER
npm install
npm run dev   # http://localhost:3000
```

## How the pieces fit together

- **`frontend/`** — the public storefront (3 product landing pages + a bundle page, home page,
  checkout form, thank-you page, legal pages). The checkout form POSTs directly to the backend's
  `/api/orders` using `NEXT_PUBLIC_API_URL`. No database code lives here.
- **`backend/`** — a FastAPI service that:
  - Validates and authoritatively prices every order (`app/core/catalog.py` — never trusts a
    client-sent price), stores it in Postgres, and returns a `wa.me` WhatsApp deep link so the
    team can confirm the order (COD confirmation is done by a human over WhatsApp, not
    automatically).
  - Serves a login-protected admin dashboard at `GET /admin` — view/search/filter orders and
    update their status (pending → confirmed → dispatched → delivered/returned/cancelled).
- Both services are independent Docker images (`frontend/Dockerfile`, `backend/Dockerfile`) wired
  together by the root `docker-compose.yml`, so they can be deployed as two services in the same
  Coolify/Easypanel/Dokploy project (matching how the sibling `tropicskin-panama` store is set up).

## Deploy

Compatible with Coolify / Easypanel / Dokploy "Docker Compose" services. Point it at this repo's
`docker-compose.yml` and set these environment variables on the project:

| Variable | Used by | Notes |
|---|---|---|
| `DATABASE_URL` | backend | Postgres connection string (`postgres://...`) |
| `FRONTEND_ORIGIN` | backend | Public frontend URL, for CORS |
| `WHATSAPP_NUMBER` | backend | International format, no `+`/spaces |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | backend | Admin dashboard login |
| `ADMIN_SECRET_KEY` | backend | Random string that signs admin session tokens |
| `NEXT_PUBLIC_API_URL` | frontend (build + runtime) | Public URL of the backend service |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | frontend (build) | Same number as `WHATSAPP_NUMBER`, no `+` |

**Note on Docker-internal database hostnames:** if `DATABASE_URL`'s host looks like
`something_database` (a Coolify/Docker Compose internal service name), it only resolves *inside*
that same Docker network — not from your local machine. That's expected: it'll connect once the
backend itself is deployed as another service in that same project. The backend also strips
`sslmode` and normalizes `postgres://` → `postgresql+asyncpg://` internally, so you can paste the
connection string straight from your hosting panel.

## Docs

The original brand/product/marketing strategy this store implements lives in
`../LEGER_BRAND_POSITIONING_AND_STORE_BLUEPRINT.md` and `../PANAMA_COD_STORE_STRATEGY.md` in the
parent folder. Per-service details: [`frontend/README.md`](frontend/README.md) ·
[`backend/README.md`](backend/README.md).
