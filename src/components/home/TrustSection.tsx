"use client";

import Reveal from "@/components/Reveal";

const items = [
  { icon: "🌿", title: "منتجات طبيعية", desc: "مكونات طبيعية 100%" },
  { icon: "🚚", title: "توصيل سريع", desc: "48 ساعة كحد أقصى" },
  { icon: "💎", title: "جودة مضمونة", desc: "أعلى معايير الجودة" },
  { icon: "📞", title: "دعم متواصل", desc: "خدمة عملاء 24/7" },
];

export default function TrustSection() {
  return (
    <section className="relative py-16 md:py-20 bg-primary-950 border-t border-white/5">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="text-center mb-10">
            <h3 className="text-white/40 text-sm font-bold tracking-widest uppercase">خدماتنا</h3>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={0.08 * i}>
              <div className="text-center p-4">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="text-white font-bold text-sm mb-1">{item.title}</p>
                <p className="text-white/40 text-xs">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
