"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { statuses } from "./statusConfig";
import type { Order } from "./useOrders";

interface Props {
  orders: Order[];
  query: string;
}

export default function SearchResults({ orders, query }: Props) {
  const results = orders.filter((o) => o.id.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-800 mb-3">نتائج البحث عن: {query}</h2>
      {results.length === 0 ? (
        <p className="text-gray-400 text-sm">لا توجد طلبات بهذا الرقم</p>
      ) : (
        <div className="space-y-3">
          {results.reverse().map((order) => {
            const meta = statuses.find((s) => s.key === order.status) || { color: "text-gray-600", bg: "bg-gray-100", border: "border-gray-300", bar: "#6B7280" };
            return (
              <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border-r-4" style={{ borderRightColor: meta.bar }}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <Link href={`/admin/orders/${encodeURIComponent(order.id)}`} className="font-bold text-primary-700 hover:text-primary-500 text-sm underline underline-offset-2 transition-colors" dir="ltr">{order.id}</Link>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${meta.color} ${meta.bg}`}>{order.status}</span>
                </div>
                <p className="text-gray-600 text-sm">{order.customer?.name} — {order.customer?.phone}</p>
                <p className="text-gray-400 text-xs mt-1">{new Date(order.createdAt).toLocaleDateString("ar-MA")} — {formatPrice(order.total)}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
