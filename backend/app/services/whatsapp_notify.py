"""Pushes a WhatsApp message directly to the store owner's phone the instant
an order comes in, via CallMeBot (https://www.callmebot.com/blog/free-api-whatsapp-messages/) —
a free third-party API for sending WhatsApp messages to your own number
without the WhatsApp Business API. No click needed from the customer.

ONE-TIME SETUP (do this once, per WHATSAPP_NUMBER):
1. Add this number to your phone contacts: +34 644 10 55 84 (CallMeBot)
2. On WhatsApp, send this exact message to that contact:
     I allow callmebot to send me messages
3. Wait for a reply with your personal API key (a number).
4. Set CALLMEBOT_API_KEY to that value (Easypanel env var + docker-compose.yml default).

Never blocks or fails checkout — logs and swallows any error.
"""
import logging

import httpx

from app.core.config import settings
from app.core.whatsapp import build_order_message
from app.db.models import Order

logger = logging.getLogger("leger.whatsapp_notify")

CALLMEBOT_URL = "https://api.callmebot.com/whatsapp.php"


async def send_order_notification(order: Order) -> bool:
    if not settings.CALLMEBOT_API_KEY:
        return False  # Not configured — skip silently.

    message = "🆕 NUEVO PEDIDO LÉGER\n\n" + build_order_message(
        name=order.name,
        phone=order.phone,
        product=order.product_name,
        plan=order.plan_label,
        price=float(order.total_usd),
        bump=order.bump,
        express=order.express,
        city=f"{order.city}, {order.province}",
    ) + f"\n🏠 Dirección: {order.address}"

    params = {
        "phone": settings.WHATSAPP_NUMBER,
        "text": message,
        "apikey": settings.CALLMEBOT_API_KEY,
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(CALLMEBOT_URL, params=params)
            response.raise_for_status()
            return True
    except Exception as exc:  # noqa: BLE001 — never let a notification failure block an order
        logger.error("Failed to send WhatsApp notification for order %s: %s", order.id, exc)
        return False
