"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatPrice, generateOrderId } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface Coupon {
  id: string; code: string; type: "percentage" | "fixed";
  value: number; minAmount: number; maxUses: number;
  usedCount: number; expiresAt: string; active: boolean;
}

function validateCoupon(code: string, cartTotal: number, coupons: Coupon[]): Coupon | null {
  return coupons.find(
    (c) =>
      c.code.toLowerCase() === code.toLowerCase() &&
      c.active &&
      c.usedCount < c.maxUses &&
      new Date(c.expiresAt) > new Date() &&
      cartTotal >= c.minAmount
  ) || null;
}

export default function CartItems() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountLabel, setDiscountLabel] = useState("");
  const [couponError, setCouponError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => (r.ok ? r.json() : []))
      .then(setProducts)
      .catch(() => setProducts([]));
    fetch("/api/coupons")
      .then((r) => (r.ok ? r.json() : []))
      .then(setCoupons)
      .catch(() => setCoupons([]));
  }, []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const subtotal = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    const base = (product?.price || 0) * item.quantity;
    const deal = item.dealDiscount || 0;
    return sum + base - deal;
  }, 0);

  const total = Math.max(0, subtotal - discount);

  const applyCoupon = () => {
    setCouponError("");
    const coupon = validateCoupon(couponCode.trim(), subtotal, coupons);
    if (!coupon) {
      setCouponError("كود الخصم غير صالح أو منتهي الصلاحية");
      setDiscount(0);
      setDiscountLabel("");
      return;
    }
    if (coupon.type === "percentage") {
      const d = Math.round(subtotal * (coupon.value / 100));
      setDiscount(d);
      setDiscountLabel(`خصم ${coupon.value}%`);
    } else {
      setDiscount(Math.min(coupon.value, subtotal));
      setDiscountLabel(`خصم ${formatPrice(coupon.value)}`);
    }
  };

  const placeOrder = async () => {
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) return;
    setSubmitting(true);

    const order = {
      id: generateOrderId(),
      items: items.map((i) => {
        const p = products.find((prod) => prod.id === i.productId);
        return { name: p?.name || "", quantity: i.quantity, price: p?.price || 0 };
      }),
      subtotal,
      discount,
      total,
      coupon: discountLabel,
      customer: form,
      status: "قيد التجهيز",
      createdAt: new Date().toISOString(),
    };

    const orders = JSON.parse(localStorage.getItem("elzavia-orders") || "[]");
    orders.push(order);
    localStorage.setItem("elzavia-orders", JSON.stringify(orders));

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
    } catch {
      console.warn("Server save failed, order saved locally");
    }

    clearCart();
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
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
        <p className="text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
          بما أن الدفع يتم عند الاستلام، سيقوم فريقنا بالتواصل معك قريباً لتأكيد معلومات الطلب وتحديد موعد التوصيل.
        </p>

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

  if (items.length === 0) {
    return (
      <div className="text-center py-12 md:py-20">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 md:h-20 md:w-20 text-white/20 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">سلتك فارغة</h2>
        <p className="text-white/60 mb-8">أضف بعض المنتجات لبدء التسوق</p>
        <Link href="/shop" className="btn-nature">
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
      <div className="lg:col-span-2 space-y-3 md:space-y-4">
        {/* Prominent coupon section */}
        <div className="bg-gradient-to-r from-emerald-500/5 to-primary-500/5 border border-emerald-500/15 rounded-xl p-4 md:p-5">
          <div className="flex items-center gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-emerald-400 text-sm font-bold">هل لديك كود خصم؟</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="أدخل كود الخصم"
              className="flex-1 text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
            />
            <button onClick={applyCoupon} className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 whitespace-nowrap shadow-lg shadow-emerald-500/20">
              تطبيق
            </button>
          </div>
          {couponError && (
            <p className="text-red-400 text-xs mt-2">{couponError}</p>
          )}
          {discount > 0 && (
            <div className="flex items-center gap-1.5 mt-2 text-emerald-400 text-xs font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {discountLabel} مطبق بنجاح
            </div>
          )}
        </div>

        {items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;
          return (
            <div
              key={item.productId}
              className="flex items-center gap-3 md:gap-4 bg-white/5 backdrop-blur-md rounded-xl p-3 md:p-4 border border-white/10"
            >
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary-500/10 to-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-white/10 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-3/4 h-3/4 object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-sm md:text-base truncate">
                  {product.name}
                </h3>
                <p className="text-primary-400 font-bold text-sm md:text-base mt-0.5 md:mt-1">
                  {formatPrice(product.price)}
                </p>
                {item.dealLabel && item.dealDiscount && item.dealDiscount > 0 && (
                  <p className="text-emerald-400 text-[10px] md:text-xs font-medium mt-0.5">
                    {item.dealLabel} (وفر {formatPrice(item.dealDiscount)})
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-primary-500 hover:text-primary-400 transition-colors text-sm md:text-base text-white/80"
                >
                  -
                </button>
                <span className="w-6 md:w-8 text-center font-bold text-sm md:text-base text-white">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-primary-500 hover:text-primary-400 transition-colors text-sm md:text-base text-white/80"
                >
                  +
                </button>
              </div>
              <div className="text-left min-w-[60px] md:min-w-[80px]">
                <p className="text-sm md:text-lg font-bold text-white">
                  {formatPrice(product.price * item.quantity)}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.productId)}
                className="text-red-400/70 hover:text-red-400 transition-colors p-1 flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 md:p-6 border border-white/10 h-fit">
        <h3 className="text-lg md:text-xl font-bold text-white mb-5 md:mb-6">ملخص الطلب</h3>

        <div className="space-y-3 mb-5 md:mb-6 pb-5 md:pb-6 border-b border-white/10">
          {items.some((i) => i.dealDiscount && i.dealDiscount > 0) && (
            <div className="flex justify-between text-emerald-400 text-sm md:text-base">
              <span>خصم الباقات</span>
              <span className="font-bold">
                -{formatPrice(items.reduce((s, i) => s + (i.dealDiscount || 0), 0))}
              </span>
            </div>
          )}
          <div className="flex justify-between text-white/60 text-sm md:text-base">
            <span>المجموع الفرعي</span>
            <span className="font-bold">{formatPrice(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-emerald-400 text-sm md:text-base">
              <span>{discountLabel}</span>
              <span className="font-bold">-{formatPrice(discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-base md:text-lg">
            <span className="font-bold text-white">الإجمالي</span>
            <span className="font-extrabold text-primary-400">
              {formatPrice(total)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium pt-2 border-t border-white/5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            توصيل مجاني لجميع الطلبات
          </div>
        </div>

        <div className="mb-5 md:mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="كود الخصم"
              className="flex-1 text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
            />
            <button onClick={applyCoupon} className="btn-nature !py-2 !px-4 text-sm whitespace-nowrap">
              تطبيق
            </button>
          </div>
          {couponError && (
            <p className="text-red-400 text-xs md:text-sm mt-2">{couponError}</p>
          )}
        </div>

        <div className="space-y-3 md:space-y-4">
          <h4 className="font-bold text-white text-sm md:text-base">معلومات التوصيل</h4>
          <div>
            <label htmlFor="order-name" className="sr-only">الاسم الكامل</label>
            <input
              id="order-name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="الاسم الكامل"
              autoComplete="name"
              className="w-full text-sm md:text-base bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
            />
          </div>
          <div>
            <label htmlFor="order-phone" className="sr-only">رقم الهاتف</label>
            <input
              id="order-phone"
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
            <label htmlFor="order-address" className="sr-only">العنوان كاملاً</label>
            <textarea
              id="order-address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="العنوان كاملاً"
              autoComplete="street-address"
              rows={3}
              className="w-full text-sm md:text-base bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
            />
          </div>
          <div>
            <label htmlFor="order-notes" className="sr-only">ملاحظات (اختياري)</label>
            <textarea
              id="order-notes"
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
  );
}
