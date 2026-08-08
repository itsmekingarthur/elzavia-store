"use client";

import { formatPrice } from "@/lib/utils";

interface Props {
  offerB2G1: boolean;
  totalQty: number;
  cheapestPrice: number;
  onToggle: () => void;
}

export default function OfferB2G1({ offerB2G1, totalQty, cheapestPrice, onToggle }: Props) {
  if (totalQty < 3) return null;

  return (
    <div className={`mt-4 pt-4 border-t border-white/10 rounded-xl p-4 transition-all duration-300 ${offerB2G1 ? "bg-gold-500/15 border-gold-500/30" : "bg-white/5 border-white/10"}`}>
      <div className="flex items-center gap-3 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
        <div className="flex-1">
          <p className="text-white text-sm font-bold">عرض: اشتري 2 واحصل على 1 مجاناً</p>
          <p className="text-white/50 text-xs">اقل منتج سعراً مجاني — وفر {formatPrice(cheapestPrice)}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
          offerB2G1
            ? "bg-gold-500 text-surface-900 hover:bg-gold-400 shadow-lg shadow-gold-500/20"
            : "bg-gold-500/20 text-gold-400 hover:bg-gold-500/30 border border-gold-500/30"
        }`}
      >
        <span>{offerB2G1 ? "✅" : "🎁"}</span>
        <span>{offerB2G1 ? "العرض مفعل" : "استفد من العرض"}</span>
      </button>
    </div>
  );
}
