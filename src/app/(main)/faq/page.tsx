"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  { q: "هل منتجات ELZAVIA طبيعية؟", a: "نعم، منتجات ELZAVIA تعتمد على مكونات طبيعية مختارة بعناية لدعم الصحة والعافية اليومية." },
  { q: "متى تظهر نتائج المنتج؟", a: "قد تختلف النتائج من شخص لآخر حسب طبيعة الجسم وطريقة الاستخدام، لكن غالباً يبدأ المستخدم بملاحظة التحسن خلال فترة الاستخدام المنتظم." },
  { q: "هل المنتجات آمنة؟", a: "نحن نحرص على توفير منتجات عالية الجودة، ومع ذلك يُنصح دائماً باتباع طريقة الاستخدام الموصى بها وعدم تجاوز الجرعة المحددة." },
  { q: "هل يمكن استخدام المنتج يومياً؟", a: "نعم، يمكن استخدامه حسب التعليمات المرفقة مع المنتج." },
  { q: "هل يتوفر الدفع عند الاستلام؟", a: "نعم، نوفر خدمة الدفع عند الاستلام في أغلب المدن المغربية." },
  { q: "كم تستغرق مدة التوصيل؟", a: "مدة التوصيل تختلف حسب المدينة، وعادة تتراوح بين 24 إلى 72 ساعة." },
  { q: "هل التوصيل مجاني؟", a: "نعم، التوصيل مجاني لفترة محدودة أو حسب العروض المتوفرة بالموقع." },
  { q: "كيف يمكنني تأكيد طلبي؟", a: "بعد إتمام الطلب، سيقوم فريقنا بالتواصل معك لتأكيد معلومات التوصيل." },
  { q: "هل يمكنني إلغاء الطلب بعد تأكيده؟", a: "نعم، يمكن طلب الإلغاء قبل شحن الطلب عبر التواصل معنا بسرعة." },
  { q: "هل يمكن استرجاع أو استبدال المنتج؟", a: "يمكن طلب الاستبدال أو الاسترجاع في حال وجود خطأ أو تلف بالمنتج، بشرط التواصل معنا خلال المدة المحددة." },
  { q: "كيف يمكنني التواصل معكم؟", a: "" },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="relative min-h-screen bg-primary-950 overflow-hidden">
      <div className="absolute inset-0 bg-forest" />
      <div className="absolute inset-0 bg-dots-nature" />

      <section className="relative z-10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center mb-14 md:mb-18">
          <span className="inline-block text-sm font-bold text-primary-300 bg-primary-500/10 backdrop-blur-md border border-primary-500/20 px-4 py-1.5 rounded-full mb-4">
            الأسئلة الشائعة
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
            كل ما تريد <span className="gradient-text">معرفته</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            إجابات لأكثر الأسئلة شيوعاً عن منتجاتنا وخدماتنا
          </p>
        </div>

        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary-500/20"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full text-right p-4 md:p-6 flex items-center justify-between gap-4"
                >
                  <span className="text-white font-bold text-sm md:text-base leading-relaxed">{faq.q}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 md:h-6 md:w-6 text-primary-400 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {faq.a ? (
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-4 md:px-6 pb-4 md:pb-6">
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />
                      <p className="text-white/60 text-sm md:text-base leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-4 md:px-6 pb-4 md:pb-6">
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href="https://wa.me/21267702771"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2.5 text-emerald-400 hover:bg-emerald-500/20 transition-all text-sm font-bold"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          واتساب
                        </Link>
                        <Link
                          href="https://instagram.com/elzavia_shop"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-xl px-4 py-2.5 text-gold-400 hover:bg-gold-500/20 transition-all text-sm font-bold"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth={2} />
                            <circle cx="12" cy="12" r="4" strokeWidth={2} />
                            <circle cx="18" cy="6" r="1.2" fill="currentColor" />
                          </svg>
                          إنستغرام
                        </Link>
                        <Link
                          href="/contact"
                          className="flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-xl px-4 py-2.5 text-primary-400 hover:bg-primary-500/20 transition-all text-sm font-bold"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          صفحة اتصل بنا
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12 md:mt-16">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6">
              <span className="text-white/50 text-sm md:text-base">لم تجد إجابتك؟</span>
              <Link
                href="/contact"
                className="btn-nature text-sm !py-2 !px-4 md:!px-6"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
