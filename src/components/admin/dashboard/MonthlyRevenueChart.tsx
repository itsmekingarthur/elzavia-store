"use client";

import { formatPrice } from "@/lib/utils";
import type { DashboardStats } from "./useDashboardData";

export default function MonthlyRevenueChart({ stats }: { stats: DashboardStats }) {
  const { monthlyRevenue, maxMonthlyRevenue } = stats;
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">الإيرادات الشهرية (آخر 6 أشهر)</h2>
      {monthlyRevenue.every((m) => m.revenue === 0) ? (
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
  );
}
