"""TikTok Events API 2.0 — https://business-api.tiktok.com/portal (Events > Events API)

POST https://business-api.tiktok.com/open_api/v1.3/event/track/
Header: Access-Token
Dedup with the browser TikTok Pixel is done by sending the *same* event_id
from both sides (ttq.track's `event_id` property must equal this `event_id`);
TikTok matches on (event_source_id, event, event_id) within 48h. `phone`/
`email` must be SHA-256 hashed here (E.164 digits incl. country code, no '+').
"""
import logging
import time

import httpx

from app.core.config import settings
from app.services.capi.hashing import hash_email, hash_phone

logger = logging.getLogger("leger.capi.tiktok")

# Our internal event names -> TikTok's standard event vocabulary.
EVENT_NAME_MAP = {
    "InitiateCheckout": "InitiateCheckout",
    "Purchase": "CompletePayment",
}


async def send_tiktok_capi_event(
    *,
    event_name: str,
    event_id: str,
    value: float | None = None,
    currency: str = "USD",
    content_name: str | None = None,
    phone: str | None = None,
    email: str | None = None,
    ttp: str | None = None,
    ttclid: str | None = None,
    client_ip: str | None = None,
    user_agent: str | None = None,
    event_source_url: str | None = None,
) -> bool:
    if not settings.TIKTOK_PIXEL_ID or not settings.TIKTOK_CAPI_ACCESS_TOKEN:
        return False

    tiktok_event = EVENT_NAME_MAP.get(event_name, event_name)

    user: dict = {}
    hashed_phone = hash_phone(phone)
    if hashed_phone:
        user["phone"] = hashed_phone
    hashed_email = hash_email(email)
    if hashed_email:
        user["email"] = hashed_email
    if ttp:
        user["ttp"] = ttp

    context: dict = {}
    if user_agent:
        context["user_agent"] = user_agent
    if client_ip:
        context["ip"] = client_ip
    if event_source_url:
        context["page"] = {"url": event_source_url}
    if ttclid:
        context["ad"] = {"callback": ttclid}

    properties: dict = {"currency": currency}
    if value is not None:
        properties["value"] = value
    if content_name:
        properties["contents"] = [{"content_name": content_name, "content_type": "product"}]

    payload = {
        "pixel_code": settings.TIKTOK_PIXEL_ID,
        "event": tiktok_event,
        "event_id": event_id,
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "context": context,
        "user": user,
        "properties": properties,
    }

    url = "https://business-api.tiktok.com/open_api/v1.3/event/track/"
    headers = {"Access-Token": settings.TIKTOK_CAPI_ACCESS_TOKEN, "Content-Type": "application/json"}

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(url, headers=headers, json=payload)
            logger.info(
                "TikTok CAPI %s event_id=%s status=%s response=%s",
                tiktok_event,
                event_id,
                response.status_code,
                response.text[:500],
            )
            response.raise_for_status()
            return True
    except Exception as exc:  # noqa: BLE001 — CAPI is best-effort, never breaks checkout
        logger.error("TikTok CAPI %s event_id=%s failed: %s", tiktok_event, event_id, exc)
        return False
