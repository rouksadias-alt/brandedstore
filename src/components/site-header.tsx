"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { BUSINESS } from "@/lib/products";

const NAV_LINKS = [
  { href: "/roll-on", label: "Roll-On" },
  { href: "/medias-compresion", label: "Medias" },
  { href: "/bruma", label: "Bruma" },
  { href: "/kit-completo", label: "Kit Completo" },
  { href: "/nosotros", label: "Nosotros" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-display text-2xl font-semibold tracking-tight text-ink">
          {BUSINESS.brand}
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-mint-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-ink/60">
            <ShieldCheck className="h-4 w-4 text-mint-600" />
            Garantía {BUSINESS.guaranteeDays} días
          </span>
          <LinkButton href="/checkout" size="sm">
            Pedir Ahora
          </LinkButton>
        </div>

        <button
          aria-label="Abrir menú"
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-background px-5 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink/80 hover:bg-mint-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <LinkButton href="/checkout" className="mt-3 w-full" onClick={() => setOpen(false)}>
            Pedir Ahora — Pago Contra Entrega
          </LinkButton>
        </div>
      )}
    </header>
  );
}
