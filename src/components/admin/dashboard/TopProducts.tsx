"use client";

import { formatPrice } from "@/lib/utils";
import type { DashboardStats } from "./useDashboardData";

export default function TopProducts({ stats }: { stats: DashboardStats }) {
  const { topProducts } = stats;
  return (
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
  );
}
