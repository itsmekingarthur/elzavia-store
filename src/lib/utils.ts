export function formatPrice(price: number): string {
  return `${price.toLocaleString("ar-MA")} درهم`;
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ELZ-${timestamp}-${random}`;
}

const productSKUMap: Record<string, string> = {
  "الكبسولات الذهبية للطاقة": "nerve-calm30",
  "كبسولات التعافي العضلي": "moringa",
  "كبسولات الزنك والسبيرولينا": "zinc-picolinate",
  "كبسولات دعم المعدة والهضم": "gastro-balance30",
  "كبسولات النوم الهادئ": "melatonine30",
  "كبسولات دعم الأمعاء والهضم": "gut-balance30",
  "كبسولات زيادة الوزن": "weightgain30",
  "كبسولات حرق الدهون": "perte-poids30",
};

export function getProductSKU(productName: string): string {
  return productSKUMap[productName] || productName;
}

export interface OrderRow {
  "full name": string;
  phone: string;
  address: string;
  delivery_note: string;
  price: number;
  sku: string;
  qte: number;
  date_order: string;
}

export function ordersToExcelData(
  orders: {
    customer: { name: string; phone: string; address: string; notes: string };
    items: { name: string; quantity: number; price: number }[];
    createdAt: string;
    total: number;
    offerB2G1?: boolean;
  }[]
): OrderRow[] {
  const rows: OrderRow[] = [];
  for (const order of orders) {
    const itemsTotal = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const ratio = itemsTotal > 0 ? order.total / itemsTotal : 1;
    for (const item of order.items) {
      rows.push({
        "full name": order.customer.name,
        phone: order.customer.phone,
        address: order.customer.address,
        delivery_note: order.customer.notes || "",
        price: Math.round(item.price * item.quantity * ratio),
        sku: getProductSKU(item.name),
        qte: order.offerB2G1 ? 3 : item.quantity,
        date_order: new Date(order.createdAt).toISOString().split("T")[0],
      });
    }
  }
  return rows;
}

export function getOrdersStorageKey(userId?: string | null): string {
  return userId ? `elzavia-orders-${userId}` : "elzavia-orders-guest";
}

export function getMessagesStorageKey(userId?: string | null): string {
  return userId ? `elzavia-messages-${userId}` : "elzavia-messages-guest";
}

export async function downloadExcel(
  data: OrderRow[],
  filename: string
): Promise<void> {
  const XLSX = await import("xlsx");
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Orders");
  XLSX.writeFile(wb, filename);
}
