"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Loader2, MessageCircleWarning } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatUSD } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { checkoutOptions, getCheckoutOption } from "@/lib/products";
import { PANAMA_PROVINCES } from "@/lib/order-schema";

const BUMP_PRICE = 9;
const EXPRESS_PRICE = 2;

export function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialProduct = searchParams.get("product") ?? "roll-on";
  const initialPlan = searchParams.get("plan");

  const [productSlug, setProductSlug] = useState(initialProduct);
  const option = useMemo(() => getCheckoutOption(productSlug), [productSlug]);

  const [planId, setPlanId] = useState(
    initialPlan && option.tiers.some((t) => t.id === initialPlan)
      ? initialPlan
      : option.tiers.find((t) => t.isFeatured)?.id ?? option.tiers[0].id
  );
  const selectedTier = option.tiers.find((t) => t.id === planId) ?? option.tiers[0];

  const [bump, setBump] = useState(false);
  const [express, setExpress] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const total = selectedTier.price + (bump && option.allowBump ? BUMP_PRICE : 0) + (express ? EXPRESS_PRICE : 0);

  function handleProductChange(slug: string) {
    setProductSlug(slug);
    const nextOption = getCheckoutOption(slug);
    setPlanId(nextOption.tiers.find((t) => t.isFeatured)?.id ?? nextOption.tiers[0].id);
    setBump(false);
    setExpress(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      address: String(formData.get("address") ?? ""),
      city: String(formData.get("city") ?? ""),
      province: String(formData.get("province") ?? ""),
      productSlug,
      planId,
      bump,
      express,
      notes: String(formData.get("notes") ?? ""),
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
      const res = await fetch(`${apiUrl}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data?.fieldErrors) setFieldErrors(data.fieldErrors);
        setError(data?.message ?? "No pudimos procesar tu pedido. Intenta de nuevo.");
        setSubmitting(false);
        return;
      }

      const params = new URLSearchParams({
        wa: data.whatsappLink,
        name: payload.name.split(" ")[0] ?? "",
        product: option.name,
        total: String(total),
      });
      router.push(`/gracias?${params.toString()}`);
    } catch {
      setError("Error de conexión. Verifica tu internet e intenta de nuevo.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-8">
      {/* Product selector */}
      <fieldset>
        <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-ink/60">
          1. Elige tu producto
        </legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {checkoutOptions.map((opt) => (
            <button
              key={opt.slug}
              type="button"
              onClick={() => handleProductChange(opt.slug)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-2xl border-2 px-3 py-4 text-center transition-all",
                productSlug === opt.slug
                  ? "border-mint-600 bg-mint-50 shadow-sm"
                  : "border-black/10 bg-white hover:border-mint-300"
              )}
            >
              {opt.image ? (
                <div className="relative h-14 w-14 overflow-hidden rounded-xl">
                  <Image
                    src={opt.image}
                    alt={opt.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
              ) : (
                <span className="text-2xl">{opt.emoji}</span>
              )}
              <span className="text-xs font-semibold leading-tight text-ink/80">{opt.name}</span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* Plan selector */}
      <fieldset>
        <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-ink/60">
          2. Elige tu plan
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {option.tiers.map((tier) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => setPlanId(tier.id)}
              className={cn(
                "relative flex flex-col items-center gap-1 rounded-2xl border-2 px-3 py-4 text-center transition-all",
                planId === tier.id
                  ? "border-mint-600 bg-mint-50 shadow-sm"
                  : "border-black/10 bg-white hover:border-mint-300"
              )}
            >
              {tier.badge && (
                <span className="absolute -top-2.5 rounded-full bg-sand-500 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white shadow-sm">
                  {tier.badge}
                </span>
              )}
              <span className="text-sm font-bold text-ink">{tier.label}</span>
              <span className="text-[11px] font-medium text-ink/60">{tier.units}</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-lg font-extrabold text-mint-700">{formatUSD(tier.price)}</span>
                {tier.compareAtPrice && (
                  <span className="text-xs font-medium text-ink/50 line-through">
                    {formatUSD(tier.compareAtPrice)}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </fieldset>

      {/* Order bump */}
      {option.allowBump && (
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-dashed border-sand-500/60 bg-sand-50 p-4">
          <input
            type="checkbox"
            checked={bump}
            onChange={(e) => setBump(e.target.checked)}
            className="mt-1 h-5 w-5 accent-mint-600"
          />
          <span>
            <span className="block text-sm font-bold text-ink">
              Agregar Bruma Instantánea por solo +{formatUSD(BUMP_PRICE)}
            </span>
            <span className="block text-xs text-ink/60">
              El refresh de piernas que cabe en tu cartera — muchas clientas lo agregan.
            </span>
          </span>
        </label>
      )}

      {/* Express shipping */}
      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-mint-300/60 bg-mint-50/60 p-4 transition-colors hover:border-mint-400">
        <input
          type="checkbox"
          checked={express}
          onChange={(e) => setExpress(e.target.checked)}
          className="mt-1 h-5 w-5 accent-mint-600"
        />
        <span className="flex-1">
          <span className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink">
            ⚡ Envío Express — menos de 48 h
            <span className="rounded-full bg-mint-600 px-2 py-0.5 text-[10px] font-bold text-white">+{formatUSD(EXPRESS_PRICE)}</span>
          </span>
          <span className="mt-0.5 block text-xs text-ink/60">
            Entrega prioritaria en Ciudad de Panamá. Envío estándar gratis incluido de todas formas.
          </span>
        </span>
      </label>

      {/* Contact & shipping */}
      <fieldset className="space-y-4">
        <legend className="mb-1 text-sm font-bold uppercase tracking-wide text-ink/60">
          3. Tus datos de entrega
        </legend>

        <Field label="Nombre completo" name="name" error={fieldErrors.name} placeholder="María Fernández" />
        <Field
          label="Teléfono / WhatsApp"
          name="phone"
          type="tel"
          error={fieldErrors.phone}
          placeholder="6000-0000"
          hint="Te confirmaremos el pedido por WhatsApp antes de despachar."
        />
        <Field
          label="Dirección completa"
          name="address"
          error={fieldErrors.address}
          placeholder="Calle, casa/apto, referencia"
          textarea
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ciudad / Corregimiento" name="city" error={fieldErrors.city} placeholder="Ciudad de Panamá" />
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink/80">Provincia</label>
            <select
              name="province"
              defaultValue=""
              required
              className="h-12 w-full rounded-xl border border-black/15 bg-white px-3.5 text-sm focus:border-mint-500 focus:outline-none focus:ring-2 focus:ring-mint-200"
            >
              <option value="" disabled>
                Selecciona tu provincia
              </option>
              {PANAMA_PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {fieldErrors.province && (
              <p className="mt-1 text-xs font-medium text-red-600">{fieldErrors.province}</p>
            )}
          </div>
        </div>
        <Field
          label="Notas para la entrega (opcional)"
          name="notes"
          required={false}
          placeholder="Ej. entregar después de las 5pm, portón azul, etc."
          textarea
        />
      </fieldset>

      {/* Order summary */}
      <div className="rounded-2xl border border-mint-100 bg-mint-50/60 p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink/70">{option.name} — {selectedTier.label}</span>
          <span className="font-semibold text-ink">{formatUSD(selectedTier.price)}</span>
        </div>
        {bump && option.allowBump && (
          <div className="mt-1.5 flex items-center justify-between text-sm">
            <span className="text-ink/70">+ Bruma Instantánea</span>
            <span className="font-semibold text-ink">{formatUSD(BUMP_PRICE)}</span>
          </div>
        )}
        {express && (
          <div className="mt-1.5 flex items-center justify-between text-sm">
            <span className="text-ink/70">⚡ Envío Express &lt;48 h</span>
            <span className="font-semibold text-ink">{formatUSD(EXPRESS_PRICE)}</span>
          </div>
        )}
        <div className="mt-3 flex items-center justify-between border-t border-mint-200 pt-3">
          <span className="font-bold text-ink">Total a pagar contra entrega</span>
          <span className="text-xl font-extrabold text-mint-700">{formatUSD(total)}</span>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
          <MessageCircleWarning className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Procesando...
          </>
        ) : (
          <>
            <Check className="h-5 w-5" /> Confirmar Pedido — Pago Contra Entrega
          </>
        )}
      </Button>
      <p className="text-center text-xs font-medium text-ink/50">
        Al confirmar, aceptas nuestros{" "}
        <a href="/terminos" className="underline">
          Términos
        </a>{" "}
        y{" "}
        <a href="/politica-privacidad" className="underline">
          Política de Privacidad
        </a>
        . No se realiza ningún cobro en línea.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  hint,
  error,
  textarea = false,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const sharedClasses =
    "w-full rounded-xl border border-black/15 bg-white px-3.5 text-sm focus:border-mint-500 focus:outline-none focus:ring-2 focus:ring-mint-200";
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-ink/80">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          rows={2}
          className={cn(sharedClasses, "py-3")}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={cn(sharedClasses, "h-12")}
        />
      )}
      {hint && <p className="mt-1 text-xs text-ink/50">{hint}</p>}
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
