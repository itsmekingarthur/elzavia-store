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
  benefits?: string[];
  price: number;
  images: string[];
  category: string;
  ingredients: string[];
  usage: string;
  warnings?: string;
  weight: string;
}

const deals = [
  { label: "عادي", desc: "1 قطعة", priceMultiplier: 1, badge: null, fixedPrice: 199, discount: 0, color: "from-surface-400/20 to-white/5", border: "border-white/20", icon: "١" },
  { label: "رائج", desc: "2 قطعة - وفر 50 درهم", priceMultiplier: 2, badge: "الأكثر طلباً", fixedPrice: 348, discount: 50, popular: true, color: "from-primary-500/20 to-emerald-500/10", border: "border-primary-500/40", icon: "★" },
  { label: "برو", desc: "3 قطعة - وفر 98 درهم", priceMultiplier: 3, badge: "أفضل قيمة", fixedPrice: 499, discount: 98, pro: true, color: "from-gold-500/20 to-amber-500/10", border: "border-gold-500/40", icon: "🔥" },
];

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { addWithDeal } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState("رائج");
  const [added, setAdded] = useState(false);

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

  const handleAddToCart = () => {
    if (!product) return;
    const deal = deals.find((d) => d.label === selectedDeal);
    if (!deal) return;
    addWithDeal(product.id, deal.priceMultiplier, deal.label, deal.discount);
    setAdded(true);
  };

  const formatDealPrice = (price: number) => {
    return price.toLocaleString("ar-MA") + " درهم";
  };

  const handleCheckout = () => {
    router.push("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-950 flex items-center justify-center">
        <div className="text-primary-400 text-lg">جاري التحميل...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-primary-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/50 text-lg mb-4">المنتج غير موجود</p>
          <button onClick={() => router.push("/shop")} className="text-primary-400 hover:text-primary-300 font-bold transition-colors">العودة للمتجر</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-950 overflow-hidden">
      <div className="absolute inset-0 bg-forest" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-white/40 hover:text-primary-400 transition-colors mb-8 text-sm">
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
          </div>

          <div>
            <span className="inline-block text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-4">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">{product.name}</h1>
            <p className="text-white/60 leading-relaxed mb-6">{product.description}</p>

            {product.benefits && product.benefits.length > 0 && (
              <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-primary-500/5 border border-emerald-500/10">
                <h3 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  أبرز الفوائد
                </h3>
                <div className="space-y-2">
                  {product.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      <span className="text-white/70 text-sm">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.ingredients?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-white/40 mb-2">المكونات الفعالة</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <span key={ing} className="text-xs bg-white/5 border border-white/10 text-white/70 px-3 py-1 rounded-lg">{ing}</span>
                  ))}
                </div>
              </div>
            )}

            {product.usage && (
              <div className="mb-4">
                <h3 className="text-sm font-bold text-white/40 mb-1">طريقة الاستخدام</h3>
                <p className="text-sm text-white/60 leading-relaxed">{product.usage}</p>
              </div>
            )}

            {product.warnings && (
              <div className="mb-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                  <p className="text-amber-300/80 text-xs leading-relaxed">{product.warnings}</p>
                </div>
              </div>
            )}

            <div className="space-y-3 mt-6">
              <h3 className="text-sm font-bold text-white/40 mb-3">اختر الباقة</h3>
              {deals.map((deal) => {
                const finalPrice = deal.fixedPrice;
                const dealPrice = product.price * deal.priceMultiplier;
                const isSelected = selectedDeal === deal.label;

                return (
                  <button
                    key={deal.label}
                    type="button"
                    onClick={() => { setSelectedDeal(deal.label); setAdded(false); }}
                    className={`w-full text-right p-4 md:p-5 rounded-2xl border-2 transition-all duration-300 ${
                      isSelected
                        ? `${deal.border} bg-gradient-to-br ${deal.color} shadow-lg`
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm ${
                          isSelected
                            ? deal.popular ? "bg-primary-500/20 text-primary-400" : deal.pro ? "bg-gold-500/20 text-gold-400" : "bg-white/20 text-white"
                            : "bg-white/10 text-white/60"
                        }`}>
                          {deal.icon}
                        </div>
                        <div>
                          <span className={`font-extrabold text-base ${
                            isSelected
                              ? deal.popular ? "text-primary-400" : deal.pro ? "text-gold-400" : "text-white"
                              : "text-white"
                          }`}>
                            {deal.label}
                          </span>
                          <span className="text-white/40 text-xs mr-2">{deal.desc}</span>
                        </div>
                      </div>
                      {deal.badge && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          deal.popular ? "bg-primary-500/20 text-primary-300" : "bg-gold-500/20 text-gold-400"
                        }`}>{deal.badge}</span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-2 mr-12">
                      <span className={`font-extrabold text-lg ${
                        isSelected
                          ? deal.popular ? "text-primary-400" : deal.pro ? "text-gold-400" : "text-white"
                          : "text-white"
                      }`}>
                        {formatDealPrice(finalPrice)}
                      </span>
                      {deal.discount > 0 && (
                        <span className="text-white/30 text-xs line-through">{formatDealPrice(dealPrice)}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {added ? (
              <button
                onClick={handleCheckout}
                className="w-full mt-6 py-4 rounded-2xl font-extrabold text-base md:text-lg transition-all duration-300 active:scale-[0.98] shadow-xl bg-gradient-to-r from-primary-500 to-emerald-500 text-white hover:from-primary-400 hover:to-emerald-400 shadow-primary-500/30"
              >
                ✓ تمت الإضافة - إكمال الطلب
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full mt-6 py-4 rounded-2xl font-extrabold text-base md:text-lg transition-all duration-300 active:scale-[0.98] shadow-xl bg-gradient-to-r from-primary-600 to-emerald-600 text-white hover:from-primary-500 hover:to-emerald-500 shadow-primary-500/20 hover:shadow-primary-500/30"
              >
                أضف للسلة
              </button>
            )}

            <p className="text-center text-white/30 text-xs mt-3">
              الدفع عند الاستلام - توصيل لجميع المدن المغربية
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
