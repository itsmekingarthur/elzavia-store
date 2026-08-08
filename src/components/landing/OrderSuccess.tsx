"use client";

import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { OFFER_PRICE, SAVINGS } from "./data";
import type { Product } from "@/data/products";

export default function OrderSuccess({ product }: { product: Product }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-950 via-emerald-950/20 to-primary-950 pt-24 pb-16">
      <div className="absolute inset-0 bg-forest pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto text-center">
          {/* Success Animation */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-primary-500/20 rounded-full flex items-center justify-center border-2 border-emerald-500/30">
              <svg className="h-12 w-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">تم الطلب بنجاح! 🎉</h2>
          <p className="text-white/50 text-sm mb-8 leading-relaxed">شكراً لثقتك في إلزافيا. فريقنا سيتواصل معك قريباً لتأكيد الطلب وتحديد موعد التوصيل.</p>

          {/* Offer Summary Card */}
          <div className="bg-gradient-to-br from-gold-500/10 via-primary-500/5 to-emerald-500/10 border-2 border-gold-500/20 rounded-2xl p-6 mb-6 text-center">
            <div className="text-3xl mb-3">🔥</div>
            <h3 className="text-lg font-extrabold text-white mb-4">ملخص عرضك</h3>
            <div className="space-y-3 text-right">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-xl">📦</span>
                <div className="text-right">
                  <p className="text-white font-bold text-sm">{product.name}</p>
                  <p className="text-white/30 text-xs">الكمية: 2</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-xl">💰</span>
                <div className="text-right">
                  <p className="text-gold-400 font-extrabold text-base">{formatPrice(OFFER_PRICE)}</p>
                  <p className="text-white/30 text-xs">وفرت {formatPrice(SAVINGS)}</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <span className="text-xl">🚚</span>
                <div className="text-right">
                  <p className="text-emerald-400 font-bold text-sm">توصيل مجاني</p>
                  <p className="text-emerald-400/50 text-xs">24-48 ساعة</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-xl">💳</span>
                <div className="text-right">
                  <p className="text-white font-bold text-sm">الدفع عند الاستلام</p>
                  <p className="text-white/30 text-xs">تأكد من استلام الطلب قبل الدفع</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 mb-8">
            <h4 className="text-white font-bold text-sm mb-3 text-center">الخطوات القادمة</h4>
            <div className="space-y-2">
              {[
                { num: "١", text: "فريقنا سيَتصل بك خلال 24 ساعة", icon: "📞" },
                { num: "٢", text: "تأكيد العنوان وموعد التوصيل", icon: "📍" },
                { num: "٣", text: "استلام الطلب والدفع عند الاستلام", icon: "🚚" },
              ].map((step) => (
                <div key={step.num} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02]">
                  <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 font-extrabold text-xs flex-shrink-0">{step.num}</div>
                  <span className="text-white/70 text-sm">{step.text}</span>
                  <span className="mr-auto text-lg">{step.icon}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => router.push("/shop")} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 border border-white/10">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            العودة للتسوق
          </button>
        </div>
      </div>
    </div>
  );
}
