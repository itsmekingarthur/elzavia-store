"use client";

import { useRouter } from "next/navigation";

interface Props {
  title: string;
  icon?: string;
  count?: number;
  countClass?: string;
  showBack?: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onExport?: () => void;
  onRefresh: () => void;
}

export default function OrdersHeader({
  title,
  icon,
  count,
  countClass,
  showBack,
  searchQuery,
  onSearchChange,
  onExport,
  onRefresh,
}: Props) {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3 w-full md:w-auto">
        {showBack && (
          <button onClick={() => router.push("/admin/orders")} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        )}
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 whitespace-nowrap">
          {icon} {title}
        </h1>
        {count != null && (
          <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${countClass || "bg-gray-100 text-gray-600"} whitespace-nowrap`}>
            {count}
          </span>
        )}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="🔍 بحث برقم الطلب..."
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 w-full md:w-56 focus:outline-none focus:border-primary-400 transition-colors"
        />
      </div>
      <div className="flex items-center gap-2">
        {onExport && (
          <button
            onClick={onExport}
            className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            تحميل Excel
          </button>
        )}
        <button onClick={onRefresh} className="text-sm text-primary-600 hover:text-primary-800 font-medium flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          تحديث
        </button>
      </div>
    </div>
  );
}
