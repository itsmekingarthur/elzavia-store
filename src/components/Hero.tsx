import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-950 via-emerald-950 to-primary-950">

      <div className="absolute -top-40 -right-40 w-80 md:w-[40rem] h-80 md:h-[40rem] bg-primary-500/15 rounded-full blur-[120px] animate-pulse-soft" />
      <div className="absolute -bottom-40 -left-40 w-80 md:w-[40rem] h-80 md:h-[40rem] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse-soft" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/3 left-1/4 w-32 md:w-48 h-32 md:h-48 bg-primary-400/10 rounded-full blur-[80px] animate-float" />
      <div className="absolute bottom-1/4 right-1/3 w-24 md:w-36 h-24 md:h-36 bg-gold-400/10 rounded-full blur-[80px] animate-float-delayed" />

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-primary-950 to-transparent" />

      {/* Botanical background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute -left-20 md:-left-10 bottom-0 w-64 md:w-96 h-auto opacity-20" viewBox="0 0 400 600" fill="none">
          <path d="M50 600 Q80 450 180 350 Q280 250 250 100 Q240 50 200 20 Q160 50 150 100 Q120 250 220 350 Q320 450 350 600Z" fill="rgba(52,211,153,0.15)" />
          <path d="M100 600 Q130 500 200 420 Q270 340 240 200 Q230 120 200 80 Q170 120 160 200 Q130 340 200 420 Q270 500 300 600Z" fill="rgba(16,185,129,0.1)" />
          <path d="M150 600 Q170 520 220 450 Q270 380 260 250 Q255 180 220 140 Q185 180 180 250 Q170 380 220 450 Q270 520 290 600Z" fill="rgba(74,222,128,0.08)" />
        </svg>
        <svg className="absolute -right-20 md:-right-10 top-0 w-56 md:w-80 h-auto opacity-20 rotate-180" viewBox="0 0 400 600" fill="none">
          <path d="M50 600 Q80 450 180 350 Q280 250 250 100 Q240 50 200 20 Q160 50 150 100 Q120 250 220 350 Q320 450 350 600Z" fill="rgba(52,211,153,0.15)" />
          <path d="M100 600 Q130 500 200 420 Q270 340 240 200 Q230 120 200 80 Q170 120 160 200 Q130 340 200 420 Q270 500 300 600Z" fill="rgba(251,191,36,0.08)" />
        </svg>
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-auto opacity-[0.07]" viewBox="0 0 800 400" fill="none">
          <path d="M400 380 Q300 300 200 200 Q100 100 150 30 Q200 10 250 20 Q300 40 350 100 Q380 150 400 180 Q420 150 450 100 Q500 40 550 20 Q600 10 650 30 Q700 100 600 200 Q500 300 400 380Z" fill="rgba(52,211,153,0.5)" />
          <path d="M400 360 Q320 290 240 200 Q160 110 180 50 Q220 30 260 45 Q310 70 350 130 Q380 170 400 195 Q420 170 450 130 Q490 70 540 45 Q580 30 620 50 Q640 110 560 200 Q480 290 400 360Z" fill="rgba(16,185,129,0.4)" />
          <circle cx="300" cy="100" r="60" fill="rgba(52,211,153,0.3)" />
          <circle cx="500" cy="100" r="60" fill="rgba(52,211,153,0.3)" />
          <circle cx="400" cy="300" r="40" fill="rgba(251,191,36,0.2)" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-primary-950 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 pt-16 md:pt-44 pb-8 md:pb-22">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-8 mx-auto">
            <span className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
            <span className="text-primary-300/80 text-xs md:text-sm font-medium tracking-wide">مكملات طبيعية 100%</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-extrabold mb-3 md:mb-6 leading-[1.1]">
            <span className="text-white">غذاء لجسمك</span>
            <br />
            <span className="gradient-text">طاقة لحياتك</span>
          </h1>

          <p className="text-sm md:text-xl text-white/60 leading-relaxed max-w-2xl mb-6 md:mb-10 mx-auto">
            مكملات غذائية طبيعية 100% مصممة بدقة لدعم صحتك ورفع أدائك.
            اكتشف قوة الطبيعة الخام مع إلزافيا.
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
            <Link
              href="/shop"
              className="btn-nature text-sm md:text-lg px-6 md:px-10 py-3 md:py-4 flex items-center gap-2 group shadow-2xl shadow-primary-500/20"
            >
              <span>تسوق الآن</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="text-sm md:text-lg px-6 md:px-10 py-3 md:py-4 rounded-xl border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all duration-300 flex items-center gap-2"
            >
              <span>من نحن</span>
            </Link>
          </div>

          {/* Mobile-only decorative badges */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 md:hidden">
            <span className="text-[10px] bg-white/8 border border-white/10 text-white/50 px-3 py-1.5 rounded-full">🌿 طبيعي 100%</span>
            <span className="text-[10px] bg-white/8 border border-white/10 text-white/50 px-3 py-1.5 rounded-full">🇲🇦 مغربي</span>
            <span className="text-[10px] bg-white/8 border border-white/10 text-white/50 px-3 py-1.5 rounded-full">🚚 توصيل سريع</span>
          </div>

          <div className="hidden md:flex items-center justify-center gap-4 md:gap-5 mt-12 md:mt-16 pt-8 md:pt-12 border-t border-white/10 mx-auto max-w-xs">
            <img
              src="/images/logo.png"
              alt="Elzavia"
              className="h-14 md:h-20 w-auto brightness-0 invert opacity-70"
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
