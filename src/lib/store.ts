import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJSON(filename: string): any[] {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return [];
  }
}

function writeJSON(filename: string, data: any[]) {
  ensureDataDir();
  fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2), "utf-8");
}

export function getOrders(): any[] {
  return readJSON("orders.json");
}

export function addOrder(order: any) {
  const orders = getOrders();
  orders.push(order);
  writeJSON("orders.json", orders);
}

export function updateOrder(id: string, updates: Partial<any>) {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx !== -1) {
    orders[idx] = { ...orders[idx], ...updates };
    writeJSON("orders.json", orders);
  }
}

export function getCoupons(): any[] {
  return readJSON("coupons.json");
}

export function addCoupon(coupon: any) {
  const coupons = getCoupons();
  coupons.push(coupon);
  writeJSON("coupons.json", coupons);
}

export function deleteCoupon(id: string) {
  const coupons = getCoupons().filter((c) => c.id !== id);
  writeJSON("coupons.json", coupons);
}

export function getMessages(): any[] {
  return readJSON("messages.json");
}

export function addMessage(msg: any) {
  const messages = getMessages();
  messages.push(msg);
  writeJSON("messages.json", messages);
}

export function getProducts(): any[] {
  const data = readJSON("products.json");
  if (data.length === 0) {
    const defaults = [
      { id: "1", name: "الكبسولات الذهبية للطاقة", slug: "golden-energy-capsules", description: "كبسولات طبيعية 100% مصممة لتعزيز الطاقة والتركيز طوال اليوم. تركيبة متطورة من الأعشاب الطبيعية والفيتامينات الأساسية.", price: 199, images: ["/images/products/product-1.png"], category: "الطاقة والتركيز", ingredients: ["مستخلص الجينسنغ", "فيتامين B12", "مستخلص الشاي الأخضر", "الزنك", "مغنيسيوم"], usage: "كبسولة واحدة يومياً مع وجبة الإفطار", weight: "60 كبسولة" },
      { id: "2", name: "كبسولات التعافي العضلي", slug: "muscle-recovery-capsules", description: "دعم متكامل لتعافي العضلات بعد التمرين. تحتوي على الأحماض الأمينية الأساسية والبروتينات النباتية لتسريع التعافي.", price: 199, images: ["/images/products/product-2.png"], category: "التعافي والعضلات", ingredients: ["BCAA", "جلوتامين", "مستخلص الكركم", "فيتامين D3", "بروتين البازلاء"], usage: "كبسولتين بعد التمرين مباشرة", weight: "90 كبسولة" },
    ];
    writeJSON("products.json", defaults);
    return defaults;
  }
  return data;
}

export function addProduct(product: any) {
  const products = getProducts();
  products.push(product);
  writeJSON("products.json", products);
}

export function updateProduct(id: string, updates: Partial<any>) {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx !== -1) {
    products[idx] = { ...products[idx], ...updates };
    writeJSON("products.json", products);
  }
}

export function deleteProduct(id: string) {
  const products = getProducts().filter((p) => p.id !== id);
  writeJSON("products.json", products);
}
