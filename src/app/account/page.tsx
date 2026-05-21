"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice, getOrdersStorageKey, getMessagesStorageKey } from "@/lib/utils";

const timelineSteps = [
  { key: "قيد التجهيز", label: "قيد التجهيز", icon: "⏳", desc: "تم استلام طلبك وبدأ تجهيزه" },
  { key: "تم الشحن", label: "تم الشحن", icon: "📦", desc: "تم شحن طلبك وهو في الطريق إليك" },
  { key: "تم التوصيل", label: "تم التوصيل", icon: "✅", desc: "تم توصيل طلبك بنجاح" },
];

function OrderTimeline({ status, shippedAt, deliveredAt, createdAt }: any) {
  const statusIndex = timelineSteps.findIndex((s) => s.key === status);
  return (
    <div className="mt-3 pt-3 border-t border-white/10">
      <div className="flex items-center justify-center" dir="ltr">
        {timelineSteps.map((step, i) => {
          const done = i <= statusIndex;
          const current = i === statusIndex;
          const date = i === 0 ? createdAt : i === 1 ? shippedAt : deliveredAt;
          return (
            <div key={step.key} className="flex items-center">
              {i > 0 && (
                <div className={`w-8 md:w-12 h-0.5 mx-1 ${done ? "bg-primary-500/40" : "bg-white/10"}`} />
              )}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                  done ? "bg-primary-500/20 text-primary-400" : "bg-white/5 text-white/30"
                } ${current ? "ring-2 ring-primary-500/40 scale-110" : ""}`}>
                  {step.icon}
                </div>
                <p className={`text-[10px] font-bold mt-1 whitespace-nowrap ${done ? "text-primary-300" : "text-white/30"}`}>{step.label}</p>
                {date && <p className="text-[9px] text-white/30">{new Date(date).toLocaleDateString("ar-MA")}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MessageThread({ msg }: { msg: any }) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [sentReply, setSentReply] = useState(msg.user_reply || "");

  const handleReply = async () => {
    if (!replyText.trim()) return;
    try {
      await fetch("/api/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: msg.date, user_reply: replyText.trim() }),
      });
    } catch {}
    setSentReply(replyText.trim());
    setReplyText("");
    setReplyOpen(false);
  };

  return (
    <div className="bg-white/5 border border-white/5 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-medium">{msg.name}</span>
        <span className="text-white/40 text-xs">{new Date(msg.date).toLocaleDateString("ar-MA")}</span>
      </div>
      <p className="text-white/60 text-sm leading-relaxed mb-3">{msg.message}</p>

      {msg.admin_reply && (
        <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs font-bold text-emerald-400">ELZAVIA</span>
            <span className="text-[10px] text-emerald-500/40">— رد الإدارة</span>
          </div>
          <p className="text-sm text-emerald-300/80 leading-relaxed">{msg.admin_reply}</p>
        </div>
      )}

      {sentReply && (
        <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs font-bold text-primary-400">ردك</span>
          </div>
          <p className="text-sm text-primary-300/80 leading-relaxed">{sentReply}</p>
        </div>
      )}

      {msg.admin_reply && !sentReply && !replyOpen && (
        <button
          onClick={() => setReplyOpen(true)}
          className="text-xs text-primary-400 hover:text-primary-300 font-medium transition-colors"
        >
          ✏️ رد على ELZAVIA
        </button>
      )}

      {replyOpen && (
        <div className="mt-3">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="اكتب ردك هنا..."
            rows={2}
            className="w-full text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/40 transition-colors"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleReply}
              disabled={!replyText.trim()}
              className="bg-primary-600 hover:bg-primary-500 text-white text-xs px-4 py-1.5 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              إرسال
            </button>
            <button
              onClick={() => setReplyOpen(false)}
              className="text-white/40 hover:text-white/60 text-xs px-3 py-1.5 rounded-lg transition-colors"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AccountPage() {
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<"orders" | "messages" | "cart" | "profile" | "offers">("orders");
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
    if (!user) return;
    const userId = user.id;

    const localOrders: any[] = JSON.parse(localStorage.getItem(getOrdersStorageKey(userId)) || "[]");
    const localMsgs: any[] = JSON.parse(localStorage.getItem(getMessagesStorageKey(userId)) || "[]");

    fetch(`/api/orders?user_id=${encodeURIComponent(userId)}`)
      .then(r => r.ok ? r.json() : [])
      .then((apiOrders: any[]) => {
        const merged = [...apiOrders];
        const seen = new Map(apiOrders.map((o: any) => [o.id, true]));
        for (const local of localOrders) {
          if (seen.has(local.id)) {
            const idx = merged.findIndex((o: any) => o.id === local.id);
            if (idx !== -1) merged[idx] = { ...merged[idx], ...local };
          } else {
            merged.push(local);
          }
        }
        setLocalOrders(merged);
      })
      .catch(() => setLocalOrders(localOrders));

    fetch(`/api/messages?user_id=${encodeURIComponent(userId)}`)
      .then(r => r.ok ? r.json() : [])
      .then((apiMsgs: any[]) => {
        const merged = [...apiMsgs];
        const seenDates = new Map(apiMsgs.map((m: any) => [m.date, true]));
        for (const local of localMsgs) {
          if (seenDates.has(local.date)) {
            const idx = merged.findIndex((m: any) => m.date === local.date);
            if (idx !== -1) merged[idx] = { ...merged[idx], ...local };
          } else {
            merged.push(local);
          }
        }
        setLocalMessages(merged);
      })
      .catch(() => setLocalMessages(localMsgs));

    try {
      const cart = JSON.parse(localStorage.getItem("elzavia-cart") || "[]");
      setLocalCart(cart);
    } catch {}
    fetch("/api/products").then(r => r.ok && r.json()).then(setProducts).catch(() => {});

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

  const tabs = [
    { key: "orders" as const, label: "الطلبات", icon: "📦", count: localOrders.length },
    { key: "messages" as const, label: "الرسائل", icon: "✉️", count: localMessages.length },
    { key: "cart" as const, label: "السلة", icon: "🛒", count: localCart.length },
    { key: "offers" as const, label: "العروض", icon: "🎁" },
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
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-white/50">{new Date(order.createdAt).toLocaleDateString("ar-MA")}</span>
                              {order.offerB2G1 && <span className="text-gold-400 text-[10px]">🎁 2+1</span>}
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
                        <MessageThread key={i} msg={msg} />
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

              {tab === "offers" && (
                <div>
                  <h2 className="text-lg font-bold text-white mb-4">العروض الخاصة</h2>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-emerald-500/10 to-primary-500/10 border border-emerald-500/20 rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-emerald-300 font-bold">توصيل مجاني لجميع الطلبات</p>
                          <p className="text-white/50 text-xs mt-1">استمتع بتوصيل مجاني بدون أي شروط. عرض دائم لجميع المستخدمين.</p>
                          <div className="flex items-center gap-1.5 mt-2 text-emerald-400/60 text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>مفعل تلقائياً</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-gold-500/10 to-primary-500/10 border border-gold-500/20 rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-gold-300 font-bold">اشتري 2 واحصل على الثالث مجاناً</p>
                          <p className="text-white/50 text-xs mt-1">أضف 3 منتجات إلى سلة التسوق وأقلهم سعراً مجاناً. العرض ساري على جميع المنتجات.</p>
                          <Link href="/shop?offer=b2g1" className="inline-flex items-center gap-1.5 mt-3 bg-gold-500 hover:bg-gold-600 text-surface-900 text-xs font-bold px-4 py-2 rounded-lg transition-all duration-300">
                            تصفح المنتجات والاستفادة من العرض
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
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
