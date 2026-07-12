"""Snapchat Conversions API v3 — https://developers.snap.com/marketing-api/Conversions-API/Introduction

POST https://tr.snapchat.com/v3/{pixel_id}/events?access_token=...
Dedup with the browser Snap Pixel is done by sending the *same* id from both
sides: the Pixel's `client_dedup_id` must equal this top-level `event_id`;
Snap matches on (pixel_id, event_name, event_id) within 48h. `ph`/`em` must
be SHA-256 hashed here (digits-only phone incl. country code, no '+').
"""
import logging
import time

import httpx

from app.core.config import settings
from app.services.capi.hashing import hash_email, hash_phone

logger = logging.getLogger("leger.capi.snapchat")

# Our internal event names -> Snap's standard event vocabulary.
EVENT_NAME_MAP = {
    "InitiateCheckout": "START_CHECKOUT",
    "Purchase": "PURCHASE",
}


async def send_snapchat_capi_event(
    *,
    event_name: str,
    event_id: str,
    value: float | None = None,
    currency: str = "USD",
    content_name: str | None = None,
    phone: str | None = None,
    email: str | None = None,
    client_ip: str | None = None,
    user_agent: str | None = None,
    event_source_url: str | None = None,
) -> bool:
    if not settings.SNAPCHAT_PIXEL_ID or not settings.SNAPCHAT_CAPI_ACCESS_TOKEN:
        return False

    snap_event = EVENT_NAME_MAP.get(event_name, event_name)

    user_data: dict = {}
    hashed_phone = hash_phone(phone)
    if hashed_phone:
        user_data["ph"] = hashed_phone
    hashed_email = hash_email(email)
    if hashed_email:
        user_data["em"] = hashed_email
    if client_ip:
        user_data["client_ip_address"] = client_ip
    if user_agent:
        user_data["client_user_agent"] = user_agent

    custom_data: dict = {"currency": currency}
    if value is not None:
        custom_data["value"] = value
    if content_name:
        custom_data["content_name"] = content_name

    payload = {
        "data": [
            {
                "event_name": snap_event,
                "event_time": int(time.time()),
                "event_id": event_id,
                "action_source": "WEB",
                "event_source_url": event_source_url or settings.FRONTEND_ORIGIN,
                "user_data": user_data,
                "custom_data": custom_data,
            }
        ],
    }

    url = f"https://tr.snapchat.com/v3/{settings.SNAPCHAT_PIXEL_ID}/events"

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(
                url, params={"access_token": settings.SNAPCHAT_CAPI_ACCESS_TOKEN}, json=payload
            )
            logger.info(
                "Snapchat CAPI %s event_id=%s status=%s response=%s",
                snap_event,
                event_id,
                response.status_code,
                response.text[:500],
            )
            response.raise_for_status()
            return True
    except Exception as exc:  # noqa: BLE001 — CAPI is best-effort, never breaks checkout
        logger.error("Snapchat CAPI %s event_id=%s failed: %s", snap_event, event_id, exc)
        return False
