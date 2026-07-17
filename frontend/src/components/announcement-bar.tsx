const MESSAGES = [
  "🚚 Pago Contra Entrega en todo Panamá",
  "🛡️ Garantía de 30 días",
  "⚡ Envío 24–48h",
];

export function AnnouncementBar() {
  return (
    <div className="bg-mint-900 py-2 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-5 text-center text-[11px] font-semibold tracking-wide sm:text-xs">
        {MESSAGES.map((msg, i) => (
          <span key={msg} className="flex items-center gap-2">
            {i > 0 && <span className="text-mint-400/60" aria-hidden>·</span>}
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
