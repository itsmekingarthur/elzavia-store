import { formatPrice } from "@/lib/utils";
import { SAVINGS } from "./data";

export default function FloatingBadge() {
  return (
    <div className="fixed top-24 md:top-28 left-2 md:left-4 z-40 animate-float">
      <div className="bg-gradient-to-br from-amber-500 via-gold-500 to-amber-600 text-surface-900 rounded-2xl p-2.5 md:p-3.5 shadow-2xl shadow-gold-500/40 text-center border-2 border-gold-400/30 relative overflow-hidden">
        <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        <div className="relative">
          <div className="text-base md:text-xl font-black tracking-tight leading-none">-37%</div>
          <div className="text-[8px] md:text-[10px] font-bold opacity-80 mt-0.5">وفر {formatPrice(SAVINGS)}</div>
        </div>
      </div>
    </div>
  );
}
