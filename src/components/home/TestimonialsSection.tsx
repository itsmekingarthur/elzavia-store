"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";

const defaultTestimonials = [
  { name: "محمد", text: "المنتجات زوينة بزاف حسيت بالفرق من اول سيمانة وليت كنحس بالطاقة والتركيز ديالي تزاد فالخدمة", from: "الدار البيضاء" },
  { name: "سارة", text: "الجودة ممتازة بزاف وحتا التوصيل كان طيارة، الله يعطيكم الصحة", from: "الرباط" },
  { name: "أحمد", text: "من بعد ماخديت كبسولة التعافي العضلي، صراحة الفرق ولا كبير بزاف فالتمارين ديالي", from: "مراكش" },
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);

  useEffect(() => {
    const saved = localStorage.getItem("elzavia-testimonials");
    if (saved) {
      try { setTestimonials(JSON.parse(saved)); } catch {}
    }
  }, []);

  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-gradient-to-b from-emerald-950 via-primary-950 to-primary-950">
      <div className="absolute inset-0 bg-forest-deep" />
      <div className="container mx-auto px-4 relative z-10">
        <Reveal>
          <div className="text-center mb-14 md:mb-18">
            <span className="inline-block text-sm font-bold text-primary-300 bg-primary-500/10 backdrop-blur-md border border-primary-500/20 px-4 py-1.5 rounded-full mb-4">
              آراء العملاء
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
              ماذا يقولون <span className="gradient-text">عنّا</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={0.1 * i}>
              <div className="glass-nature rounded-2xl p-6 md:p-8 hover:border-primary-500/20 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-extrabold text-sm">{t.name[0]}</div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.from}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
