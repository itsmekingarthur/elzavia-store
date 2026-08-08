import RevealOnScroll from "./RevealOnScroll";
import { testimonials } from "./data";

export default function ReviewsSection() {
  return (
    <RevealOnScroll delay={100}>
      <section className="relative py-10 md:py-14 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">
              ماذا قال <span className="gradient-text">عملاؤنا</span>
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[320px] snap-start bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 flex-shrink-0">
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p>
                <p className="text-white/40 text-xs font-bold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
}
