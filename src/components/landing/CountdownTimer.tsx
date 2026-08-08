"use client";

import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return { h: 23, m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-1.5 text-xs md:text-sm">
      <span className="text-white/40">ينتهي العرض خلال</span>
      <div className="flex items-center gap-1 font-mono font-extrabold" dir="ltr">
        <span className="bg-white/10 text-gold-400 px-2 py-0.5 rounded-md min-w-[26px] text-center">{pad(timeLeft.h)}</span>
        <span className="text-white/20">:</span>
        <span className="bg-white/10 text-gold-400 px-2 py-0.5 rounded-md min-w-[26px] text-center">{pad(timeLeft.m)}</span>
        <span className="text-white/20">:</span>
        <span className="bg-white/10 text-gold-400 px-2 py-0.5 rounded-md min-w-[26px] text-center">{pad(timeLeft.s)}</span>
      </div>
    </div>
  );
}
