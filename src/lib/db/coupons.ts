import { getHeaders, supabaseUrl } from "./client";

export async function getCoupons(): Promise<any[]> {
  const res = await fetch(`${supabaseUrl}/rest/v1/coupons?select=*`, { headers: getHeaders() });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function addCoupon(coupon: any) {
  await fetch(`${supabaseUrl}/rest/v1/coupons`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(coupon),
  });
}

export async function deleteCoupon(id: string) {
  await fetch(`${supabaseUrl}/rest/v1/coupons?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
}
