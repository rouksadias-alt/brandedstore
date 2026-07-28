import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AnnouncementBar } from "@/components/announcement-bar";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloatingButton } from "@/components/whatsapp-floating-button";
import { Pixels } from "@/components/analytics/pixels";

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
    default: "GLUTA — Colágeno + Glutatión | Piel Clara y Luminosa | Panamá",
    template: "%s | GLUTA",
  },
  description:
    "GLUTA es la línea de belleza interna con Colágeno Hidrolizado, L-Glutatión y Vitamina C formulada para la mujer panameña. Piel más clara, firme y luminosa desde adentro. Pago contra entrega, garantía de 30 días.",
  metadataBase: new URL("https://soyleger.store"),
  openGraph: {
    title: "GLUTA — Brilla desde adentro",
    description:
      "Colágeno + Glutatión + Vitamina C para piel clara, luminosa y firme. Sin cremas, desde adentro. Pago contra entrega en Panamá. Garantía 30 días.",
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
        {/* Microsoft Clarity — hardcoded to guarantee injection regardless of build env */}
        <Script id="clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","xqbgrngtw5");
        `}</Script>
        <Pixels />
        <AnnouncementBar />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
