from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode

from pydantic_settings import BaseSettings, SettingsConfigDict


def _to_asyncpg_url(raw: str) -> str:
    """Normalizes a standard `postgres://` / `postgresql://` URL (as issued by
    most hosting panels) into the `postgresql+asyncpg://` form SQLAlchemy's
    async engine needs, and strips `sslmode` — asyncpg doesn't understand the
    libpq-style `sslmode` query param (use `ssl=true` instead if you need TLS).
    """
    parts = urlsplit(raw)
    scheme = parts.scheme
    if scheme in ("postgres", "postgresql"):
        scheme = "postgresql+asyncpg"

    query_pairs = [(k, v) for k, v in parse_qsl(parts.query) if k.lower() != "sslmode"]
    query = urlencode(query_pairs)

    return urlunsplit((scheme, parts.netloc, parts.path, query, parts.fragment))


class Settings(BaseSettings):
    DATABASE_URL: str

    # Admin dashboard (served at GET /admin)
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "change-me"
    ADMIN_SECRET_KEY: str = "dev-insecure-change-this-secret"
    ADMIN_SESSION_HOURS: int = 12

    # CORS — the frontend's public origin(s)
    FRONTEND_ORIGIN: str = "http://localhost:3000"

    # WhatsApp Business number that order-confirmation links point to
    # (international format, no "+" or spaces, e.g. 50760000000)
    # TODO: número temporal (Marruecos) — sustituir por el número real de
    # Panamá en cuanto esté disponible (P0.1 de LEGER_CRO_UPGRADE.md).
    WHATSAPP_NUMBER: str = "212664365298"

    # Google Apps Script Web App URL that appends every order as a row in a
    # Google Sheet (live ops dashboard without DB access). Leave empty to
    # disable — checkout never fails because of this, it's best-effort.
    GOOGLE_SHEETS_WEBHOOK_URL: str = ""

    # CallMeBot API key that lets the backend push a WhatsApp message
    # straight to WHATSAPP_NUMBER the instant an order comes in (no click
    # needed from the customer). Get it by messaging the CallMeBot WhatsApp
    # contact once — see backend/app/services/whatsapp_notify.py. Leave
    # empty to disable — checkout never fails because of this.
    CALLMEBOT_API_KEY: str = ""

    # --- Conversions API (server-side ad tracking) ---
    # Same Pixel IDs as the frontend's NEXT_PUBLIC_*_PIXEL_ID, mirrored here
    # so the backend can hit each platform's server-to-server events
    # endpoint. Each platform is independently optional — CAPI calls for a
    # platform are skipped silently if its PIXEL_ID or ACCESS_TOKEN is
    # empty. See app/services/capi/ for the actual implementations.
    FB_PIXEL_ID: str = ""
    FB_CAPI_ACCESS_TOKEN: str = ""  # Events Manager → Settings → Conversions API → Generate access token

    TIKTOK_PIXEL_ID: str = ""
    TIKTOK_CAPI_ACCESS_TOKEN: str = ""  # TikTok Ads Manager → Events → Manage → Generate Access Token

    SNAPCHAT_PIXEL_ID: str = ""
    SNAPCHAT_CAPI_ACCESS_TOKEN: str = ""  # Snapchat Ads Manager → Events Manager → Conversions API → Generate token

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def ASYNC_DATABASE_URL(self) -> str:
        return _to_asyncpg_url(self.DATABASE_URL)


settings = Settings()
