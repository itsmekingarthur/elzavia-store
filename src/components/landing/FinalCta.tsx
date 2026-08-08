import { formatPrice } from "@/lib/utils";
import RevealOnScroll from "./RevealOnScroll";
import { OFFER_PRICE, SAVINGS } from "./data";

export default function FinalCta() {
  return (
    <RevealOnScroll delay={100}>
      <section className="relative py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center bg-gradient-to-br from-gold-500/10 via-primary-500/5 to-gold-500/10 border-2 border-gold-500/20 rounded-3xl p-8 md:p-12">
            <div className="text-4xl md:text-5xl mb-4">🔥</div>
            <h2 className="text-xl md:text-3xl font-extrabold text-white mb-2">العرض لفترة <span className="text-gold-400">محدودة</span></h2>
            <p className="text-white/50 text-sm mb-2">منتجان بسعر {formatPrice(OFFER_PRICE)} — وفر {formatPrice(SAVINGS)}</p>
            <p className="text-emerald-400 text-xs font-medium mb-6">🚚 توصيل مجاني — 💳 الدفع عند الاستلام</p>
            <a href="#order-form"
              className="w-full block py-4 rounded-2xl font-extrabold text-base md:text-lg transition-all duration-200 active:scale-[0.97] bg-gradient-to-r from-gold-500 to-amber-500 text-surface-900 hover:from-gold-400 hover:to-amber-400 shadow-xl shadow-gold-500/30 hover:shadow-2xl hover:shadow-gold-500/40 animate-pulse-gold"
            >
              🎁 اطلب الآن بسعر {formatPrice(OFFER_PRICE)}
            </a>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
}
