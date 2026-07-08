"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductVisual({
  emoji,
  gradient,
  images,
  className,
  size = "lg",
}: {
  emoji: string;
  gradient: string;
  images?: string[];
  className?: string;
  size?: "sm" | "lg";
}) {
  const [active, setActive] = useState(0);

  if (images && images.length > 0) {
    return (
      <div className={cn("flex flex-col gap-3", className)}>
        {/* Main image */}
        <div
          className={cn(
            "relative overflow-hidden rounded-[2rem] bg-gradient-to-br",
            gradient,
            size === "lg" ? "aspect-square" : "aspect-[4/3]"
          )}
        >
          <Image
            src={images[active]}
            alt="Foto del producto"
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={active === 0}
          />
        </div>

        {/* Thumbnails (only if more than 1 image) */}
        {images.length > 1 && (
          <div className="flex gap-2 justify-center">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "relative h-16 w-16 overflow-hidden rounded-xl border-2 transition-all",
                  i === active
                    ? "border-mint-600 shadow-md scale-105"
                    : "border-transparent opacity-60 hover:opacity-90"
                )}
              >
                <Image
                  src={src}
                  alt={`Vista ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* Fallback — emoji placeholder */
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-[2.5rem] bg-gradient-to-br",
        gradient,
        size === "lg" ? "aspect-square" : "aspect-[4/3]",
        className
      )}
    >
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/40 blur-3xl" />
      <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-mint-300/30 blur-3xl" />
      <span
        className={cn(
          "animate-frost-pulse select-none drop-shadow-sm",
          size === "lg" ? "text-[7rem] sm:text-[9rem]" : "text-6xl"
        )}
      >
        {emoji}
      </span>
    </div>
  );
}
