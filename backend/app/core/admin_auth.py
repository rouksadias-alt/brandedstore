"""Stateless admin auth using HMAC-signed tokens (no external deps).

Credentials are configured via env (ADMIN_USERNAME / ADMIN_PASSWORD) and the
token is signed with ADMIN_SECRET_KEY. Token format: base64url(payload).signature
"""
import base64
import hashlib
import hmac
import json
import time
import secrets

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.core.config import settings

bearer_scheme = HTTPBearer(auto_error=False)


def _b64encode(raw: bytes) -> str:
    return base64.urlsafe_b64encode(raw).rstrip(b"=").decode()


def _b64decode(data: str) -> bytes:
    padding = "=" * (-len(data) % 4)
    return base64.urlsafe_b64decode(data + padding)


def _sign(payload_b64: str) -> str:
    sig = hmac.new(
        settings.ADMIN_SECRET_KEY.encode(),
        payload_b64.encode(),
        hashlib.sha256,
    ).digest()
    return _b64encode(sig)


def verify_credentials(username: str, password: str) -> bool:
    # Constant-time comparison to avoid timing attacks.
    user_ok = hmac.compare_digest(username or "", settings.ADMIN_USERNAME)
    pass_ok = hmac.compare_digest(password or "", settings.ADMIN_PASSWORD)
    return user_ok and pass_ok


def create_token(username: str) -> tuple[str, int]:
    expires_at = int(time.time()) + settings.ADMIN_SESSION_HOURS * 3600
    payload = {"sub": username, "exp": expires_at, "jti": secrets.token_hex(8)}
    payload_b64 = _b64encode(json.dumps(payload, separators=(",", ":")).encode())
    token = f"{payload_b64}.{_sign(payload_b64)}"
    return token, expires_at


def _decode_token(token: str) -> dict:
    try:
        payload_b64, signature = token.split(".", 1)
    except ValueError:
        raise ValueError("malformed token")

    expected = _sign(payload_b64)
    if not hmac.compare_digest(signature, expected):
        raise ValueError("bad signature")

    payload = json.loads(_b64decode(payload_b64))
    if payload.get("exp", 0) < int(time.time()):
        raise ValueError("expired")
    return payload


async def require_admin(
    creds: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> str:
    if creds is None or not creds.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    try:
        payload = _decode_token(creds.credentials)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return payload["sub"]
