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

export const coupons: Coupon[] = [
  {
    id: "1",
    code: "ELZAVIA10",
    type: "percentage",
    value: 10,
    minAmount: 0,
    maxUses: 100,
    usedCount: 0,
    expiresAt: "2026-12-31",
    active: true,
  },
  {
    id: "2",
    code: "WELCOME50",
    type: "fixed",
    value: 50,
    minAmount: 199,
    maxUses: 50,
    usedCount: 0,
    expiresAt: "2026-12-31",
    active: true,
  },
  {
    id: "3",
    code: "SAVE20",
    type: "percentage",
    value: 20,
    minAmount: 398,
    maxUses: 30,
    usedCount: 0,
    expiresAt: "2026-12-31",
    active: true,
  },
];

export function validateCoupon(code: string, cartTotal: number): Coupon | null {
  const coupon = coupons.find(
    (c) =>
      c.code.toLowerCase() === code.toLowerCase() &&
      c.active &&
      c.usedCount < c.maxUses &&
      new Date(c.expiresAt) > new Date() &&
      cartTotal >= c.minAmount
  );
  return coupon || null;
}
