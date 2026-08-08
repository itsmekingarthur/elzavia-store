"use client";

import Link from "next/link";
import Leaves from "@/components/Leaves";
import { useAuth } from "@/context/AuthContext";

export default function OffersCta() {
  const { user } = useAuth();
  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-b from-primary-950 via-primary-900 to-emerald-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.06),transparent_70%)]" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-gold-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-[120px]" />
      <Leaves />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-gold-500/10 via-primary-500/5 to-emerald-500/10 backdrop-blur-xl rounded-3xl border border-gold-500/20 p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-right">
              <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 text-gold-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
                🔥 عرض خاص
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
                اشتري 2 <span className="gradient-text-gold">بـ 249 درهم فقط</span>
              </h2>
              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
                عرض حصري لفترة محدودة! اشتري منتجين بسعر 249 درهم فقط مع توصيل مجاني. وفر 149 درهم عن السعر الأصلي.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link
                  href="/shop/golden-energy-capsules?offer=b2g1"
                  className="bg-gold-500 hover:bg-gold-600 text-surface-900 font-extrabold text-sm px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-gold-500/20 inline-flex items-center gap-2"
                >
                  🔥 استفد من العرض
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                {!user && (
                  <Link
                    href="/auth/signup"
                    className="border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 inline-flex items-center gap-2"
                  >
                    ✨ سجل واحصل على النقاط
                  </Link>
                )}
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-gold-500/20 to-amber-500/10 rounded-full flex items-center justify-center border-2 border-gold-500/30">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl">🔥</div>
                  <div className="text-gold-400 font-extrabold text-xs md:text-sm mt-1">249 درهم</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
