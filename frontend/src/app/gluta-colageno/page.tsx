import type { Metadata } from "next";
import { ProductLandingPage } from "@/components/product-landing-page";
import { getProductBySlug } from "@/lib/products";

const product = getProductBySlug("gluta-colageno")!;

export const metadata: Metadata = {
  title: product.shortName,
  description: product.heroSubheadline,
};

export default function GlutaColaganoPage() {
  return <ProductLandingPage product={product} />;
}
