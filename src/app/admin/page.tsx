"use client";

import { useDashboardData } from "@/components/admin/dashboard/useDashboardData";
import KpiCards from "@/components/admin/dashboard/KpiCards";
import CommissionCards from "@/components/admin/dashboard/CommissionCards";
import StatusBreakdown from "@/components/admin/dashboard/StatusBreakdown";
import TopProducts from "@/components/admin/dashboard/TopProducts";
import MonthlyRevenueChart from "@/components/admin/dashboard/MonthlyRevenueChart";
import QuickActions from "@/components/admin/dashboard/QuickActions";
import RecentMessages from "@/components/admin/dashboard/RecentMessages";

export default function AdminDashboard() {
  const { messages, refresh, stats } = useDashboardData();

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

      <KpiCards stats={stats} />
      <CommissionCards stats={stats} />

      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <StatusBreakdown stats={stats} />
        <TopProducts stats={stats} />
      </div>

      <MonthlyRevenueChart stats={stats} />

      <div className="grid lg:grid-cols-2 gap-4">
        <QuickActions messagesCount={messages.length} />
        <RecentMessages messages={messages} />
      </div>
    </div>
  );
}
