import RevealOnScroll from "./RevealOnScroll";
import type { Product } from "@/data/products";

export default function IngredientsSection({ product }: { product: Product }) {
  return (
    <RevealOnScroll delay={100}>
      <section className="relative py-10 md:py-16 bg-gradient-to-b from-primary-950 via-primary-900/30 to-primary-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">مكونات <span className="gradient-text">طبيعية</span></h2>
            <p className="text-white/40 text-sm mt-2">تركيبة متوازنة من أفضل المكونات</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center max-w-4xl mx-auto">
            <div className="space-y-2">
              {product.ingredients?.map((ing) => (
                <div key={ing} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-white/70 text-sm">{ing}</span>
                </div>
              ))}
            </div>
            <div className="aspect-square rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-10 flex items-center justify-center">
              <img src="/images/landing page/ingredients.jpg" alt="المكونات الطبيعية" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
}
