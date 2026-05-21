"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { formatPrice, ordersToExcelData, downloadExcel } from "@/lib/utils";

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
  offerB2G1?: boolean;
  offerDiscount?: number;
}

const statuses = [
  { key: "قيد التجهيز", label: "قيد التجهيز", icon: "⏳", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-300", cardBg: "bg-yellow-50", bar: "#EAB308" },
  { key: "تم الشحن", label: "تم الشحن", icon: "📦", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-300", cardBg: "bg-blue-50", bar: "#3B82F6" },
  { key: "تم التوصيل", label: "تم التوصيل", icon: "✅", color: "text-green-600", bg: "bg-green-50", border: "border-green-300", cardBg: "bg-green-50", bar: "#22C55E" },
  { key: "لا رد", label: "لا رد", icon: "📵", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-300", cardBg: "bg-orange-50", bar: "#F97316" },
  { key: "لم يستلم الطلبية", label: "لم يستلم", icon: "❌", color: "text-red-600", bg: "bg-red-50", border: "border-red-300", cardBg: "bg-red-50", bar: "#EF4444" },
  { key: "تم الارجاع", label: "تم الإرجاع", icon: "↩️", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-300", cardBg: "bg-purple-50", bar: "#A855F7" },
  { key: "تم الإلغاء", label: "تم الإلغاء", icon: "🚫", color: "text-gray-600", bg: "bg-gray-100", border: "border-gray-300", cardBg: "bg-gray-50", bar: "#6B7280" },
];

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-gray-500">جاري التحميل...</div>}>
      <OrdersContent />
    </Suspense>
  );
}

function OrdersContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeStatus = searchParams.get("status") || "";
  const [orders, setOrders] = useState<Order[]>([]);

  const mergeOrders = useCallback((apiOrders: Order[]) => {
    const localOrders: Order[] = JSON.parse(
      typeof window !== "undefined" ? localStorage.getItem("elzavia-orders") || "[]" : "[]"
    );
    const localMap = new Map(localOrders.map((o) => [o.id, o]));
    const seen = new Set<string>();

    const merged = apiOrders.map((apiOrder) => {
      seen.add(apiOrder.id);
      const local = localMap.get(apiOrder.id);
      if (local && local.status !== apiOrder.status) {
        return { ...apiOrder, status: local.status };
      }
      return apiOrder;
    });

    for (const local of localOrders) {
      if (!seen.has(local.id)) {
        merged.push(local);
      }
    }

    merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    setOrders(merged);
    localStorage.setItem("elzavia-orders", JSON.stringify(merged));
  }, []);

  const refresh = useCallback(async () => {
    const localOrders: Order[] = JSON.parse(
      typeof window !== "undefined" ? localStorage.getItem("elzavia-orders") || "[]" : "[]"
    );
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        mergeOrders(data);
        return;
      }
    } catch {}
    if (localOrders.length > 0) {
      setOrders(localOrders);
      localStorage.setItem("elzavia-orders", JSON.stringify(localOrders));
    }
  }, [mergeOrders]);

  useEffect(() => {
    refresh();
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, [refresh]);

  const deleteOrderItem = async (orderId: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الطلبية؟")) return;
    const updated = orders.filter((o) => o.id !== orderId);
    setOrders(updated);
    localStorage.setItem("elzavia-orders", JSON.stringify(updated));
    try {
      await fetch("/api/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId }),
      });
    } catch {}
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updated);
    localStorage.setItem("elzavia-orders", JSON.stringify(updated));
    try {
      await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: orderId,
          status: newStatus,
          items: targetOrder?.items,
          user_id: (targetOrder as any)?.user_id || null,
        }),
      });
    } catch {}
  };

  const counts = statuses.map((s) => ({
    ...s,
    count: orders.filter((o) => o.status === s.key).length,
  }));

  const filtered = activeStatus
    ? orders.filter((o) => o.status === activeStatus)
    : [];
  const activeMeta = statuses.find((s) => s.key === activeStatus);

  if (activeStatus === "الكل" || (activeStatus && activeMeta)) {
    const displayOrders = activeStatus === "الكل" ? orders : filtered;
    const displayMeta = activeStatus === "الكل"
      ? { icon: "📋", label: "جميع الطلبات", color: "text-gray-600", bg: "bg-gray-100", border: "border-gray-300", cardBg: "bg-gray-50", bar: "#6B7280" }
      : activeMeta!;
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/admin/orders")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              {displayMeta.icon} {displayMeta.label}
            </h1>
            <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${displayMeta.color} ${displayMeta.bg}`}>
              {displayOrders.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {displayOrders.length > 0 && (
              <button
                onClick={() => {
                  const data = ordersToExcelData(displayOrders);
                  const date = new Date().toISOString().split("T")[0];
                  downloadExcel(data, `elzavia-orders-${activeStatus === "الكل" ? "all" : (activeMeta?.key || "filtered")}-${date}.xlsx`);
                }}
                className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                تحميل Excel
              </button>
            )}
            <button onClick={refresh} className="text-sm text-primary-600 hover:text-primary-800 font-medium flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              تحديث
            </button>
          </div>
        </div>
        {displayOrders.length === 0 ? (
          <div className="bg-white rounded-xl md:rounded-2xl p-8 md:p-12 text-center shadow-sm">
            <p className="text-gray-400 text-base md:text-lg">لا توجد طلبات في هذه الحالة</p>
          </div>
        ) : (
          <div className="space-y-4">
            {[...displayOrders].reverse().map((order) => {
              const meta = statuses.find(s => s.key === order.status) || { color: "text-gray-600", bg: "bg-gray-100", border: "border-gray-300", bar: "#6B7280" };
              return (
              <div key={order.id} className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border-r-4" style={{ borderRightColor: meta.bar }}>
                <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 mb-4">
                  <div>
                    <span className="text-xs text-gray-500">رقم الطلب</span>
                    <p className="font-bold text-gray-900 text-sm md:text-base">{order.id}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">التاريخ</span>
                    <p className="font-bold text-gray-900 text-sm md:text-base">
                      {new Date(order.createdAt).toLocaleDateString("ar-MA")}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">الحالة</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className={`mr-2 px-2 md:px-3 py-1 rounded-lg font-bold text-xs md:text-sm border ${meta.color} ${meta.bg} ${meta.border}`}
                    >
                      {statuses.map((s) => (
                        <option key={s.key} value={s.key}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => deleteOrderItem(order.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    title="حذف الطلبية"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <table className="w-full text-xs md:text-sm">
                    <thead>
                      <tr className="text-gray-500">
                        <th className="text-right pb-2">المنتج</th>
                        <th className="text-center pb-2">الكمية</th>
                        <th className="text-left pb-2">السعر</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, i) => (
                        <tr key={i} className="border-t border-gray-50">
                          <td className="py-2 font-medium text-gray-900">{item.name}</td>
                          <td className="py-2 text-center">{item.quantity}</td>
                          <td className="py-2 text-left">{formatPrice(item.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-4 grid sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                  <div>
                    <p className="text-gray-500">العميل: <span className="font-bold text-gray-900">{order.customer.name}</span></p>
                    <p className="text-gray-500">الهاتف: <span className="font-bold text-gray-900" dir="ltr">{order.customer.phone}</span></p>
                    <p className="text-gray-500">العنوان: <span className="text-gray-900">{order.customer.address}</span></p>
                    {order.customer.notes && (
                      <p className="text-gray-500">ملاحظات: <span className="text-gray-900">{order.customer.notes}</span></p>
                    )}
                  </div>
                  <div className="sm:text-left">
                    <p className="text-gray-500">المجموع: <span className="font-bold">{formatPrice(order.subtotal)}</span></p>
                    {order.discount > 0 && (
                      <p className="text-green-600">الخصم: -{formatPrice(order.discount)} ({order.coupon})</p>
                    )}
                    {order.offerB2G1 && order.offerDiscount != null && (
                      <p className="text-gold-600">🎁 عرض 2+1: وفر {formatPrice(order.offerDiscount)} درهم</p>
                    )}
                    <p className="text-base md:text-lg font-extrabold text-primary-700">الإجمالي: {formatPrice(order.total)}</p>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">إدارة الطلبات</h1>
        <div className="flex items-center gap-2">
          {orders.length > 0 && (
            <button
              onClick={() => {
                const data = ordersToExcelData(orders);
                const date = new Date().toISOString().split("T")[0];
                downloadExcel(data, `elzavia-orders-${date}.xlsx`);
              }}
              className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              تحميل Excel
            </button>
          )}
          <button onClick={refresh} className="text-sm text-primary-600 hover:text-primary-800 font-medium flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            تحديث
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <button
          onClick={() => orders.length > 0 && router.push("/admin/orders?status=%D8%A7%D9%84%D9%83%D9%84")}
          className={`relative overflow-hidden rounded-2xl p-5 text-right border-2 transition-all hover:shadow-md active:scale-[0.97] ${
            orders.length > 0 ? "cursor-pointer hover:-translate-y-0.5" : "cursor-default opacity-60"
          } bg-gray-50 border-gray-200`}
        >
          <div className="text-2xl mb-2">📋</div>
          <div className="text-3xl font-extrabold text-gray-600">{orders.length}</div>
          <div className="text-sm font-bold text-gray-600 mt-1">الكل</div>
        </button>
        {counts.map((s) => (
          <button
            key={s.key}
            onClick={() => s.count > 0 && router.push(`/admin/orders?status=${encodeURIComponent(s.key)}`)}
            className={`relative overflow-hidden rounded-2xl p-5 text-right border-2 transition-all hover:shadow-md active:scale-[0.97] ${
              s.count > 0 ? "cursor-pointer hover:-translate-y-0.5" : "cursor-default opacity-60"
            } ${s.bg} ${s.border}`}
          >
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className={`text-3xl font-extrabold ${s.color}`}>{s.count}</div>
            <div className={`text-sm font-bold mt-1 ${s.color}`}>{s.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
