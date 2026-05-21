"use client";

import { useState, useEffect, useCallback } from "react";
import { formatPrice } from "@/lib/utils";
import AnimatedNumber from "@/components/AnimatedNumber";

interface Order {
  id: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  discount: number;
  total: number;
  coupon: string;
  customer: { name: string; phone: string; address: string; notes: string };
  status: string;
  createdAt: string;
}

interface Message {
  name: string;
  email: string;
  message: string;
  date: string;
}

const statuses = [
  { key: "قيد التجهيز", icon: "⏳", color: "text-yellow-600", bg: "bg-yellow-50", bar: "#EAB308" },
  { key: "نحاول الاتصال بالرقم", icon: "📞", color: "text-amber-600", bg: "bg-amber-50", bar: "#F59E0B" },
  { key: "تم تأكيد الطلبية", icon: "✅", color: "text-emerald-600", bg: "bg-emerald-50", bar: "#10B981" },
  { key: "جاري التوصيل", icon: "📦", color: "text-blue-600", bg: "bg-blue-50", bar: "#3B82F6" },
  { key: "تم التوصيل", icon: "✅", color: "text-green-600", bg: "bg-green-50", bar: "#22C55E" },
  { key: "لا رد", icon: "📵", color: "text-orange-600", bg: "bg-orange-50", bar: "#F97316" },
  { key: "لم يستلم الطلبية", icon: "❌", color: "text-red-600", bg: "bg-red-50", bar: "#EF4444" },
  { key: "تم الارجاع", icon: "↩️", color: "text-purple-600", bg: "bg-purple-50", bar: "#A855F7" },
  { key: "تم الإلغاء", icon: "🚫", color: "text-gray-600", bg: "bg-gray-100", bar: "#6B7280" },
];

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const mergeOrders = useCallback((apiOrders: Order[]) => {
    const localOrders: Order[] = JSON.parse(localStorage.getItem("elzavia-orders") || "[]");
    const localMap = new Map(localOrders.map((o) => [o.id, o]));
    const seen = new Set<string>();

    const merged = apiOrders.map((apiOrder) => {
      seen.add(apiOrder.id);
      const local = localMap.get(apiOrder.id);
      if (local) {
        const extra: any = {};
        for (const key of Object.keys(local)) {
          if ((apiOrder as any)[key] === undefined) extra[key] = (local as any)[key];
        }
        return { ...apiOrder, ...extra };
      }
      return apiOrder;
    });

    for (const local of localOrders) {
      if (!seen.has(local.id)) merged.push(local);
    }

    setOrders(merged);
    localStorage.setItem("elzavia-orders", JSON.stringify(merged));
  }, []);

  const refresh = useCallback(async () => {
    const localOrders: Order[] = JSON.parse(localStorage.getItem("elzavia-orders") || "[]");
    const localMessages: Message[] = JSON.parse(localStorage.getItem("elzavia-messages") || "[]");
    try {
      const [oRes, mRes] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/messages"),
      ]);
      if (oRes.ok) {
        const apiOrders = await oRes.json();
        if (apiOrders.length > 0 || localOrders.length === 0) {
          mergeOrders(apiOrders);
        } else {
          setOrders(localOrders);
        }
      } else {
        setOrders(localOrders);
      }
      if (mRes.ok) {
        const apiMessages = await mRes.json();
        setMessages(apiMessages.length > 0 ? apiMessages : localMessages);
      } else {
        setMessages(localMessages);
      }
    } catch {
      setOrders(localOrders);
      setMessages(localMessages);
    }
  }, [mergeOrders]);

  useEffect(() => {
    refresh();
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, [refresh]);

  // Stats calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "قيد التجهيز").length;
  const delivered = orders.filter((o) => o.status === "تم التوصيل");
  const confirmed = orders.filter((o) => o.status === "تم تأكيد الطلبية");
  const shipping = orders.filter((o) => o.status === "جاري التوصيل");
  const cancelled = orders.filter((o) => o.status === "تم الإلغاء" || o.status === "لم يستلم الطلبية" || o.status === "لا رد" || o.status === "تم الارجاع");
  const now = new Date();
  const thisMonthDelivered = delivered.filter((o) => {
    const d = new Date(o.createdAt);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });
  const monthlyCommission = thisMonthDelivered.reduce((s, o) => s + o.total, 0);
  const totalCommission = delivered.reduce((s, o) => s + o.total, 0);

  // Top products
  const productCounts: Record<string, { qty: number; revenue: number }> = {};
  for (const order of orders) {
    for (const item of order.items) {
      if (!productCounts[item.name]) productCounts[item.name] = { qty: 0, revenue: 0 };
      productCounts[item.name].qty += item.quantity;
    }
  }
  // Revenue per product from delivered orders
  for (const order of orders.filter(o => o.status === "تم التوصيل")) {
    const itemTotal = order.total;
    // Distribute revenue proportionally
    const itemsSum = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
    for (const item of order.items) {
      const share = itemsSum > 0 ? (item.price * item.quantity) / itemsSum : 1 / order.items.length;
      if (productCounts[item.name]) {
        productCounts[item.name].revenue += Math.round(itemTotal * share);
      }
    }
  }
  const topProducts = Object.entries(productCounts)
    .sort((a, b) => b[1].qty - a[1].qty)
    .slice(0, 5);

  // Orders by status with counts
  const statusCounts = statuses.map((s) => ({
    ...s,
    count: orders.filter((o) => o.status === s.key).length,
  }));
  const maxStatusCount = Math.max(...statusCounts.map((s) => s.count), 1);

  // Monthly revenue data (last 6 months)
  const monthlyRevenue: { month: string; revenue: number; count: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthLabel = d.toLocaleDateString("ar-MA", { month: "long", year: "numeric" });
    const monthOrders = delivered.filter((o) => {
      const od = new Date(o.createdAt);
      return od.getMonth() === d.getMonth() && od.getFullYear() === d.getFullYear();
    });
    monthlyRevenue.push({
      month: monthLabel,
      revenue: monthOrders.reduce((s, o) => s + o.total, 0),
      count: monthOrders.length,
    });
  }
  const maxMonthlyRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue), 1);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">لوحة الإحصائيات</h1>
        <button onClick={refresh} className="text-sm text-primary-600 hover:text-primary-800 font-medium flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          تحديث
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-500 text-xs mb-1">إجمالي الطلبات</p>
          <p className="text-2xl font-extrabold text-gray-900"><AnimatedNumber value={orders.length} /></p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-500 text-xs mb-1">قيد التجهيز</p>
          <p className="text-2xl font-extrabold text-yellow-600"><AnimatedNumber value={pendingOrders} /></p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-500 text-xs mb-1">تم التوصيل</p>
          <p className="text-2xl font-extrabold text-green-600"><AnimatedNumber value={delivered.length} /></p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-500 text-xs mb-1">إجمالي الإيرادات</p>
          <p className="text-2xl font-extrabold text-primary-600">{formatPrice(totalRevenue)}</p>
        </div>
      </div>

      {/* Commission cards */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border-r-4 border-emerald-500">
          <p className="text-gray-500 text-xs mb-1">عمولة الشهر (تم التوصيل)</p>
          <p className="text-2xl font-extrabold text-emerald-600">{formatPrice(monthlyCommission)}</p>
          <p className="text-xs text-gray-400 mt-1">{thisMonthDelivered.length} طلبية مكتملة هذا الشهر</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-r-4 border-primary-500">
          <p className="text-gray-500 text-xs mb-1">إجمالي العمولات (كل الأوقات)</p>
          <p className="text-2xl font-extrabold text-primary-600">{formatPrice(totalCommission)}</p>
          <p className="text-xs text-gray-400 mt-1">{delivered.length} طلبية مكتملة إجمالاً</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        {/* Orders by Status */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">حالات الطلبات</h2>
          <div className="space-y-2">
            {statusCounts.map((s) => (
              <div key={s.key} className="flex items-center gap-3">
                <span className="text-lg w-7">{s.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs text-gray-600">{s.key}</span>
                    <span className={`text-xs font-bold ${s.color}`}>{s.count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(s.count / maxStatusCount) * 100}%`, backgroundColor: s.bar }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">أفضل المنتجات مبيعاً</h2>
          {topProducts.length === 0 ? (
            <p className="text-gray-400 text-sm">لا توجد مبيعات بعد</p>
          ) : (
            <div className="space-y-3">
              {topProducts.map(([name, data], i) => {
                const maxQty = topProducts[0][1].qty;
                return (
                  <div key={name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${i === 0 ? "bg-yellow-500" : i === 1 ? "bg-gray-400" : i === 2 ? "bg-amber-600" : "bg-gray-300"}`}>
                          {i + 1}
                        </span>
                        <span className="text-sm text-gray-900 font-medium truncate">{name}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-500 mr-2">{data.qty}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-primary-500 transition-all duration-500" style={{ width: `${(data.qty / maxQty) * 100}%` }} />
                    </div>
                    {data.revenue > 0 && (
                      <p className="text-[10px] text-gray-400 mt-0.5">{formatPrice(data.revenue)} إيرادات</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Monthly Revenue Bar Chart */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4">الإيرادات الشهرية (آخر 6 أشهر)</h2>
        {monthlyRevenue.every(m => m.revenue === 0) ? (
          <p className="text-gray-400 text-sm">لا توجد إيرادات بعد</p>
        ) : (
          <div className="flex items-end gap-3 h-40">
            {monthlyRevenue.map((m) => {
              const height = maxMonthlyRevenue > 0 ? (m.revenue / maxMonthlyRevenue) * 100 : 0;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-bold text-gray-700">{formatPrice(m.revenue)}</span>
                  <div className="w-full bg-gray-100 rounded-lg overflow-hidden flex-1 self-stretch flex flex-col justify-end">
                    <div
                      className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg transition-all duration-500"
                      style={{ height: `${Math.max(height, 2)}%` }}
                    />
                  </div>
                  <span className="text-[9px] text-gray-400 text-center leading-tight">{m.month.split(" ")[0]}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Actions + Messages */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">إجراءات سريعة</h2>
          <div className="grid grid-cols-2 gap-3">
            <a href="/admin/orders" className="bg-gray-50 hover:bg-primary-50 rounded-xl p-4 text-center transition-colors border border-gray-100 hover:border-primary-200">
              <span className="text-2xl">📦</span>
              <p className="text-xs font-bold text-gray-700 mt-1">عرض الطلبات</p>
            </a>
            <a href="/admin/products" className="bg-gray-50 hover:bg-primary-50 rounded-xl p-4 text-center transition-colors border border-gray-100 hover:border-primary-200">
              <span className="text-2xl">🏷️</span>
              <p className="text-xs font-bold text-gray-700 mt-1">إدارة المنتجات</p>
            </a>
            <a href="/admin/messages" className="bg-gray-50 hover:bg-primary-50 rounded-xl p-4 text-center transition-colors border border-gray-100 hover:border-primary-200">
              <span className="text-2xl">📨</span>
              <p className="text-xs font-bold text-gray-700 mt-1">الرسائل ({messages.length})</p>
            </a>
            <a href="/admin/orders?status=%D8%A7%D9%84%D9%83%D9%84" className="bg-gray-50 hover:bg-primary-50 rounded-xl p-4 text-center transition-colors border border-gray-100 hover:border-primary-200">
              <span className="text-2xl">📋</span>
              <p className="text-xs font-bold text-gray-700 mt-1">جميع الطلبات</p>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">آخر الرسائل</h2>
          {messages.length === 0 ? (
            <p className="text-gray-400 text-sm">لا توجد رسائل بعد</p>
          ) : (
            <div className="space-y-2">
              {messages.slice(-5).reverse().map((m, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-gray-900 text-xs">{m.name}</p>
                    <span className="text-[10px] text-gray-400">{new Date(m.date).toLocaleDateString("ar-MA")}</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
