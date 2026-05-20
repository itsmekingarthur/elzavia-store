import { NextResponse } from "next/server";
import { getOrders, addOrder, updateOrder, deleteOrder } from "@/lib/store";

const TELEGRAM_BOT_TOKEN = "8819995357:AAGvygoQa-UzvwCVua1LDZC3XpRJFGDzQhs";
const TELEGRAM_CHAT_ID = "7505359725";

async function sendTelegramNotification(order: any) {
  const items = order.items?.map((i: any) => `• ${i.name} ×${i.quantity} = ${i.price * i.quantity} درهم`).join("\n") || "";
  const message = `🆕 طلبية جديدة!
━━━━━━━━━━━━━━
👤 الاسم: ${order.customer?.name || "غير محدد"}
📞 الهاتف: ${order.customer?.phone || "غير محدد"}
📍 العنوان: ${order.customer?.address || "غير محدد"}
📝 ملاحظات: ${order.customer?.notes || "بدون"}
━━━━━━━━━━━━━━
📦 المنتجات:
${items}
━━━━━━━━━━━━━━
💰 المجموع: ${order.total} درهم
💳 الدفع: عند الاستلام
🆔 رقم الطلب: ${order.id}
📅 التاريخ: ${new Date(order.createdAt).toLocaleString("ar-MA")}`;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message }),
    });
  } catch (e) {
    console.error("Telegram notification failed:", e);
  }
}

export async function GET() {
  const orders = await getOrders();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await addOrder(body);
    sendTelegramNotification(body);
    return NextResponse.json({ success: true, id: body.id });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: "id required" }, { status: 400 });
    }
    const { id, ...updates } = body;
    await updateOrder(id, updates);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: "id required" }, { status: 400 });
    }
    await deleteOrder(body.id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 400 });
  }
}
