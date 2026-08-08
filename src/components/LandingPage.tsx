"use client";

import { useLandingPage } from "./landing/useLandingPage";
import { getLandingImages } from "./landing/data";
import FloatingBadge from "./landing/FloatingBadge";
import MobileStickyBar from "./landing/MobileStickyBar";
import HeroSection from "./landing/HeroSection";
import OrderForm from "./landing/OrderForm";
import TrustBar from "./landing/TrustBar";
import ReviewsSection from "./landing/ReviewsSection";
import BenefitsSection from "./landing/BenefitsSection";
import IngredientsSection from "./landing/IngredientsSection";
import WhyElzavia from "./landing/WhyElzavia";
import FaqSection from "./landing/FaqSection";
import FinalCta from "./landing/FinalCta";
import Lightbox from "./landing/Lightbox";
import LiveNotifications from "./landing/LiveNotifications";
import OrderSuccess from "./landing/OrderSuccess";
import type { Product } from "@/data/products";

export default function LandingPage({ product }: { product: Product }) {
  const {
    selectedImage,
    setSelectedImage,
    faqOpen,
    setFaqOpen,
    lightboxOpen,
    setLightboxOpen,
    submitting,
    submitted,
    form,
    updateField,
    handleBlur,
    errors,
    touched,
    orderCount,
    liveNotif,
    setLiveNotif,
    placeOrder,
  } = useLandingPage(product);

  if (submitted) {
    return <OrderSuccess product={product} />;
  }

  const images = getLandingImages(product.name);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-950 via-primary-950 to-primary-900 pt-20 md:pt-24 pb-28 md:pb-16">
      <div className="absolute inset-0 bg-forest pointer-events-none" />

      <FloatingBadge />
      <MobileStickyBar />

      <HeroSection
        product={product}
        selectedImage={selectedImage}
        onSelectImage={setSelectedImage}
        onOpenLightbox={() => setLightboxOpen(true)}
        orderCount={orderCount}
      />

      <OrderForm
        product={product}
        form={form}
        errors={errors}
        touched={touched}
        submitting={submitting}
        onUpdateField={updateField}
        onBlurField={handleBlur}
        onPlaceOrder={placeOrder}
      />

      <TrustBar />
      <ReviewsSection />

      {product.benefits && product.benefits.length > 0 && <BenefitsSection product={product} />}

      <IngredientsSection product={product} />
      <WhyElzavia />

      <FaqSection faqOpen={faqOpen} onToggle={(i: number) => setFaqOpen(faqOpen === i ? null : i)} />

      <FinalCta />

      <Lightbox
        product={product}
        selectedImage={selectedImage}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      <LiveNotifications notif={liveNotif} onClose={() => setLiveNotif(null)} />
    </div>
  );
}
