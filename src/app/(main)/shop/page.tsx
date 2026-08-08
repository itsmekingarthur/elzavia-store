import ProductGrid from "@/components/ProductGrid";
import OfferPointsBanner from "@/components/OfferPointsBanner";
import SectionHeader from "@/components/shop/SectionHeader";
import BenefitsBar from "@/components/shop/BenefitsBar";

export default function ShopPage({
  searchParams,
}: {
  searchParams?: { offer?: string };
}) {
  const isOffer = searchParams?.offer === "b2g1";

  return (
    <div className="relative min-h-screen bg-primary-950 overflow-hidden">
      <div className="absolute inset-0 bg-forest" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {isOffer ? (
          <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
            <div className="relative">
              {/* Decorative glow */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-gold-500/10 rounded-full blur-[100px]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-gold-500/20 border-2 border-gold-500/40 text-gold-400 text-sm font-bold px-6 py-2 rounded-full mb-4 shadow-lg shadow-gold-500/10">
                  🔥 عرض خاص لفترة محدودة
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
                  <span className="gradient-text-gold">اشتري 2</span> بـ <span className="gradient-text-gold">249 درهم فقط</span>
                </h1>
                <p className="text-white/60 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
                  عرض حصري! اشتري الكبسولات الذهبية للطاقة بسعر 249 درهم فقط مع توصيل مجاني. وفر 149 درهم عن السعر الأصلي.
                </p>
                <div className="flex items-center justify-center gap-4 md:gap-6 mt-6 flex-wrap">
                  <div className="flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-xl px-4 py-2">
                    <span className="text-lg">🔥</span>
                    <span className="text-gold-300 font-bold text-sm">اشتري 2 بـ 249</span>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2">
                    <span className="text-lg">🚚</span>
                    <span className="text-emerald-300 font-bold text-sm">توصيل مجاني</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <SectionHeader
            title={
              <>
                الأكثر <span className="gradient-text">طلباً</span>
              </>
            }
            subtitle="اكتشف المنتجات التي يفضلها عملاؤنا"
          />
        )}

        {isOffer && <OfferPointsBanner />}
        <ProductGrid offerMode={isOffer} />
        {!isOffer && <BenefitsBar />}
      </div>
    </div>
  );
}
