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
      <div className="text-center py-12 md:py-20">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">تم تقديم الطلب بنجاح!</h2>
        <p className="text-white/60 mb-8">سنقوم بالتواصل معك قريباً لتأكيد الطلب.</p>
        <Link href="/shop" className="btn-nature">
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
        {items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;
          return (
            <div
              key={item.productId}
              className="flex items-center gap-3 md:gap-4 bg-white/5 backdrop-blur-md rounded-xl p-3 md:p-4 border border-white/10"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-14 h-14 md:w-20 md:h-20 object-contain bg-white/5 rounded-lg flex-shrink-0"
              />
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
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="الاسم الكامل"
            className="w-full text-sm md:text-base bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
          />
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="رقم الهاتف"
            className="w-full text-sm md:text-base bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
          />
          <textarea
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="العنوان كاملاً"
            rows={3}
            className="w-full text-sm md:text-base bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
          />
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="ملاحظات (اختياري)"
            rows={2}
            className="w-full text-sm md:text-base bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
          />
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
