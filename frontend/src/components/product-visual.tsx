import { cn } from "@/lib/utils";

export function ProductVisual({
  emoji,
  gradient,
  className,
  size = "lg",
}: {
  emoji: string;
  gradient: string;
  className?: string;
  size?: "sm" | "lg";
}) {
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
