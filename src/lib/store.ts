import { supabase } from "./supabase";

// ---------- Orders ----------
export async function getOrders(): Promise<any[]> {
  const { data } = await supabase.from("orders").select("*").order("createdAt", { ascending: false });
  return data || [];
}

export async function addOrder(order: any) {
  await supabase.from("orders").insert(order);
}

export async function updateOrder(id: string, updates: Partial<any>) {
  await supabase.from("orders").update(updates).eq("id", id);
}

export async function deleteOrder(id: string) {
  await supabase.from("orders").delete().eq("id", id);
}

// ---------- Coupons ----------
export async function getCoupons(): Promise<any[]> {
  const { data } = await supabase.from("coupons").select("*");
  return data || [];
}

export async function addCoupon(coupon: any) {
  await supabase.from("coupons").insert(coupon);
}

export async function deleteCoupon(id: string) {
  await supabase.from("coupons").delete().eq("id", id);
}

// ---------- Messages ----------
export async function getMessages(): Promise<any[]> {
  const { data } = await supabase.from("messages").select("*").order("date", { ascending: false });
  return data || [];
}

export async function addMessage(msg: any) {
  await supabase.from("messages").insert(msg);
}

// ---------- Products ----------
export async function getProducts(): Promise<any[]> {
  try {
    const { data } = await supabase.from("products").select("*");
    if (data && data.length > 0) return data;
  } catch (e) {
    console.error("Supabase error, using fallback products:", e);
  }

  const defaults = [
    { id: "1", name: "الكبسولات الذهبية للطاقة", slug: "golden-energy-capsules", description: "كبسولات طبيعية 100% مصممة لتعزيز الطاقة والتركيز طوال اليوم.", price: 199, images: ["/images/products/product-1.png"], category: "الطاقة والتركيز", ingredients: ["مستخلص الجينسنغ", "فيتامين B12", "مستخلص الشاي الأخضر", "الزنك", "مغنيسيوم"], usage: "كبسولة واحدة يومياً مع وجبة الإفطار", weight: "60 كبسولة" },
    { id: "2", name: "كبسولات التعافي العضلي", slug: "muscle-recovery-capsules", description: "دعم متكامل لتعافي العضلات بعد التمرين.", price: 199, images: ["/images/products/product-2.png"], category: "التعافي والعضلات", ingredients: ["BCAA", "جلوتامين", "مستخلص الكركم", "فيتامين D3", "بروتين البازلاء"], usage: "كبسولتين بعد التمرين مباشرة", weight: "90 كبسولة" },
  ];
  return defaults;
}

export async function addProduct(product: any) {
  await supabase.from("products").insert(product);
}

export async function updateProduct(id: string, updates: Partial<any>) {
  await supabase.from("products").update(updates).eq("id", id);
}

export async function deleteProduct(id: string) {
  await supabase.from("products").delete().eq("id", id);
}
