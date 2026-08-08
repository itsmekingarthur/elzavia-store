"use client";

import Link from "next/link";

export default function SignupPrompt() {
  return (
    <div className="bg-gradient-to-r from-gold-500/10 to-primary-500/10 border border-gold-500/20 rounded-xl p-5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-gold-300 font-bold text-sm md:text-base leading-relaxed">
            سجل حساب واحصل على <span className="text-gold-400">نقاط خصم مجانية</span> مع كل طلب!
          </p>
          <p className="text-white/50 text-xs mt-1 leading-relaxed">
            50 نقطة لكل منتج تطلبه — كل 100 نقطة = 25 درهم خصم على طلبك التالي
          </p>
          <Link href="/auth/signup" className="inline-flex items-center gap-1.5 mt-3 bg-gold-500 hover:bg-gold-600 text-surface-900 text-xs font-bold px-4 py-2 rounded-lg transition-all duration-300 shadow-lg shadow-gold-500/20">
            إنشاء حساب جديد
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
