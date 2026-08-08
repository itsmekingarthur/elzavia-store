import { getHeaders, sanitize, supabaseUrl } from "./client";

export const ORDER_COLUMNS = [
  "id",
  "user_id",
  "items",
  "subtotal",
  "discount",
  "total",
  "coupon",
  "customer",
  "status",
  "createdAt",
];

export async function getOrders(userId?: string): Promise<any[]> {
  let url = `${supabaseUrl}/rest/v1/orders?select=*&order=createdAt.desc`;
  if (userId) url += `&user_id=eq.${encodeURIComponent(userId)}`;
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function addOrder(order: any) {
  const sanitized = sanitize(order, ORDER_COLUMNS);
  const res = await fetch(`${supabaseUrl}/rest/v1/orders`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(sanitized),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to add order: ${res.status} ${text}`);
  }
}

export async function updateOrder(id: string, updates: Partial<any>) {
  const sanitized = sanitize(updates, ORDER_COLUMNS);
  if (!Object.keys(sanitized).length) return;
  const res = await fetch(`${supabaseUrl}/rest/v1/orders?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(sanitized),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update order: ${res.status} ${text}`);
  }
}

export async function deleteOrder(id: string) {
  const res = await fetch(`${supabaseUrl}/rest/v1/orders?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to delete order: ${res.status} ${text}`);
  }
}
