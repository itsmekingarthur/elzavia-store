"use client";

import { formatPrice } from "@/lib/utils";
import type { DashboardStats } from "./useDashboardData";

export default function CommissionCards({ stats }: { stats: DashboardStats }) {
  const { monthlyCommission, thisMonthDelivered, totalCommission, delivered } = stats;
  return (
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
  );
}
