"use client";

import type { DeliveryFormState } from "./useCartCheckout";

interface Props {
  form: DeliveryFormState;
  submitting: boolean;
  canSubmit: boolean;
  onUpdate: (field: keyof DeliveryFormState, value: string) => void;
  onSubmit: () => void;
}

const fieldClass =
  "w-full text-sm md:text-base bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all";

export default function DeliveryForm({ form, submitting, canSubmit, onUpdate, onSubmit }: Props) {
  return (
    <div className="space-y-3 md:space-y-4">
      <h4 className="font-bold text-white text-sm md:text-base">معلومات التوصيل</h4>
      <div>
        <label htmlFor="order-name" className="sr-only">الاسم الكامل</label>
        <input
          id="order-name"
          type="text"
          value={form.name}
          onChange={(e) => onUpdate("name", e.target.value)}
          placeholder="الاسم الكامل"
          autoComplete="name"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="order-phone" className="sr-only">رقم الهاتف</label>
        <input
          id="order-phone"
          type="tel"
          value={form.phone}
          onChange={(e) => onUpdate("phone", e.target.value)}
          placeholder="رقم الهاتف"
          autoComplete="tel"
          inputMode="numeric"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="order-address" className="sr-only">العنوان كاملاً</label>
        <textarea
          id="order-address"
          value={form.address}
          onChange={(e) => onUpdate("address", e.target.value)}
          placeholder="العنوان كاملاً"
          autoComplete="street-address"
          rows={3}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="order-notes" className="sr-only">ملاحظات (اختياري)</label>
        <textarea
          id="order-notes"
          value={form.notes}
          onChange={(e) => onUpdate("notes", e.target.value)}
          placeholder="ملاحظات (اختياري)"
          rows={2}
          className={fieldClass}
        />
      </div>
      <button
        onClick={onSubmit}
        disabled={!canSubmit || submitting}
        className="btn-nature w-full text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "جاري إرسال الطلب..." : "تأكيد الطلب (دفع عند الاستلام)"}
      </button>
    </div>
  );
}
