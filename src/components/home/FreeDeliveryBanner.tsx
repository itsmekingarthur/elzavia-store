"use client";

export default function FreeDeliveryBanner() {
  return (
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
        <div className="mt-3 overflow-hidden whitespace-nowrap text-emerald-400/20 text-xs font-bold animate-marquee">
          ✦ توصيل مجاني لجميع الطلبات ✦ الدفع عند الاستلام ✦ جودة مضمونة ✦
        </div>
      </div>
    </section>
  );
}
