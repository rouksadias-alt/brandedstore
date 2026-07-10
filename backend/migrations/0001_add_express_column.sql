-- ============================================================================
-- LÉGER — Add `express` shipping flag + dashboard query indexes
--
-- The backend auto-creates the `orders` table on first boot
-- (Base.metadata.create_all), but it will NOT add new columns to an
-- already-existing table. Since the `orders` table already exists in
-- production, run this once by hand (Easypanel → Postgres service → Console,
-- or any psql client) after deploying the new backend.
--
-- Idempotent — safe to run more than once.
-- ============================================================================

ALTER TABLE orders ADD COLUMN IF NOT EXISTS express BOOLEAN NOT NULL DEFAULT FALSE;

-- Speeds up the dashboard's "top offers" and "Producto" filter.
CREATE INDEX IF NOT EXISTS ix_orders_product_slug ON orders (product_slug);
-- Speeds up the dashboard's "top provinces" breakdown.
CREATE INDEX IF NOT EXISTS ix_orders_province ON orders (province);
