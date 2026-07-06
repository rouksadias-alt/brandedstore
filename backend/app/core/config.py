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
    WHATSAPP_NUMBER: str = "50760000000"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def ASYNC_DATABASE_URL(self) -> str:
        return _to_asyncpg_url(self.DATABASE_URL)


settings = Settings()
