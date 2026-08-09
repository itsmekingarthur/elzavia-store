"use client";

import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import Leaves from "@/components/Leaves";
import Reveal from "@/components/Reveal";

export default function ProductsSection() {
  return (
    <section className="relative pt-8 md:pt-16 pb-16 md:pb-32 overflow-hidden bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950">
      <div className="absolute inset-0 bg-forest" />
      <div className="absolute inset-0 bg-repeat bg-contain opacity-[0.04]" style={{ backgroundImage: "url(/images/naqch.png)" }} />

      <Leaves />

      <div className="container mx-auto px-4 relative z-10">
        <Reveal>
          <div className="text-center mb-14 md:mb-18">
            <span className="inline-block text-sm font-bold text-primary-300 bg-primary-500/10 backdrop-blur-md border border-primary-500/20 px-4 py-1.5 rounded-full mb-4">
              منتجاتنا
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
              منتجات <span className="gradient-text">الطبيعة</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              اختر ما يناسب احتياجاتك من أفضل المكملات الغذائية الطبيعية
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <ProductGrid limit={8} />
        </Reveal>

        <Reveal delay={0.3}>
          <div className="text-center mt-14 md:mt-18">
            <Link
              href="/shop"
              className="btn-nature text-base md:text-lg px-10 md:px-14 py-3.5 md:py-4 inline-flex items-center gap-2 group shadow-2xl shadow-primary-500/20 shine-btn"
            >
              عرض جميع المنتجات
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
