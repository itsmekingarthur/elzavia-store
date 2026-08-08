"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

const categoryColors: Record<string, string> = {
  "الاسترخاء والأعصاب": "text-gold-300/90 bg-gold-500/10 border-gold-500/20",
  "النوم والاسترخاء": "text-gold-300/90 bg-gold-500/10 border-gold-500/20",
  "زيادة الوزن": "text-gold-300/90 bg-gold-500/10 border-gold-500/20",
  "الصحة العامة والطاقة": "text-primary-300/90 bg-primary-500/10 border-primary-500/20",
  "صحة المعدة والهضم": "text-primary-300/90 bg-primary-500/10 border-primary-500/20",
  "صحة الجهاز الهضمي": "text-primary-300/90 bg-primary-500/10 border-primary-500/20",
  "المناعة والطاقة": "text-sky-300/90 bg-sky-500/10 border-sky-500/20",
  "إدارة الوزن": "text-sky-300/90 bg-sky-500/10 border-sky-500/20",
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-[2px]" dir="ltr">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? "text-gold-400" : "text-white/20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product, offerMode }: { product: Product; offerMode?: boolean }) {
  const { addToCart } = useCart();

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;
  const rating = product.rating ?? 4.8;
  const reviews = product.reviews ?? 0;
  const categoryClass = categoryColors[product.category] || "text-primary-300/90 bg-primary-500/10 border-primary-500/20";

  if (offerMode) {
    return (
      <Link href={`/shop/${product.slug}?offer=b2g1`} className="group block h-full">
        <article className="relative flex flex-col h-full bg-[#0e2b1f] border border-gold-500/25 rounded-lg overflow-hidden transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-gold-500/50">
          <div className="relative aspect-[4/3] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(251,191,36,0.14),transparent_72%)]" />
            <img
              src={product.images?.[0] || "/images/placeholder.png"}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-contain p-3 md:p-4 transition-transform duration-[250ms] ease-out group-hover:scale-[1.03] drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
            />
          </div>
          <div className="flex flex-col flex-1 p-3.5 md:p-4">
            <p className="text-sm font-extrabold text-white line-clamp-1">{product.name}</p>
            <div className="mt-auto pt-3">
              <span className="block w-full text-center text-xs md:text-sm font-extrabold py-2.5 rounded-lg transition-all duration-[250ms] bg-gradient-to-r from-gold-500 to-amber-500 text-surface-900 group-hover:from-gold-400 group-hover:to-amber-400">
                🎁 استفد من العرض الآن
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <article className="group relative flex flex-col h-full bg-[#0e2b1f] border border-white/[0.08] rounded-lg overflow-hidden transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-primary-400/40 hover:shadow-[0_14px_35px_-12px_rgba(0,0,0,0.6)]">
      <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(52,211,153,0.10),transparent_72%)]" />
        {discount > 0 && (
          <span className="absolute top-2.5 right-2.5 z-10 inline-flex items-center bg-gold-500 text-emerald-950 text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-lg shadow-black/30">
            خصم {discount}%
          </span>
        )}
        <img
          src={product.images?.[0] || "/images/placeholder.png"}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain p-3 md:p-4 transition-transform duration-[250ms] ease-out group-hover:scale-[1.03] drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
        />
      </Link>

      <div className="flex flex-col flex-1 p-3.5 md:p-4">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${categoryClass}`}>
            {product.category || "عام"}
          </span>
          {product.weight && (
            <span className="text-[10px] text-white/35 font-medium whitespace-nowrap">{product.weight}</span>
          )}
        </div>

        <Link
          href={`/shop/${product.slug}`}
          className="text-sm md:text-[15px] font-extrabold text-white leading-snug hover:text-primary-300 transition-colors duration-[250ms] line-clamp-1"
        >
          {product.name}
        </Link>

        <p className="mt-1 text-xs md:text-[13px] leading-relaxed text-white/50 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-1.5 flex items-center gap-1.5 mb-3">
          <Stars rating={rating} />
          <span className="text-xs font-bold text-white/70">{rating.toFixed(1)}</span>
          <span className="text-xs text-white/35">({reviews.toLocaleString("ar-MA")})</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2.5 border-t border-white/[0.07]">
          <div className="flex flex-col leading-none min-w-0">
            {discount > 0 && (
              <span className="text-[10px] text-white/35 line-through mb-0.5">{formatPrice(product.oldPrice!)}</span>
            )}
            <span className="text-lg md:text-xl font-extrabold text-primary-300 leading-none">{formatPrice(product.price)}</span>
          </div>
          <button
            onClick={() => addToCart(product.id)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-bold bg-primary-500/15 text-primary-300 border border-primary-500/30 transition-all duration-[250ms] hover:bg-primary-500 hover:text-white hover:border-primary-500 active:scale-95 whitespace-nowrap"
            aria-label={`إضافة ${product.name} إلى السلة`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            أضف للسلة
          </button>
        </div>
      </div>
    </article>
  );
}
