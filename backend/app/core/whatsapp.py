from urllib.parse import quote

from app.core.catalog import BUMP_LABEL, BUMP_PRICE, EXPRESS_LABEL, EXPRESS_PRICE
from app.core.config import settings


def build_order_message(
    *,
    name: str,
    phone: str,
    product: str,
    plan: str,
    price: float,
    bump: bool = False,
    express: bool = False,
    city: str | None = None,
) -> str:
    """Plain-text message the customer sends to confirm their order."""
    lines = [
        "¡Hola LÉGER! 👋 Quiero confirmar mi pedido:",
        f"🧍 Nombre: {name}",
        f"📞 Teléfono: {phone}",
    ]
    if city:
        lines.append(f"📍 Ciudad: {city}")
    lines.append(f"🛍️ Producto: {product}")
    lines.append(f"📦 Plan: {plan}")
    if bump:
        lines.append(f"➕ Agregar {BUMP_LABEL} (+${BUMP_PRICE:g})")
    if express:
        lines.append(f"⚡ {EXPRESS_LABEL} (+${EXPRESS_PRICE:g})")
    lines.append(f"💵 Total estimado: ${price:g}")
    lines.append("💳 Pago Contra Entrega")

    return "\n".join(lines)


def build_whatsapp_order_link(
    *,
    name: str,
    phone: str,
    product: str,
    plan: str,
    price: float,
    bump: bool = False,
    express: bool = False,
    city: str | None = None,
) -> str:
    text = quote(
        build_order_message(
            name=name,
            phone=phone,
            product=product,
            plan=plan,
            price=price,
            bump=bump,
            express=express,
            city=city,
        )
    )
    return f"https://wa.me/{settings.WHATSAPP_NUMBER}?text={text}"
