"use client";

import { statuses, STATUS_ALL_META, type StatusMeta } from "./statusConfig";
import type { Order } from "./useOrders";

interface Props {
  orders: Order[];
  counts: (StatusMeta & { count: number })[];
  onSelectAll: () => void;
  onSelect: (key: string) => void;
}

export default function StatusGrid({ orders, counts, onSelectAll, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
      <button
        onClick={onSelectAll}
        className={`relative overflow-hidden rounded-2xl p-5 text-right border-2 transition-all hover:shadow-md active:scale-[0.97] ${
          orders.length > 0 ? "cursor-pointer hover:-translate-y-0.5" : "cursor-default opacity-60"
        } bg-gray-50 border-gray-200`}
      >
        <div className="text-2xl mb-2">{STATUS_ALL_META.icon}</div>
        <div className="text-3xl font-extrabold text-gray-600">{orders.length}</div>
        <div className="text-sm font-bold text-gray-600 mt-1">{STATUS_ALL_META.label}</div>
      </button>
      {counts.map((s) => (
        <button
          key={s.key}
          onClick={() => s.count > 0 && onSelect(s.key)}
          className={`relative overflow-hidden rounded-2xl p-5 text-right border-2 transition-all hover:shadow-md active:scale-[0.97] ${
            s.count > 0 ? "cursor-pointer hover:-translate-y-0.5" : "cursor-default opacity-60"
          } ${s.bg} ${s.border}`}
        >
          <div className="text-2xl mb-2">{s.icon}</div>
          <div className={`text-3xl font-extrabold ${s.color}`}>{s.count}</div>
          <div className={`text-sm font-bold mt-1 ${s.color}`}>{s.label}</div>
        </button>
      ))}
    </div>
  );
}
