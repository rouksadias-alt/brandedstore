from datetime import datetime, timedelta, date, time as dtime

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, select, desc
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.admin_auth import verify_credentials, create_token, require_admin
from app.db.models import Order, ORDER_STATUSES
from app.db.session import get_db
from app.schemas.admin import LoginRequest, LoginResponse, StatusUpdate

router = APIRouter()


@router.post("/login", response_model=LoginResponse)
async def login(body: LoginRequest):
    if not verify_credentials(body.username, body.password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    token, expires_at = create_token(body.username)
    return LoginResponse(token=token, expires_at=expires_at)


@router.get("/me")
async def me(admin: str = Depends(require_admin)):
    return {"username": admin}


def _parse_range(start: str | None, end: str | None) -> tuple[datetime, datetime]:
    """Parse YYYY-MM-DD strings into an inclusive [start 00:00, end 23:59:59]
    window. Defaults to the last 30 days."""
    today = date.today()
    try:
        end_d = datetime.strptime(end, "%Y-%m-%d").date() if end else today
    except ValueError:
        end_d = today
    try:
        start_d = datetime.strptime(start, "%Y-%m-%d").date() if start else end_d - timedelta(days=29)
    except ValueError:
        start_d = end_d - timedelta(days=29)
    if start_d > end_d:
        start_d, end_d = end_d, start_d
    return datetime.combine(start_d, dtime.min), datetime.combine(end_d, dtime.max)


@router.get("/summary")
async def summary(
    start: str | None = None,
    end: str | None = None,
    db: AsyncSession = Depends(get_db),
    admin: str = Depends(require_admin),
):
    start_dt, end_dt = _parse_range(start, end)
    in_range = Order.created_at.between(start_dt, end_dt)

    total_orders = await db.scalar(select(func.count()).where(in_range)) or 0
    revenue = float(await db.scalar(select(func.coalesce(func.sum(Order.total_usd), 0)).where(in_range)) or 0)
    aov = round(revenue / total_orders, 2) if total_orders else 0.0

    status_rows = (
        await db.execute(select(Order.status, func.count()).where(in_range).group_by(Order.status))
    ).all()
    by_status = {s: 0 for s in ORDER_STATUSES}
    for s, c in status_rows:
        by_status[s] = c

    return {
        "range": {"start": start_dt.date().isoformat(), "end": end_dt.date().isoformat()},
        "kpis": {"orders": total_orders, "revenue": round(revenue, 2), "aov": aov},
        "orders_by_status": by_status,
    }


@router.get("/orders")
async def list_orders(
    start: str | None = None,
    end: str | None = None,
    status: str | None = None,
    q: str | None = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    admin: str = Depends(require_admin),
):
    start_dt, end_dt = _parse_range(start, end)
    base = select(Order).where(Order.created_at.between(start_dt, end_dt))
    if status and status != "all":
        base = base.where(Order.status == status)
    if q:
        like = f"%{q.strip()}%"
        base = base.where((Order.name.ilike(like)) | (Order.phone.ilike(like)))

    total = await db.scalar(select(func.count()).select_from(base.subquery())) or 0

    rows = (
        await db.execute(
            base.order_by(desc(Order.created_at)).offset((page - 1) * page_size).limit(page_size)
        )
    ).scalars().all()

    items = [
        {
            "id": str(o.id),
            "created_at": o.created_at.isoformat() if o.created_at else None,
            "name": o.name,
            "phone": o.phone,
            "address": o.address,
            "city": o.city,
            "province": o.province,
            "product_name": o.product_name,
            "plan_label": o.plan_label,
            "bump": o.bump,
            "total_usd": float(o.total_usd),
            "notes": o.notes,
            "status": o.status,
        }
        for o in rows
    ]
    return {"total": total, "page": page, "page_size": page_size, "items": items}


@router.patch("/orders/{order_id}")
async def update_order_status(
    order_id: str,
    body: StatusUpdate,
    db: AsyncSession = Depends(get_db),
    admin: str = Depends(require_admin),
):
    if body.status not in ORDER_STATUSES:
        raise HTTPException(status_code=400, detail="Estado inválido")
    o = (await db.execute(select(Order).where(Order.id == order_id))).scalars().first()
    if not o:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")
    o.status = body.status
    await db.commit()
    return {"ok": True, "id": str(o.id), "status": o.status}
