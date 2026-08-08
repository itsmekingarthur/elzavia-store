"use client";

import { useCartCheckout } from "./cart/useCartCheckout";
import CartItemRow from "./cart/CartItemRow";
import OrderSummary from "./cart/OrderSummary";
import OrderSuccess from "./cart/OrderSuccess";
import EmptyCart from "./cart/EmptyCart";
import SignupPrompt from "./cart/SignupPrompt";

export default function CartItems() {
  const {
    items,
    products,
    removeFromCart,
    updateQuantity,
    user,
    form,
    updateForm,
    subtotal,
    pointsDiscount,
    userPoints,
    setUsePoints,
    usePoints,
    totalQty,
    cheapestPrice,
    offerDiscount,
    offerB2G1,
    setOfferB2G1,
    total,
    couponCode,
    setCouponCode,
    discount,
    discountLabel,
    couponError,
    applyCoupon,
    placeOrder,
    submitting,
    submitted,
  } = useCartCheckout();

  if (submitted) {
    return <OrderSuccess offerDiscount={offerDiscount} />;
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
      <div className="lg:col-span-2 space-y-3 md:space-y-4">
        {/* Offer mode banner */}
        {offerB2G1 && (
          <div className="bg-gradient-to-r from-gold-500/15 to-amber-500/10 border-2 border-gold-500/30 rounded-xl p-5 text-center">
            <div className="text-3xl mb-2">🎁</div>
            <p className="text-gold-300 font-extrabold text-lg">سارع للاستفادة من عرض اشتري 2 + 1 مجاناً</p>
            <p className="text-white/50 text-sm mt-1">أقل منتج سعراً مجاني — أضف 3 منتجات للسلة لتفعيل العرض</p>
          </div>
        )}

        {/* Signup prompt for points - hidden when logged in */}
        {!user && <SignupPrompt />}

        {items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;
          return (
            <CartItemRow
              key={item.productId}
              item={item}
              product={product}
              onDecrease={() => updateQuantity(item.productId, item.quantity - 1)}
              onIncrease={() => updateQuantity(item.productId, item.quantity + 1)}
              onRemove={() => removeFromCart(item.productId)}
            />
          );
        })}
      </div>

      <OrderSummary
        items={items}
        subtotal={subtotal}
        discount={discount}
        discountLabel={discountLabel}
        offerDiscount={offerDiscount}
        pointsDiscount={pointsDiscount}
        userPoints={userPoints}
        total={total}
        totalQty={totalQty}
        cheapestPrice={cheapestPrice}
        offerB2G1={offerB2G1}
        usePoints={usePoints}
        couponCode={couponCode}
        couponError={couponError}
        form={form}
        submitting={submitting}
        onToggleOffer={() => setOfferB2G1(!offerB2G1)}
        onTogglePoints={() => setUsePoints(!usePoints)}
        onCouponChange={setCouponCode}
        onApplyCoupon={applyCoupon}
        onFormUpdate={updateForm}
        onPlaceOrder={placeOrder}
      />
    </div>
  );
}
