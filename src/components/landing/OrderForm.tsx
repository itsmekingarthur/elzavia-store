"use client";

import { formatPrice } from "@/lib/utils";
import { OFFER_PRICE } from "./data";
import type { Product } from "@/data/products";
import type { CustomerForm, FormErrors, FormTouched } from "./useLandingPage";

interface Props {
  product: Product;
  form: CustomerForm;
  errors: FormErrors;
  touched: FormTouched;
  submitting: boolean;
  onUpdateField: (field: keyof CustomerForm, value: string) => void;
  onBlurField: (field: keyof FormErrors) => void;
  onPlaceOrder: () => void;
}

const inputBase =
  "w-full text-sm bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 transition-all";

function inputClass(hasError: boolean) {
  return `${inputBase} ${
    hasError
      ? "border-red-400/50 focus:border-red-400 focus:ring-red-400/20"
      : "border-white/10 focus:border-gold-500/50 focus:ring-gold-500/20"
  }`;
}

export default function OrderForm({ product, form, errors, touched, submitting, onUpdateField, onBlurField, onPlaceOrder }: Props) {
  return (
    <div id="order-form">
      <section className="relative py-10 md:py-16 bg-gradient-to-b from-primary-950 via-primary-900/30 to-primary-950">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block text-sm font-bold text-primary-300 bg-primary-500/10 backdrop-blur-md border border-primary-500/20 px-4 py-1.5 rounded-full mb-4">
                الطلب الآن
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white">
                اشتري 2 بـ <span className="text-gold-400">{formatPrice(OFFER_PRICE)}</span>
              </h2>
              <p className="text-white/40 text-sm mt-2">املأ المعلومات وسنتصل بك لتأكيد الطلب</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/10 to-emerald-500/10 flex items-center justify-center border border-white/10 overflow-hidden flex-shrink-0">
                  <img src={product.images[0]} alt={product.name} className="w-3/4 h-3/4 object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm">{product.name} <span className="text-white/40">× 2</span></p>
                  <p className="text-gold-400 font-extrabold text-base">{formatPrice(OFFER_PRICE)}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <input type="text" value={form.name}
                    onChange={(e) => onUpdateField("name", e.target.value)}
                    onBlur={() => onBlurField("name")}
                    placeholder="الاسم الكامل" autoComplete="name"
                    className={inputClass(!!errors.name && touched.name)} />
                  {errors.name && touched.name && <p className="text-red-400 text-xs mt-1 mr-1">{errors.name}</p>}
                </div>
                <div>
                  <input type="tel" value={form.phone}
                    onChange={(e) => onUpdateField("phone", e.target.value)}
                    onBlur={() => onBlurField("phone")}
                    placeholder="رقم الهاتف" autoComplete="tel" inputMode="numeric"
                    className={inputClass(!!errors.phone && touched.phone)} />
                  {errors.phone && touched.phone && <p className="text-red-400 text-xs mt-1 mr-1">{errors.phone}</p>}
                </div>
                <div>
                  <textarea value={form.address}
                    onChange={(e) => onUpdateField("address", e.target.value)}
                    onBlur={() => onBlurField("address")}
                    placeholder="العنوان كاملاً" rows={3} autoComplete="street-address"
                    className={inputClass(!!errors.address && touched.address)} />
                  {errors.address && touched.address && <p className="text-red-400 text-xs mt-1 mr-1">{errors.address}</p>}
                </div>
                <textarea value={form.notes} onChange={(e) => onUpdateField("notes", e.target.value)}
                  placeholder="ملاحظات (اختياري)" rows={2}
                  className={`${inputBase} focus:border-gold-500/50 focus:ring-gold-500/20`} />

                {/* Payment Icons + Price */}
                <div className="bg-gold-500/10 border border-gold-500/20 rounded-xl p-4 text-center">
                  <p className="text-gold-400 font-extrabold text-lg">{formatPrice(OFFER_PRICE)}</p>
                  <p className="text-gold-400/60 text-xs">المجموع (شامل التوصيل المجاني)</p>
                  <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-gold-500/10">
                    <span className="text-white/30 text-[10px] font-medium">نقبل</span>
                    <svg className="w-8 h-5 text-white/40" viewBox="0 0 48 32" fill="none"><rect x="0.5" y="0.5" width="47" height="31" rx="3.5" stroke="currentColor" strokeOpacity="0.2"/><path d="M17 10h4l-3 12h-4l3-12zm7 0h3.5l2.5 12h-3.5l-2.5-12zm-12 0h4l-1.5 12h-4L12 10z" fill="currentColor" fillOpacity="0.5"/><circle cx="36" cy="16" r="5" fill="currentColor" fillOpacity="0.3"/></svg>
                    <svg className="w-8 h-5 text-white/40" viewBox="0 0 48 32" fill="none"><rect x="0.5" y="0.5" width="47" height="31" rx="3.5" stroke="currentColor" strokeOpacity="0.2"/><circle cx="19" cy="16" r="7" fill="currentColor" fillOpacity="0.3"/><circle cx="29" cy="16" r="7" fill="currentColor" fillOpacity="0.2"/></svg>
                    <span className="text-white/30 text-[10px] font-medium px-2 py-0.5 rounded border border-white/10">💵 نقداً</span>
                  </div>
                </div>

                <button onClick={onPlaceOrder} disabled={submitting}
                  className="w-full py-4 rounded-2xl font-extrabold text-base transition-all duration-200 active:scale-[0.97] bg-gradient-to-r from-gold-500 to-amber-500 text-surface-900 hover:from-gold-400 hover:to-amber-400 shadow-xl shadow-gold-500/30 hover:shadow-2xl hover:shadow-gold-500/40 animate-pulse-gold disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-none"
                >
                  {submitting ? "جاري إرسال الطلب..." : "🔥 اطلب الان"}
                </button>

                <div className="relative flex items-center gap-3 py-1">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-white/30 text-xs">أو عبر واتساب</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* One-Click WhatsApp Button */}
                <button onClick={() => {
                  window.open(`https://wa.me/+21267702771?text=${encodeURIComponent("مرحبا، أريد طلب الكبسولات الذهبية للطاقة (2 قطع) بسعر 249 درهم مع توصيل مجاني")}`, "_blank");
                }}
                  className="w-full py-3.5 rounded-xl font-extrabold text-sm transition-all duration-200 active:scale-[0.97] bg-emerald-500/15 text-emerald-400 border-2 border-emerald-500/30 hover:bg-emerald-500/25 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  طلب سريع عبر واتساب
                  <span className="text-[9px] text-emerald-400/50">بدون تعبئة النموذج</span>
                </button>

                <p className="text-center text-white/25 text-xs">🚚 توصيل مجاني — 💳 الدفع عند الاستلام</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
