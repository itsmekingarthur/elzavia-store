"use client";

import Hero from "@/components/Hero";
import OffersCta from "@/components/home/OffersCta";
import ProductsSection from "@/components/home/ProductsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ProductFinder from "@/components/home/ProductFinder";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqSection from "@/components/home/FaqSection";

export default function Home() {
  return (
    <>
      <Hero />
      <OffersCta />
      <ProductsSection />
      <FeaturesSection />
      <ProductFinder />
      <TestimonialsSection />
      <FaqSection />
    </>
  );
}
