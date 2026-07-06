import re

from pydantic import BaseModel, ConfigDict, Field, field_validator

PANAMA_PROVINCES = {
    "Panamá",
    "Panamá Oeste",
    "Colón",
    "Coclé",
    "Veraguas",
    "Herrera",
    "Los Santos",
    "Chiriquí",
    "Bocas del Toro",
    "Darién",
    "Comarca Guna Yala",
    "Comarca Emberá-Wounaan",
    "Comarca Ngäbe-Buglé",
}

PRODUCT_SLUGS = {"roll-on", "medias-compresion", "bruma", "kit-completo"}

_PHONE_RE = re.compile(r"^[0-9+\-\s()]+$")


class OrderCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    name: str = Field(min_length=3, max_length=100)
    phone: str = Field(min_length=7, max_length=20)
    address: str = Field(min_length=5, max_length=300)
    city: str = Field(min_length=2, max_length=100)
    province: str
    product_slug: str = Field(alias="productSlug")
    plan_id: str = Field(alias="planId", min_length=1, max_length=20)
    bump: bool = False
    notes: str | None = Field(default=None, max_length=500)

    @field_validator("name", "address", "city")
    @classmethod
    def _strip(cls, v: str) -> str:
        return v.strip()

    @field_validator("phone")
    @classmethod
    def _validate_phone(cls, v: str) -> str:
        v = v.strip()
        if not _PHONE_RE.match(v):
            raise ValueError("Solo números, +, - y espacios")
        return v

    @field_validator("province")
    @classmethod
    def _validate_province(cls, v: str) -> str:
        if v not in PANAMA_PROVINCES:
            raise ValueError("Selecciona tu provincia")
        return v

    @field_validator("product_slug")
    @classmethod
    def _validate_product(cls, v: str) -> str:
        if v not in PRODUCT_SLUGS:
            raise ValueError("Selecciona un producto")
        return v


class OrderResponse(BaseModel):
    ok: bool = True
    whatsapp_link: str = Field(serialization_alias="whatsappLink")
    total: float
