import { getHeaders, supabaseUrl } from "./client";
import { products } from "@/data/products";

export async function getProducts(): Promise<any[]> {
  return products;
}

export async function addProduct(product: any) {
  const res = await fetch(`${supabaseUrl}/rest/v1/products`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to add product: ${res.status} ${text}`);
  }
}

export async function updateProduct(id: string, updates: Partial<any>) {
  await fetch(`${supabaseUrl}/rest/v1/products?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(updates),
  });
}

export async function deleteProduct(id: string) {
  await fetch(`${supabaseUrl}/rest/v1/products?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
}
