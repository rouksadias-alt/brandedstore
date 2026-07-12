from fastapi import Request


def client_ip(request: Request) -> str | None:
    """Real visitor IP, accounting for the reverse proxy (Traefik/Easypanel)
    sitting in front of the app — request.client.host would otherwise just
    be the proxy's internal IP."""
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else None


def client_user_agent(request: Request) -> str | None:
    return request.headers.get("user-agent")
