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
    default: "LÉGER — Piernas Ligeras en Panamá | Pago Contra Entrega",
    template: "%s | LÉGER",
  },
  description:
    "LÉGER es el primer sistema de bienestar circulatorio diseñado para el clima tropical. Roll-On Crioactivo, Medias de Compresión y Bruma Instantánea. Pago contra entrega en Panamá, garantía de 30 días.",
  metadataBase: new URL("https://usaleger.com"),
  openGraph: {
    title: "LÉGER — Siéntete Léger",
    description:
      "El primer sistema de bienestar circulatorio para piernas ligeras, hecho para el trópico. Pago contra entrega en Panamá.",
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
