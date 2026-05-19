import ProductGrid from "@/components/ProductGrid";

export default function ShopPage() {
  return (
    <div className="relative min-h-screen bg-surface-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark" />
      <div className="absolute inset-0 bg-gold-glow" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <span className="inline-block text-sm font-bold text-gold-400 bg-gold-500/10 backdrop-blur-md border border-gold-500/20 px-4 py-1.5 rounded-full mb-4">
            المتجر
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
            منتجات <span className="gradient-text">إلزافيا</span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
            تصفح جميع منتجاتنا من المكملات الغذائية الطبيعية المصممة لدعم صحتك
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-px w-12 bg-gradient-to-l from-gold-500/30 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-gold-500/30" />
            <div className="h-px w-12 bg-gradient-to-r from-gold-500/30 to-transparent" />
          </div>
        </div>

        <ProductGrid />
      </div>
    </div>
  );
}
