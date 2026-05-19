import ProductGrid from "@/components/ProductGrid";
import Leaves from "@/components/Leaves";

export default function ShopPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-surface-50 to-white overflow-hidden">
      <Leaves className="absolute inset-0 z-0" />

      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary-900/5 to-transparent" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <span className="inline-block text-sm font-bold text-primary-600 bg-primary-50/80 backdrop-blur-sm border border-primary-100/50 px-4 py-1.5 rounded-full mb-4">
            المتجر
          </span>
          <h1 className="section-title">
            منتجات <span className="gradient-text">إلزافيا</span>
          </h1>
          <p className="section-subtitle max-w-lg mx-auto">
            تصفح جميع منتجاتنا من المكملات الغذائية الطبيعية المصممة لدعم صحتك
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-px w-12 bg-gradient-to-l from-primary-500/30 to-transparent" />
            <svg className="w-4 h-4 text-primary-500/30" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 5C50 5 20 30 15 55C10 80 30 95 50 95C70 95 90 80 85 55C80 30 50 5 50 5Z" />
            </svg>
            <div className="h-px w-12 bg-gradient-to-r from-primary-500/30 to-transparent" />
          </div>
        </div>

        <ProductGrid />
      </div>
    </div>
  );
}
