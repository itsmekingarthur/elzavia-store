"use client";

import Link from "next/link";

export default function OffersTab() {
  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">العروض الخاصة</h2>
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-emerald-500/10 to-primary-500/10 border border-emerald-500/20 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-emerald-300 font-bold">توصيل مجاني لجميع الطلبات</p>
              <p className="text-white/50 text-xs mt-1">استمتع بتوصيل مجاني بدون أي شروط. عرض دائم لجميع المستخدمين.</p>
              <div className="flex items-center gap-1.5 mt-2 text-emerald-400/60 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>مفعل تلقائياً</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gold-500/10 to-primary-500/10 border border-gold-500/20 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-gold-300 font-bold">اشتري 2 واحصل على الثالث مجاناً</p>
              <p className="text-white/50 text-xs mt-1">أضف 3 منتجات إلى سلة التسوق وأقلهم سعراً مجاناً. العرض ساري على جميع المنتجات.</p>
              <Link href="/shop?offer=b2g1" className="inline-flex items-center gap-1.5 mt-3 bg-gold-500 hover:bg-gold-600 text-surface-900 text-xs font-bold px-4 py-2 rounded-lg transition-all duration-300">
                تصفح المنتجات والاستفادة من العرض
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
