"use client";

import type { Message } from "./useDashboardData";

export default function RecentMessages({ messages }: { messages: Message[] }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-4">آخر الرسائل</h2>
      {messages.length === 0 ? (
        <p className="text-gray-400 text-sm">لا توجد رسائل بعد</p>
      ) : (
        <div className="space-y-2">
          {messages.slice(-5).reverse().map((m, i) => (
            <div key={i} className="p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <p className="font-bold text-gray-900 text-xs">{m.name}</p>
                <span className="text-[10px] text-gray-400">{new Date(m.date).toLocaleDateString("ar-MA")}</span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-1">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
