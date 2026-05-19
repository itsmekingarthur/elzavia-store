"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";

function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || counted.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          counted.current = true;
          let start = 0;
          const duration = 1500;
          const step = 16;
          const totalSteps = duration / step;
          const inc = to / totalSteps;
          const timer = setInterval(() => {
            start += inc;
            if (start >= to) {
              setCount(to);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, step);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return (
    <div ref={ref} className="text-4xl md:text-6xl font-extrabold text-gold-400">
      {count}{suffix}
    </div>
  );
}

function SectionWave({ color }: { color: string }) {
  return (
    <div className="absolute left-0 right-0 h-16 md:h-24 pointer-events-none z-10" style={{ color }}>
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full">
        <path d="M0,50 C320,0 640,100 960,50 C1280,0 1440,50 1440,50 L1440,100 L0,100 Z" fill="currentColor" />
      </svg>
    </div>
  );
}

function FloatingRing({ className }: { className?: string }) {
  return <div className={`absolute rounded-full border border-gold-500/10 animate-spin-slow ${className}`} />;
}

function FloatingDiamond({ className }: { className?: string }) {
  return <div className={`absolute border border-gold-500/10 rotate-45 ${className}`} />;
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* Stats Bar */}
      <section className="relative py-12 md:py-16 bg-surface-950 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              { to: 500, suffix: "+", label: "عميل سعيد" },
              { to: 12, suffix: "", label: "منتج طبيعي" },
              { to: 30, suffix: "+", label: "مدينة مغربية" },
              { to: 48, suffix: "h", label: "توصيل سريع" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter to={stat.to} suffix={stat.suffix} />
                <p className="text-white/40 text-sm md:text-base font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-gradient-to-b from-surface-950 via-surface-900 to-surface-950">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="absolute inset-0 bg-gold-glow" />

        <FloatingRing className="top-20 -right-20 w-64 h-64 md:w-96 md:h-96 opacity-40" />
        <FloatingRing className="bottom-40 -left-20 w-48 h-48 md:w-72 md:h-72 opacity-30" />
        <FloatingDiamond className="top-40 left-[15%] w-8 h-8 md:w-12 md:h-12 opacity-30" />
        <FloatingDiamond className="bottom-60 right-[10%] w-6 h-6 md:w-8 md:h-8 opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14 md:mb-18">
            <span className="inline-block text-sm font-bold text-gold-400 bg-gold-500/10 backdrop-blur-md border border-gold-500/20 px-4 py-1.5 rounded-full mb-4">
              منتجاتنا
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
              تشكيلتنا <span className="gradient-text">المميزة</span>
            </h2>
            <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              اختر ما يناسب احتياجاتك من أفضل المكملات الغذائية الطبيعية
            </p>
          </div>

          <ProductGrid limit={4} />

          <div className="text-center mt-14 md:mt-18">
            <Link
              href="/shop"
              className="relative inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-amber-400 text-surface-900 px-10 md:px-14 py-3.5 md:py-4 rounded-xl font-bold text-base md:text-lg group shadow-2xl shadow-gold-500/20 hover:from-gold-400 hover:to-amber-300 transition-all duration-300 active:scale-95"
            >
              <span className="relative z-10">عرض جميع المنتجات</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-surface-950">
        <div className="absolute inset-0 bg-dots-light" />

        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />

        <FloatingRing className="top-30 right-[25%] w-32 h-32 md:w-40 md:h-40 opacity-20" />
        <FloatingRing className="bottom-20 left-[20%] w-20 h-20 md:w-28 md:h-28 opacity-15" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14 md:mb-18">
            <span className="inline-block text-sm font-bold text-gold-400 bg-gold-500/10 backdrop-blur-md border border-gold-500/20 px-4 py-1.5 rounded-full mb-4">
              لماذا إلزافيا
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
              مميزات <span className="text-gold-400">استثنائية</span>
            </h2>
            <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              نقدم لك أفضل تجربة تسوق للمكملات الغذائية
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "منتجات طبيعية 100%",
                desc: "نستخدم أفضل المكونات الطبيعية لضمان أعلى جودة وفعالية",
                accent: "text-gold-400",
                iconBg: "bg-gold-500/10",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "أسعار منافسة",
                desc: "أفضل قيمة مقابل المال بأسعار تناسب الجميع",
                accent: "text-amber-400",
                iconBg: "bg-amber-500/10",
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
                accent: "text-gold-300",
                iconBg: "bg-gold-500/10",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 shadow-lg hover:shadow-xl hover:shadow-gold-500/5 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.iconBg} ${feature.accent} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-extrabold text-white mb-2">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-gradient-to-b from-surface-950 via-surface-900 to-surface-950">
        <div className="absolute inset-0 bg-grid-dark opacity-50" />
        <div className="absolute inset-0 bg-amber-glow" />

        <FloatingRing className="top-10 right-[10%] w-40 h-40 md:w-56 md:h-56 opacity-20" />
        <FloatingRing className="bottom-10 left-[10%] w-28 h-28 md:w-40 md:h-40 opacity-15" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14 md:mb-18">
            <span className="inline-block text-sm font-bold text-gold-400 bg-gold-500/10 backdrop-blur-md border border-gold-500/20 px-4 py-1.5 rounded-full mb-4">
              آراء العملاء
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
              ماذا يقولون <span className="gradient-text">عنّا</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "محمد",
                text: "منتجات رائعة، حسيت بالفرق من أول أسبوع. الطاقة صارت أفضل والتركيز في العمل تطور بشكل ملحوظ.",
                rating: 5,
                from: "الدار البيضاء",
              },
              {
                name: "سارة",
                text: "جودة ممتازة وتوصيل سريع جداً. الطلب وصل في أقل من 24 ساعة. أنصح بالتجربة.",
                rating: 5,
                from: "الرباط",
              },
              {
                name: "أحمد",
                text: "بعد استخدام كبسولات التعافي العضلي، لاحظت فرق كبير في التمرين. منتج طبيعي وآمن.",
                rating: 5,
                from: "مراكش",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 hover:border-gold-500/20 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 font-extrabold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.from}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="relative py-16 md:py-20 bg-surface-950 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-white/40 text-sm font-bold tracking-widest uppercase">طرق الدفع والتوصيل</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "💵", title: "الدفع عند الاستلام", desc: "تدفع لما تستلم" },
                { icon: "🚚", title: "توصيل سريع", desc: "48 ساعة كحد أقصى" },
                { icon: "🛡️", title: "منتجات أصلية", desc: "مضمونة 100%" },
                { icon: "📞", title: "دعم متواصل", desc: "خدمة عملاء 24/7" },
              ].map((item) => (
                <div key={item.title} className="text-center p-4">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <p className="text-white font-bold text-sm mb-1">{item.title}</p>
                  <p className="text-white/40 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-surface-950">
        <div className="absolute inset-0 bg-gold-glow" />
        <div className="absolute inset-0 bg-grid-gold opacity-50" />

        <FloatingRing className="top-10 left-10 w-40 h-40 md:w-56 md:h-56 opacity-20" />
        <FloatingRing className="bottom-10 right-10 w-32 h-32 md:w-48 md:h-48 opacity-15" />

        <div className="absolute -top-40 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[150px]" />
        <div className="absolute -bottom-40 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px]" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block text-sm font-bold text-gold-400 bg-gold-500/10 backdrop-blur-md border border-gold-500/20 rounded-full px-4 py-1.5 mb-4">
            عرض خاص
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            استعد للانطلاق <br className="md:hidden" />
            <span className="gradient-text">مع إلزافيا</span>
          </h2>
          <p className="text-white/50 text-base md:text-xl max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed">
            ابدأ رحلتك نحو حياة أكثر صحة وطاقة. اطلب الآن واستفد من عروضنا الحصرية.
          </p>
          <Link
            href="/shop"
            className="relative inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-amber-400 text-surface-900 px-10 md:px-14 py-3.5 md:py-4 rounded-xl font-bold text-base md:text-lg group shadow-2xl shadow-gold-500/30 hover:from-gold-400 hover:to-amber-300 transition-all duration-300 active:scale-95"
          >
            <span className="relative z-10">تسوق الآن</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
