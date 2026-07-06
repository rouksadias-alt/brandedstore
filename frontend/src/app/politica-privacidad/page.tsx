import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/section";
import { BUSINESS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  robots: { index: true },
};

export default function PoliticaPrivacidadPage() {
  return (
    <Section className="pb-20 pt-10 sm:pt-14">
      <div className="mx-auto max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Política de Privacidad
        </h1>
        <p className="mt-2 text-sm text-ink/50">
          Última actualización: {new Date().toLocaleDateString("es-PA", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="prose-legal mt-8 space-y-6 text-ink/80">
          <p>
            En {BUSINESS.brand} (&quot;nosotros&quot;, &quot;nuestro&quot;) respetamos tu
            privacidad y estamos comprometidos a proteger los datos personales que compartes con
            nosotros al hacer un pedido o contactarnos.
          </p>

          <section>
            <h2 className="mt-8 font-display text-xl font-semibold text-ink">
              1. Información que recopilamos
            </h2>
            <p className="mt-2">
              Cuando realizas un pedido recopilamos: nombre completo, número de teléfono/WhatsApp,
              dirección de entrega, ciudad y provincia, y el detalle de los productos que
              solicitas. No recopilamos ni almacenamos información de tarjetas de crédito o débito,
              ya que todos los pedidos se pagan en efectivo contra entrega.
            </p>
          </section>

          <section>
            <h2 className="mt-8 font-display text-xl font-semibold text-ink">
              2. Cómo usamos tu información
            </h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Confirmar y coordinar la entrega de tu pedido por WhatsApp o teléfono.</li>
              <li>Procesar devoluciones o reembolsos bajo nuestra garantía de {BUSINESS.guaranteeDays} días.</li>
              <li>Enviarte recordatorios de reorden o promociones, solo si lo autorizas.</li>
              <li>Mejorar nuestros productos y la experiencia de compra.</li>
            </ul>
          </section>

          <section>
            <h2 className="mt-8 font-display text-xl font-semibold text-ink">
              3. Con quién compartimos tu información
            </h2>
            <p className="mt-2">
              Compartimos tu nombre, teléfono y dirección únicamente con nuestro equipo de
              logística/mensajería para poder entregar tu pedido. No vendemos ni alquilamos tu
              información personal a terceros con fines de marketing.
            </p>
          </section>

          <section>
            <h2 className="mt-8 font-display text-xl font-semibold text-ink">
              4. Almacenamiento y seguridad
            </h2>
            <p className="mt-2">
              Tu información se almacena en bases de datos con acceso restringido. Conservamos los
              datos de tu pedido el tiempo necesario para procesarlo, atender garantías y cumplir
              obligaciones legales o fiscales.
            </p>
          </section>

          <section>
            <h2 className="mt-8 font-display text-xl font-semibold text-ink">
              5. Tus derechos
            </h2>
            <p className="mt-2">
              Puedes solicitar en cualquier momento acceder, corregir o eliminar tu información
              personal escribiéndonos a nuestro WhatsApp {BUSINESS.whatsappDisplay}.
            </p>
          </section>

          <section>
            <h2 className="mt-8 font-display text-xl font-semibold text-ink">
              6. Cookies y analítica
            </h2>
            <p className="mt-2">
              Utilizamos herramientas como Meta Pixel, TikTok Pixel, Google Analytics y Microsoft
              Clarity para entender cómo se usa nuestro sitio y mejorar la experiencia de compra.
              Estas herramientas no acceden a tu información de pedido.
            </p>
          </section>

          <section>
            <h2 className="mt-8 font-display text-xl font-semibold text-ink">
              7. Contacto
            </h2>
            <p className="mt-2">
              Si tienes preguntas sobre esta política, escríbenos por WhatsApp al{" "}
              {BUSINESS.whatsappDisplay}.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
