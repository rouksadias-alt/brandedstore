import type { Metadata } from "next";
import { ProductLandingPage } from "@/components/product-landing-page";
import { getProductBySlug } from "@/lib/products";

const product = getProductBySlug("bruma")!;

export const metadata: Metadata = {
  title: product.shortName,
  description: product.heroSubheadline,
};

export default function BrumaPage() {
  return <ProductLandingPage product={product} />;
}
