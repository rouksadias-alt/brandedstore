# LÉGER — Checklist de Fotos (para que se vea MARCA, no dropshipping)

> Objetivo: fotos limpias, consistentes y sin texto incrustado. La consistencia
> (mismo fondo, misma luz, mismo encuadre) es lo que hace que se vea marca real.
>
> Referencia: P0.2 (fotos limpias) y P1.2 (Antes/Después) de `LEGER_CRO_UPGRADE.md`.
> Los componentes (`ProductVisual`, `BeforeAfterSection`) ya están listos para
> recibir estas fotos apenas existan — solo hay que reemplazar rutas en
> `frontend/src/lib/products.ts`, cero cambios de código.

---

## 1. Reglas de oro (lo más importante)

- ❌ **Cero texto incrustado** en la foto (nada de "150ml", features, flechas…). Eso va en el HTML.
- ✅ **Mismo fondo en todas** las fotos de producto → crema `#f7f9f5` o blanco suave.
- ✅ **Misma luz y misma dirección** (luz de ventana lateral suave, sin flash duro).
- ✅ **Mismo ángulo/altura de cámara** para los 3 productos → se ven como una familia.
- ✅ Sombra suave y natural bajo el producto (da realismo premium).
- ✅ Props naturales sutiles y coherentes con la marca: aloe, ginkgo, castaña de indias, hielo, hojas verdes. Sin saturar.

---

## 2. Setup barato en casa (con celular basta)

- 📱 Celular en modo retrato/1x, **rejilla activada**, enfoque tocando el producto.
- ☀️ Al lado de una ventana grande (luz de día, sin sol directo). Media mañana o media tarde.
- 🧻 Fondo: cartulina/pared color crema, o tela lisa sin arrugas. Curva el fondo (barrido) para que no se vea la línea pared-mesa.
- 💡 Rebota luz al lado oscuro con una cartulina blanca (o foam board) → sombras suaves.
- 📐 Trípode o apoya el celular fijo → todas las fotos con el mismo encuadre.

---

## 3. Tomas OBLIGATORIAS por producto (Roll-On, Medias, Bruma)

Para **cada uno** de los 3 productos:

- [ ] **Packshot frontal** sobre fondo crema (etiqueta bien centrada y legible). → foto principal
- [ ] **Ángulo 3/4** (ligeramente girado) → da volumen y realismo.
- [ ] **Con props naturales** (aloe/ginkgo/hielo/castaña) → refuerza "grado farmacéutico natural".
- [ ] **Detalle de textura** (gel en piel, spray en el aire, tejido de la media de cerca).
- [ ] **En mano / a escala** (para que se entienda el tamaño real).
- [ ] **Producto en uso** (aplicando el roll-on en la pierna, poniéndose la media, spray sobre la pierna).

## 4. Kit / Bundle
- [ ] Los **3 productos juntos** en composición limpia (mismo fondo) → foto del Kit.
- [ ] Versión "flat lay" (desde arriba) con los 3 + props → buena para ads y redes.

## 5. Antes / Después (para el slider)
- [ ] **Misma pierna, mismo ángulo, misma distancia, misma luz** en las 2 fotos.
- [ ] Misma hora del día / mismo fondo. Solo cambia el estado de la pierna.
- [ ] Marca de tiempo si es un progreso real (día 1 vs día 14).
- ⚠️ **Ética/legal:** deben ser reales, o etiquetadas como "ilustrativas". Mantén el disclaimer de bienestar (no médico).

## 6. Lifestyle (contexto Panamá)
- [ ] Mujer panameña real usando el producto en la vida diaria (de pie en el trabajo, oficina, casa, calor tropical).
- [ ] Ambiente cálido, luz natural, tonos verdes/crema coherentes con la marca.
- [ ] 1 foto horizontal (hero desktop) + 1 vertical (hero móvil).

## 7. UGC para reseñas (clave para confianza)
- [ ] Selfies o fotos "de clienta" con el producto en mano (se ven auténticas, no de estudio).
- [ ] Retratos sencillos y consistentes para los avatares de reseñas (o fotos reales de clientas con permiso).

---

## 8. Especificaciones técnicas

| Uso | Proporción | Tamaño recomendado |
|---|---|---|
| Foto principal producto (PDP) | 1:1 | 2000 × 2000 px |
| Galería producto | 1:1 y 4:5 | 2000 px lado largo |
| Antes/Después | 4:3 | 1600 × 1200 px |
| Hero desktop | 3:2 o 16:9 | 2400 px ancho |
| Hero móvil | 4:5 | 1200 × 1500 px |
| Avatar reseña | 1:1 | 200 × 200 px |

- **Formato:** exportar en **WebP** (o AVIF). Peso objetivo: 150–250 KB por imagen.
- **Nomenclatura:** `roll-on-01.webp`, `medias-01.webp`, `bruma-01.webp`, `kit-01.webp`, `antes-01.webp`, `despues-01.webp`.
- **Balance de blancos igual** en todas (edita todas con el mismo preset).

## 9. Edición (retoque ligero, natural)
- Endereza y recorta con encuadre consistente.
- Sube un poco brillo/contraste, limpia motas del fondo.
- **No** exageres saturación ni pongas filtros raros → resta credibilidad.
- Fondo uniforme: si hace falta, usa `remove.bg` y coloca fondo crema `#f7f9f5`.

## 10. Si NO puedes fotografiar ahora
- Limpia las imágenes actuales: quita el texto incrustado y unifica el fondo (Photoshop / Canva / remove.bg).
- Herramientas de "product photography" con IA para packshots limpios (revisa que el envase quede fiel a tu producto real).
- Contrata 1 sesión corta local en Panamá → 3 productos + 1 lifestyle. Es la mejor inversión de branding.

---

## ✅ Entregables finales (lista de assets)
- [ ] 6 fotos × 3 productos = 18 packshots/uso
- [ ] 2 fotos Kit (juntos + flat lay)
- [ ] 2 fotos Antes/Después (par consistente)
- [ ] 2 fotos lifestyle (horizontal + vertical)
- [ ] 4–8 fotos UGC/avatares para reseñas
- [ ] Todo en WebP, mismo fondo, misma luz, sin texto incrustado
