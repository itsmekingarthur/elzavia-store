"use client";

import Link from "next/link";

interface Props {
  cart: any[];
  getProductName: (productId: string) => string;
}

export default function CartTab({ cart, getProductName }: Props) {
  if (cart.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-bold text-white mb-4">السلة المحفوظة</h2>
        <div className="text-center py-12">
          <p className="text-white/40 mb-4">السلة فارغة</p>
          <Link href="/shop" className="btn-nature text-sm">تصفح المنتجات</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">السلة المحفوظة</h2>
      <div className="space-y-3">
        {cart.map((item, i) => (
          <div key={i} className="flex items-center justify-between bg-white/5 border border-white/5 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <span className="text-white/70">{getProductName(item.productId)}</span>
              {item.dealLabel && (
                <span className="text-emerald-400 text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full">{item.dealLabel}</span>
              )}
            </div>
            <span className="text-white/50 text-sm">الكمية: {item.quantity}</span>
          </div>
        ))}
        <Link href="/cart" className="btn-nature text-sm inline-flex items-center gap-2 mt-4">
          الذهاب إلى السلة
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
