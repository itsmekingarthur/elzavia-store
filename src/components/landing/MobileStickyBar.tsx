import { formatPrice } from "@/lib/utils";
import { OFFER_PRICE, ORIGINAL_VALUE } from "./data";

export default function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-primary-950/95 backdrop-blur-xl border-t border-white/10 p-3 shadow-2xl shadow-black/50">
      <div className="flex items-center justify-between gap-2">
        <div className="flex-shrink-0">
          <p className="text-white/40 text-[9px]">عرض خاص - منتجان</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-white font-extrabold text-lg">{formatPrice(OFFER_PRICE)}</span>
            <span className="text-white/20 text-xs line-through">{formatPrice(ORIGINAL_VALUE)}</span>
          </div>
        </div>
        <a href="#order-form" className="flex-1 py-3.5 px-4 rounded-2xl font-extrabold text-sm transition-all duration-200 active:scale-[0.95] bg-gradient-to-r from-gold-500 to-amber-500 text-surface-900 shadow-xl shadow-gold-500/30 hover:shadow-2xl hover:shadow-gold-500/40 hover:from-gold-400 hover:to-amber-400 animate-pulse-gold text-center block">
          🎁 اطلب الآن
        </a>
      </div>
    </div>
  );
}
