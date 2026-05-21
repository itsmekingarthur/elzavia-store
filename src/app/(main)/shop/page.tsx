import ProductGrid from "@/components/ProductGrid";

export default function ShopPage({
  searchParams,
}: {
  searchParams?: { offer?: string };
}) {
  return (
    <div className="relative min-h-screen bg-primary-950 overflow-hidden">
      <div className="absolute inset-0 bg-forest" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          {searchParams?.offer === "b2g1" && (
            <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 text-gold-400 text-sm font-bold px-5 py-2 rounded-full mb-4">
              🎁 عرض 2+1 مفعل — أقل منتج مجاناً
            </div>
          )}
          <span className="inline-block text-sm font-bold text-primary-300 bg-primary-500/10 backdrop-blur-md border border-primary-500/20 px-4 py-1.5 rounded-full mb-4">
            المتجر
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
            منتجات <span className="gradient-text">إلزافيا</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
            تصفح جميع منتجاتنا من المكملات الغذائية الطبيعية المصممة لدعم صحتك
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-px w-12 bg-gradient-to-l from-primary-500/30 to-transparent" />
            <svg className="w-4 h-4 text-primary-400/30" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 5C50 5 20 30 15 55C10 80 30 95 50 95C70 95 90 80 85 55C80 30 50 5 50 5Z" />
            </svg>
            <div className="h-px w-12 bg-gradient-to-r from-primary-500/30 to-transparent" />
          </div>
        </div>

        <ProductGrid offerMode={searchParams?.offer === "b2g1"} />
      </div>
    </div>
  );
}
