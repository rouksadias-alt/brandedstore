from urllib.parse import quote

from app.core.catalog import BUMP_LABEL
from app.core.config import settings


def build_whatsapp_order_link(
    *,
    name: str,
    phone: str,
    product: str,
    plan: str,
    price: float,
    bump: bool = False,
    city: str | None = None,
) -> str:
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
        lines.append(f"➕ Agregar {BUMP_LABEL} (+$9)")
    lines.append(f"💵 Total estimado: ${price:g}")
    lines.append("💳 Pago Contra Entrega")

    text = quote("\n".join(lines))
    return f"https://wa.me/{settings.WHATSAPP_NUMBER}?text={text}"
