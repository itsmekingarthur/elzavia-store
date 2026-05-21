import { Suspense } from "react";
import CartItems from "@/components/CartItems";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950">
      <div className="absolute inset-0 bg-forest pointer-events-none" />
      <div className="container mx-auto px-4 pt-28 pb-12 relative z-10">
        <h1 className="text-2xl md:text-5xl font-extrabold text-white text-center mb-8 md:mb-10">سلة الشراء</h1>
        <Suspense fallback={<div className="text-white/60 text-center">جاري التحميل...</div>}>
          <CartItems />
        </Suspense>
      </div>
    </div>
  );
}
