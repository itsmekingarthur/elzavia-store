"use client";

import { useState, useEffect, useCallback } from "react";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

interface Order {
  id: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  discount: number;
  total: number;
  coupon: string;
  customer: { name: string; phone: string; address: string; notes: string };
  status: string;
  createdAt: string;
}

interface Message {
  name: string;
  email: string;
  message: string;
  date: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const refresh = useCallback(async () => {
    try {
      const [oRes, mRes] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/messages"),
      ]);
      if (oRes.ok) setOrders(await oRes.json());
      if (mRes.ok) setMessages(await mRes.json());
    } catch {
      const savedOrders = JSON.parse(localStorage.getItem("elzavia-orders") || "[]");
      const savedMessages = JSON.parse(localStorage.getItem("elzavia-messages") || "[]");
      setOrders(savedOrders);
      setMessages(savedMessages);
    }
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, [refresh]);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "قيد التجهيز").length;
  const delivered = orders.filter((o) => o.status === "تم التوصيل");
  const now = new Date();
  const thisMonthDelivered = delivered.filter((o) => {
    const d = new Date(o.createdAt);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });
  const monthlyCommission = thisMonthDelivered.reduce((s, o) => s + o.total, 0);
  const totalCommission = delivered.reduce((s, o) => s + o.total, 0);

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

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
          <p className="text-gray-500 text-xs md:text-sm mb-1">إجمالي الطلبات</p>
          <p className="text-2xl md:text-3xl font-extrabold text-gray-900">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
          <p className="text-gray-500 text-xs md:text-sm mb-1">قيد التجهيز</p>
          <p className="text-2xl md:text-3xl font-extrabold text-yellow-600">{pendingOrders}</p>
        </div>
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
          <p className="text-gray-500 text-xs md:text-sm mb-1">نسبة التأكيد</p>
          <p className="text-2xl md:text-3xl font-extrabold text-emerald-600">
            {orders.length > 0 ? Math.round((orders.filter(o => o.status === "تم التوصيل").length / orders.length) * 100) : 0}%
          </p>
        </div>
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
          <p className="text-gray-500 text-xs md:text-sm mb-1">نسبة الشحن</p>
          <p className="text-2xl md:text-3xl font-extrabold text-blue-600">
            {orders.length > 0 ? Math.round((orders.filter(o => o.status === "تم الشحن" || o.status === "تم التوصيل").length / orders.length) * 100) : 0}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border-r-4 border-emerald-500">
          <p className="text-gray-500 text-xs md:text-sm mb-1">عمولة الشهر (تم التوصيل)</p>
          <p className="text-2xl md:text-3xl font-extrabold text-emerald-600">{formatPrice(monthlyCommission)}</p>
          <p className="text-xs text-gray-400 mt-1">{thisMonthDelivered.length} طلبية مكتملة هذا الشهر</p>
        </div>
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border-r-4 border-primary-500">
          <p className="text-gray-500 text-xs md:text-sm mb-1">إجمالي العمولات (كل الأوقات)</p>
          <p className="text-2xl md:text-3xl font-extrabold text-primary-600">{formatPrice(totalCommission)}</p>
          <p className="text-xs text-gray-400 mt-1">{delivered.length} طلبية مكتملة إجمالاً</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-1 gap-6 md:gap-8">
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">الرسائل الواردة</h2>
          {messages.length === 0 ? (
            <p className="text-gray-400 text-sm md:text-base">لا توجد رسائل بعد</p>
          ) : (
            <div className="space-y-3">
              {messages.slice(-5).reverse().map((m, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-xl">
                  <p className="font-bold text-gray-900 text-xs md:text-sm">{m.name}</p>
                  <p className="text-xs text-gray-500 truncate">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
