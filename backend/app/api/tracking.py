import logging

from fastapi import APIRouter, Request

from app.core.request_meta import client_ip, client_user_agent
from app.schemas.tracking import TrackEvent
from app.services.capi import send_capi_event

logger = logging.getLogger("leger.tracking")
router = APIRouter()


@router.post("/track/initiate-checkout")
async def track_initiate_checkout(body: TrackEvent, request: Request):
    """Fire-and-forget CAPI-side mirror of the browser pixel's
    InitiateCheckout event, fired from checkout-form.tsx on mount. Not tied
    to an Order row (the customer hasn't submitted the form yet) — dedup
    against the browser pixel relies purely on the shared event_id."""
    await send_capi_event(
        event_name="InitiateCheckout",
        event_id=body.event_id,
        value=body.value,
        currency=body.currency,
        content_name=body.content_name,
        phone=body.phone,
        fbp=body.fbp,
        fbc=body.fbc,
        ttp=body.ttp,
        ttclid=body.ttclid,
        client_ip=client_ip(request),
        user_agent=client_user_agent(request),
        event_source_url=body.event_source_url,
    )
    # Always OK — this endpoint only exists to feed ad-platform analytics.
    return {"ok": True}
