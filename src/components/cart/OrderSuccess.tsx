"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface Props {
  offerDiscount: number;
}

export default function OrderSuccess({ offerDiscount }: Props) {
  return (
    <div className="text-center py-12 md:py-20 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-10 w-40 h-40 bg-primary-500/8 rounded-full blur-[80px]" />
      <div className="absolute top-20 right-10 w-32 h-32 bg-gold-500/8 rounded-full blur-[60px]" />

      {/* Decorative leaves */}
      <svg className="absolute top-10 left-5 w-16 h-16 opacity-20 rotate-12" viewBox="0 0 200 300" fill="none">
        <path d="M100 280 Q5 200 20 100 Q30 20 100 10 Q170 20 180 100 Q195 200 100 280Z" fill="rgba(52,211,153,0.3)" />
        <path d="M100 280 L100 20" stroke="rgba(52,211,153,0.15)" strokeWidth="1.5" />
      </svg>
      <svg className="absolute bottom-20 right-5 w-20 h-20 opacity-15 -rotate-45" viewBox="0 0 200 300" fill="none">
        <path d="M100 280 Q95 260 80 240 Q50 220 40 190 Q30 160 45 140 Q55 125 50 100 Q45 70 60 50 Q75 30 85 20 Q95 10 100 5 Q105 10 115 20 Q125 30 140 50 Q155 70 150 100 Q145 125 155 140 Q170 160 160 190 Q150 220 120 240 Q105 260 100 280Z" fill="rgba(251,191,36,0.25)" />
        <path d="M100 280 L100 15" stroke="rgba(251,191,36,0.12)" strokeWidth="1.2" />
      </svg>

      {/* Main success icon */}
      <div className="relative inline-flex mb-6">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-500/20 to-primary-500/20 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center animate-ping" />
        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-primary-500/20 rounded-full" />
      </div>

      <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">لقد تم الطلب بنجاح، شكراً لطلبك</h2>
      <p className="text-white/60 max-w-md mx-auto mb-4 leading-relaxed">
        بما أن الدفع يتم عند الاستلام، سيقوم فريقنا بالتواصل معك قريباً لتأكيد معلومات الطلب وتحديد موعد التوصيل.
      </p>

      {offerDiscount > 0 && (
        <p className="text-gold-400 text-sm font-bold mb-6">
          🎁 تم تفعيل عرض 2+1 — وفرت {formatPrice(offerDiscount)} درهم
        </p>
      )}

      {/* Next steps */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {[
          { icon: "📞", text: "اتصال للتأكيد" },
          { icon: "🚚", text: "تجهيز الطلب" },
          { icon: "✅", text: "توصيل سريع" },
        ].map((step) => (
          <div key={step.text} className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5">
            <span className="text-lg">{step.icon}</span>
            <span className="text-white/70 text-sm font-medium">{step.text}</span>
          </div>
        ))}
      </div>

      <Link href="/shop" className="btn-nature text-base md:text-lg px-10 py-3.5 md:py-4 inline-flex items-center gap-2 group shadow-xl shadow-primary-500/20">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        العودة للتسوق
      </Link>
    </div>
  );
}
