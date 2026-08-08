"use client";

import Hero from "@/components/Hero";
import FreeDeliveryBanner from "@/components/home/FreeDeliveryBanner";
import OffersCta from "@/components/home/OffersCta";
import ProductsSection from "@/components/home/ProductsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TrustSection from "@/components/home/TrustSection";
import PointsCta from "@/components/home/PointsCta";

export default function Home() {
  return (
    <>
      <Hero />
      <FreeDeliveryBanner />
      <OffersCta />
      <ProductsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <TrustSection />
      <PointsCta />
    </>
  );
}
