import { z } from "zod";

export const PANAMA_PROVINCES = [
  "Panamá",
  "Panamá Oeste",
  "Colón",
  "Coclé",
  "Veraguas",
  "Herrera",
  "Los Santos",
  "Chiriquí",
  "Bocas del Toro",
  "Darién",
  "Comarca Guna Yala",
  "Comarca Emberá-Wounaan",
  "Comarca Ngäbe-Buglé",
] as const;

export const orderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Ingresa tu nombre completo")
    .max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Ingresa un número de teléfono válido")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Solo números, +, - y espacios"),
  address: z
    .string()
    .trim()
    .min(5, "Ingresa tu dirección completa (casa, calle, referencia)")
    .max(300),
  city: z.string().trim().min(2, "Ingresa tu ciudad o corregimiento").max(100),
  province: z.enum(PANAMA_PROVINCES, {
    message: "Selecciona tu provincia",
  }),
  productSlug: z.enum(["roll-on", "medias-compresion", "bruma", "kit-completo"], {
    message: "Selecciona un producto",
  }),
  planId: z.string().min(1),
  bump: z.boolean().default(false),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

export type OrderInput = z.infer<typeof orderSchema>;
