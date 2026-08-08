"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { generateOrderId, getOrdersStorageKey } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { fbEvent } from "@/lib/fbpixel";
import { validateCoupon, type Coupon } from "./coupons";
import { formatPrice } from "@/lib/utils";

export type DeliveryFormState = {
  name: string;
  phone: string;
  address: string;
  notes: string;
};

export function useCartCheckout() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountLabel, setDiscountLabel] = useState("");
  const [couponError, setCouponError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [usePoints, setUsePoints] = useState(false);
  const [offerB2G1, setOfferB2G1] = useState(false);
  const [form, setForm] = useState<DeliveryFormState>({ name: "", phone: "", address: "", notes: "" });

  useEffect(() => {
    fetch("/api/products")
      .then((r) => (r.ok ? r.json() : []))
      .then(setProducts)
      .catch(() => setProducts([]));
    fetch("/api/coupons")
      .then((r) => (r.ok ? r.json() : []))
      .then(setCoupons)
      .catch(() => setCoupons([]));
    const saved = parseInt(localStorage.getItem(`elzavia-points-${user?.id}`) || "0", 10);
    if (!isNaN(saved)) setUserPoints(saved);
    if (user) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        const token = session?.access_token;
        if (token) {
          fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
            .then((r) => r.ok && r.json())
            .then((d) => {
              if (d.profile?.points) {
                setUserPoints(d.profile.points);
                localStorage.setItem(`elzavia-points-${user.id}`, String(d.profile.points));
              }
            })
            .catch(() => {});
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (searchParams.get("offer") === "b2g1") {
      setOfferB2G1(true);
    }
  }, [searchParams]);

  const subtotal = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    const base = (product?.price || 0) * item.quantity;
    const deal = item.dealDiscount || 0;
    return sum + base - deal;
  }, 0);

  const pointsDiscount = usePoints ? Math.floor(userPoints / 100) * 25 : 0;

  const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
  const cheapestPrice =
    totalQty >= 3
      ? Math.min(...items.map((i) => {
          const p = products.find((prod) => prod.id === i.productId);
          return p?.price || Infinity;
        }))
      : 0;
  const offerDiscount = offerB2G1 && totalQty >= 3 ? cheapestPrice : 0;

  const total = Math.max(0, subtotal - discount - pointsDiscount - offerDiscount);

  const applyCoupon = useCallback(() => {
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
  }, [couponCode, subtotal, coupons]);

  const placeOrder = useCallback(async () => {
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) return;
    setSubmitting(true);

    const pointsToUse = pointsDiscount > 0 ? Math.floor(userPoints / 100) * 100 : 0;

    const order: any = {
      id: generateOrderId(),
      user_id: user?.id || null,
      items: items.map((i) => {
        const p = products.find((prod) => prod.id === i.productId);
        return { name: p?.name || "", quantity: i.quantity, price: p?.price || 0 };
      }),
      subtotal,
      discount: discount + pointsDiscount + offerDiscount,
      total,
      coupon: discountLabel,
      pointsUsed: pointsToUse,
      pointsDiscount,
      offerB2G1: offerDiscount > 0,
      offerDiscount,
      customer: form,
      status: "قيد التجهيز",
      createdAt: new Date().toISOString(),
    };

    const key = getOrdersStorageKey(user?.id);
    const orders = JSON.parse(localStorage.getItem(key) || "[]");
    orders.push(order);
    localStorage.setItem(key, JSON.stringify(orders));

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
      } catch {
        console.warn("Points sync failed");
      }
    }

    fbEvent("Purchase", {
      value: total,
      currency: "MAD",
      content_ids: items.map((i) => i.productId),
      contents: items.map((i) => ({ id: i.productId, quantity: i.quantity })),
      num_items: items.length,
    });

    clearCart();
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setSubmitted(true);
    setSubmitting(false);
  }, [form, user, products, items, subtotal, discount, pointsDiscount, offerDiscount, discountLabel, userPoints, clearCart, total]);

  const updateForm = useCallback((field: keyof DeliveryFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  return {
    items,
    products,
    removeFromCart,
    updateQuantity,
    user,
    form,
    updateForm,
    subtotal,
    pointsDiscount,
    userPoints,
    setUsePoints,
    usePoints,
    totalQty,
    cheapestPrice,
    offerDiscount,
    offerB2G1,
    setOfferB2G1,
    total,
    couponCode,
    setCouponCode,
    discount,
    discountLabel,
    couponError,
    applyCoupon,
    placeOrder,
    submitting,
    submitted,
  };
}
