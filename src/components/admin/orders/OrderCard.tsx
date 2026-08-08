"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { statuses, type StatusMeta } from "./statusConfig";
import type { Order } from "./useOrders";

interface Props {
  order: Order;
  meta: StatusMeta;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export default function OrderCard({ order, meta, onStatusChange, onDelete }: Props) {
  return (
    <div key={order.id} className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border-r-4" style={{ borderRightColor: meta.bar }}>
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 mb-4">
        <div>
          <span className="text-xs text-gray-500">رقم الطلب</span>
          <Link href={`/admin/orders/${encodeURIComponent(order.id)}`} className="font-bold text-primary-700 hover:text-primary-500 text-sm md:text-base underline underline-offset-2 transition-colors" dir="ltr">{order.id}</Link>
        </div>
        <div>
          <span className="text-xs text-gray-500">التاريخ</span>
          <p className="font-bold text-gray-900 text-sm md:text-base">
            {new Date(order.createdAt).toLocaleDateString("ar-MA")}
          </p>
        </div>
        <div>
          <span className="text-xs text-gray-500">الحالة</span>
          <select
            value={order.status}
            onChange={(e) => onStatusChange(order.id, e.target.value)}
            className={`mr-2 px-2 md:px-3 py-1 rounded-lg font-bold text-xs md:text-sm border ${meta.color} ${meta.bg} ${meta.border}`}
          >
            {statuses.map((s) => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => onDelete(order.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
          title="حذف الطلبية"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <table className="w-full text-xs md:text-sm">
          <thead>
            <tr className="text-gray-500">
              <th className="text-right pb-2">المنتج</th>
              <th className="text-center pb-2">الكمية</th>
              <th className="text-left pb-2">السعر</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i} className="border-t border-gray-50">
                <td className="py-2 font-medium text-gray-900">{item.name}</td>
                <td className="py-2 text-center">{item.quantity}</td>
                <td className="py-2 text-left">{formatPrice(item.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-100 pt-4 mt-4 grid sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
        <div>
          <p className="text-gray-500">العميل: <span className="font-bold text-gray-900">{order.customer.name}</span></p>
          <p className="text-gray-500">الهاتف: <span className="font-bold text-gray-900" dir="ltr">{order.customer.phone}</span></p>
          <p className="text-gray-500">العنوان: <span className="text-gray-900">{order.customer.address}</span></p>
          {order.customer.notes && (
            <p className="text-gray-500">ملاحظات: <span className="text-gray-900">{order.customer.notes}</span></p>
          )}
        </div>
        <div className="sm:text-left">
          <p className="text-gray-500">المجموع: <span className="font-bold">{formatPrice(order.subtotal)}</span></p>
          {order.discount > 0 && (
            <p className="text-green-600">الخصم: -{formatPrice(order.discount)} ({order.coupon})</p>
          )}
          {order.offerB2G1 && order.offerDiscount != null && (
            <p className="text-gold-600">🎁 عرض 2+1: وفر {formatPrice(order.offerDiscount)} درهم</p>
          )}
          <p className="text-base md:text-lg font-extrabold text-primary-700">الإجمالي: {formatPrice(order.total)}</p>
        </div>
      </div>
    </div>
  );
}
