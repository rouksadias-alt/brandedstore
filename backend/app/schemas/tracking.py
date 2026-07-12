from pydantic import BaseModel, ConfigDict, Field


class TrackEvent(BaseModel):
    """Lightweight payload for fire-and-forget CAPI-only events (currently
    just InitiateCheckout) that aren't tied to a persisted Order row."""

    model_config = ConfigDict(populate_by_name=True)

    event_id: str = Field(alias="eventId", min_length=1, max_length=100)
    value: float | None = None
    currency: str = "USD"
    content_name: str | None = Field(default=None, alias="contentName", max_length=200)
    phone: str | None = Field(default=None, max_length=20)
    fbp: str | None = Field(default=None, max_length=100)
    fbc: str | None = Field(default=None, max_length=200)
    ttp: str | None = Field(default=None, max_length=200)
    ttclid: str | None = Field(default=None, max_length=200)
    sc_click_id: str | None = Field(default=None, alias="scClickId", max_length=200)
    event_source_url: str | None = Field(default=None, alias="eventSourceUrl", max_length=500)
