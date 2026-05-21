"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

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
  user_id?: string;
  offerB2G1?: boolean;
  offerDiscount?: number;
  pointsUsed?: number;
  pointsDiscount?: number;
  cancelReason?: string;
  shippedAt?: string;
  deliveredAt?: string;
}

const statuses = [
  { key: "قيد التجهيز", label: "قيد التجهيز", icon: "⏳", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-300", bar: "#EAB308" },
  { key: "نحاول الاتصال بالرقم", label: "نحاول الاتصال", icon: "📞", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-300", bar: "#F59E0B" },
  { key: "تم تأكيد الطلبية", label: "تم التأكيد", icon: "✅", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-300", bar: "#10B981" },
  { key: "جاري التوصيل", label: "جاري التوصيل", icon: "📦", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-300", bar: "#3B82F6" },
  { key: "تم التوصيل", label: "تم التوصيل", icon: "✅", color: "text-green-600", bg: "bg-green-50", border: "border-green-300", bar: "#22C55E" },
  { key: "لا رد", label: "لا رد", icon: "📵", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-300", bar: "#F97316" },
  { key: "لم يستلم الطلبية", label: "لم يستلم", icon: "❌", color: "text-red-600", bg: "bg-red-50", border: "border-red-300", bar: "#EF4444" },
  { key: "تم الارجاع", label: "تم الإرجاع", icon: "↩️", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-300", bar: "#A855F7" },
  { key: "تم الإلغاء", label: "تم الإلغاء", icon: "🚫", color: "text-gray-600", bg: "bg-gray-100", border: "border-gray-300", bar: "#6B7280" },
];

const timelineSteps = [
  { key: "قيد التجهيز", label: "قيد التجهيز", icon: "⏳" },
  { key: "نحاول الاتصال بالرقم", label: "نحاول الاتصال", icon: "📞" },
  { key: "تم تأكيد الطلبية", label: "تم التأكيد", icon: "✅" },
  { key: "جاري التوصيل", label: "جاري التوصيل", icon: "📦" },
  { key: "تم التوصيل", label: "تم التوصيل", icon: "✅" },
];

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const findOrder = useCallback((orderId: string) => {
    const localOrders: Order[] = JSON.parse(localStorage.getItem("elzavia-orders") || "[]");
    return localOrders.find((o) => o.id === orderId) || null;
  }, []);

  useEffect(() => {
    if (!id) return;
    const orderId = Array.isArray(id) ? id[0] : id;
    fetch("/api/orders")
      .then((r) => r.ok ? r.json() : [])
      .then((apiOrders: any[]) => {
        const localOrders: Order[] = JSON.parse(localStorage.getItem("elzavia-orders") || "[]");
        const localMap = new Map(localOrders.map((o) => [o.id, o]));
        const apiOrder = apiOrders.find((o: any) => o.id === orderId);
        if (apiOrder) {
          const local = localMap.get(orderId);
          if (local) {
            const extra: any = {};
            for (const key of Object.keys(local)) {
              if ((apiOrder as any)[key] === undefined) extra[key] = (local as any)[key];
            }
            setOrder({ ...apiOrder, ...extra });
          } else {
            setOrder(apiOrder);
          }
        } else {
          const local = localMap.get(orderId);
          if (local) setOrder(local);
        }
        setLoading(false);
      })
      .catch(() => {
        const local = findOrder(orderId);
        setOrder(local);
        setLoading(false);
      });
  }, [id, findOrder]);

  const syncToUserKey = (updatedOrder: Order) => {
    if (updatedOrder.user_id) {
      const userKey = `elzavia-orders-${updatedOrder.user_id}`;
      const userOrders = JSON.parse(localStorage.getItem(userKey) || "[]");
      const userIdx = userOrders.findIndex((o: any) => o.id === updatedOrder.id);
      if (userIdx >= 0) {
        userOrders[userIdx] = updatedOrder;
        localStorage.setItem(userKey, JSON.stringify(userOrders));
      }
    }
  };

  const updateStatus = async (newStatus: string) => {
    if (!order) return;
    if (newStatus === "تم الإلغاء") {
      setShowCancelModal(true);
      return;
    }

    const now = new Date().toISOString();
    const updates: Partial<Order> = {
      status: newStatus,
      ...(newStatus === "جاري التوصيل" ? { shippedAt: now } : {}),
      ...(newStatus === "تم التوصيل" ? { deliveredAt: now } : {}),
    };

    const updated = { ...order, ...updates };
    setOrder(updated);

    const localOrders: Order[] = JSON.parse(localStorage.getItem("elzavia-orders") || "[]");
    const idx = localOrders.findIndex((o) => o.id === order.id);
    if (idx >= 0) {
      localOrders[idx] = updated;
      localStorage.setItem("elzavia-orders", JSON.stringify(localOrders));
    }
    syncToUserKey(updated);

    try {
      await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: order.id, status: newStatus, user_id: order.user_id || null }),
      });
    } catch {}
  };

  const handleCancelWithReason = async () => {
    if (!order) return;
    const updated = { ...order, status: "تم الإلغاء", cancelReason };
    setOrder(updated);
    setShowCancelModal(false);
    setCancelReason("");

    const localOrders: Order[] = JSON.parse(localStorage.getItem("elzavia-orders") || "[]");
    const idx = localOrders.findIndex((o) => o.id === order.id);
    if (idx >= 0) {
      localOrders[idx] = updated;
      localStorage.setItem("elzavia-orders", JSON.stringify(localOrders));
    }
    syncToUserKey(updated);

    try {
      await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: order.id, status: "تم الإلغاء", user_id: order.user_id || null }),
      });
    } catch {}
  };

  const deleteOrder = async () => {
    if (!order || !confirm("هل أنت متأكد من حذف هذه الطلبية؟")) return;
    const localOrders: Order[] = JSON.parse(localStorage.getItem("elzavia-orders") || "[]");
    const updated = localOrders.filter((o) => o.id !== order.id);
    localStorage.setItem("elzavia-orders", JSON.stringify(updated));
    // Also remove from per-user key
    if (order.user_id) {
      const userKey = `elzavia-orders-${order.user_id}`;
      const userOrders = JSON.parse(localStorage.getItem(userKey) || "[]");
      localStorage.setItem(userKey, JSON.stringify(userOrders.filter((o: any) => o.id !== order.id)));
    }
    router.push("/admin/orders");
    try {
      await fetch("/api/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: order.id }),
      });
    } catch {}
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-500">جاري التحميل...</div>;
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 mb-4">الطلبية غير موجودة</p>
        <Link href="/admin/orders" className="text-primary-600 hover:text-primary-800 font-medium">العودة للطلبات</Link>
      </div>
    );
  }

  const meta = statuses.find((s) => s.key === order.status) || statuses[0];
  const statusIndex = timelineSteps.findIndex((s) => s.key === order.status);

  return (
    <div>
      {/* Cancel reason modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-4" onClick={() => setShowCancelModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mt-16 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-2">إلغاء الطلبية</h3>
            <p className="text-sm text-gray-500 mb-4">يرجى ذكر سبب الإلغاء ليتم إظهاره للعميل</p>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="سبب الإلغاء..."
              rows={3}
              className="input-field text-sm w-full"
              autoFocus
            />
            <div className="flex gap-3 mt-4">
              <button onClick={handleCancelWithReason} className="btn-primary flex-1 !py-2.5 text-sm">تأكيد الإلغاء</button>
              <button onClick={() => setShowCancelModal(false)} className="btn-secondary flex-1 !py-2.5 text-sm">رجوع</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">تفاصيل الطلبية</h1>
          <p className="text-gray-400 text-sm font-mono" dir="ltr">{order.id}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${meta.color} ${meta.bg} border ${meta.border}`}>
          {meta.icon} {order.status}
        </span>
        <button onClick={deleteOrder} className="mr-auto text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          حذف
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-4">
          {/* Status Timeline */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-4">تتبع الطلبية</h2>
            <div className="flex items-center justify-center" dir="ltr">
              {timelineSteps.map((step, i) => {
                const done = i <= statusIndex;
                const current = i === statusIndex;
                return (
                  <div key={step.key} className="flex items-center">
                    {i > 0 && (
                      <div className={`w-6 md:w-12 h-0.5 mx-1 ${done ? "bg-primary-500/40" : "bg-gray-200"}`} />
                    )}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                        done ? "bg-primary-500/20 text-primary-600" : "bg-gray-100 text-gray-400"
                      } ${current ? "ring-2 ring-primary-500/40 scale-110" : ""}`}>
                        {step.icon}
                      </div>
                      <p className={`text-[9px] font-bold mt-1 whitespace-nowrap ${done ? "text-primary-700" : "text-gray-400"}`}>{step.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Status change */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <label className="block text-xs font-bold text-gray-600 mb-1.5">تغيير الحالة</label>
              <div className="flex gap-2">
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(e.target.value)}
                  className={`px-3 py-2 rounded-lg font-bold text-sm border flex-1 ${meta.color} ${meta.bg} ${meta.border}`}
                >
                  {statuses.map((s) => (
                    <option key={s.key} value={s.key}>{s.icon} {s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cancel reason display */}
            {order.status === "تم الإلغاء" && order.cancelReason && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs font-bold text-red-700 mb-1">سبب الإلغاء</p>
                <p className="text-sm text-red-600">{order.cancelReason}</p>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-3">المنتجات</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-gray-100">
                  <th className="text-right pb-2 font-medium">المنتج</th>
                  <th className="text-center pb-2 font-medium">الكمية</th>
                  <th className="text-left pb-2 font-medium">السعر</th>
                  <th className="text-left pb-2 font-medium">الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-2 font-medium text-gray-900">{item.name}</td>
                    <td className="py-2 text-center">{item.quantity}</td>
                    <td className="py-2 text-left">{formatPrice(item.price)}</td>
                    <td className="py-2 text-left font-bold">{formatPrice(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t border-gray-100 mt-3 pt-3 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">المجموع</span>
                <span className="font-bold text-gray-900">{formatPrice(order.subtotal || order.total)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>الخصم ({order.coupon})</span>
                  <span className="font-bold">-{formatPrice(order.discount)}</span>
                </div>
              )}
              {order.offerB2G1 && order.offerDiscount != null && (
                <div className="flex justify-between text-gold-600">
                  <span>🎁 عرض 2+1</span>
                  <span className="font-bold">-{formatPrice(order.offerDiscount)}</span>
                </div>
              )}
              {order.pointsDiscount != null && order.pointsDiscount > 0 && (
                <div className="flex justify-between text-amber-600">
                  <span>⭐ خصم النقاط ({order.pointsUsed} نقطة)</span>
                  <span className="font-bold">-{formatPrice(order.pointsDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-base pt-2 border-t border-gray-100">
                <span className="font-bold text-gray-900">الإجمالي</span>
                <span className="font-extrabold text-primary-700">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Customer Info */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-3">معلومات العميل</h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500">الاسم: </span>
                <span className="font-bold text-gray-900">{order.customer.name}</span>
              </div>
              <div>
                <span className="text-gray-500">الهاتف: </span>
                <span className="font-bold text-gray-900" dir="ltr">{order.customer.phone}</span>
              </div>
              <div>
                <span className="text-gray-500">العنوان: </span>
                <span className="text-gray-900">{order.customer.address}</span>
              </div>
              {order.customer.notes && (
                <div>
                  <span className="text-gray-500">ملاحظات: </span>
                  <span className="text-gray-900">{order.customer.notes}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-3">معلومات إضافية</h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500">تاريخ الطلب: </span>
                <span className="text-gray-900">{new Date(order.createdAt).toLocaleDateString("ar-MA")}</span>
              </div>
              {order.status === "تم التوصيل" && order.deliveredAt && (
                <div>
                  <span className="text-gray-500">تاريخ التوصيل: </span>
                  <span className="text-green-600 font-bold">{new Date(order.deliveredAt).toLocaleDateString("ar-MA")}</span>
                </div>
              )}
              {order.user_id && (
                <div>
                  <span className="text-gray-500">مستخدم مسجل: </span>
                  <span className="text-emerald-600 font-bold">نعم</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Link href="/admin/orders" className="btn-secondary flex-1 text-sm !py-2.5 text-center">عودة للطلبات</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
