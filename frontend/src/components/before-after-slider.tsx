"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

/** Draggable Antes/Después comparison slider (pointer + keyboard). Only
 * rendered once real before/after photos exist — see BeforeAfterSection. */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Piernas antes de usar LÉGER",
  afterAlt = "Piernas después de usar LÉGER",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromClientX(e.clientX);
  };
  const stop = () => {
    dragging.current = false;
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 2));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 2));
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerLeave={stop}
      className="relative mx-auto aspect-[4/3] w-full max-w-3xl touch-none select-none overflow-hidden rounded-3xl shadow-xl"
    >
      {/* Después (fondo) */}
      <Image src={afterSrc} alt={afterAlt} fill className="object-cover" priority sizes="(max-width:768px) 100vw, 768px" />
      <span className="absolute right-4 top-4 rounded-full bg-mint-900 px-3 py-1 text-xs font-semibold text-white">
        DESPUÉS
      </span>

      {/* Antes (recortado con clip-path, sin deformar) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={beforeSrc} alt={beforeAlt} fill className="object-cover" sizes="(max-width:768px) 100vw, 768px" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-mint-900">
          ANTES
        </span>
      </div>

      {/* Divisor + handle */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="mx-auto h-full w-0.5 bg-white shadow-[0_0_0_1px_rgba(26,71,62,0.15)]" />
      </div>
      <button
        type="button"
        role="slider"
        aria-label="Comparar antes y después"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-mint-900/10 focus:outline-none focus:ring-2 focus:ring-mint-900"
        style={{ left: `${pos}%` }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-mint-900">
          <path
            d="M9 7l-4 5 4 5M15 7l4 5-4 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
