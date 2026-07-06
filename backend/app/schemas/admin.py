from pydantic import BaseModel

from app.db.models import ORDER_STATUSES

__all__ = ["LoginRequest", "LoginResponse", "StatusUpdate", "ORDER_STATUSES"]


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    token: str
    expires_at: int


class StatusUpdate(BaseModel):
    status: str
