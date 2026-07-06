// Applies db/schema.sql against DATABASE_URL.
// Usage: npm run db:migrate   (reads .env.local automatically via --env-file)
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Pool } from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error(
    "DATABASE_URL is not set. Add it to .env.local, e.g.\n" +
      "  DATABASE_URL=postgres://user:password@host:5432/db?sslmode=disable"
  );
  process.exit(1);
}

const sql = readFileSync(path.join(__dirname, "..", "db", "schema.sql"), "utf8");

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes("sslmode=require")
    ? { rejectUnauthorized: false }
    : undefined,
});

try {
  console.log(`Connecting to ${connectionString.replace(/:[^:@]*@/, ":****@")} ...`);
  await pool.query(sql);
  console.log("✅ Schema applied successfully — `orders` table is ready.");
} catch (err) {
  console.error("❌ Migration failed:", err instanceof Error ? err.message : err);
  process.exitCode = 1;
} finally {
  await pool.end();
}
