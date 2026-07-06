import type { Metadata } from "next";
import { ProductLandingPage } from "@/components/product-landing-page";
import { getProductBySlug } from "@/lib/products";

const product = getProductBySlug("roll-on")!;

export const metadata: Metadata = {
  title: product.shortName,
  description: product.heroSubheadline,
};

export default function RollOnPage() {
  return <ProductLandingPage product={product} />;
}
