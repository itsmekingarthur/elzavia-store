"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  ingredients: string[];
  usage: string;
  weight: string;
}

const deals = [
  { label: "عادي", desc: "1 قطعة", priceMultiplier: 1, badge: null, discount: 0 },
  { label: "رائج", desc: "2 قطعة - وفر 50 درهم", priceMultiplier: 2, badge: "الأكثر طلباً", discount: 50, popular: true },
  { label: "برو", desc: "3 + 1 مجاناً", priceMultiplier: 3, badge: "أفضل قيمة", discount: 199, pro: true },
];

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { addWithDeal } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        const found = data.find((p: Product) => p.slug === slug);
        setProduct(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <div className="text-gold-400 text-lg">جاري التحميل...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/50 text-lg mb-4">المنتج غير موجود</p>
          <button onClick={() => router.push("/shop")} className="text-gold-400 hover:text-gold-300 font-bold transition-colors">
            العودة للمتجر
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-30" />
      <div className="absolute inset-0 bg-gold-glow" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-white/40 hover:text-gold-400 transition-colors mb-8 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          رجوع
        </button>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-10 md:p-16 flex items-center justify-center">
              <img src={product.images?.[0] || "/images/placeholder.png"} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl" />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border border-gold-500/10 pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full border border-gold-500/8 pointer-events-none" />
          </div>

          <div>
            <span className="inline-block text-xs font-bold text-gold-400 bg-gold-500/10 border border-gold-500/20 px-3 py-1 rounded-full mb-4">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">{product.name}</h1>
            <p className="text-white/60 leading-relaxed mb-6">{product.description}</p>

            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-white/40 mb-2">المكونات</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <span key={ing} className="text-xs bg-white/5 border border-white/10 text-white/70 px-3 py-1 rounded-lg">{ing}</span>
                  ))}
                </div>
              </div>
            )}

            {product.usage && (
              <p className="text-sm text-white/40 mb-8"><span className="text-gold-400 font-bold">طريقة الاستخدام:</span> {product.usage}</p>
            )}

            {/* Deals */}
            <div className="space-y-4 mt-8">
              <h3 className="text-sm font-bold text-white/40 mb-3">اختر الباقة</h3>
              {deals.map((deal) => {
                const dealPrice = product.price * deal.priceMultiplier;
                const finalPrice = dealPrice - deal.discount;
                const isPopular = deal.popular;
                const isPro = deal.pro;

                return (
                  <button
                    key={deal.label}
                    onClick={() => addWithDeal(product.id, 1, deal.label, deal.discount)}
                    className={`w-full text-right p-4 md:p-5 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl active:scale-[0.98] group ${isPopular ? "border-gold-500/40 bg-gold-500/5 shadow-lg shadow-gold-500/5" : "border-white/10 bg-white/5 hover:border-white/20"}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isPopular ? "bg-gold-500/20 text-gold-400" : "bg-white/10 text-white/60"} font-extrabold text-sm`}>
                          {isPopular ? "★" : isPro ? "🔥" : "١"}
                        </div>
                        <div>
                          <span className={`font-extrabold text-lg ${isPopular ? "text-gold-400" : "text-white"}`}>{deal.label}</span>
                          <span className="text-white/40 text-xs mr-2">{deal.desc}</span>
                        </div>
                      </div>
                      {deal.badge && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isPopular ? "bg-gold-500/20 text-gold-400" : "bg-amber-500/20 text-amber-400"}`}>
                          {deal.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className={`font-extrabold text-xl ${isPopular ? "text-gold-400" : "text-white"}`}>{formatPrice(finalPrice)}</span>
                        {deal.discount > 0 && (
                          <span className="text-white/30 text-sm line-through">{formatPrice(dealPrice)}</span>
                        )}
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-lg transition-all ${isPopular ? "bg-gold-500 text-surface-900" : "bg-white/10 text-white/60 group-hover:bg-white/20"}`}>
                        أضف للسلة
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
