"use client";

import RevealOnScroll from "./RevealOnScroll";
import { landingFaqs } from "./data";

interface Props {
  faqOpen: number | null;
  onToggle: (i: number) => void;
}

export default function FaqSection({ faqOpen, onToggle }: Props) {
  return (
    <RevealOnScroll delay={100}>
      <section className="relative py-10 md:py-16 bg-gradient-to-b from-primary-950 via-primary-900/20 to-primary-950">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">الأسئلة <span className="gradient-text">الشائعة</span></h2>
          </div>
          <div className="space-y-2">
            {landingFaqs.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden transition-all duration-300">
                <button onClick={() => onToggle(i)} className="w-full text-right p-4 flex items-center justify-between gap-3">
                  <span className="text-white font-bold text-sm">{faq.q}</span>
                  <svg className={`w-4 h-4 text-white/40 flex-shrink-0 transition-transform duration-300 ${faqOpen === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {faqOpen === i && (
                  <div className="px-4 pb-4 animate-fade-in-up">
                    <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
}
