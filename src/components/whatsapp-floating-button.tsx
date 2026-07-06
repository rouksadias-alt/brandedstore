"use client";

import { MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/products";

export function WhatsAppFloatingButton() {
  const text = encodeURIComponent(
    "¡Hola! Tengo una pregunta sobre los productos LÉGER 🌿"
  );
  const href = `https://wa.me/${BUSINESS.whatsappNumber}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-xl shadow-whatsapp/40 transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-7 w-7" fill="white" />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp/60" />
    </a>
  );
}
