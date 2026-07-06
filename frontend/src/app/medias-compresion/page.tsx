import type { Metadata } from "next";
import { ProductLandingPage } from "@/components/product-landing-page";
import { getProductBySlug } from "@/lib/products";

const product = getProductBySlug("medias-compresion")!;

export const metadata: Metadata = {
  title: product.shortName,
  description: product.heroSubheadline,
};

export default function MediasCompresionPage() {
  return <ProductLandingPage product={product} />;
}
