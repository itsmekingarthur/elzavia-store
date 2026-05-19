import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-emerald-950">
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="absolute -top-40 -right-40 w-80 md:w-[40rem] h-80 md:h-[40rem] bg-primary-500/15 rounded-full blur-[120px] animate-pulse-soft" />
      <div className="absolute -bottom-40 -left-40 w-80 md:w-[40rem] h-80 md:h-[40rem] bg-gold-500/10 rounded-full blur-[120px] animate-pulse-soft" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/3 left-1/4 w-32 md:w-48 h-32 md:h-48 bg-emerald-400/10 rounded-full blur-[80px] animate-float" />
      <div className="absolute bottom-1/4 right-1/3 w-24 md:w-36 h-24 md:h-36 bg-gold-400/10 rounded-full blur-[80px] animate-float-delayed" />

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-emerald-950 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-24 md:py-40">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 mb-6 md:mb-8">
            <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
            <span className="text-gold-300 text-xs md:text-sm font-medium tracking-wide">مكملات طبيعية 100%</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 md:mb-6 leading-[1.1]">
            <span className="text-white">غذاء لجسمك</span>
            <br />
            <span className="gradient-text">طاقة لحياتك</span>
          </h1>

          <p className="text-base md:text-xl text-white/60 leading-relaxed max-w-2xl mb-8 md:mb-10">
            مكملات غذائية طبيعية 100% مصممة بدقة لدعم صحتك ورفع أدائك.
            اكتشف قوة الطبيعة الخام مع إلزافيا.
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4">
            <Link
              href="/shop"
              className="btn-gold text-base md:text-lg px-8 md:px-10 py-3.5 md:py-4 flex items-center gap-2 group shadow-2xl shadow-gold-500/20"
            >
              تسوق الآن
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 hover:bg-white/20 hover:shadow-lg flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              تعرف علينا
            </Link>
          </div>

          <div className="flex items-center gap-4 md:gap-5 mt-12 md:mt-16 pt-8 md:pt-12 border-t border-white/10">
            <img
              src="/images/logo.png"
              alt="Elzavia"
              className="h-14 md:h-20 w-auto brightness-0 invert opacity-80"
            />
            <div className="w-px h-10 md:h-14 bg-white/10" />
            <div className="text-white/50 text-xs md:text-sm font-medium leading-relaxed">
              مكملات غذائية طبيعية <br className="hidden md:block" />
              100% مغربية
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
