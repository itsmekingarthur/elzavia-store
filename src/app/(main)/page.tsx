"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Leaves from "@/components/Leaves";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const defaultTestimonials = [
  { name: "محمد", text: "المنتجات زوينة بزاف حسيت بالفرق من اول سيمانة وليت كنحس بالطاقة والتركيز ديالي تزاد فالخدمة", from: "الدار البيضاء" },
  { name: "سارة", text: "الجودة ممتازة بزاف وحتا التوصيل كان طيارة، الله يعطيكم الصحة", from: "الرباط" },
  { name: "أحمد", text: "من بعد ماخديت كبسولة التعافي العضلي، صراحة الفرق ولا كبير بزاف فالتمارين ديالي", from: "مراكش" },
];

export default function Home() {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const { user } = useAuth();

  useEffect(() => {
    const saved = localStorage.getItem("elzavia-testimonials");
    if (saved) {
      try { setTestimonials(JSON.parse(saved)); } catch {}
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-emerald-400 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <span className="text-emerald-400 text-xs font-bold animate-shimmer-slow" style={{ background: "linear-gradient(90deg, #34d399, #6ee7b7, #34d399)", backgroundSize: "200% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>عرض محدود</span>
            </div>
          </div>
          {/* Animated marquee line */}
          <div className="mt-3 overflow-hidden whitespace-nowrap text-emerald-400/20 text-xs font-bold animate-marquee">
            ✦ توصيل مجاني لجميع الطلبات ✦ الدفع عند الاستلام ✦ جودة مضمونة ✦
          </div>
        </div>
      </section>

      {/* Offers CTA */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-b from-primary-950 via-primary-900 to-emerald-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.06),transparent_70%)]" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-gold-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-[120px]" />
        <Leaves />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-gold-500/10 via-primary-500/5 to-emerald-500/10 backdrop-blur-xl rounded-3xl border border-gold-500/20 p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-right">
                <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 text-gold-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
                  🎁 عرض 2+1
                </div>
                <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
                  اشتري 2 <span className="gradient-text-gold">واحصل على الثالث مجاناً</span>
                </h2>
                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
                  عرض حصري لفترة محدودة! اشتري منتجين واحصل على الثالث مجاناً مع توصيل مجاني.
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <Link
                    href="/shop?offer=b2g1"
                    className="bg-gold-500 hover:bg-gold-600 text-surface-900 font-extrabold text-sm px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-gold-500/20 inline-flex items-center gap-2"
                  >
                    🎁 استفد من العرض
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  {!user && (
                    <Link
                      href="/auth/signup"
                      className="border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 inline-flex items-center gap-2"
                    >
                      ✨ سجل واحصل على النقاط
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-gold-500/20 to-amber-500/10 rounded-full flex items-center justify-center border-2 border-gold-500/30">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl">🎁</div>
                    <div className="text-gold-400 font-extrabold text-xs md:text-sm mt-1">2+1 مجاناً</div>
                  </div>
                </div>
              </div>
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
          <Reveal>
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
          </Reveal>

          <Reveal delay={0.15}>
            <ProductGrid limit={4} />
          </Reveal>

          <Reveal delay={0.3}>
            <div className="text-center mt-14 md:mt-18">
              <Link
                href="/shop"
                className="btn-nature text-base md:text-lg px-10 md:px-14 py-3.5 md:py-4 inline-flex items-center gap-2 group shadow-2xl shadow-primary-500/20 shine-btn"
              >
                عرض جميع المنتجات
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
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
            ].map((feature, i) => (
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

      {/* Testimonials */}
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

      {/* Trust */}
      <section className="relative py-16 md:py-20 bg-primary-950 border-t border-white/5">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center mb-10">
              <h3 className="text-white/40 text-sm font-bold tracking-widest uppercase">خدماتنا</h3>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: "🌿", title: "منتجات طبيعية", desc: "مكونات طبيعية 100%" },
              { icon: "🚚", title: "توصيل سريع", desc: "48 ساعة كحد أقصى" },
              { icon: "💎", title: "جودة مضمونة", desc: "أعلى معايير الجودة" },
              { icon: "📞", title: "دعم متواصل", desc: "خدمة عملاء 24/7" },
            ].map((item, i) => (
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

      {/* Offers + Points CTA */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-gradient-to-br from-primary-950 via-emerald-950 to-primary-950">
        <div className="absolute inset-0">
          <img src="/images/atlas.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-950/80 via-emerald-950/75 to-primary-950/85" />
        </div>
        <div className="absolute -top-40 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-[150px]" />
        <div className="absolute -bottom-40 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500/8 rounded-full blur-[100px]" />

        <Reveal>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="inline-block text-sm font-bold text-gold-400 bg-gold-500/10 backdrop-blur-md border border-gold-500/20 rounded-full px-4 py-1.5 mb-4">
              ⭐ نظام النقاط
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
              اربح <span className="gradient-text-gold">50 نقطة</span> مع كل منتج
            </h2>
            <p className="text-white/60 text-base md:text-xl max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed">
              سجل حساب الآن وابدأ بجمع النقاط مع كل طلب. كل 100 نقطة = 25 درهم خصم على طلبك التالي. بالإضافة إلى عروض حصرية للمشتركين.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/auth/signup"
                className="bg-gold-500 hover:bg-gold-600 text-surface-900 font-extrabold text-base md:text-lg px-8 md:px-12 py-3.5 md:py-4 rounded-xl transition-all duration-300 shadow-lg shadow-gold-500/20 inline-flex items-center gap-2"
              >
                ✨ إنشاء حساب مجاني
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/shop?offer=b2g1"
                className="border border-white/20 text-white hover:bg-white/5 font-bold text-base md:text-lg px-8 md:px-12 py-3.5 md:py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-2"
              >
                🎁 عرض 2+1
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
