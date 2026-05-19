"use client";

import { useState, useEffect, useCallback } from "react";

interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minAmount: number;
  maxUses: number;
  usedCount: number;
  expiresAt: string;
  active: boolean;
}

const emptyForm = {
  code: "",
  type: "percentage" as "percentage" | "fixed",
  value: 0,
  minAmount: 0,
  maxUses: 100,
  expiresAt: "2026-12-31",
};

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/coupons");
      if (res.ok) setCoupons(await res.json());
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, [refresh]);

  const addCoupon = async () => {
    if (!form.code.trim() || form.value <= 0) return;
    const coupon: Coupon = {
      id: Date.now().toString(),
      code: form.code.toUpperCase(),
      type: form.type,
      value: form.value,
      minAmount: form.minAmount,
      maxUses: form.maxUses,
      usedCount: 0,
      expiresAt: form.expiresAt,
      active: true,
    };
    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coupon),
      });
      if (res.ok) {
        setCoupons([...coupons, coupon]);
        setForm(emptyForm);
      }
    } catch {}
  };

  const deleteCoupon = async (id: string) => {
    try {
      const res = await fetch("/api/coupons", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) setCoupons(coupons.filter((c) => c.id !== id));
    } catch {}
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">كوبونات الخصم</h1>

      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm mb-8">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">إضافة كوبون جديد</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <input
            type="text"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            placeholder="كود الخصم (مثال: SAVE20)"
            className="input-field text-sm"
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as "percentage" | "fixed" })}
            className="input-field text-sm"
          >
            <option value="percentage">نسبة مئوية (%)</option>
            <option value="fixed">قيمة ثابتة (درهم)</option>
          </select>
          <input
            type="number"
            value={form.value || ""}
            onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
            placeholder={form.type === "percentage" ? "مثال: 10" : "مثال: 50"}
            className="input-field text-sm"
          />
          <input
            type="number"
            value={form.minAmount || ""}
            onChange={(e) => setForm({ ...form, minAmount: Number(e.target.value) })}
            placeholder="الحد الأدنى (0 = بدون)"
            className="input-field text-sm"
          />
          <input
            type="number"
            value={form.maxUses || ""}
            onChange={(e) => setForm({ ...form, maxUses: Number(e.target.value) })}
            placeholder="أقصى عدد استخدامات"
            className="input-field text-sm"
          />
          <input
            type="date"
            value={form.expiresAt}
            onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
            className="input-field text-sm"
          />
        </div>
        <button onClick={addCoupon} className="btn-primary mt-4 text-sm">
          إضافة الكوبون
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">جاري التحميل...</div>
      ) : coupons.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <p className="text-gray-400 text-lg">لا توجد كوبونات بعد</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right p-3 md:p-4 text-gray-500 text-xs md:text-sm">الكود</th>
                  <th className="text-right p-3 md:p-4 text-gray-500 text-xs md:text-sm">النوع</th>
                  <th className="text-right p-3 md:p-4 text-gray-500 text-xs md:text-sm">القيمة</th>
                  <th className="text-right p-3 md:p-4 text-gray-500 text-xs md:text-sm">الحد الأدنى</th>
                  <th className="text-right p-3 md:p-4 text-gray-500 text-xs md:text-sm">المستخدم</th>
                  <th className="text-right p-3 md:p-4 text-gray-500 text-xs md:text-sm">الحد الأقصى</th>
                  <th className="text-right p-3 md:p-4 text-gray-500 text-xs md:text-sm">الصلاحية</th>
                  <th className="text-center p-3 md:p-4 text-gray-500 text-xs md:text-sm">الحالة</th>
                  <th className="text-center p-3 md:p-4 text-gray-500 text-xs md:text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="p-3 md:p-4 font-bold text-gray-900 text-sm">{coupon.code}</td>
                    <td className="p-3 md:p-4 text-gray-600 text-sm">
                      {coupon.type === "percentage" ? "نسبة" : "ثابت"}
                    </td>
                    <td className="p-3 md:p-4 font-bold text-sm">
                      {coupon.type === "percentage"
                        ? `${coupon.value}%`
                        : `${coupon.value} درهم`}
                    </td>
                    <td className="p-3 md:p-4 text-gray-600 text-sm">
                      {coupon.minAmount > 0 ? `${coupon.minAmount} درهم` : "بدون"}
                    </td>
                    <td className="p-3 md:p-4 text-gray-600 text-sm">{coupon.usedCount}</td>
                    <td className="p-3 md:p-4 text-gray-600 text-sm">{coupon.maxUses}</td>
                    <td className="p-3 md:p-4 text-gray-600 text-sm">
                      {new Date(coupon.expiresAt).toLocaleDateString("ar-MA")}
                    </td>
                    <td className="p-3 md:p-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          coupon.active ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                        }`}
                      >
                        {coupon.active ? "نشط" : "متوقف"}
                      </span>
                    </td>
                    <td className="p-3 md:p-4 text-center">
                      <button
                        onClick={() => deleteCoupon(coupon.id)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1"
                        title="حذف"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
