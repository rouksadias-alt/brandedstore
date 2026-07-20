"""Authoritative product/plan/pricing catalog.

Mirrors the `pricingTiers` / `checkoutOptions` data in
frontend/src/lib/products.ts. Kept here (not just trusted from the client) so
the backend can validate and price every order itself — the frontend is only
responsible for presentation. If you change a price or add a plan, update
both files.
"""
from dataclasses import dataclass

BUMP_PRICE = 9.0
BUMP_LABEL = "Bruma Instantánea"

EXPRESS_PRICE = 2.0
EXPRESS_LABEL = "Envío Express (<48h)"


@dataclass(frozen=True)
class PlanTier:
    id: str
    label: str
    price: float


@dataclass(frozen=True)
class CheckoutOption:
    slug: str
    name: str
    tiers: dict[str, PlanTier]
    allow_bump: bool


CHECKOUT_OPTIONS: dict[str, CheckoutOption] = {
    "roll-on": CheckoutOption(
        slug="roll-on",
        name="Gel Crioactivo",
        allow_bump=True,
        tiers={
            "2x": PlanTier("2x", "1 Gel Crioactivo", 39.0),
            "duo": PlanTier("duo", "Gel + Medias", 49.0),
            "kit": PlanTier("kit", "Kit Completo", 59.0),
        },
    ),
    "medias-compresion": CheckoutOption(
        slug="medias-compresion",
        name="Compression 360°",
        allow_bump=True,
        tiers={
            "2x": PlanTier("2x", "1 Par de Medias", 39.0),
            "duo": PlanTier("duo", "Medias + Gel", 49.0),
            "kit": PlanTier("kit", "Kit Completo", 59.0),
        },
    ),
    "bruma": CheckoutOption(
        slug="bruma",
        name="Bruma Instantánea",
        allow_bump=False,
        tiers={
            "2x": PlanTier("2x", "1 Bruma", 34.0),
            "duo": PlanTier("duo", "Bruma + Gel", 44.0),
            "kit": PlanTier("kit", "Kit Completo", 59.0),
        },
    ),
    "kit-completo": CheckoutOption(
        slug="kit-completo",
        name="Kit LÉGER Piernas Ligeras Completo",
        allow_bump=False,
        tiers={
            "kit": PlanTier("kit", "Kit Completo", 59.0),
        },
    ),
}


def get_checkout_option(slug: str) -> CheckoutOption | None:
    return CHECKOUT_OPTIONS.get(slug)


def price_order(
    product_slug: str, plan_id: str, bump: bool, express: bool = False
) -> tuple[CheckoutOption, PlanTier, bool, float]:
    """Returns (option, tier, bump_applied, total) or raises KeyError if invalid."""
    option = CHECKOUT_OPTIONS[product_slug]
    tier = option.tiers[plan_id]
    bump_applied = bool(bump) and option.allow_bump
    total = tier.price
    if bump_applied:
        total += BUMP_PRICE
    if express:
        total += EXPRESS_PRICE
    return option, tier, bump_applied, total
