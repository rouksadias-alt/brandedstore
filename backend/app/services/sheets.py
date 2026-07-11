"""Pushes every order to a Google Sheet via a Google Apps Script Web App
webhook, so the ops team has a live, no-DB-access-needed order feed.

Same pattern as tropicskin-panama's docs/18-order-export-and-sheets.md,
adapted to LÉGER's flat `Order` model (no separate Customer/OrderItem
tables). Never blocks or fails checkout — logs and swallows any error.
"""
import logging

import httpx

from app.core.config import settings
from app.db.models import Order

logger = logging.getLogger("leger.sheets")


async def send_to_sheets(order: Order) -> bool:
    if not settings.GOOGLE_SHEETS_WEBHOOK_URL:
        return False  # Not configured — skip silently.

    payload = {
        "order_id": str(order.id),
        "created_at": order.created_at.isoformat() if order.created_at else "",
        "name": order.name,
        "phone": order.phone,
        "address": order.address,
        "city": order.city,
        "province": order.province,
        "product": order.product_name,
        "plan": order.plan_label,
        "bump": order.bump,
        "express": order.express,
        "total_usd": float(order.total_usd),
        "notes": order.notes or "",
        "status": order.status,
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(settings.GOOGLE_SHEETS_WEBHOOK_URL, json=payload)
            response.raise_for_status()
            return True
    except Exception as exc:  # noqa: BLE001 — never let Sheets failure block an order
        logger.error("Failed to send order %s to Google Sheets: %s", order.id, exc)
        return False
