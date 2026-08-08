"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function PointsCta() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-gradient-to-br from-primary-950 via-emerald-950 to-primary-950">
      <div className="absolute inset-0">
        <img src="/images/atlas.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/80 via-emerald-950/75 to-primary-950/85" />
      </div>
      <div className="absolute -top-40 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-[150px]" />
      <div className="absolute -bottom-40 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500/8 rounded-full blur-[100px]" />

      <Reveal>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block text-sm font-bold text-gold-400 bg-gold-500/10 backdrop-blur-md border border-gold-500/20 rounded-full px-4 py-1.5 mb-4">
            ⭐ نظام النقاط
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            اربح <span className="gradient-text-gold">50 نقطة</span> مع كل منتج
          </h2>
          <p className="text-white/60 text-base md:text-xl max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed">
            سجل حساب الآن وابدأ بجمع النقاط مع كل طلب. كل 100 نقطة = 25 درهم خصم على طلبك التالي. بالإضافة إلى عروض حصرية للمشتركين.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="bg-gold-500 hover:bg-gold-600 text-surface-900 font-extrabold text-base md:text-lg px-8 md:px-12 py-3.5 md:py-4 rounded-xl transition-all duration-300 shadow-lg shadow-gold-500/20 inline-flex items-center gap-2"
            >
              ✨ إنشاء حساب مجاني
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/shop?offer=b2g1"
              className="border border-white/20 text-white hover:bg-white/5 font-bold text-base md:text-lg px-8 md:px-12 py-3.5 md:py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-2"
            >
              🎁 عرض 2 بـ 249
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
