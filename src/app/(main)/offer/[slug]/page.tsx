"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { formatPrice, generateOrderId, getOrdersStorageKey } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: string;
}

const OFFER_PRODUCT_IDS = ["1", "2"];
const FIXED_QTY = 2;
const BUNDLE_DISCOUNT = 75;

export default function OfferCheckoutPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [usePoints, setUsePoints] = useState(false);

  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        const found = data.find((p: Product) => p.slug === slug);
        if (!found || !OFFER_PRODUCT_IDS.includes(found.id)) {
          setProduct(null);
        } else {
          setProduct(found);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const saved = parseInt(localStorage.getItem(`elzavia-points-${user?.id}`) || "0", 10);
    if (!isNaN(saved)) setUserPoints(saved);
    if (user) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        const token = session?.access_token;
        if (token) {
          fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.ok && r.json())
            .then(d => { if (d.profile?.points) { setUserPoints(d.profile.points); localStorage.setItem(`elzavia-points-${user.id}`, String(d.profile.points)); } })
            .catch(() => {});
        }
      });
    }
  }, [slug, user]);

  const unitPrice = product?.price || 0;
  const subtotal = unitPrice * FIXED_QTY;
  const pointsDiscount = usePoints ? Math.floor(userPoints / 100) * 25 : 0;
  const total = Math.max(0, subtotal - BUNDLE_DISCOUNT - pointsDiscount);

  const placeOrder = async () => {
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim() || !product) return;
    setSubmitting(true);

    const pointsToUse = pointsDiscount > 0 ? Math.floor(userPoints / 100) * 100 : 0;

    const order: any = {
      id: generateOrderId(),
      user_id: user?.id || null,
      items: [{ name: product.name, quantity: FIXED_QTY, price: unitPrice }],
      subtotal,
      discount: BUNDLE_DISCOUNT + pointsDiscount,
      total,
      coupon: "خصم حصري 75 درهم للباقة",
      pointsUsed: pointsToUse,
      pointsDiscount,
      offerB2G1: true,
      offerDiscount: BUNDLE_DISCOUNT,
      customer: form,
      status: "قيد التجهيز",
      createdAt: new Date().toISOString(),
    };

    const key = getOrdersStorageKey(user?.id);
    const orders = JSON.parse(localStorage.getItem(key) || "[]");
    orders.push(order);
    localStorage.setItem(key, JSON.stringify(orders));
    // Also save to generic key for admin dashboard visibility
    const genericOrders = JSON.parse(localStorage.getItem("elzavia-orders") || "[]");
    const existingIdx = genericOrders.findIndex((o: any) => o.id === order.id);
    if (existingIdx >= 0) genericOrders[existingIdx] = order;
    else genericOrders.push(order);
    localStorage.setItem("elzavia-orders", JSON.stringify(genericOrders));

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
    } catch {
      console.warn("Server save failed, order saved locally");
    }

    if (pointsToUse > 0 && user?.id) {
      const remaining = userPoints - pointsToUse;
      setUserPoints(remaining);
      localStorage.setItem(`elzavia-points-${user.id}`, String(remaining));
      try {
        await fetch("/api/auth/points", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, points: remaining }),
        });
      } catch { console.warn("Points sync failed"); }
    }

    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setSubmitted(true);
    setSubmitting(false);
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
          <p className="text-white/50 text-lg mb-4">العرض غير متاح لهذا المنتج</p>
          <Link href="/shop?offer=b2g1" className="text-primary-400 hover:text-primary-300 font-bold transition-colors">العرض للمتجر</Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-primary-950 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-500/20 to-primary-500/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">لقد تم الطلب بنجاح، شكراً لطلبك</h2>
          <p className="text-white/60 max-w-md mx-auto mb-4 leading-relaxed">
            🎁 تم تفعيل عرض 2+1 — ستحصل على الثالث مجاناً + التوصيل مجاني
          </p>
          <p className="text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
            بما أن الدفع يتم عند الاستلام، سيقوم فريقنا بالتواصل معك قريباً لتأكيد معلومات الطلب وتحديد موعد التوصيل.
          </p>
          <Link href="/shop" className="btn-nature text-base md:text-lg px-10 py-3.5 md:py-4 inline-flex items-center gap-2 group shadow-xl shadow-primary-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            العودة للتسوق
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950">
      <div className="absolute inset-0 bg-forest pointer-events-none" />
      <div className="container mx-auto px-4 pt-28 pb-12 relative z-10">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-white/40 hover:text-primary-400 transition-colors mb-6 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          رجوع
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 text-gold-400 text-sm font-bold px-5 py-2 rounded-full mb-4">
            🎁 عرض 2+1 مفعل
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            {/* Product card - fixed qty 2 */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 md:p-6 border border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary-500/10 to-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-white/10 overflow-hidden">
                  <img src={product.images[0]} alt={product.name} className="w-3/4 h-3/4 object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-white text-lg md:text-xl">{product.name}</h3>
                  <p className="text-primary-400 font-bold text-sm md:text-base mt-1">{formatPrice(unitPrice)}</p>
                </div>
              </div>

              {/* Fixed quantity display */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-xl">
                  <span className="text-white/70 font-medium">{product.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-white/50 text-sm">{formatPrice(unitPrice)}</span>
                    <span className="text-white font-bold text-lg">2</span>
                    <span className="text-white font-extrabold text-lg">{formatPrice(unitPrice * 2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Points */}
            {user && userPoints >= 100 && (
              <div className={`rounded-xl p-5 transition-all duration-300 border ${usePoints ? "bg-gold-500/15 border-gold-500/30" : "bg-white/5 border-white/10"}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">⭐</span>
                  <div className="flex-1">
                    <p className="text-white font-bold">لديك {userPoints} نقطة</p>
                    <p className="text-white/50 text-xs">كل 100 نقطة = 25 درهم خصم</p>
                  </div>
                </div>
                <button
                  onClick={() => setUsePoints(!usePoints)}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    usePoints
                      ? "bg-gold-500 text-surface-900 hover:bg-gold-400 shadow-lg shadow-gold-500/20"
                      : "bg-gold-500/20 text-gold-400 hover:bg-gold-500/30 border border-gold-500/30"
                  }`}
                >
                  <span>{usePoints ? "✅" : "🎯"}</span>
                  {usePoints
                    ? `خصم ${formatPrice(pointsDiscount)} مطبق`
                    : `استخدم ${Math.floor(userPoints / 100) * 100} نقطة ووفر ${formatPrice(Math.floor(userPoints / 100) * 25)}`
                  }
                </button>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 md:p-6 border border-white/10 h-fit">
            <h3 className="text-lg md:text-xl font-bold text-white mb-5 md:mb-6">ملخص الطلب</h3>

            <div className="space-y-3 mb-5 md:mb-6 pb-5 md:pb-6 border-b border-white/10">
              <div className="flex justify-between text-white/60 text-sm md:text-base">
                <span>المجموع الفرعي ({FIXED_QTY} × {formatPrice(unitPrice)})</span>
                <span className="font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gold-400 text-sm md:text-base">
                <span>خصم حصري 75 درهم للباقة</span>
                <span className="font-bold">-{formatPrice(BUNDLE_DISCOUNT)}</span>
              </div>
              {pointsDiscount > 0 && (
                <div className="flex justify-between text-gold-400 text-sm md:text-base">
                  <span>خصم النقاط ({Math.floor(userPoints / 100) * 100} نقطة)</span>
                  <span className="font-bold">-{formatPrice(pointsDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-base md:text-lg pt-2">
                <span className="font-bold text-white">الإجمالي</span>
                <span className="font-extrabold text-primary-400">{formatPrice(total)}</span>
              </div>
              <div className="bg-gradient-to-r from-gold-500/20 to-amber-500/10 border border-gold-500/30 rounded-xl p-4 mt-4">
                <p className="text-gold-300 text-sm font-bold text-center leading-relaxed">
                  🎉 اشتري 2 واحصل على الثالث مجانا + التوصيل مجاني
                </p>
              </div>
            </div>

            {/* Customer info form */}
            <div className="space-y-3 md:space-y-4">
              <h4 className="font-bold text-white text-sm md:text-base">معلومات التوصيل</h4>
              <div>
                <label htmlFor="offer-name" className="sr-only">الاسم الكامل</label>
                <input
                  id="offer-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="الاسم الكامل"
                  autoComplete="name"
                  className="w-full text-sm md:text-base bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="offer-phone" className="sr-only">رقم الهاتف</label>
                <input
                  id="offer-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="رقم الهاتف"
                  autoComplete="tel"
                  inputMode="numeric"
                  className="w-full text-sm md:text-base bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="offer-address" className="sr-only">العنوان كاملاً</label>
                <textarea
                  id="offer-address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="العنوان كاملاً"
                  autoComplete="street-address"
                  rows={3}
                  className="w-full text-sm md:text-base bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="offer-notes" className="sr-only">ملاحظات (اختياري)</label>
                <textarea
                  id="offer-notes"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="ملاحظات (اختياري)"
                  rows={2}
                  className="w-full text-sm md:text-base bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
                />
              </div>
              <button
                onClick={placeOrder}
                disabled={!form.name.trim() || !form.phone.trim() || !form.address.trim() || submitting}
                className="btn-nature w-full text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "جاري إرسال الطلب..." : "تأكيد الطلب (دفع عند الاستلام)"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
