"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function OfferPointsBanner() {
  const { user } = useAuth();

  if (user) return null;

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="bg-gradient-to-r from-gold-500/10 via-primary-500/5 to-gold-500/10 border border-gold-500/20 rounded-2xl p-5 md:p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xl">⭐</span>
          <span className="text-gold-400 font-extrabold text-sm">نظام النقاط</span>
        </div>
        <p className="text-white/70 text-sm leading-relaxed mb-3">
          سجل حساب مجاني واربح <span className="text-gold-300 font-bold">50 نقطة</span> مع كل منتج تطلبه! كل 100 نقطة = 25 درهم خصم على طلبك التالي.
        </p>
        <Link
          href="/auth/signup"
          className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-surface-900 font-extrabold text-xs px-5 py-2 rounded-xl transition-all duration-300 shadow-lg shadow-gold-500/20"
        >
          ✨ إنشاء حساب مجاني
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
