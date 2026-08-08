"use client";

import { formatPrice } from "@/lib/utils";

interface Props {
  userPoints: number;
  usePoints: boolean;
  pointsDiscount: number;
  onToggle: () => void;
}

export default function PointsPanel({ userPoints, usePoints, pointsDiscount, onToggle }: Props) {
  if (userPoints < 100) return null;

  return (
    <div className={`mt-4 pt-4 border-t border-white/10 rounded-xl p-4 transition-all duration-300 ${usePoints ? "bg-gold-500/15 border-gold-500/30" : "bg-white/5 border-white/10"}`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">⭐</span>
        <div className="flex-1">
          <p className="text-white text-sm font-bold">لديك {userPoints} نقطة</p>
          <p className="text-white/50 text-xs">كل 100 نقطة = 25 درهم خصم</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
          usePoints
            ? "bg-gold-500 text-surface-900 hover:bg-gold-400 shadow-lg shadow-gold-500/20"
            : "bg-gold-500/20 text-gold-400 hover:bg-gold-500/30 border border-gold-500/30"
        }`}
      >
        <span>{usePoints ? "✅" : "🎯"}</span>
        {usePoints
          ? `خصم ${formatPrice(pointsDiscount)} مطبق`
          : `استخدم ${Math.floor(userPoints / 100) * 100} نقطة ووفر ${formatPrice(Math.floor(userPoints / 100) * 25)}`
        }
      </button>
    </div>
  );
}
