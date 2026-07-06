import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/section";
import { BUSINESS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  robots: { index: true },
};

export default function TerminosPage() {
  return (
    <Section className="pb-20 pt-10 sm:pt-14">
      <div className="mx-auto max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Términos y Condiciones
        </h1>
        <p className="mt-2 text-sm text-ink/50">
          Última actualización: {new Date().toLocaleDateString("es-PA", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-8 space-y-6 text-ink/80">
          <section>
            <h2 className="mt-8 font-display text-xl font-semibold text-ink">1. Aceptación</h2>
            <p className="mt-2">
              Al realizar un pedido en {BUSINESS.brand} aceptas estos Términos y Condiciones. Si no
              estás de acuerdo, por favor no realices un pedido.
            </p>
          </section>

          <section>
            <h2 className="mt-8 font-display text-xl font-semibold text-ink">
              2. Pago Contra Entrega
            </h2>
            <p className="mt-2">
              Todos los pedidos se pagan en efectivo directamente al repartidor en el momento de la
              entrega. No se realiza ningún cargo en línea. El pedido se considera confirmado una
              vez que respondes la confirmación por WhatsApp de nuestro equipo.
            </p>
          </section>

          <section>
            <h2 className="mt-8 font-display text-xl font-semibold text-ink">3. Precios</h2>
            <p className="mt-2">
              Todos los precios están expresados en Dólares Americanos (USD). Nos reservamos el
              derecho de modificar precios y promociones sin previo aviso, sin afectar pedidos ya
              confirmados.
            </p>
          </section>

          <section>
            <h2 className="mt-8 font-display text-xl font-semibold text-ink">
              4. Envíos y entregas
            </h2>
            <p className="mt-2">
              Hacemos envíos a nivel nacional en {BUSINESS.country}. Los tiempos estimados de
              entrega son de 24 a 72 horas en Ciudad de Panamá y pueden variar en otras provincias.
              No nos hacemos responsables por retrasos causados por información de dirección
              incorrecta o incompleta.
            </p>
          </section>

          <section>
            <h2 className="mt-8 font-display text-xl font-semibold text-ink">
              5. Garantía y devoluciones
            </h2>
            <p className="mt-2">
              Ofrecemos una garantía de devolución de {BUSINESS.guaranteeDays} días desde la fecha
              de entrega. Consulta el detalle completo en nuestra página de{" "}
              <a href="/garantia" className="font-semibold text-mint-700 underline">
                Garantía
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mt-8 font-display text-xl font-semibold text-ink">
              6. Uso de los productos
            </h2>
            <p className="mt-2">
              Nuestros productos son de uso cosmético/tópico o apoyo de bienestar y no sustituyen
              tratamiento médico. Si tienes una condición de salud diagnosticada, consulta a tu
              médico antes de usar cualquier producto. Los productos no están destinados a
              diagnosticar, tratar, curar o prevenir ninguna enfermedad.
            </p>
          </section>

          <section>
            <h2 className="mt-8 font-display text-xl font-semibold text-ink">
              7. Propiedad intelectual
            </h2>
            <p className="mt-2">
              Todo el contenido de este sitio (marca, textos, imágenes, diseño) es propiedad de{" "}
              {BUSINESS.brand} y no puede ser reproducido sin autorización previa.
            </p>
          </section>

          <section>
            <h2 className="mt-8 font-display text-xl font-semibold text-ink">8. Contacto</h2>
            <p className="mt-2">
              Para cualquier consulta sobre estos Términos, escríbenos por WhatsApp al{" "}
              {BUSINESS.whatsappDisplay}.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
