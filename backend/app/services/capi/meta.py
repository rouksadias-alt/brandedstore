"""Meta Conversions API — https://developers.facebook.com/docs/marketing-api/conversions-api

POST https://graph.facebook.com/{version}/{pixel_id}/events?access_token=...
Dedup with the browser Meta Pixel is done by sending the *same* event_id from
both sides (fbq's 4th-arg `eventID` must equal this `event_id`); Meta matches
on (event_id, event_name) within a 48h window. `ph`/`em` must be SHA-256
hashed here (the server never trusts pixel-side hashing); `fbp`/`fbc` are
sent raw, never hashed.
"""
import logging
import time

import httpx

from app.core.config import settings
from app.services.capi.hashing import hash_email, hash_phone

logger = logging.getLogger("leger.capi.meta")

API_VERSION = "v25.0"


async def send_meta_capi_event(
    *,
    event_name: str,
    event_id: str,
    value: float | None = None,
    currency: str = "USD",
    content_name: str | None = None,
    phone: str | None = None,
    email: str | None = None,
    fbp: str | None = None,
    fbc: str | None = None,
    client_ip: str | None = None,
    user_agent: str | None = None,
    event_source_url: str | None = None,
) -> bool:
    if not settings.FB_PIXEL_ID or not settings.FB_CAPI_ACCESS_TOKEN:
        return False

    user_data: dict = {}
    hashed_phone = hash_phone(phone)
    if hashed_phone:
        user_data["ph"] = [hashed_phone]
    hashed_email = hash_email(email)
    if hashed_email:
        user_data["em"] = [hashed_email]
    if client_ip:
        user_data["client_ip_address"] = client_ip
    if user_agent:
        user_data["client_user_agent"] = user_agent
    if fbp:
        user_data["fbp"] = fbp
    if fbc:
        user_data["fbc"] = fbc

    custom_data: dict = {"currency": currency}
    if value is not None:
        custom_data["value"] = value
    if content_name:
        custom_data["content_name"] = content_name

    payload = {
        "data": [
            {
                "event_name": event_name,
                "event_time": int(time.time()),
                "event_id": event_id,
                "action_source": "website",
                "event_source_url": event_source_url or settings.FRONTEND_ORIGIN,
                "user_data": user_data,
                "custom_data": custom_data,
            }
        ],
    }

    url = f"https://graph.facebook.com/{API_VERSION}/{settings.FB_PIXEL_ID}/events"

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(
                url, params={"access_token": settings.FB_CAPI_ACCESS_TOKEN}, json=payload
            )
            logger.info(
                "Meta CAPI %s event_id=%s status=%s response=%s",
                event_name,
                event_id,
                response.status_code,
                response.text[:500],
            )
            response.raise_for_status()
            return True
    except Exception as exc:  # noqa: BLE001 — CAPI is best-effort, never breaks checkout
        logger.error("Meta CAPI %s event_id=%s failed: %s", event_name, event_id, exc)
        return False
