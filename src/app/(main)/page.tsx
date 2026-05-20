"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Leaves from "@/components/Leaves";
import Link from "next/link";

const defaultTestimonials = [
  { name: "محمد", text: "المنتجات زوينة بزاف حسيت بالفرق من اول سيمانة وليت كنحس بالطاقة والتركيز ديالي تزاد فالخدمة", from: "الدار البيضاء" },
  { name: "سارة", text: "الجودة ممتازة بزاف وحتا التوصيل كان طيارة، الله يعطيكم الصحة", from: "الرباط" },
  { name: "أحمد", text: "من بعد ماخديت كبسولة التعافي العضلي، صراحة الفرق ولا كبير بزاف فالتمارين ديالي", from: "مراكش" },
];

export default function Home() {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);

  useEffect(() => {
    const saved = localStorage.getItem("elzavia-testimonials");
    if (saved) {
      try { setTestimonials(JSON.parse(saved)); } catch { /* use defaults */ }
    }
  }, []);

  return (
    <>
      <Hero />

      {/* Free Delivery Banner */}
      <section className="relative py-8 md:py-12 bg-gradient-to-r from-primary-900 via-emerald-900 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.08),transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-center">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span className="text-emerald-300 font-extrabold text-lg md:text-2xl">توصيل مجاني</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/10" />
            <p className="text-white/70 text-sm md:text-base">
              لجميع الطلبات - الدفع عند الاستلام
            </p>
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              <span className="text-emerald-400 text-xs font-bold">عرض محدود</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="relative pt-8 md:pt-16 pb-16 md:pb-32 overflow-hidden bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950">
        <div className="absolute inset-0 bg-forest" />
        <div className="absolute inset-0 bg-repeat bg-contain opacity-[0.04]" style={{ backgroundImage: "url(/images/naqch.png)" }} />

        <Leaves />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14 md:mb-18">
            <span className="inline-block text-sm font-bold text-primary-300 bg-primary-500/10 backdrop-blur-md border border-primary-500/20 px-4 py-1.5 rounded-full mb-4">
              منتجاتنا
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
              منتجات <span className="gradient-text">الطبيعة</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              اختر ما يناسب احتياجاتك من أفضل المكملات الغذائية الطبيعية
            </p>
          </div>

          <ProductGrid limit={4} />

          <div className="text-center mt-14 md:mt-18">
            <Link
              href="/shop"
              className="btn-nature text-base md:text-lg px-10 md:px-14 py-3.5 md:py-4 inline-flex items-center gap-2 group shadow-2xl shadow-primary-500/20"
            >
              عرض جميع المنتجات
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-gradient-to-b from-primary-950 via-primary-950 to-emerald-950">
        <div className="absolute inset-0 bg-dots-nature" />
        <div className="absolute inset-0 bg-earth-warm" />

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
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
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative glass-nature rounded-2xl p-6 md:p-8 hover:-translate-y-1 overflow-hidden"
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
      <section className="relative py-24 md:py-36 overflow-hidden bg-gradient-to-b from-emerald-950 via-primary-950 to-primary-950">
        <div className="absolute inset-0 bg-forest-deep" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14 md:mb-18">
            <span className="inline-block text-sm font-bold text-primary-300 bg-primary-500/10 backdrop-blur-md border border-primary-500/20 px-4 py-1.5 rounded-full mb-4">
              آراء العملاء
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
              ماذا يقولون <span className="gradient-text">عنّا</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="glass-nature rounded-2xl p-6 md:p-8 hover:border-primary-500/20 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
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
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="relative py-16 md:py-20 bg-primary-950 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-white/40 text-sm font-bold tracking-widest uppercase">خدماتنا</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: "🌿", title: "منتجات طبيعية", desc: "مكونات طبيعية 100%" },
              { icon: "🚚", title: "توصيل سريع", desc: "48 ساعة كحد أقصى" },
              { icon: "💎", title: "جودة مضمونة", desc: "أعلى معايير الجودة" },
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
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-gradient-to-br from-primary-950 via-emerald-950 to-primary-950">
        <div className="absolute inset-0">
          <img src="/images/atlas.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-950/80 via-emerald-950/75 to-primary-950/85" />
        </div>
        <div className="absolute -top-40 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-[150px]" />
        <div className="absolute -bottom-40 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500/8 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block text-sm font-bold text-gold-400 bg-gold-500/10 backdrop-blur-md border border-gold-500/20 rounded-full px-4 py-1.5 mb-4">
            عرض خاص
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            استعد للانطلاق <br className="md:hidden" />
            <span className="gradient-text">مع إلزافيا</span>
          </h2>
          <p className="text-white/60 text-base md:text-xl max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed">
            ابدأ رحلتك نحو حياة أكثر صحة وطاقة. اطلب الآن واستفد من عروضنا الحصرية.
          </p>
          <Link
            href="/shop"
            className="btn-nature text-base md:text-lg px-10 md:px-14 py-3.5 md:py-4 inline-flex items-center gap-2 group shadow-2xl shadow-primary-500/30"
          >
            تسوق الآن
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
