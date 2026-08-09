"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { products, type Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

const goals = [
  { id: "sleep", label: "النوم والاسترخاء", dot: "bg-violet-400", productIds: ["5", "1"] },
  { id: "energy", label: "الطاقة والنشاط", dot: "bg-gold-400", productIds: ["2", "3"] },
  { id: "immunity", label: "المناعة والحيوية", dot: "bg-sky-400", productIds: ["3", "2"] },
  { id: "digest", label: "صحة المعدة والهضم", dot: "bg-emerald-400", productIds: ["4", "6"] },
  { id: "gain", label: "زيادة الوزن", dot: "bg-amber-400", productIds: ["7"] },
  { id: "fatloss", label: "خسارة الوزن", dot: "bg-rose-400", productIds: ["8"] },
];

export default function ProductFinder() {
  const [activeGoal, setActiveGoal] = useState(goals[0].id);

  const matched = useMemo(() => {
    const goal = goals.find((g) => g.id === activeGoal);
    if (!goal) return [];
    return goal.productIds
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, [activeGoal]);

  return (
    <section className="relative py-16 md:py-28 overflow-hidden bg-gradient-to-b from-primary-950 via-emerald-950/40 to-primary-950">
      <div className="absolute inset-0 bg-dots-nature" />
      <div className="container mx-auto px-4 relative z-10">
        <Reveal>
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block text-sm font-bold text-primary-300 bg-primary-500/10 backdrop-blur-md border border-primary-500/20 px-4 py-1.5 rounded-full mb-4">
              اختَر بحسب هدفك
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
              اختَر المنتج <span className="gradient-text">المناسب لك</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              أخبرنا بهدفك وسنقترح عليك المنتجات الأنسب لك
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex gap-2 md:gap-3 overflow-x-auto pb-3 md:pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center md:flex-wrap md:overflow-visible scrollbar-hide">
            {goals.map((goal) => {
              const active = goal.id === activeGoal;
              return (
                <button
                  key={goal.id}
                  onClick={() => setActiveGoal(goal.id)}
                  className={`flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border flex-shrink-0 ${
                    active
                      ? "bg-gradient-to-r from-primary-500 to-emerald-500 text-white border-transparent shadow-lg shadow-primary-500/25 scale-[1.03]"
                      : "bg-white/[0.04] border-white/10 text-white/60 hover:text-white hover:border-white/25"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${goal.dot} ${active ? "bg-white" : ""}`} />
                  {goal.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5 max-w-5xl mx-auto mt-6 md:mt-10">
            {matched.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10 md:mt-14">
            <Link
              href="/shop"
              className="text-sm md:text-base text-primary-300 hover:text-primary-200 font-bold inline-flex items-center gap-2 transition-colors duration-300"
            >
              تصفح جميع المنتجات
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
