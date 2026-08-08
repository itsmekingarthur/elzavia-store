export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minAmount: number;
  maxUses: number;
  usedCount: number;
  expiresAt: string;
  active: boolean;
}

export function validateCoupon(code: string, cartTotal: number, coupons: Coupon[]): Coupon | null {
  return (
    coupons.find(
      (c) =>
        c.code.toLowerCase() === code.toLowerCase() &&
        c.active &&
        c.usedCount < c.maxUses &&
        new Date(c.expiresAt) > new Date() &&
        cartTotal >= c.minAmount
    ) || null
  );
}
