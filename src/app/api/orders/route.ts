import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/order-schema";
import { buildWhatsAppOrderLink, getCheckoutOption } from "@/lib/products";
import { getDbPool, ORDERS_TABLE } from "@/lib/db";

const BUMP_PRICE = 9;
const BUMP_LABEL = "Bruma Instantánea";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Solicitud inválida." },
      { status: 400 }
    );
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return NextResponse.json(
      {
        message: "Revisa los campos marcados e intenta de nuevo.",
        fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const option = getCheckoutOption(data.productSlug);
  const tier = option.tiers.find((t) => t.id === data.planId) ?? option.tiers[0];
  const allowBump = option.allowBump && data.bump;
  const total = tier.price + (allowBump ? BUMP_PRICE : 0);

  const whatsappLink = buildWhatsAppOrderLink({
    name: data.name,
    phone: data.phone,
    product: option.name,
    plan: `${tier.label}${allowBump ? ` + ${BUMP_LABEL}` : ""}`,
    price: total,
    bump: allowBump,
    city: `${data.city}, ${data.province}`,
  });

  const orderRecord = {
    name: data.name,
    phone: data.phone,
    address: data.address,
    city: data.city,
    province: data.province,
    product_slug: data.productSlug,
    product_name: option.name,
    plan_id: tier.id,
    plan_label: tier.label,
    bump: allowBump,
    total_usd: total,
    notes: data.notes || null,
    status: "pending_confirmation",
  };

  const pool = getDbPool();
  if (pool) {
    try {
      await pool.query(
        `insert into ${ORDERS_TABLE}
          (name, phone, address, city, province, product_slug, product_name,
           plan_id, plan_label, bump, total_usd, notes, status)
         values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [
          orderRecord.name,
          orderRecord.phone,
          orderRecord.address,
          orderRecord.city,
          orderRecord.province,
          orderRecord.product_slug,
          orderRecord.product_name,
          orderRecord.plan_id,
          orderRecord.plan_label,
          orderRecord.bump,
          orderRecord.total_usd,
          orderRecord.notes,
          orderRecord.status,
        ]
      );
    } catch (err) {
      // Don't fail the customer's checkout if the DB write fails — the
      // WhatsApp confirmation link below is the source of truth while
      // volume is low. Surface the error in server logs for follow-up.
      console.error(
        "[api/orders] Postgres insert failed:",
        err instanceof Error ? err.message : err
      );
    }
  } else {
    console.warn(
      "[api/orders] DATABASE_URL not configured — order was not persisted:",
      orderRecord
    );
  }

  return NextResponse.json({
    ok: true,
    whatsappLink,
    total,
  });
}
