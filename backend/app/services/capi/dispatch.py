"""Fan-out helper — fires the same conversion event to every configured ad
platform's Conversions API concurrently, and logs a one-line summary so
CAPI activity is easy to spot in the backend logs regardless of how many
platforms are actually turned on.
"""
import asyncio
import logging

from app.services.capi.meta import send_meta_capi_event
from app.services.capi.snapchat import send_snapchat_capi_event
from app.services.capi.tiktok import send_tiktok_capi_event

logger = logging.getLogger("leger.capi")


async def send_capi_event(
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
    ttp: str | None = None,
    ttclid: str | None = None,
    client_ip: str | None = None,
    user_agent: str | None = None,
    event_source_url: str | None = None,
) -> dict[str, bool]:
    """Best-effort — never raises. Returns {"meta": bool, "tiktok": bool, "snapchat": bool}."""
    logger.info(
        "CAPI dispatch %s event_id=%s value=%s content_name=%s phone=%s",
        event_name,
        event_id,
        value,
        content_name,
        "yes" if phone else "no",
    )

    meta_task = send_meta_capi_event(
        event_name=event_name,
        event_id=event_id,
        value=value,
        currency=currency,
        content_name=content_name,
        phone=phone,
        email=email,
        fbp=fbp,
        fbc=fbc,
        client_ip=client_ip,
        user_agent=user_agent,
        event_source_url=event_source_url,
    )
    tiktok_task = send_tiktok_capi_event(
        event_name=event_name,
        event_id=event_id,
        value=value,
        currency=currency,
        content_name=content_name,
        phone=phone,
        email=email,
        ttp=ttp,
        ttclid=ttclid,
        client_ip=client_ip,
        user_agent=user_agent,
        event_source_url=event_source_url,
    )
    snapchat_task = send_snapchat_capi_event(
        event_name=event_name,
        event_id=event_id,
        value=value,
        currency=currency,
        content_name=content_name,
        phone=phone,
        email=email,
        client_ip=client_ip,
        user_agent=user_agent,
        event_source_url=event_source_url,
    )

    meta_ok, tiktok_ok, snapchat_ok = await asyncio.gather(meta_task, tiktok_task, snapchat_task)

    logger.info(
        "CAPI result %s event_id=%s meta=%s tiktok=%s snapchat=%s",
        event_name,
        event_id,
        meta_ok,
        tiktok_ok,
        snapchat_ok,
    )

    return {"meta": meta_ok, "tiktok": tiktok_ok, "snapchat": snapchat_ok}
