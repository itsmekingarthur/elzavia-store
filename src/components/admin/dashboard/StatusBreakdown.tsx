"use client";

import type { DashboardStats } from "./useDashboardData";

export default function StatusBreakdown({ stats }: { stats: DashboardStats }) {
  const { statusCounts, maxStatusCount } = stats;
  return (
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
  );
}
