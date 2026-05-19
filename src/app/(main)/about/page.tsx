import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-surface-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-30" />
      <div className="absolute inset-0 bg-gold-glow" />

      <section className="relative z-10 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center mb-14 md:mb-18">
          <span className="inline-block text-sm font-bold text-gold-400 bg-gold-500/10 backdrop-blur-md border border-gold-500/20 px-4 py-1.5 rounded-full mb-4">
            عن إلزافيا
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
            علامتنا <span className="gradient-text">الموثوقة</span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            نقدم أفضل المكملات الغذائية الطبيعية لدعم صحتك ورفاهيتك
          </p>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-12 mb-10">
              <p className="text-white/70 text-base md:text-lg leading-relaxed md:leading-relaxed mb-6">
                إلزافيا علامة مغربية موثوقة متخصصة في المكملات الغذائية الطبيعية. نؤمن بقوة الطبيعة في دعم الصحة والرفاهية، ونسعى لتقديم أفضل المنتجات الطبيعية التي تساعدك على تحقيق أهدافك الصحية.
              </p>
              <p className="text-white/50 text-base md:text-lg leading-relaxed md:leading-relaxed">
                جميع منتجاتنا مصنوعة من مكونات طبيعية 100%، ونحرص على أعلى معايير الجودة والسلامة. نقدم لك الدعم الكامل في رحلتك نحو حياة أكثر صحة وطاقة.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "01", title: "اختر المنتج", desc: "تصفح منتجاتنا الطبيعية واختر ما يناسب احتياجاتك" },
                { step: "02", title: "اطلب أونلاين", desc: "قدم طلبك بسهولة عبر موقعنا وحدد عنوان التوصيل" },
                { step: "03", title: "استلم طلبك", desc: "نوصلك طلبك في أسرع وقت إلى أي مكان في المغرب" },
              ].map((item) => (
                <div key={item.step} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:border-gold-500/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center font-extrabold text-sm mx-auto mb-4">{item.step}</div>
                  <h3 className="text-white font-extrabold text-lg mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/shop" className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-amber-400 text-surface-900 px-8 py-3.5 rounded-xl font-bold text-base hover:from-gold-400 hover:to-amber-300 transition-all duration-300 shadow-lg shadow-gold-500/20">
                تسوق الآن
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
