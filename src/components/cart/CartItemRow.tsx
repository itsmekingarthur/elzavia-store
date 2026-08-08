"use client";

import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/context/CartContext";

interface Props {
  item: CartItem;
  product: any;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
}

export default function CartItemRow({ item, product, onDecrease, onIncrease, onRemove }: Props) {
  return (
    <div className="flex items-center gap-3 md:gap-4 bg-white/5 backdrop-blur-md rounded-xl p-3 md:p-4 border border-white/10">
      <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary-500/10 to-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-white/10 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-3/4 h-3/4 object-contain"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-white text-sm md:text-base truncate">
          {product.name}
        </h3>
        <p className="text-primary-400 font-bold text-sm md:text-base mt-0.5 md:mt-1">
          {formatPrice(product.price)}
        </p>
        {item.dealLabel && item.dealDiscount && item.dealDiscount > 0 && (
          <p className="text-emerald-400 text-[10px] md:text-xs font-medium mt-0.5">
            {item.dealLabel} (وفر {formatPrice(item.dealDiscount)})
          </p>
        )}
      </div>
      <div className="flex items-center gap-1 md:gap-2">
        <button
          onClick={onDecrease}
          className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-primary-500 hover:text-primary-400 transition-colors text-sm md:text-base text-white/80"
        >
          -
        </button>
        <span className="w-6 md:w-8 text-center font-bold text-sm md:text-base text-white">{item.quantity}</span>
        <button
          onClick={onIncrease}
          className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-primary-500 hover:text-primary-400 transition-colors text-sm md:text-base text-white/80"
        >
          +
        </button>
      </div>
      <div className="text-left min-w-[60px] md:min-w-[80px]">
        <p className="text-sm md:text-lg font-bold text-white">
          {formatPrice(product.price * item.quantity)}
        </p>
      </div>
      <button
        onClick={onRemove}
        className="text-red-400/70 hover:text-red-400 transition-colors p-1 flex-shrink-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
