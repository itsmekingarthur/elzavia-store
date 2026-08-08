"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getOrdersStorageKey, getMessagesStorageKey } from "@/lib/utils";
import OrdersTab from "@/components/account/OrdersTab";
import MessagesTab from "@/components/account/MessagesTab";
import CartTab from "@/components/account/CartTab";
import OffersTab from "@/components/account/OffersTab";
import ProfileTab from "@/components/account/ProfileTab";

type TabKey = "orders" | "messages" | "cart" | "profile" | "offers";

export default function AccountPage() {
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>("orders");
  const [localOrders, setLocalOrders] = useState<any[]>([]);
  const [localMessages, setLocalMessages] = useState<any[]>([]);
  const [localCart, setLocalCart] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const userId = user.id;

    const localOrders: any[] = JSON.parse(localStorage.getItem(getOrdersStorageKey(userId)) || "[]");
    const localMsgs: any[] = JSON.parse(localStorage.getItem(getMessagesStorageKey(userId)) || "[]");

    const fetchOrders = () => {
      fetch(`/api/orders?user_id=${encodeURIComponent(userId)}`)
        .then((r) => (r.ok ? r.json() : []))
        .then((apiOrders: any[]) => {
          const merged = [...apiOrders];
          const seen = new Map(apiOrders.map((o: any) => [o.id, true]));
          for (const local of localOrders) {
            if (seen.has(local.id)) {
              const idx = merged.findIndex((o: any) => o.id === local.id);
              if (idx !== -1) {
                const localExtra: any = {};
                for (const key of Object.keys(local)) {
                  if (merged[idx][key] === undefined) localExtra[key] = local[key];
                }
                merged[idx] = { ...merged[idx], ...localExtra };
              }
            }
          }
          setLocalOrders(merged);
        })
        .catch(() => setLocalOrders(localOrders));
    };

    const fetchMessages = () => {
      fetch(`/api/messages?user_id=${encodeURIComponent(userId)}`)
        .then((r) => (r.ok ? r.json() : []))
        .then((apiMsgs: any[]) => {
          const merged = [...apiMsgs];
          const seenDates = new Map(apiMsgs.map((m: any) => [m.date, true]));
          for (const local of localMsgs) {
            if (seenDates.has(local.date)) {
              const idx = merged.findIndex((m: any) => m.date === local.date);
              if (idx !== -1) merged[idx] = { ...merged[idx], ...local };
            }
          }
          setLocalMessages(merged);
        })
        .catch(() => setLocalMessages(localMsgs));
    };

    fetchOrders();
    fetchMessages();

    const interval = setInterval(() => {
      fetchOrders();
      fetchMessages();
    }, 30000);

    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const userId = user.id;
    try {
      const cart = JSON.parse(localStorage.getItem("elzavia-cart") || "[]");
      setLocalCart(cart);
    } catch {}
    fetch("/api/products").then((r) => r.ok && r.json()).then(setProducts).catch(() => {});
    const savedPoints = parseInt(localStorage.getItem(`elzavia-points-${userId}`) || "0", 10);
    setPoints(savedPoints);
  }, [user]);

  useEffect(() => {
    if (profile && (profile as any).points !== undefined) {
      setPoints((profile as any).points || 0);
      if (user) localStorage.setItem(`elzavia-points-${user.id}`, String((profile as any).points || 0));
    }
  }, [profile, user]);

  if (loading) return null;
  if (!user) return null;

  const tabs: { key: TabKey; label: string; icon: string; count?: number }[] = [
    { key: "orders", label: "الطلبات", icon: "📦", count: localOrders.length },
    { key: "messages", label: "الرسائل", icon: "✉️", count: localMessages.length },
    { key: "cart", label: "السلة", icon: "🛒", count: localCart.length },
    { key: "offers", label: "العروض", icon: "🎁" },
    { key: "profile", label: "الملف الشخصي", icon: "👤" },
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

        <div className="bg-gradient-to-r from-gold-500/10 to-primary-500/10 border border-gold-500/20 rounded-xl p-4 mb-6 flex items-center gap-3">
          <span className="text-2xl">⭐</span>
          <div className="flex-1">
            <p className="text-white font-bold">لديك {points} {points === 0 ? "نقطة — اكسب 50 نقطة عن كل منتج في طلبك عند التوصيل" : "نقطة"}</p>
            <p className="text-white/50 text-xs mt-0.5">كل 100 نقطة = 25 درهم خصم. استخدم النقاط عند إتمام الطلب</p>
            <Link href="/shop" className="inline-block mt-2 bg-gold-500/20 hover:bg-gold-500/30 text-gold-400 text-xs font-bold px-4 py-1.5 rounded-lg transition-colors">
              🛒 {points >= 100 ? "استخدام النقاط في الشراء" : "تصفح المنتجات"}
            </Link>
          </div>
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
              <div className="border-t border-white/10 my-2" />
              <Link
                href="/shop"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
              >
                <span className="text-lg">🏪</span>
                <span>العودة للقائمة الرئيسية</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 min-h-[500px]">
              {tab === "orders" && <OrdersTab orders={localOrders} />}
              {tab === "messages" && <MessagesTab messages={localMessages} />}
              {tab === "cart" && <CartTab cart={localCart} getProductName={getProductName} />}
              {tab === "offers" && <OffersTab />}
              {tab === "profile" && <ProfileTab user={user} profile={profile} points={points} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
