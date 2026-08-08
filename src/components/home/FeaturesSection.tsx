"use client";

import Reveal from "@/components/Reveal";

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "منتجات طبيعية 100%",
    desc: "نستخدم أفضل المكونات الطبيعية لضمان أعلى جودة وفعالية",
    accent: "text-primary-400",
    iconBg: "bg-primary-500/10",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "أسعار منافسة",
    desc: "أفضل قيمة مقابل المال بأسعار تناسب الجميع",
    accent: "text-gold-400",
    iconBg: "bg-gold-500/10",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "توصيل سريع",
    desc: "توصيل إلى جميع مدن المغرب في أسرع وقت ممكن",
    accent: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-gradient-to-b from-primary-950 via-primary-950 to-emerald-950">
      <div className="absolute inset-0 bg-dots-nature" />
      <div className="absolute inset-0 bg-earth-warm" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <Reveal>
          <div className="text-center mb-14 md:mb-18">
            <span className="inline-block text-sm font-bold text-gold-400 bg-gold-500/10 backdrop-blur-md border border-gold-500/20 px-4 py-1.5 rounded-full mb-4">
              لماذا إلزافيا
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
              مميزات <span className="gradient-text-gold">طبيعية</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              نقدم لك أفضل تجربة تسوق للمكملات الغذائية
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={0.1 * i}>
              <div className="group relative glass-nature rounded-2xl p-6 md:p-8 hover:-translate-y-1 overflow-hidden">
                <div className={`w-12 h-12 rounded-xl ${feature.iconBg} ${feature.accent} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-extrabold text-white mb-2">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
