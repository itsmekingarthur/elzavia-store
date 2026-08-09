"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const faqs = [
  { q: "هل منتجات ELZAVIA طبيعية؟", a: "نعم، منتجات ELZAVIA تعتمد على مكونات طبيعية مختارة بعناية لدعم الصحة والعافية اليومية." },
  { q: "متى تظهر نتائج المنتج؟", a: "قد تختلف النتائج من شخص لآخر حسب طبيعة الجسم وطريقة الاستخدام، لكن غالباً يبدأ المستخدم بملاحظة التحسن خلال فترة الاستخدام المنتظم." },
  { q: "هل يمكن استخدام المنتج يومياً؟", a: "نعم، يمكن استخدامه حسب التعليمات المرفقة مع المنتج." },
  { q: "هل يتوفر الدفع عند الاستلام؟", a: "نعم، نوفر خدمة الدفع عند الاستلام في أغلب المدن المغربية." },
  { q: "كم تستغرق مدة التوصيل؟", a: "مدة التوصيل تختلف حسب المدينة، وعادة تتراوح بين 24 إلى 72 ساعة." },
  { q: "هل التوصيل مجاني؟", a: "نعم، التوصيل مجاني لفترة محدودة أو حسب العروض المتوفرة بالموقع." },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="relative py-16 md:py-28 overflow-hidden bg-gradient-to-b from-primary-950 via-primary-950 to-emerald-950">
      <div className="absolute inset-0 bg-forest" />
      <div className="container mx-auto px-4 relative z-10">
        <Reveal>
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block text-sm font-bold text-gold-400 bg-gold-500/10 backdrop-blur-md border border-gold-500/20 px-4 py-1.5 rounded-full mb-4">
              الأسئلة الشائعة
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
              كل ما تريد <span className="gradient-text">معرفته</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="max-w-3xl mx-auto space-y-2.5 md:space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary-500/25"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full text-right p-4 md:p-5 flex items-center justify-between gap-4"
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
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 md:px-5 pb-4 md:pb-5">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-3.5" />
                    <p className="text-white/60 text-sm md:text-base leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center pt-4">
              <Link
                href="/faq"
                className="text-sm md:text-base text-primary-300 hover:text-primary-200 font-bold inline-flex items-center gap-2 transition-colors duration-300"
              >
                عرض جميع الأسئلة
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
