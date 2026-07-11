import type { Metadata } from "next";
import { DuoLandingPage } from "@/components/duo-landing-page";
import { getDuoOfferBySlug } from "@/lib/products";

const duo = getDuoOfferBySlug("bruma-rollon")!;

export const metadata: Metadata = {
  title: duo.title,
  description: duo.tagline,
};

export default function BrumaRollonPage() {
  return <DuoLandingPage duo={duo} />;
}
