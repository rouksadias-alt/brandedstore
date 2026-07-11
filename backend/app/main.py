import os

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse

from app.api import orders, health, admin
from app.core.config import settings
from app.db.session import create_tables

app = FastAPI(title="LÉGER API")

app.add_middleware(
    CORSMiddleware,
    # Keep the Easypanel *.easypanel.host domain allowed too (in addition to
    # the real custom domain in FRONTEND_ORIGIN) so things don't break mid
    # DNS cutover, and so the raw Easypanel URL still works for testing.
    allow_origins=[
        settings.FRONTEND_ORIGIN,
        "https://brandedstore-app.9qvumg.easypanel.host",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await create_tables()


@app.exception_handler(RequestValidationError)
async def validation_error_handler(request: Request, exc: RequestValidationError):
    """Reshapes FastAPI/Pydantic's default error format into
    { message, fieldErrors } so the frontend can highlight individual
    fields (matches the contract the checkout form expects)."""
    field_errors: dict[str, str] = {}
    for err in exc.errors():
        loc = [str(p) for p in err["loc"] if p != "body"]
        field = loc[0] if loc else "form"
        if field not in field_errors:
            field_errors[field] = err["msg"].removeprefix("Value error, ")
    return JSONResponse(
        status_code=400,
        content={"message": "Revisa los campos marcados e intenta de nuevo.", "fieldErrors": field_errors},
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Lets routes raise HTTPException(detail={"message": ..., "fieldErrors": {...}})
    and have that dict returned as the top-level JSON body (instead of nested
    under "detail"), matching what the frontend reads."""
    if isinstance(exc.detail, dict):
        return JSONResponse(status_code=exc.status_code, content=exc.detail, headers=exc.headers)
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": str(exc.detail)},
        headers=exc.headers,
    )


app.include_router(orders.router, prefix="/api")
app.include_router(health.router, prefix="/api")
app.include_router(admin.router, prefix="/api/admin")

_DASHBOARD_HTML = os.path.join(os.path.dirname(__file__), "admin", "dashboard.html")


@app.get("/admin", include_in_schema=False)
async def admin_dashboard():
    return FileResponse(_DASHBOARD_HTML, headers={"Cache-Control": "no-store"})
