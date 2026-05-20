"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function AccountPage() {
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<"orders" | "messages" | "cart" | "profile">("orders");
  const [localOrders, setLocalOrders] = useState<any[]>([]);
  const [localMessages, setLocalMessages] = useState<any[]>([]);
  const [localCart, setLocalCart] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

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
  }, []);

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
                      {localOrders.map((order, i) => (
                        <div key={i} className="bg-white/5 border border-white/5 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-primary-400 font-mono text-sm font-bold" dir="ltr">{order.id}</span>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                              order.status === "قيد التجهيز" ? "bg-gold-500/15 text-gold-400" :
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
                          <p className="text-white/60 text-sm leading-relaxed">{msg.message}</p>
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
