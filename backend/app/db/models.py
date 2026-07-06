import uuid
from datetime import datetime

from sqlalchemy import String, Numeric, Boolean, TIMESTAMP, Text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), default=datetime.utcnow, index=True)

    name: Mapped[str] = mapped_column(String(200))
    phone: Mapped[str] = mapped_column(String(20), index=True)
    address: Mapped[str] = mapped_column(Text)
    city: Mapped[str] = mapped_column(String(100))
    province: Mapped[str] = mapped_column(String(100))

    product_slug: Mapped[str] = mapped_column(String(50))
    product_name: Mapped[str] = mapped_column(String(200))
    plan_id: Mapped[str] = mapped_column(String(20))
    plan_label: Mapped[str] = mapped_column(String(100))
    bump: Mapped[bool] = mapped_column(Boolean, default=False)
    total_usd: Mapped[float] = mapped_column(Numeric(10, 2))
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    status: Mapped[str] = mapped_column(String(30), default="pending_confirmation", index=True)


ORDER_STATUSES = [
    "pending_confirmation",
    "confirmed",
    "dispatched",
    "delivered",
    "returned",
    "cancelled",
]
