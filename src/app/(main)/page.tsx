import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="py-16 md:py-28 relative">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-block text-sm font-bold text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full mb-4">
              منتجاتنا
            </span>
            <h2 className="section-title">منتجاتنا المميزة</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              اختر ما يناسب احتياجاتك من أفضل المكملات الغذائية الطبيعية
            </p>
          </div>
          <ProductGrid limit={4} />
          <div className="text-center mt-10 md:mt-16">
            <Link href="/shop" className="btn-primary text-base md:text-lg px-8 md:px-12 py-3.5 md:py-4 inline-flex items-center gap-2 group">
              عرض جميع المنتجات
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-surface-50" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold-500/5 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-block text-sm font-bold text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full mb-4">
              لماذا إلزافيا
            </span>
            <h2 className="section-title">مميزاتنا</h2>
            <p className="section-subtitle max-w-xl mx-auto">
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
                gradient: "from-emerald-500 to-green-600",
                bg: "bg-emerald-50",
                text: "text-emerald-600",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "أسعار منافسة",
                desc: "أفضل قيمة مقابل المال بأسعار تناسب الجميع",
                gradient: "from-gold-500 to-amber-600",
                bg: "bg-amber-50",
                text: "text-amber-600",
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
                gradient: "from-blue-500 to-indigo-600",
                bg: "bg-blue-50",
                text: "text-blue-600",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.text} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-surface-900 mb-2">{feature.title}</h3>
                <p className="text-surface-500 leading-relaxed">{feature.desc}</p>
                <div className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r from-transparent via-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
        <div className="absolute -top-40 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[150px]" />
        <div className="absolute -bottom-40 left-0 w-96 h-96 bg-primary-400/10 rounded-full blur-[150px]" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block text-sm font-bold text-gold-400 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 mb-4">
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
            className="btn-gold text-base md:text-lg px-10 md:px-14 py-3.5 md:py-4 inline-flex items-center gap-2 group shadow-2xl shadow-gold-500/20"
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
