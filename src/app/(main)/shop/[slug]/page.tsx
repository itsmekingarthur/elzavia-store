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
  { label: "عادي", desc: "1 قطعة", priceMultiplier: 1, badge: null, discount: 0, color: "from-surface-400/20 to-white/5", border: "border-white/20", icon: "١" },
  { label: "رائج", desc: "2 قطعة - وفر 50 درهم", priceMultiplier: 2, badge: "الأكثر طلباً", discount: 50, popular: true, color: "from-primary-500/20 to-emerald-500/10", border: "border-primary-500/40", icon: "★" },
  { label: "برو", desc: "3 + 1 مجاناً", priceMultiplier: 3, badge: "أفضل قيمة", discount: 199, pro: true, color: "from-gold-500/20 to-amber-500/10", border: "border-gold-500/40", icon: "🔥" },
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

            {product.ingredients?.length > 0 && (
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
              <p className="text-sm text-white/40 mb-4"><span className="text-emerald-400 font-bold">طريقة الاستخدام:</span> {product.usage}</p>
            )}

            <div className="space-y-3 mt-6">
              <h3 className="text-sm font-bold text-white/40 mb-3">اختر الباقة</h3>
              {deals.map((deal) => {
                const dealPrice = product.price * deal.priceMultiplier;
                const finalPrice = dealPrice - deal.discount;
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
                        {formatPrice(finalPrice)}
                      </span>
                      {deal.discount > 0 && (
                        <span className="text-white/30 text-xs line-through">{formatPrice(dealPrice)}</span>
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
