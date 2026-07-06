import type { Metadata } from "next";
import { Suspense } from "react";
import { GraciasContent } from "@/components/gracias-content";

export const metadata: Metadata = {
  title: "¡Gracias por tu pedido!",
  robots: { index: false },
};

export default function GraciasPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-2xl px-5 py-24" />}>
      <GraciasContent />
    </Suspense>
  );
}
