"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
  return (
    <Suspense fallback={<div className="min-h-screen bg-primary-950 flex items-center justify-center"><div className="text-primary-400 text-lg">جاري التحميل...</div></div>}>
      <ProductDetailContent />
    </Suspense>
  );
}

function ProductDetailContent() {
  const { slug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOffer = searchParams.get("offer") === "b2g1";
  const { addWithDeal, addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState("رائج");
  const [added, setAdded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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
            <div
              className="aspect-square rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-10 md:p-16 flex items-center justify-center cursor-zoom-in group"
              onClick={() => setLightboxOpen(true)}
            >
              <img src={product.images?.[0] || "/images/placeholder.png"} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1 text-[10px] text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
                تكبير
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="inline-block text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="w-px h-4 bg-white/10" />
              <button
                onClick={() => {
                  const url = window.location.href;
                  const text = `تعرف على ${product.name} من إلزافيا 🍃`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`, "_blank");
                }}
                className="flex items-center gap-1 text-xs text-white/40 hover:text-emerald-400 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                aria-label="مشاركة عبر واتساب"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                <span>مشاركة</span>
              </button>
              <button
                onClick={() => {
                  const url = window.location.href;
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
                }}
                className="flex items-center gap-1 text-xs text-white/40 hover:text-blue-400 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                aria-label="مشاركة عبر فيسبوك"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                <span>مشاركة</span>
              </button>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">{product.name}</h1>
            <p className="text-white/60 leading-relaxed mb-6 whitespace-pre-line">{product.description}</p>

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
                <p className="text-sm text-white/60 leading-relaxed whitespace-pre-line">{product.usage}</p>
              </div>
            )}

            {product.warnings && (
              <div className="mb-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                  <p className="text-amber-300/80 text-xs leading-relaxed whitespace-pre-line">{product.warnings}</p>
                </div>
              </div>
            )}

            {isOffer ? (
              <div className="mt-8">
                <div className="bg-gradient-to-r from-gold-500/10 via-primary-500/5 to-gold-500/10 border-2 border-gold-500/30 rounded-2xl p-6 md:p-8 text-center">
                  <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
                    🎁 عرض 2+1 مفعل
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">اشتري 2 واحصل على الثالث مجاناً</h3>
                  <p className="text-white/50 text-sm mb-6 leading-relaxed">
                    هذا المنتج متضمن في عرض 2+1 — اختر منتجين من الباقة واستفيد من الثالث مجاناً + توصيل مجاني
                  </p>
                  <button
                    onClick={() => {
                      addToCart(product.id);
                      router.push(`/offer/${product.slug}`);
                    }}
                    className="w-full py-4 rounded-2xl font-extrabold text-base md:text-lg transition-all duration-300 active:scale-[0.98] shadow-xl shadow-gold-500/30 bg-gradient-to-r from-gold-500 to-amber-500 text-surface-900 hover:from-gold-400 hover:to-amber-400 hover:shadow-gold-500/40 animate-pulse-gold"
                  >
                    🎁 استفد من العرض
                  </button>
                  <p className="text-gold-400/60 text-xs mt-3">الدفع عند الاستلام - توصيل مجاني</p>
                </div>
              </div>
            ) : (
              <>
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
                        <div className="mr-12 mt-1">
                          <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                            توصيل مجاني
                          </span>
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
                  <div className="mt-6 flex flex-col md:flex-row gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 py-4 rounded-2xl font-extrabold text-base md:text-lg transition-all duration-300 active:scale-[0.98] shadow-xl bg-white/10 text-white border border-white/20 hover:bg-white/20"
                    >
                      أضف إلى السلة
                    </button>
                    <button
                      onClick={() => {
                        handleAddToCart();
                        setTimeout(() => router.push("/cart?direct=1"), 300);
                      }}
                      className="flex-1 py-4 rounded-2xl font-extrabold text-base md:text-lg transition-all duration-300 active:scale-[0.98] shadow-xl bg-gradient-to-r from-primary-600 to-emerald-600 text-white hover:from-primary-500 hover:to-emerald-500 shadow-primary-500/20"
                    >
                      اطلب الان
                    </button>
                  </div>
                )}

                <p className="text-center text-white/30 text-xs mt-3">
                  الدفع عند الاستلام - توصيل لجميع المدن المغربية
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={product.images?.[0] || "/images/placeholder.png"}
            alt={product.name}
            className="max-w-full max-h-[90vh] object-contain animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
