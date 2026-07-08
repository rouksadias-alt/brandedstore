import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloatingButton } from "@/components/whatsapp-floating-button";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "LÉGER — Ciencia Circulatoria de Grado Farmacéutico | Panamá",
    template: "%s | LÉGER",
  },
  description:
    "LÉGER es la primera línea de bienestar circulatorio de grado farmacéutico formulada para el clima tropical de Panamá. Roll-On Crioactivo, Medias de Compresión y Bruma Instantánea. Pago contra entrega, garantía de 30 días.",
  metadataBase: new URL("https://usaleger.com"),
  openGraph: {
    title: "LÉGER — Ciencia Circulatoria",
    description:
      "La autoridad de una farmacia, sin el intermediario de una farmacia. Ingredientes de grado farmacéutico para piernas ligeras, hecho para el trópico. Pago contra entrega en Panamá.",
    locale: "es_PA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
