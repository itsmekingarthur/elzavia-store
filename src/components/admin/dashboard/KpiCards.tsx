"use client";

import { formatPrice } from "@/lib/utils";
import AnimatedNumber from "@/components/AnimatedNumber";
import type { DashboardStats } from "./useDashboardData";

export default function KpiCards({ stats }: { stats: DashboardStats }) {
  const { orders, pendingOrders, confirmed, delivered, totalRevenue } = stats;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <p className="text-gray-500 text-xs mb-1">إجمالي الطلبات</p>
        <p className="text-2xl font-extrabold text-gray-900"><AnimatedNumber value={orders.length} /></p>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <p className="text-gray-500 text-xs mb-1">قيد التجهيز</p>
        <p className="text-2xl font-extrabold text-yellow-600"><AnimatedNumber value={pendingOrders} /></p>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <p className="text-gray-500 text-xs mb-1">تم التأكيد</p>
        <p className="text-2xl font-extrabold text-emerald-600"><AnimatedNumber value={confirmed.length} /></p>
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
  );
}
