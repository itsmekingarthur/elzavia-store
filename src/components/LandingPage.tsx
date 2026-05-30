"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { formatPrice, generateOrderId, getOrdersStorageKey } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { fbEvent } from "@/lib/fbpixel";

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

function RevealOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return { h: 23, m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-1.5 text-xs md:text-sm">
      <span className="text-white/40">ينتهي العرض خلال</span>
      <div className="flex items-center gap-1 font-mono font-extrabold" dir="ltr">
        <span className="bg-white/10 text-gold-400 px-2 py-0.5 rounded-md min-w-[26px] text-center">{pad(timeLeft.h)}</span>
        <span className="text-white/20">:</span>
        <span className="bg-white/10 text-gold-400 px-2 py-0.5 rounded-md min-w-[26px] text-center">{pad(timeLeft.m)}</span>
        <span className="text-white/20">:</span>
        <span className="bg-white/10 text-gold-400 px-2 py-0.5 rounded-md min-w-[26px] text-center">{pad(timeLeft.s)}</span>
      </div>
    </div>
  );
}

const testimonials = [
  { name: "أحمد م.", text: "منتجات طبيعية رائعة، حسّنت نومي بشكل ملحوظ", stars: 5 },
  { name: "سارة ل.", text: "جودة ممتازة والتوصيل كان سريع جداً", stars: 5 },
  { name: "يوسف ك.", text: "صراحة فرق معايا من أول أسبوع، أنصح بالشراء", stars: 5 },
  { name: "مريم ف.", text: "الدفع عند الاستلام مريح جداً والمنتج أصلي", stars: 5 },
];

export default function LandingPage({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState({ name: "", phone: "", address: "" });
  const [touched, setTouched] = useState({ name: false, phone: false, address: false });
  const [orderCount] = useState(() => Math.floor(Math.random() * 73) + 158);
  const [liveNotif, setLiveNotif] = useState<{ name: string; city: string; time: string } | null>(null);

  const liveNames = [
    { name: "محمد", city: "الدار البيضاء" },
    { name: "فاطمة", city: "الرباط" },
    { name: "يوسف", city: "مراكش" },
    { name: "خديجة", city: "فاس" },
    { name: "أحمد", city: "طنجة" },
    { name: "نورة", city: "أكادير" },
    { name: "عمر", city: "وجدة" },
    { name: "سلمى", city: "مكناس" },
    { name: "إدريس", city: "تطوان" },
    { name: "مريم", city: "القنيطرة" },
  ];

  const timesAgo = ["قبل دقيقة", "قبل 3 دقائق", "قبل 5 دقائق", "قبل دقيقتين", "قبل 7 دقائق", "قبل 4 دقائق"];

  useEffect(() => {
    const show = () => {
      const person = liveNames[Math.floor(Math.random() * liveNames.length)];
      setLiveNotif({ ...person, time: timesAgo[Math.floor(Math.random() * timesAgo.length)] });
      setTimeout(() => setLiveNotif(null), 5000);
    };
    show();
    const interval = setInterval(show, 12000 + Math.random() * 15000);
    return () => clearInterval(interval);
  }, []);

  const validateName = (v: string) => {
    if (!v.trim()) return "الاسم مطلوب";
    if (v.trim().length < 2) return "الاسم قصير جداً";
    return "";
  };
  const validatePhone = (v: string) => {
    const c = v.replace(/\s|-/g, "");
    if (!c) return "رقم الهاتف مطلوب";
    if (!/^(0[567]\d{8}|(\+212)[567]\d{8}|00212[567]\d{8})$/.test(c)) return "رقم هاتف غير صحيح (مثال: 06XXXXXXXX)";
    return "";
  };
  const validateAddress = (v: string) => {
    if (!v.trim()) return "العنوان مطلوب";
    if (v.trim().length < 5) return "يرجى إدخال عنوان كامل";
    return "";
  };
  const validateForm = () => {
    const e = { name: validateName(form.name), phone: validatePhone(form.phone), address: validateAddress(form.address) };
    setErrors(e);
    setTouched({ name: true, phone: true, address: true });
    return !e.name && !e.phone && !e.address;
  };

  const OFFER_PRICE = 249;
  const ORIGINAL_VALUE = 398;
  const SAVINGS = ORIGINAL_VALUE - OFFER_PRICE;

  const images = [
    { src: "/images/landing page/main.png", alt: product.name },
    { src: "/images/landing page/pic1.jpeg", alt: `${product.name} - مكونات طبيعية` },
    { src: "/images/landing page/pic2.jpeg", alt: `${product.name} - نمط حياة صحي` },
    { src: "/images/landing page/pic3.jpeg", alt: `${product.name} - عرض خاص` },
  ];

  const faqs = [
    { q: "كيف أستفيد من العرض؟", a: "املأ النموذج أعلاه واطلب الآن! ستحصل على منتجين بسعر 249 درهم فقط مع توصيل مجاني." },
    { q: "هل التوصيل مجاني؟", a: "نعم، التوصيل مجاني لجميع المدن المغربية دون أي رسوم إضافية." },
    { q: "كم يستغرق التوصيل؟", a: "يتم التوصيل خلال 24-48 ساعة حسب مدينتك." },
    { q: "هل المنتج طبيعي وآمن؟", a: "نعم، جميع منتجاتنا طبيعية 100% وآمنة للاستخدام اليومي." },
  ];

  const placeOrder = async () => {
    if (!validateForm()) return;
    setSubmitting(true);

    const order = {
      id: generateOrderId(),
      user_id: null,
      items: [{ name: product.name, quantity: 2, price: product.price }],
      subtotal: ORIGINAL_VALUE,
      discount: SAVINGS,
      total: OFFER_PRICE,
      coupon: "خصم حصري 149 درهم",
      offerB2G1: false,
      offerDiscount: SAVINGS,
      customer: form,
      status: "قيد التجهيز",
      createdAt: new Date().toISOString(),
    };

    const key = getOrdersStorageKey(null);
    const orders = JSON.parse(localStorage.getItem(key) || "[]");
    orders.push(order);
    localStorage.setItem(key, JSON.stringify(orders));
    const genericOrders = JSON.parse(localStorage.getItem("elzavia-orders") || "[]");
    genericOrders.push(order);
    localStorage.setItem("elzavia-orders", JSON.stringify(genericOrders));

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
    } catch { /* ignore */ }

    fbEvent("AddToCart", {
      content_ids: [product.id],
      content_name: product.name,
      value: OFFER_PRICE,
      currency: "MAD",
      contents: [{ id: product.id, quantity: 2, price: product.price }],
    });

    fbEvent("Purchase", {
      content_ids: [product.id],
      content_name: product.name,
      value: OFFER_PRICE,
      currency: "MAD",
    });

    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-950 via-emerald-950/20 to-primary-950 pt-24 pb-16">
        <div className="absolute inset-0 bg-forest pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto text-center">
            {/* Success Animation */}
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-primary-500/20 rounded-full flex items-center justify-center border-2 border-emerald-500/30">
                <svg className="h-12 w-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">تم الطلب بنجاح! 🎉</h2>
            <p className="text-white/50 text-sm mb-8 leading-relaxed">شكراً لثقتك في إلزافيا. فريقنا سيتواصل معك قريباً لتأكيد الطلب وتحديد موعد التوصيل.</p>

            {/* Offer Summary Card */}
            <div className="bg-gradient-to-br from-gold-500/10 via-primary-500/5 to-emerald-500/10 border-2 border-gold-500/20 rounded-2xl p-6 mb-6 text-center">
              <div className="text-3xl mb-3">🔥</div>
              <h3 className="text-lg font-extrabold text-white mb-4">ملخص عرضك</h3>
              <div className="space-y-3 text-right">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-xl">📦</span>
                  <div className="text-right">
                    <p className="text-white font-bold text-sm">{product.name}</p>
                    <p className="text-white/30 text-xs">الكمية: 2</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-xl">💰</span>
                  <div className="text-right">
                    <p className="text-gold-400 font-extrabold text-base">{formatPrice(OFFER_PRICE)}</p>
                    <p className="text-white/30 text-xs">وفرت {formatPrice(SAVINGS)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <span className="text-xl">🚚</span>
                  <div className="text-right">
                    <p className="text-emerald-400 font-bold text-sm">توصيل مجاني</p>
                    <p className="text-emerald-400/50 text-xs">24-48 ساعة</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-xl">💳</span>
                  <div className="text-right">
                    <p className="text-white font-bold text-sm">الدفع عند الاستلام</p>
                    <p className="text-white/30 text-xs">تأكد من استلام الطلب قبل الدفع</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 mb-8">
              <h4 className="text-white font-bold text-sm mb-3 text-center">الخطوات القادمة</h4>
              <div className="space-y-2">
                {[
                  { num: "١", text: "فريقنا سيَتصل بك خلال 24 ساعة", icon: "📞" },
                  { num: "٢", text: "تأكيد العنوان وموعد التوصيل", icon: "📍" },
                  { num: "٣", text: "استلام الطلب والدفع عند الاستلام", icon: "🚚" },
                ].map((step) => (
                  <div key={step.num} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02]">
                    <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 font-extrabold text-xs flex-shrink-0">{step.num}</div>
                    <span className="text-white/70 text-sm">{step.text}</span>
                    <span className="mr-auto text-lg">{step.icon}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => router.push("/shop")} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 border border-white/10">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              العودة للتسوق
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-950 via-primary-950 to-primary-900 pt-20 md:pt-24 pb-28 md:pb-16">
      <div className="absolute inset-0 bg-forest pointer-events-none" />

      {/* Floating Discount Badge */}
      <div className="fixed top-24 md:top-28 left-2 md:left-4 z-40 animate-float">
        <div className="bg-gradient-to-br from-amber-500 via-gold-500 to-amber-600 text-surface-900 rounded-2xl p-2.5 md:p-3.5 shadow-2xl shadow-gold-500/40 text-center border-2 border-gold-400/30 relative overflow-hidden">
          <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          <div className="relative">
            <div className="text-base md:text-xl font-black tracking-tight leading-none">-37%</div>
            <div className="text-[8px] md:text-[10px] font-bold opacity-80 mt-0.5">وفر {formatPrice(SAVINGS)}</div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-primary-950/95 backdrop-blur-xl border-t border-white/10 p-3 shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-shrink-0">
            <p className="text-white/40 text-[9px]">عرض خاص - منتجان</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-white font-extrabold text-lg">{formatPrice(OFFER_PRICE)}</span>
              <span className="text-white/20 text-xs line-through">{formatPrice(ORIGINAL_VALUE)}</span>
            </div>
          </div>
          <a href="#order-form" className="flex-1 py-3.5 px-4 rounded-2xl font-extrabold text-sm transition-all duration-200 active:scale-[0.95] bg-gradient-to-r from-gold-500 to-amber-500 text-surface-900 shadow-xl shadow-gold-500/30 hover:shadow-2xl hover:shadow-gold-500/40 hover:from-gold-400 hover:to-amber-400 animate-pulse-gold text-center block">
            🎁 اطلب الآن
          </a>
        </div>
      </div>

      {/* ============ HERO ============ */}
      <section className="relative pt-2 md:pt-6 pb-6 md:pb-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">

            {/* Image Gallery */}
            <div className="order-2 md:order-1">
              <div
                className="aspect-square rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-12 flex items-center justify-center mb-3 cursor-zoom-in group relative overflow-hidden"
                onClick={() => setLightboxOpen(true)}
              >
                <img src={images[selectedImage].src} alt={images[selectedImage].alt} className="w-full h-full object-contain drop-shadow-2xl transition-all duration-500 group-hover:scale-105" />
                <div className="absolute top-4 -left-2 z-20">
                  <div className="bg-gradient-to-r from-amber-500 to-gold-500 text-surface-900 text-sm md:text-base font-black px-4 py-1.5 rounded-r-xl shadow-xl shadow-gold-500/30 relative">
                    وفر {formatPrice(SAVINGS)}
                    <div className="absolute -bottom-2 left-0 w-0 h-0 border-t-[8px] border-t-amber-700 border-l-[8px] border-l-transparent" />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 flex-shrink-0 overflow-hidden transition-all duration-200 ${
                      selectedImage === i ? "border-gold-500 shadow-md shadow-gold-500/20" : "border-white/10 opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img src={img.src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-1.5 bg-gold-500/20 border border-gold-500/30 text-gold-400 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full mb-3">
                <span>🔥</span> عرض خاص: اشتري 2 بـ {formatPrice(OFFER_PRICE)}
              </div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-tight">
                {product.name}
              </h1>
              <p className="text-white/50 text-sm md:text-base leading-relaxed mb-4 line-clamp-2 md:line-clamp-none">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex flex-wrap items-baseline gap-2 mb-2">
                <span className="text-3xl md:text-4xl font-extrabold text-gold-400">{formatPrice(OFFER_PRICE)}</span>
                <span className="text-white/20 line-through text-sm">{formatPrice(ORIGINAL_VALUE)}</span>
                <span className="bg-emerald-500/15 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-full">وفر {formatPrice(SAVINGS)}</span>
              </div>
              <p className="text-white/40 text-xs mb-2">منتجان بسعر مخفض — الدفع عند الاستلام</p>

              {/* Countdown */}
              <div className="mb-3">
                <CountdownTimer />
              </div>

              {/* Offer Banner */}
              <div className="mb-4 md:mb-5 p-3 md:p-4 rounded-2xl bg-gradient-to-r from-gold-500/15 via-gold-500/5 to-gold-500/15 border border-gold-500/20">
                <div className="flex items-center justify-center gap-4 md:gap-6">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg md:text-xl">🔥</span>
                    <span className="text-gold-400 font-extrabold text-sm md:text-base">اشتري 2 بـ {formatPrice(OFFER_PRICE)}</span>
                  </div>
                  <div className="w-px h-6 bg-gold-500/20" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg md:text-xl">🚚</span>
                    <span className="text-emerald-400 font-extrabold text-sm md:text-base">توصيل مجاني</span>
                  </div>
                </div>
              </div>

              {/* FOMO Counter */}
              <div className="text-center mb-3">
                <span className="text-white/50 text-xs">🔥 <span className="text-gold-400 font-bold">{orderCount}</span> شخص اشتروا هذا المنتج اليوم</span>
              </div>

              <a href="#order-form"
                className="hidden md:flex w-full py-4 rounded-2xl font-extrabold text-base md:text-lg transition-all duration-200 active:scale-[0.97] bg-gradient-to-r from-gold-500 to-amber-500 text-surface-900 hover:from-gold-400 hover:to-amber-400 shadow-xl shadow-gold-500/30 hover:shadow-2xl hover:shadow-gold-500/40 items-center justify-center gap-2 animate-pulse-gold"
              >
                🎁 استفد من العرض الآن
              </a>
              <p className="hidden md:block text-white/25 text-xs mt-2 text-center">🔒 الدفع عند الاستلام — توصيل مجاني</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ORDER FORM ============ */}
      <div id="order-form">
        <RevealOnScroll delay={100}>
          <section className="relative py-10 md:py-16 bg-gradient-to-b from-primary-950 via-primary-900/30 to-primary-950">
            <div className="container mx-auto px-4">
              <div className="max-w-lg mx-auto">
                <div className="text-center mb-8">
                  <span className="inline-block text-sm font-bold text-primary-300 bg-primary-500/10 backdrop-blur-md border border-primary-500/20 px-4 py-1.5 rounded-full mb-4">
                    الطلب الآن
                  </span>
                  <h2 className="text-2xl md:text-4xl font-extrabold text-white">
                    اشتري 2 بـ <span className="text-gold-400">{formatPrice(OFFER_PRICE)}</span>
                  </h2>
                  <p className="text-white/40 text-sm mt-2">املأ المعلومات وسنتصل بك لتأكيد الطلب</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/10 to-emerald-500/10 flex items-center justify-center border border-white/10 overflow-hidden flex-shrink-0">
                      <img src={product.images[0]} alt={product.name} className="w-3/4 h-3/4 object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm">{product.name} <span className="text-white/40">× 2</span></p>
                      <p className="text-gold-400 font-extrabold text-base">{formatPrice(OFFER_PRICE)}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <input type="text" value={form.name}
                        onChange={(e) => { setForm({ ...form, name: e.target.value }); if (touched.name) setErrors({ ...errors, name: validateName(e.target.value) }); }}
                        onBlur={() => { setTouched({ ...touched, name: true }); setErrors({ ...errors, name: validateName(form.name) }); }}
                        placeholder="الاسم الكامل" autoComplete="name"
                        className={`w-full text-sm bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 transition-all ${errors.name && touched.name ? "border-red-400/50 focus:border-red-400 focus:ring-red-400/20" : "border-white/10 focus:border-gold-500/50 focus:ring-gold-500/20"}`} />
                      {errors.name && touched.name && <p className="text-red-400 text-xs mt-1 mr-1">{errors.name}</p>}
                    </div>
                    <div>
                      <input type="tel" value={form.phone}
                        onChange={(e) => { setForm({ ...form, phone: e.target.value }); if (touched.phone) setErrors({ ...errors, phone: validatePhone(e.target.value) }); }}
                        onBlur={() => { setTouched({ ...touched, phone: true }); setErrors({ ...errors, phone: validatePhone(form.phone) }); }}
                        placeholder="رقم الهاتف" autoComplete="tel" inputMode="numeric"
                        className={`w-full text-sm bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 transition-all ${errors.phone && touched.phone ? "border-red-400/50 focus:border-red-400 focus:ring-red-400/20" : "border-white/10 focus:border-gold-500/50 focus:ring-gold-500/20"}`} />
                      {errors.phone && touched.phone && <p className="text-red-400 text-xs mt-1 mr-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <textarea value={form.address}
                        onChange={(e) => { setForm({ ...form, address: e.target.value }); if (touched.address) setErrors({ ...errors, address: validateAddress(e.target.value) }); }}
                        onBlur={() => { setTouched({ ...touched, address: true }); setErrors({ ...errors, address: validateAddress(form.address) }); }}
                        placeholder="العنوان كاملاً" rows={3} autoComplete="street-address"
                        className={`w-full text-sm bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 transition-all ${errors.address && touched.address ? "border-red-400/50 focus:border-red-400 focus:ring-red-400/20" : "border-white/10 focus:border-gold-500/50 focus:ring-gold-500/20"}`} />
                      {errors.address && touched.address && <p className="text-red-400 text-xs mt-1 mr-1">{errors.address}</p>}
                    </div>
                    <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="ملاحظات (اختياري)" rows={2}
                      className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all" />

                    {/* Payment Icons + Price */}
                    <div className="bg-gold-500/10 border border-gold-500/20 rounded-xl p-4 text-center">
                      <p className="text-gold-400 font-extrabold text-lg">{formatPrice(OFFER_PRICE)}</p>
                      <p className="text-gold-400/60 text-xs">المجموع (شامل التوصيل المجاني)</p>
                      <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-gold-500/10">
                        <span className="text-white/30 text-[10px] font-medium">نقبل</span>
                        <svg className="w-8 h-5 text-white/40" viewBox="0 0 48 32" fill="none"><rect x="0.5" y="0.5" width="47" height="31" rx="3.5" stroke="currentColor" strokeOpacity="0.2"/><path d="M17 10h4l-3 12h-4l3-12zm7 0h3.5l2.5 12h-3.5l-2.5-12zm-12 0h4l-1.5 12h-4L12 10z" fill="currentColor" fillOpacity="0.5"/><circle cx="36" cy="16" r="5" fill="currentColor" fillOpacity="0.3"/></svg>
                        <svg className="w-8 h-5 text-white/40" viewBox="0 0 48 32" fill="none"><rect x="0.5" y="0.5" width="47" height="31" rx="3.5" stroke="currentColor" strokeOpacity="0.2"/><circle cx="19" cy="16" r="7" fill="currentColor" fillOpacity="0.3"/><circle cx="29" cy="16" r="7" fill="currentColor" fillOpacity="0.2"/></svg>
                        <span className="text-white/30 text-[10px] font-medium px-2 py-0.5 rounded border border-white/10">💵 نقداً</span>
                      </div>
                    </div>

                    <button onClick={placeOrder} disabled={submitting}
                      className="w-full py-4 rounded-2xl font-extrabold text-base transition-all duration-200 active:scale-[0.97] bg-gradient-to-r from-gold-500 to-amber-500 text-surface-900 hover:from-gold-400 hover:to-amber-400 shadow-xl shadow-gold-500/30 hover:shadow-2xl hover:shadow-gold-500/40 animate-pulse-gold disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-none"
                    >
                      {submitting ? "جاري إرسال الطلب..." : "🔥 اطلب الان"}
                    </button>

                    <div className="relative flex items-center gap-3 py-1">
                      <div className="flex-1 h-px bg-white/10" />
                      <span className="text-white/30 text-xs">أو عبر واتساب</span>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* One-Click WhatsApp Button */}
                    <button onClick={() => {
                      window.open(`https://wa.me/+21267702771?text=${encodeURIComponent("مرحبا، أريد طلب الكبسولات الذهبية للطاقة (2 قطع) بسعر 249 درهم مع توصيل مجاني")}`, "_blank");
                    }}
                      className="w-full py-3.5 rounded-xl font-extrabold text-sm transition-all duration-200 active:scale-[0.97] bg-emerald-500/15 text-emerald-400 border-2 border-emerald-500/30 hover:bg-emerald-500/25 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                      طلب سريع عبر واتساب
                      <span className="text-[9px] text-emerald-400/50">بدون تعبئة النموذج</span>
                    </button>

                    <p className="text-center text-white/25 text-xs">🚚 توصيل مجاني — 💳 الدفع عند الاستلام</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </RevealOnScroll>
      </div>

      {/* ============ TRUST BAR ============ */}
      <RevealOnScroll>
        <section className="relative py-6 border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
              {[
                { icon: "🚚", title: "توصيل مجاني", desc: "24-48 ساعة" },
                { icon: "💳", title: "الدفع عند الاستلام", desc: "آمن ومريح" },
                { icon: "🌿", title: "طبيعي 100%", desc: "مكونات طبيعية" },
                { icon: "⭐", title: "جودة مضمونة", desc: "منتج أصلي" },
                { icon: "🛡️", title: "ضمان استرداد", desc: "غير راض؟ أموالك" },
              ].map((item) => (
                <div key={item.title} className="text-center p-3 md:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-xl md:text-2xl mb-1">{item.icon}</div>
                  <p className="text-white font-bold text-xs md:text-sm">{item.title}</p>
                  <p className="text-white/30 text-[10px] md:text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* ============ REVIEWS ============ */}
      <RevealOnScroll delay={100}>
        <section className="relative py-10 md:py-14 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-extrabold text-white">
                ماذا قال <span className="gradient-text">عملاؤنا</span>
              </h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="min-w-[280px] md:min-w-[320px] snap-start bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 flex-shrink-0">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <svg key={s} className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p>
                  <p className="text-white/40 text-xs font-bold">{t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* ============ BENEFITS ============ */}
      {product.benefits && product.benefits.length > 0 && (
        <RevealOnScroll delay={100}>
          <section className="relative py-10 md:py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-4xl font-extrabold text-white">
                  <span className="gradient-text">فوائد</span> {product.name.split(" ").slice(0, 2).join(" ")}
                </h2>
                <p className="text-white/40 text-sm mt-2">مكمل غذائي طبيعي متكامل</p>
              </div>
              <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
                {product.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/20 transition-all duration-300">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealOnScroll>
      )}

      {/* ============ INGREDIENTS ============ */}
      <RevealOnScroll delay={100}>
        <section className="relative py-10 md:py-16 bg-gradient-to-b from-primary-950 via-primary-900/30 to-primary-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-extrabold text-white">مكونات <span className="gradient-text">طبيعية</span></h2>
              <p className="text-white/40 text-sm mt-2">تركيبة متوازنة من أفضل المكونات</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center max-w-4xl mx-auto">
              <div className="space-y-2">
                {product.ingredients?.map((ing) => (
                  <div key={ing} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-white/70 text-sm">{ing}</span>
                  </div>
                ))}
              </div>
              <div className="aspect-square rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-10 flex items-center justify-center">
                <img src="/images/landing page/ingredients.jpg" alt="المكونات الطبيعية" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* ============ WHY ELZAVIA ============ */}
      <RevealOnScroll delay={100}>
        <section className="relative py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-extrabold text-white">لماذا <span className="gradient-text">إلزافيا</span>؟</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center max-w-4xl mx-auto">
              <div className="aspect-square rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-10 flex items-center justify-center order-2 md:order-1">
                <img src="/images/landing page/trust.jpg" alt="الثقة والجودة" className="w-full h-full object-contain" />
              </div>
              <div className="space-y-3 order-1 md:order-2">
                {[
                  { icon: "🌿", title: "منتجات طبيعية 100%", desc: "مكونات طبيعية وآمنة للاستخدام اليومي" },
                  { icon: "✅", title: "جودة مضمونة", desc: "أعلى معايير الجودة والسلامة" },
                  { icon: "🚚", title: "توصيل مجاني", desc: "لجميع المدن المغربية" },
                  { icon: "💳", title: "الدفع عند الاستلام", desc: "تدفع بعد ما تستلم الطلب" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/20 transition-all duration-300">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-white font-bold text-sm">{item.title}</p>
                      <p className="text-white/40 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* ============ FAQ ============ */}
      <RevealOnScroll delay={100}>
        <section className="relative py-10 md:py-16 bg-gradient-to-b from-primary-950 via-primary-900/20 to-primary-950">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-extrabold text-white">الأسئلة <span className="gradient-text">الشائعة</span></h2>
            </div>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden transition-all duration-300">
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full text-right p-4 flex items-center justify-between gap-3">
                    <span className="text-white font-bold text-sm">{faq.q}</span>
                    <svg className={`w-4 h-4 text-white/40 flex-shrink-0 transition-transform duration-300 ${faqOpen === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {faqOpen === i && (
                    <div className="px-4 pb-4 animate-fade-in-up">
                      <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* ============ FINAL CTA ============ */}
      <RevealOnScroll delay={100}>
        <section className="relative py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center bg-gradient-to-br from-gold-500/10 via-primary-500/5 to-gold-500/10 border-2 border-gold-500/20 rounded-3xl p-8 md:p-12">
              <div className="text-4xl md:text-5xl mb-4">🔥</div>
              <h2 className="text-xl md:text-3xl font-extrabold text-white mb-2">العرض لفترة <span className="text-gold-400">محدودة</span></h2>
              <p className="text-white/50 text-sm mb-2">منتجان بسعر {formatPrice(OFFER_PRICE)} — وفر {formatPrice(SAVINGS)}</p>
              <p className="text-emerald-400 text-xs font-medium mb-6">🚚 توصيل مجاني — 💳 الدفع عند الاستلام</p>
              <a href="#order-form"
                className="w-full block py-4 rounded-2xl font-extrabold text-base md:text-lg transition-all duration-200 active:scale-[0.97] bg-gradient-to-r from-gold-500 to-amber-500 text-surface-900 hover:from-gold-400 hover:to-amber-400 shadow-xl shadow-gold-500/30 hover:shadow-2xl hover:shadow-gold-500/40 animate-pulse-gold"
              >
                🎁 اطلب الآن بسعر {formatPrice(OFFER_PRICE)}
              </a>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setLightboxOpen(false)}>
          <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img src={images[selectedImage].src} alt={product.name} className="max-w-full max-h-[90vh] object-contain animate-fade-in-up" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* Live Notifications */}
      {liveNotif && (
        <div className="fixed bottom-20 md:bottom-6 right-2 md:right-4 z-50 max-w-[280px] animate-fade-in-up">
          <div className="bg-white/10 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-3 shadow-2xl shadow-black/40">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-bold truncate">{liveNotif.name} من {liveNotif.city}</p>
                <p className="text-emerald-400/70 text-[10px]">طلب {liveNotif.time}</p>
              </div>
              <button onClick={() => setLiveNotif(null)} className="text-white/20 hover:text-white/50 transition-colors p-0.5">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
