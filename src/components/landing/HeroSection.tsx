import { formatPrice } from "@/lib/utils";
import CountdownTimer from "./CountdownTimer";
import { getLandingImages, OFFER_PRICE, ORIGINAL_VALUE, SAVINGS } from "./data";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
  selectedImage: number;
  onSelectImage: (i: number) => void;
  onOpenLightbox: () => void;
  orderCount: number;
}

export default function HeroSection({ product, selectedImage, onSelectImage, onOpenLightbox, orderCount }: Props) {
  const images = getLandingImages(product.name);

  return (
    <section className="relative pt-2 md:pt-6 pb-6 md:pb-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Image Gallery */}
          <div className="order-2 md:order-1">
            <div
              className="aspect-square rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-12 flex items-center justify-center mb-3 cursor-zoom-in group relative overflow-hidden"
              onClick={onOpenLightbox}
            >
              <img src={images[selectedImage].src} alt={images[selectedImage].alt} className="w-full h-full object-contain drop-shadow-2xl transition-all duration-500 group-hover:scale-105" />
              <div className="absolute top-4 -left-2 z-20">
                <div className="bg-gradient-to-r from-amber-500 to-gold-500 text-surface-900 text-sm md:text-base font-black px-4 py-1.5 rounded-r-xl shadow-xl shadow-gold-500/30 relative">
                  وفر {formatPrice(SAVINGS)}
                  <div className="absolute -bottom-2 left-0 w-0 h-0 border-t-[8px] border-t-amber-700 border-l-[8px] border-l-transparent" />
                </div>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => onSelectImage(i)}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 flex-shrink-0 overflow-hidden transition-all duration-200 ${
                    selectedImage === i ? "border-gold-500 shadow-md shadow-gold-500/20" : "border-white/10 opacity-50 hover:opacity-80"
                  }`}
                >
                  <img src={img.src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-1.5 bg-gold-500/20 border border-gold-500/30 text-gold-400 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full mb-3">
              <span>🔥</span> عرض خاص: اشتري 2 بـ {formatPrice(OFFER_PRICE)}
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-tight">
              {product.name}
            </h1>
            <p className="text-white/50 text-sm md:text-base leading-relaxed mb-4 line-clamp-2 md:line-clamp-none">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-2 mb-2">
              <span className="text-3xl md:text-4xl font-extrabold text-gold-400">{formatPrice(OFFER_PRICE)}</span>
              <span className="text-white/20 line-through text-sm">{formatPrice(ORIGINAL_VALUE)}</span>
              <span className="bg-emerald-500/15 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-full">وفر {formatPrice(SAVINGS)}</span>
            </div>
            <p className="text-white/40 text-xs mb-2">منتجان بسعر مخفض — الدفع عند الاستلام</p>

            {/* Countdown */}
            <div className="mb-3">
              <CountdownTimer />
            </div>

            {/* Offer Banner */}
            <div className="mb-4 md:mb-5 p-3 md:p-4 rounded-2xl bg-gradient-to-r from-gold-500/15 via-gold-500/5 to-gold-500/15 border border-gold-500/20">
              <div className="flex items-center justify-center gap-4 md:gap-6">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg md:text-xl">🔥</span>
                  <span className="text-gold-400 font-extrabold text-sm md:text-base">اشتري 2 بـ {formatPrice(OFFER_PRICE)}</span>
                </div>
                <div className="w-px h-6 bg-gold-500/20" />
                <div className="flex items-center gap-1.5">
                  <span className="text-lg md:text-xl">🚚</span>
                  <span className="text-emerald-400 font-extrabold text-sm md:text-base">توصيل مجاني</span>
                </div>
              </div>
            </div>

            {/* FOMO Counter */}
            <div className="text-center mb-3">
              <span className="text-white/50 text-xs">🔥 <span className="text-gold-400 font-bold">{orderCount}</span> شخص اشتروا هذا المنتج اليوم</span>
            </div>

            <a href="#order-form"
              className="hidden md:flex w-full py-4 rounded-2xl font-extrabold text-base md:text-lg transition-all duration-200 active:scale-[0.97] bg-gradient-to-r from-gold-500 to-amber-500 text-surface-900 hover:from-gold-400 hover:to-amber-400 shadow-xl shadow-gold-500/30 hover:shadow-2xl hover:shadow-gold-500/40 items-center justify-center gap-2 animate-pulse-gold"
            >
              🎁 استفد من العرض الآن
            </a>
            <p className="hidden md:block text-white/25 text-xs mt-2 text-center">🔒 الدفع عند الاستلام — توصيل مجاني</p>
          </div>
        </div>
      </div>
    </section>
  );
}
