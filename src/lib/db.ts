import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __legerPgPool: Pool | undefined;
}

/**
 * Lazily creates a shared Postgres connection pool from DATABASE_URL.
 * Returns null when it isn't configured yet — callers should degrade
 * gracefully (e.g. still generate the WhatsApp confirmation link) instead of
 * crashing, since the database is optional until it's reachable.
 *
 * Reused across hot-reloads/invocations via a global to avoid exhausting
 * connections in dev.
 */
export function getDbPool(): Pool | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;

  if (!global.__legerPgPool) {
    global.__legerPgPool = new Pool({
      connectionString,
      ssl: connectionString.includes("sslmode=require")
        ? { rejectUnauthorized: false }
        : undefined,
      max: 5,
    });
    global.__legerPgPool.on("error", (err) => {
      console.error("[db] Unexpected idle client error:", err.message);
    });
  }

  return global.__legerPgPool;
}

export const ORDERS_TABLE = "orders";
