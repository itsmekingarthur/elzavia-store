import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-emerald-950 via-primary-950 to-primary-900">
        <div className="absolute inset-0 bg-forest-glow" />
        <div className="absolute inset-0 bg-dots opacity-40" />

        <div className="absolute -bottom-20 -left-10 md:-left-20 w-48 md:w-72 h-96 opacity-30 pointer-events-none z-0">
          <svg viewBox="0 0 300 600" fill="none" className="w-full h-full">
            <path d="M 280 580 Q 220 500 180 420 Q 140 340 130 280 Q 120 220 140 160 Q 160 100 200 60" stroke="rgba(120,80,40,0.3)" strokeWidth="12" strokeLinecap="round" fill="none" />
            <path d="M 200 60 Q 210 40 220 30" stroke="rgba(120,80,40,0.2)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 180 420 Q 150 400 120 410" stroke="rgba(120,80,40,0.2)" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M 140 280 Q 110 250 90 260" stroke="rgba(120,80,40,0.2)" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="220" cy="35" r="6" fill="rgba(52,211,153,0.2)" />
            <circle cx="120" cy="408" r="5" fill="rgba(34,197,94,0.15)" />
            <circle cx="90" cy="258" r="4" fill="rgba(16,185,129,0.12)" />
          </svg>
        </div>

        <div className="absolute -top-20 -right-10 md:-right-20 w-48 md:w-72 h-96 opacity-30 pointer-events-none z-0 rotate-180">
          <svg viewBox="0 0 300 600" fill="none" className="w-full h-full">
            <path d="M 20 20 Q 80 80 120 160 Q 160 240 170 320 Q 180 400 160 460 Q 140 520 100 580" stroke="rgba(120,80,40,0.3)" strokeWidth="12" strokeLinecap="round" fill="none" />
            <path d="M 100 580 Q 90 600 85 610" stroke="rgba(120,80,40,0.2)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 120 160 Q 150 140 170 150" stroke="rgba(120,80,40,0.2)" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M 170 400 Q 200 420 220 410" stroke="rgba(120,80,40,0.2)" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="85" cy="605" r="6" fill="rgba(52,211,153,0.2)" />
            <circle cx="170" cy="148" r="5" fill="rgba(34,197,94,0.15)" />
            <circle cx="220" cy="412" r="4" fill="rgba(16,185,129,0.12)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-sm font-bold text-primary-300 bg-primary-500/10 backdrop-blur-md border border-primary-500/20 px-4 py-1.5 rounded-full mb-4">
              منتجاتنا
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
              منتجاتنا <span className="gradient-text">المميزة</span>
            </h2>
            <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              اختر ما يناسب احتياجاتك من أفضل المكملات الغذائية الطبيعية
            </p>
          </div>

          <div className="relative perspective-1000 preserve-3d">
            <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-r from-primary-500/5 via-transparent to-primary-500/5 rounded-[3rem] blur-3xl" />
            <ProductGrid limit={4} />
          </div>

          <div className="text-center mt-12 md:mt-16">
            <Link href="/shop" className="btn-gold text-base md:text-lg px-10 md:px-14 py-3.5 md:py-4 inline-flex items-center gap-2 group shadow-2xl shadow-gold-500/10">
              عرض جميع المنتجات
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-primary-900 via-earth-900 to-amber-950">
        <div className="absolute inset-0 bg-earth-glow" />

        <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 opacity-20 pointer-events-none">
          <svg viewBox="0 0 200 300" fill="none" className="w-full h-full">
            <path d="M100 280 Q5 200 20 100 Q30 20 100 10 Q170 20 180 100 Q195 200 100 280Z" fill="rgba(251,191,36,0.15)" />
            <path d="M100 280 L100 20" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 opacity-20 pointer-events-none rotate-180">
          <svg viewBox="0 0 200 300" fill="none" className="w-full h-full">
            <path d="M100 280 Q5 200 20 100 Q30 20 100 10 Q170 20 180 100 Q195 200 100 280Z" fill="rgba(245,158,11,0.15)" />
            <path d="M100 280 L100 20" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-sm font-bold text-gold-300 bg-gold-500/10 backdrop-blur-md border border-gold-500/20 px-4 py-1.5 rounded-full mb-4">
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "منتجات طبيعية 100%",
                desc: "نستخدم أفضل المكونات الطبيعية لضمان أعلى جودة وفعالية",
                border: "border-emerald-500/20",
                iconBg: "bg-emerald-500/10",
                iconColor: "text-emerald-400",
                glow: "from-emerald-500/5",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "أسعار منافسة",
                desc: "أفضل قيمة مقابل المال بأسعار تناسب الجميع",
                border: "border-gold-500/20",
                iconBg: "bg-gold-500/10",
                iconColor: "text-gold-400",
                glow: "from-gold-500/5",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "توصيل سريع",
                desc: "توصيل إلى جميع مدن المغرب في أسرع وقت ممكن",
                border: "border-blue-500/20",
                iconBg: "bg-blue-500/10",
                iconColor: "text-blue-400",
                glow: "from-blue-500/5",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 shadow-lg hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.iconBg} ${feature.iconColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 border border-white/5`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">{feature.desc}</p>
                <div className={`absolute bottom-0 left-6 right-6 h-px rounded-full bg-gradient-to-r from-transparent ${feature.glow} via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-amber-950 via-primary-950 to-primary-950">
        <div className="absolute inset-0 bg-gold-glow" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="absolute -top-40 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[150px]" />
        <div className="absolute -bottom-40 left-0 w-96 h-96 bg-primary-400/10 rounded-full blur-[150px]" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block text-sm font-bold text-gold-300 bg-gold-500/10 backdrop-blur-md border border-gold-500/20 rounded-full px-4 py-1.5 mb-4">
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
            className="btn-gold text-base md:text-lg px-10 md:px-14 py-3.5 md:py-4 inline-flex items-center gap-2 group shadow-2xl shadow-gold-500/30"
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
