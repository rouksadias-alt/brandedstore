"""PII normalization + hashing shared by every platform's Conversions API.

Meta, TikTok and Snapchat all require the *same* recipe for matching
parameters sent server-side: trim/lowercase, normalize, then SHA-256 (lowercase
hex digest). Web pixels (fbq/ttq/snaptr) do this hashing themselves in the
browser when given raw values, so the frontend never needs to hash anything —
only the server-side Conversions API calls in this package do.
"""
import hashlib
import re

DEFAULT_COUNTRY_CODE = "507"  # Panama — our checkout form collects local numbers without it.


def _sha256_hex(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def normalize_phone_digits(phone: str | None, default_country_code: str = DEFAULT_COUNTRY_CODE) -> str | None:
    """Digits-only phone number with country code, no leading '+' or zeros —
    the format every platform expects before hashing (e.g. "5076000000")."""
    if not phone:
        return None
    digits = re.sub(r"\D", "", phone)
    digits = digits.lstrip("0") or digits  # drop leading zeros unless it's all zeros
    if not digits:
        return None
    # Panama mobile/landline numbers are 7-8 digits without a country code.
    if len(digits) <= 8:
        digits = default_country_code + digits
    return digits


def hash_phone(phone: str | None) -> str | None:
    normalized = normalize_phone_digits(phone)
    return _sha256_hex(normalized) if normalized else None


def normalize_email(email: str | None) -> str | None:
    if not email:
        return None
    trimmed = email.strip().lower()
    return trimmed or None


def hash_email(email: str | None) -> str | None:
    normalized = normalize_email(email)
    return _sha256_hex(normalized) if normalized else None
