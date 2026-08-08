import RevealOnScroll from "./RevealOnScroll";
import { whyElzavia } from "./data";

export default function WhyElzavia() {
  return (
    <RevealOnScroll delay={100}>
      <section className="relative py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">لماذا <span className="gradient-text">إلزافيا</span>؟</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center max-w-4xl mx-auto">
            <div className="aspect-square rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-10 flex items-center justify-center order-2 md:order-1">
              <img src="/images/landing page/trust.jpg" alt="الثقة والجودة" className="w-full h-full object-contain" />
            </div>
            <div className="space-y-3 order-1 md:order-2">
              {whyElzavia.map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/20 transition-all duration-300">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-white font-bold text-sm">{item.title}</p>
                    <p className="text-white/40 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
}
