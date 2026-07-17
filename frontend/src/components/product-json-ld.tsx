import { AGGREGATE_RATING, testimonials } from "@/lib/products";

const SITE_URL = "https://soyleger.store";

export type JsonLdProduct = {
  slug: string;
  name: string;
  description: string;
  price: number;
  images?: string[];
  /** Matches Testimonial.product — narrows which reviews are attached (falls back to all). */
  reviewTag?: string;
};

/**
 * schema.org Product + AggregateRating + Review JSON-LD, for rich snippets
 * (star rating in Google search results) — see LEGER_CRO_UPGRADE.md P0.3.
 * Server component: safe to render inside any product/kit/duo page, no client JS.
 */
export function ProductJsonLd({ product }: { product: JsonLdProduct }) {
  const matchingReviews = testimonials.filter((t) => t.product === product.reviewTag);
  const reviews = (matchingReviews.length > 0 ? matchingReviews : testimonials).map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
    reviewBody: t.quote,
  }));

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images?.map((img) => `${SITE_URL}${img}`),
    brand: { "@type": "Brand", name: "LÉGER" },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/${product.slug}`,
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: AGGREGATE_RATING.value,
      reviewCount: AGGREGATE_RATING.count,
      bestRating: 5,
    },
    review: reviews,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
