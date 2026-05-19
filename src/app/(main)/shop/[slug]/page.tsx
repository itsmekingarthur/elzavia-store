"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Leaves from "@/components/Leaves";

const PACKAGE_PRICE = 199;

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = ((h << 5) - h) + id.charCodeAt(i);
  return Math.abs(h);
}

const palettes = [
  { bg: "#d1fae5", text: "#059669", dark: "#047857", light: "#ecfdf5" },
  { bg: "#dbeafe", text: "#2563eb", dark: "#1d4ed8", light: "#eff6ff" },
  { bg: "#ede9fe", text: "#7c3aed", dark: "#6d28d9", light: "#f5f3ff" },
  { bg: "#fce7f3", text: "#db2777", dark: "#be185d", light: "#fdf2f8" },
  { bg: "#fef3c7", text: "#d97706", dark: "#b45309", light: "#fffbeb" },
  { bg: "#cffafe", text: "#0891b2", dark: "#0e7490", light: "#ecfeff" },
  { bg: "#ffedd5", text: "#ea580c", dark: "#c2410c", light: "#fff7ed" },
  { bg: "#f5f3ff", text: "#7c3aed", dark: "#6d28d9", light: "#f5f3ff" },
];

const packages = [
  {
    id: "pro",
    title: "برو",
    subtitle: "اشتري 3 واحصل على 1 مجاناً",
    quantity: 4,
    dealLabel: "باقة برو (3+1 مجاناً)",
    dealDiscount: PACKAGE_PRICE,
    price: PACKAGE_PRICE * 3,
    badge: null,
    gradient: "from-gray-800 to-gray-900",
    border: "border-gray-300",
    shadow: "shadow-gray-200",
  },
  {
    id: "popular",
    title: "رائج",
    subtitle: "اشتري 2 ووفر 50 درهم",
    quantity: 2,
    dealLabel: "باقة رائج (خصم 50 درهم)",
    dealDiscount: 50,
    price: PACKAGE_PRICE * 2 - 50,
    badge: "الأكثر طلباً",
    gradient: "from-primary-600 to-primary-800",
    border: "border-primary-500",
    shadow: "shadow-primary-200",
  },
  {
    id: "normal",
    title: "عادي",
    subtitle: "عبوة واحدة",
    quantity: 1,
    dealLabel: undefined,
    dealDiscount: 0,
    price: PACKAGE_PRICE,
    badge: null,
    gradient: "from-gray-100 to-gray-50",
    border: "border-gray-200",
    shadow: "shadow-gray-100",
  },
];

export default function ProductPage() {
  const params = useParams();
  const { addWithDeal } = useCart();
  const [product, setProduct] = useState<{ id: string; name: string; slug: string; description: string; price: number; images: string[]; category: string; ingredients?: string[]; usage?: string; weight?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [showCartLink, setShowCartLink] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.ok ? r.json() : [])
      .then((list) => setProduct(list.find((p: any) => p.slug === params.slug) || null))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) {
    return <div className="container mx-auto px-4 py-20 text-center text-gray-400">جاري التحميل...</div>;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">المنتج غير موجود</h1>
        <Link href="/shop" className="btn-primary">
          العودة للمتجر
        </Link>
      </div>
    );
  }

  const palette = palettes[product ? (hashId(product.id) % palettes.length) : 0];

  const handleSelect = (pkg: typeof packages[0]) => {
    setSelected(pkg.id);
    setShowCartLink(false);
    addWithDeal(product.id, pkg.quantity, pkg.dealLabel || "", pkg.dealDiscount);
    setShowCartLink(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-50 to-white overflow-hidden relative">
      <Leaves className="absolute inset-0" />
      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start max-w-5xl mx-auto">
          <div className="md:sticky md:top-24">
            <div className="bg-white rounded-3xl p-8 md:p-14 shadow-lg border border-gray-100 flex items-center justify-center">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-auto object-contain max-h-96 drop-shadow-xl"
              />
            </div>
          </div>

          <div>
            <span className="inline-block text-xs md:text-sm font-medium px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: palette.bg, color: palette.text }}>
              {product.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">
              {product.name}
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-6 whitespace-pre-line text-gray-900">
              {product.description}
            </p>

            <div className="rounded-2xl p-4 mb-8 flex items-center gap-3 border" style={{ backgroundColor: palette.light, borderColor: palette.bg }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: palette.bg }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: palette.text }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="font-medium text-sm md:text-base" style={{ color: palette.dark || palette.text }}>
                {product.usage}
              </p>
            </div>

            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-5">اختر باقتك</h2>

            <div className="space-y-4">
              {packages.map((pkg, idx) => {
                const isPopular = pkg.id === "popular";
                const isPro = pkg.id === "pro";
                const isNormal = pkg.id === "normal";

                return (
                  <button
                    key={pkg.id}
                    onClick={() => handleSelect(pkg)}
                    className={`w-full text-right group relative overflow-hidden rounded-2xl border-2 p-5 transition-all duration-300 ${
                      selected === pkg.id
                        ? isPopular
                          ? "border-primary-500 bg-primary-50 shadow-lg shadow-primary-100 scale-[1.02]"
                          : isPro
                          ? "border-gray-800 bg-gray-50 shadow-lg shadow-gray-200 scale-[1.02]"
                          : "border-gray-300 bg-gray-50 shadow-lg scale-[1.02]"
                        : `${pkg.border} bg-white hover:shadow-md hover:-translate-y-0.5`
                    }`}
                  >
                    {pkg.badge && (
                      <div className="absolute -top-1 -left-1">
                        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-br-xl rounded-tl-xl shadow-sm">
                          {pkg.badge}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${pkg.gradient} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105`}
                      >
                        {isPopular ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        ) : isPro ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`font-extrabold text-lg md:text-xl ${isPopular ? "text-primary-700" : isPro ? "text-gray-800" : "text-gray-700"}`}>
                            {pkg.title}
                          </span>
                          {isPopular && (
                            <span className="text-[10px] md:text-xs bg-primary-100 text-primary-700 font-bold px-2 py-0.5 rounded-full">
                              الأفضل
                            </span>
                          )}
                        </div>
                        <p className="text-gray-500 text-xs md:text-sm">{pkg.subtitle}</p>
                      </div>

                      <div className="text-left">
                        <div className={`font-extrabold text-lg md:text-xl ${isPopular ? "text-primary-700" : "text-gray-900"}`}>
                          {formatPrice(pkg.price)}
                        </div>
                        {isPopular && (
                          <div className="text-[10px] md:text-xs text-gray-400 line-through">
                            {formatPrice(PACKAGE_PRICE * 2)}
                          </div>
                        )}
                        {isPro && (
                          <div className="text-[10px] md:text-xs text-green-600 font-medium">
                            وفر {formatPrice(PACKAGE_PRICE)}
                          </div>
                        )}
                      </div>
                    </div>

                    {selected === pkg.id && (
                      <div className="mt-3 pt-3 border-t border-dashed border-gray-200 flex items-center justify-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-green-600 font-bold text-sm">تمت الإضافة إلى السلة</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {showCartLink && (
              <Link
                href="/cart"
                className="mt-6 w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-700 active:scale-[0.98] transition-all shadow-lg shadow-primary-200"
              >
                إكمال الطلب
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}

            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-100">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">المكونات</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-700 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
