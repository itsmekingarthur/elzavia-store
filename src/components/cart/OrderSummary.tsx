"use client";

import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/context/CartContext";
import OfferB2G1 from "./OfferB2G1";
import PointsPanel from "./PointsPanel";
import CouponInput from "./CouponInput";
import DeliveryForm from "./DeliveryForm";

export interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountLabel: string;
  offerDiscount: number;
  pointsDiscount: number;
  userPoints: number;
  total: number;
  totalQty: number;
  cheapestPrice: number;
  offerB2G1: boolean;
  usePoints: boolean;
  couponCode: string;
  couponError: string;
  form: DeliveryFormState;
  submitting: boolean;
  onToggleOffer: () => void;
  onTogglePoints: () => void;
  onCouponChange: (v: string) => void;
  onApplyCoupon: () => void;
  onFormUpdate: (field: keyof DeliveryFormState, value: string) => void;
  onPlaceOrder: () => void;
}

import type { DeliveryFormState } from "./useCartCheckout";

export default function OrderSummary(props: OrderSummaryProps) {
  const {
    items,
    subtotal,
    discount,
    discountLabel,
    offerDiscount,
    pointsDiscount,
    userPoints,
    total,
    totalQty,
    cheapestPrice,
    offerB2G1,
    usePoints,
    couponCode,
    couponError,
    form,
    submitting,
    onToggleOffer,
    onTogglePoints,
    onCouponChange,
    onApplyCoupon,
    onFormUpdate,
    onPlaceOrder,
  } = props;

  const hasDeals = items.some((i) => i.dealDiscount && i.dealDiscount > 0);
  const canSubmit = !!form.name.trim() && !!form.phone.trim() && !!form.address.trim();

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 md:p-6 border border-white/10 h-fit">
      <h3 className="text-lg md:text-xl font-bold text-white mb-5 md:mb-6">ملخص الطلب</h3>

      <div className="space-y-3 mb-5 md:mb-6 pb-5 md:pb-6 border-b border-white/10">
        {hasDeals && (
          <div className="flex justify-between text-emerald-400 text-sm md:text-base">
            <span>خصم الباقات</span>
            <span className="font-bold">
              -{formatPrice(items.reduce((s, i) => s + (i.dealDiscount || 0), 0))}
            </span>
          </div>
        )}
        <div className="flex justify-between text-white/60 text-sm md:text-base">
          <span>المجموع الفرعي</span>
          <span className="font-bold">{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-emerald-400 text-sm md:text-base">
            <span>{discountLabel}</span>
            <span className="font-bold">-{formatPrice(discount)}</span>
          </div>
        )}
        {offerDiscount > 0 && (
          <div className="flex justify-between text-gold-400 text-sm md:text-base">
            <span>عرض 2+1 مجاناً</span>
            <span className="font-bold">-{formatPrice(offerDiscount)}</span>
          </div>
        )}
        {pointsDiscount > 0 && (
          <div className="flex justify-between text-gold-400 text-sm md:text-base">
            <span>خصم النقاط ({Math.floor(userPoints / 100) * 100} نقطة)</span>
            <span className="font-bold">-{formatPrice(pointsDiscount)}</span>
          </div>
        )}
        <div className="flex justify-between text-base md:text-lg">
          <span className="font-bold text-white">الإجمالي</span>
          <span className="font-extrabold text-primary-400">
            {formatPrice(total)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium pt-2 border-t border-white/5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          توصيل مجاني لجميع الطلبات
        </div>
        <OfferB2G1
          offerB2G1={offerB2G1}
          totalQty={totalQty}
          cheapestPrice={cheapestPrice}
          onToggle={onToggleOffer}
        />
        <PointsPanel
          userPoints={userPoints}
          usePoints={usePoints}
          pointsDiscount={pointsDiscount}
          onToggle={onTogglePoints}
        />
      </div>

      <CouponInput
        value={couponCode}
        error={couponError}
        onChange={onCouponChange}
        onApply={onApplyCoupon}
      />

      <DeliveryForm
        form={form}
        submitting={submitting}
        canSubmit={canSubmit}
        onUpdate={onFormUpdate}
        onSubmit={onPlaceOrder}
      />
    </div>
  );
}
