export function formatPrice(price: number): string {
  return `${price.toLocaleString("ar-MA")} درهم`;
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ELZ-${timestamp}-${random}`;
}
