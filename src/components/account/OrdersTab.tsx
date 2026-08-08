"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import OrderTimeline from "./OrderTimeline";

interface Props {
  orders: any[];
}

const statusBadge = (status: string) => {
  switch (status) {
    case "قيد التجهيز": return "bg-gold-500/15 text-gold-400";
    case "نحاول الاتصال بالرقم": return "bg-amber-500/15 text-amber-400";
    case "تم تأكيد الطلبية": return "bg-emerald-500/15 text-emerald-400";
    case "جاري التوصيل": return "bg-blue-500/15 text-blue-400";
    case "تم التوصيل": return "bg-emerald-500/15 text-emerald-400";
    case "تم الإلغاء": return "bg-red-500/15 text-red-400";
    default: return "bg-white/10 text-white/60";
  }
};

export default function OrdersTab({ orders }: Props) {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-bold text-white mb-4">طلباتي</h2>
        <div className="text-center py-12">
          <p className="text-white/40 mb-4">لا توجد طلبات بعد</p>
          <Link href="/shop" className="btn-nature text-sm">تصفح المنتجات</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">طلباتي</h2>
      <div className="space-y-3">
        {[...orders].reverse().map((order, i) => (
          <div key={i}>
            <button
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              className="w-full text-right bg-white/5 border border-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-primary-400 font-mono text-sm font-bold" dir="ltr">{order.id}</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusBadge(order.status)}`}>{order.status}</span>
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
                {order.status === "تم الإلغاء" && order.cancelReason && (
                  <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-xs font-bold text-red-400 mb-1">سبب الإلغاء</p>
                    <p className="text-sm text-red-300/80">{order.cancelReason}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
