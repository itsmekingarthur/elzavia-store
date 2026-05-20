"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

const timelineSteps = [
  { key: "قيد التجهيز", label: "قيد التجهيز", icon: "⏳", desc: "تم استلام طلبك وبدأ تجهيزه" },
  { key: "تم الشحن", label: "تم الشحن", icon: "📦", desc: "تم شحن طلبك وهو في الطريق إليك" },
  { key: "تم التوصيل", label: "تم التوصيل", icon: "✅", desc: "تم توصيل طلبك بنجاح" },
];

function OrderTimeline({ status, shippedAt, deliveredAt, createdAt }: any) {
  const statusIndex = timelineSteps.findIndex((s) => s.key === status);
  return (
    <div className="flex items-start gap-1 mt-3 pt-3 border-t border-white/10">
      {timelineSteps.map((step, i) => {
        const done = i <= statusIndex;
        const current = i === statusIndex;
        const date = i === 0 ? createdAt : i === 1 ? shippedAt : deliveredAt;
        return (
          <div key={step.key} className="flex-1 text-center relative">
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm mb-1 transition-all ${
              done ? "bg-primary-500/20 text-primary-400" : "bg-white/5 text-white/30"
            } ${current ? "ring-2 ring-primary-500/40 scale-110" : ""}`}>
              {step.icon}
            </div>
            <div className={`h-0.5 absolute top-4 -left-1/2 w-full ${i > 0 && done ? "bg-primary-500/30" : i > 0 ? "bg-white/10" : ""}`} style={{ display: i === 0 ? "none" : undefined }} />
            <p className={`text-[10px] font-bold ${done ? "text-primary-300" : "text-white/30"}`}>{step.label}</p>
            {date && <p className="text-[9px] text-white/30 mt-0.5">{new Date(date).toLocaleDateString("ar-MA")}</p>}
          </div>
        );
      })}
    </div>
  );
}

export default function AccountPage() {
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<"orders" | "messages" | "cart" | "profile">("orders");
  const [localOrders, setLocalOrders] = useState<any[]>([]);
  const [localMessages, setLocalMessages] = useState<any[]>([]);
  const [localCart, setLocalCart] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [points, setPoints] = useState(0);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [user, loading, router]);

  useEffect(() => {
    try {
      const orders = JSON.parse(localStorage.getItem("elzavia-orders") || "[]");
      setLocalOrders(orders);
    } catch {}
    try {
      const msgs = JSON.parse(localStorage.getItem("elzavia-messages") || "[]");
      setLocalMessages(msgs);
    } catch {}
    try {
      const cart = JSON.parse(localStorage.getItem("elzavia-cart") || "[]");
      setLocalCart(cart);
    } catch {}
    fetch("/api/products").then(r => r.ok && r.json()).then(setProducts).catch(() => {});

    const savedPoints = parseInt(localStorage.getItem(`elzavia-points-${user?.id}`) || "0", 10);
    setPoints(savedPoints);
  }, []);

  useEffect(() => {
    if (profile && (profile as any).points !== undefined) {
      setPoints((profile as any).points || 0);
      if (user) localStorage.setItem(`elzavia-points-${user.id}`, String((profile as any).points || 0));
    }
  }, [profile, user]);

  if (loading) return null;
  if (!user) return null;

  const tabs = [
    { key: "orders" as const, label: "الطلبات", icon: "📦", count: localOrders.length },
    { key: "messages" as const, label: "الرسائل", icon: "✉️", count: localMessages.length },
    { key: "cart" as const, label: "السلة", icon: "🛒", count: localCart.length },
    { key: "profile" as const, label: "الملف الشخصي", icon: "👤" },
  ];

  const getProductName = (productId: string) => {
    const p = products.find((pr) => pr.id === productId);
    return p?.name || "منتج";
  };

  return (
    <div className="min-h-screen bg-primary-950">
      <div className="absolute inset-0 bg-forest" />
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">مرحباً، {profile?.username || user.email?.split("@")[0]}</h1>
            <p className="text-white/50 text-sm mt-1">{user.email}</p>
          </div>
          <button onClick={signOut} className="text-white/50 hover:text-red-400 text-sm font-medium transition-colors px-4 py-2 rounded-lg border border-white/10 hover:border-red-500/30">
            تسجيل الخروج
          </button>
        </div>

        {points > 0 && (
          <div className="bg-gradient-to-r from-gold-500/10 to-primary-500/10 border border-gold-500/20 rounded-xl p-4 mb-6 flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="text-white font-bold">لديك {points} نقطة</p>
              <p className="text-white/50 text-xs mt-0.5">اكسب 50 نقطة عن كل طلب يتم توصيله. استخدم النقاط للحصول على خصومات قريباً</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-2 space-y-1">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    tab === t.key
                      ? "bg-primary-500/15 text-primary-300 border border-primary-500/20"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="text-lg">{t.icon}</span>
                  <span>{t.label}</span>
                  {"count" in t && t.count != null && t.count > 0 && (
                    <span className="mr-auto bg-white/10 text-white/70 text-xs px-2 py-0.5 rounded-full">{t.count}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 min-h-[400px]">
              {tab === "orders" && (
                <div>
                  <h2 className="text-lg font-bold text-white mb-4">طلباتي</h2>
                  {localOrders.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-white/40 mb-4">لا توجد طلبات بعد</p>
                      <Link href="/shop" className="btn-nature text-sm">تصفح المنتجات</Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {[...localOrders].reverse().map((order, i) => (
                        <div key={i}>
                          <button
                            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                            className="w-full text-right bg-white/5 border border-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-primary-400 font-mono text-sm font-bold" dir="ltr">{order.id}</span>
                              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                order.status === "قيد التجهيز" ? "bg-gold-500/15 text-gold-400" :
                                order.status === "تم الشحن" ? "bg-blue-500/15 text-blue-400" :
                                order.status === "تم التوصيل" ? "bg-emerald-500/15 text-emerald-400" :
                                "bg-white/10 text-white/60"
                              }`}>{order.status}</span>
                            </div>
                            <div className="text-white/70 text-sm mb-2">
                              {order.items?.map((item: any, j: number) => (
                                <span key={j}>{item.name} ×{item.quantity}{j < order.items.length - 1 ? ", " : ""}</span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-white/50">{new Date(order.createdAt).toLocaleDateString("ar-MA")}</span>
                              <span className="text-primary-400 font-bold">{formatPrice(order.total)}</span>
                            </div>
                          </button>
                          {expandedOrder === order.id && (
                            <div className="bg-white/5 border-x border-b border-white/5 rounded-b-lg px-4 pb-4 -mt-2">
                              <OrderTimeline
                                status={order.status}
                                shippedAt={order.shippedAt}
                                deliveredAt={order.deliveredAt}
                                createdAt={order.createdAt}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === "messages" && (
                <div>
                  <h2 className="text-lg font-bold text-white mb-4">الرسائل التي أرسلتها</h2>
                  {localMessages.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-white/40 mb-4">لم ترسل أي رسالة بعد</p>
                      <Link href="/contact" className="btn-nature text-sm">اتصل بنا</Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {[...localMessages].reverse().map((msg, i) => (
                        <div key={i} className="bg-white/5 border border-white/5 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium">{msg.name}</span>
                            <span className="text-white/40 text-xs">{new Date(msg.date).toLocaleDateString("ar-MA")}</span>
                          </div>
                          <p className="text-white/60 text-sm leading-relaxed mb-3">{msg.message}</p>
                          {msg.admin_reply && (
                            <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-lg p-3">
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="text-xs font-bold text-emerald-400">ELZAVIA</span>
                                <span className="text-[10px] text-emerald-500/40">— رد الإدارة</span>
                              </div>
                              <p className="text-sm text-emerald-300/80 leading-relaxed">{msg.admin_reply}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === "cart" && (
                <div>
                  <h2 className="text-lg font-bold text-white mb-4">السلة المحفوظة</h2>
                  {localCart.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-white/40 mb-4">السلة فارغة</p>
                      <Link href="/shop" className="btn-nature text-sm">تصفح المنتجات</Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {localCart.map((item, i) => (
                        <div key={i} className="flex items-center justify-between bg-white/5 border border-white/5 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <span className="text-white/70">{getProductName(item.productId)}</span>
                            {item.dealLabel && (
                              <span className="text-emerald-400 text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full">{item.dealLabel}</span>
                            )}
                          </div>
                          <span className="text-white/50 text-sm">الكمية: {item.quantity}</span>
                        </div>
                      ))}
                      <Link href="/cart" className="btn-nature text-sm inline-flex items-center gap-2 mt-4">
                        الذهاب إلى السلة
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {tab === "profile" && (
                <div>
                  <h2 className="text-lg font-bold text-white mb-4">الملف الشخصي</h2>
                  <div className="space-y-4 max-w-sm">
                    <div>
                      <label className="block text-white/50 text-xs font-medium mb-1">اسم المستخدم</label>
                      <p className="text-white font-medium">{profile?.username || "—"}</p>
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs font-medium mb-1">البريد الإلكتروني</label>
                      <p className="text-white font-medium">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs font-medium mb-1">النقاط</label>
                      <p className="text-gold-400 font-bold">{points} نقطة</p>
                      <p className="text-white/40 text-xs mt-0.5">احصل على 50 نقطة عن كل طلب يتم توصيله</p>
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs font-medium mb-1">تاريخ الإنشاء</label>
                      <p className="text-white/70 text-sm">{user.created_at ? new Date(user.created_at).toLocaleDateString("ar-MA") : "—"}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
