import RevealOnScroll from "./RevealOnScroll";
import type { Product } from "@/data/products";

export default function BenefitsSection({ product }: { product: Product }) {
  return (
    <RevealOnScroll delay={100}>
      <section className="relative py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">
              <span className="gradient-text">فوائد</span> {product.name.split(" ").slice(0, 2).join(" ")}
            </h2>
            <p className="text-white/40 text-sm mt-2">مكمل غذائي طبيعي متكامل</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {product.benefits?.map((b) => (
              <div key={b} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/20 transition-all duration-300">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
}
