import RevealOnScroll from "./RevealOnScroll";
import { trustFeatures } from "./data";

export default function TrustBar() {
  return (
    <RevealOnScroll>
      <section className="relative py-6 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
            {trustFeatures.map((item) => (
              <div key={item.title} className="text-center p-3 md:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-xl md:text-2xl mb-1">{item.icon}</div>
                <p className="text-white font-bold text-xs md:text-sm">{item.title}</p>
                <p className="text-white/30 text-[10px] md:text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
}
