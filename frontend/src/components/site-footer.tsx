import Link from "next/link";
import { BUSINESS } from "@/lib/products";

const columns = [
  {
    title: "Productos",
    links: [
      { href: "/roll-on", label: "Roll-On Crioactivo" },
      { href: "/medias-compresion", label: "Medias Compression 360°" },
      { href: "/bruma", label: "Bruma Instantánea" },
      { href: "/kit-completo", label: "Kit Completo" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { href: "/preguntas-frecuentes", label: "Preguntas Frecuentes" },
      { href: "/garantia", label: "Garantía y Devoluciones" },
      { href: "/checkout", label: "Cómo Comprar" },
      { href: "/nosotros", label: "Nosotros" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/politica-privacidad", label: "Política de Privacidad" },
      { href: "/terminos", label: "Términos y Condiciones" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-mint-900 text-mint-50">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="font-display text-2xl font-semibold text-white">{BUSINESS.brand}</p>
            <p className="mt-3 text-sm leading-relaxed text-mint-200">
              El primer sistema de bienestar circulatorio diseñado para el clima tropical.
              Hecho para {BUSINESS.country}.
            </p>
            <p className="mt-4 text-sm font-medium text-mint-200">
              WhatsApp: {BUSINESS.whatsappDisplay}
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-bold uppercase tracking-wider text-mint-300">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-mint-100/90 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-mint-300 sm:flex-row">
          <p>© {new Date().getFullYear()} {BUSINESS.brand}. Todos los derechos reservados.</p>
          <p>Pago Contra Entrega en toda {BUSINESS.country} 🇵🇦</p>
        </div>
      </div>
    </footer>
  );
}
