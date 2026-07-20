"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoVideoData } from "@/lib/products";

/**
 * Auto-play muted looping demo video with:
 * - Lazy playback (only plays when in view, pauses when out — saves battery/data)
 * - Poster fallback until first frame is loaded
 * - Silent onError hide (if the .mp4 hasn't been dropped in /public/videos yet
 *   the section just disappears instead of showing a broken video)
 * - Mobile Safari safe (`playsInline` + `muted`)
 * - WebM source preferred when available for smaller payload
 */
export function DemoVideo({
  video,
  className,
}: {
  video: DemoVideoData;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {
            // Some mobile browsers refuse the initial autoplay — we silently ignore.
          });
        } else {
          el.pause();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (errored) return null;

  const aspect = video.aspectRatio ?? "9/16";
  const maxWidth = {
    "9/16": "max-w-[280px] sm:max-w-[320px]",
    "1/1": "max-w-[420px] sm:max-w-[500px]",
    "4/5": "max-w-[360px] sm:max-w-[420px]",
    "16/9": "max-w-[720px]",
  }[aspect];

  return (
    <figure className={cn("mx-auto flex flex-col items-center", maxWidth, className)}>
      <div
        className="relative w-full overflow-hidden rounded-3xl bg-mint-50 shadow-lg ring-1 ring-mint-100/60"
        style={{ aspectRatio: aspect.replace("/", " / ") }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          poster={video.poster}
          onError={() => setErrored(true)}
        >
          {video.webm && <source src={video.webm} type="video/webm" />}
          <source src={video.src} type="video/mp4" />
        </video>
      </div>
      {video.caption && (
        <figcaption className="mt-3 text-center text-sm text-ink/60">
          {video.caption}
        </figcaption>
      )}
    </figure>
  );
}
