"""Authoritative product/plan/pricing catalog.

Mirrors the `checkoutOptions` data in frontend/src/lib/products.ts. Kept here
(not just trusted from the client) so the backend can validate and price
every order itself — the frontend is only responsible for presentation.
If you change a price or add a plan, update both files.
"""
from dataclasses import dataclass

BUMP_PRICE = 9.0
BUMP_LABEL = "Bruma Instantánea"


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
        name="Roll-On Crioactivo",
        allow_bump=True,
        tiers={
            "1x": PlanTier("1x", "1 Unidad", 29.0),
            "2x": PlanTier("2x", "2 Unidades", 49.0),
            "kit": PlanTier("kit", "Kit Completo", 59.0),
        },
    ),
    "medias-compresion": CheckoutOption(
        slug="medias-compresion",
        name="Compression 360°",
        allow_bump=True,
        tiers={
            "1x": PlanTier("1x", "1 Par", 25.0),
            "2x": PlanTier("2x", "2 Pares", 42.0),
            "kit": PlanTier("kit", "Kit Completo", 59.0),
        },
    ),
    "bruma": CheckoutOption(
        slug="bruma",
        name="Bruma Instantánea",
        allow_bump=False,
        tiers={
            "1x": PlanTier("1x", "1 Unidad", 19.0),
            "2x": PlanTier("2x", "2 Unidades", 32.0),
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


def price_order(product_slug: str, plan_id: str, bump: bool) -> tuple[CheckoutOption, PlanTier, bool, float]:
    """Returns (option, tier, bump_applied, total) or raises KeyError if invalid."""
    option = CHECKOUT_OPTIONS[product_slug]
    tier = option.tiers[plan_id]
    bump_applied = bool(bump) and option.allow_bump
    total = tier.price + (BUMP_PRICE if bump_applied else 0.0)
    return option, tier, bump_applied, total
