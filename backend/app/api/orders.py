import logging

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.catalog import price_order
from app.core.whatsapp import build_whatsapp_order_link
from app.db.models import Order
from app.db.session import get_db
from app.schemas.orders import OrderCreate, OrderResponse
from app.services.sheets import send_to_sheets
from app.services.whatsapp_notify import send_order_notification

logger = logging.getLogger("leger.orders")
router = APIRouter()


@router.post("/orders", response_model=OrderResponse, response_model_by_alias=True)
async def create_order(body: OrderCreate, db: AsyncSession = Depends(get_db)):
    try:
        option, tier, bump_applied, total = price_order(
            body.product_slug, body.plan_id, body.bump, body.express
        )
    except KeyError:
        raise HTTPException(
            status_code=400,
            detail={
                "message": "Selecciona un producto y plan válidos.",
                "fieldErrors": {"productSlug": "Producto o plan inválido"},
            },
        )

    plan_label = tier.label + (" + Bruma Instantánea" if bump_applied else "")

    whatsapp_link = build_whatsapp_order_link(
        name=body.name,
        phone=body.phone,
        product=option.name,
        plan=plan_label,
        price=total,
        bump=bump_applied,
        express=body.express,
        city=f"{body.city}, {body.province}",
    )

    order = Order(
        name=body.name,
        phone=body.phone,
        address=body.address,
        city=body.city,
        province=body.province,
        product_slug=option.slug,
        product_name=option.name,
        plan_id=tier.id,
        plan_label=tier.label,
        bump=bump_applied,
        express=body.express,
        total_usd=total,
        notes=body.notes or None,
        status="pending_confirmation",
    )
    db.add(order)
    try:
        await db.commit()
    except Exception as exc:  # noqa: BLE001 — never fail checkout on a DB hiccup
        await db.rollback()
        logger.error("Failed to persist order (continuing with WhatsApp link only): %s", exc)

    await send_to_sheets(order)
    await send_order_notification(order)

    return OrderResponse(whatsapp_link=whatsapp_link, total=total)
