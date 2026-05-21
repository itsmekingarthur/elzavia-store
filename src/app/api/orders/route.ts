import { NextResponse } from "next/server";
import { getOrders, addOrder, updateOrder, deleteOrder } from "@/lib/store";

const TELEGRAM_BOT_TOKEN = "8819995357:AAGvygoQa-UzvwCVua1LDZC3XpRJFGDzQhs";
const TELEGRAM_CHAT_ID = "7505359725";

async function sendTelegramNotification(order: any) {
  const items = order.items?.map((i: any) => `• ${i.name} ×${i.quantity} = ${i.price * i.quantity} درهم`).join("\n") || "";
  const pointsLine = order.pointsDiscount ? `\n⭐ خصم النقاط: ${order.pointsDiscount} درهم` : "";
  const offerLine = order.offerB2G1 ? `\n🎁 عرض 2+1 مجاناً: وفر ${order.offerDiscount} درهم` : "";
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
💰 المجموع: ${order.total} درهم${pointsLine}${offerLine}
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id") || undefined;
  const orders = await getOrders(userId);
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    try {
      await addOrder(body);
    } catch (e) {
      console.error("Failed to save order to Supabase:", e);
    }
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
    const { id, user_id, items: bodyItems, ...updates } = body;

    const now = new Date().toISOString();
    if (updates.status === "جاري التوصيل") updates.shippedAt = now;
    if (updates.status === "تم التوصيل") updates.deliveredAt = now;

    await updateOrder(id, updates);

    if (updates.status === "تم التوصيل") {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pmvidjjauvosqfuxkrrg.supabase.co";
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "apikey": key,
        "Authorization": `Bearer ${key}`,
        "Accept": "application/json",
      };

      let userId = user_id;
      let orderItems = bodyItems || [];

      if (!userId || !orderItems.length) {
        try {
          const res = await fetch(`${supabaseUrl}/rest/v1/orders?id=eq.${encodeURIComponent(id)}&select=*`, { headers });
          const rows = await res.json();
          if (rows?.[0]) {
            userId = userId || rows[0].user_id;
            orderItems = orderItems.length ? orderItems : (rows[0].items || []);
          }
        } catch {}
      }

      if (userId && orderItems.length) {
        const totalQty = orderItems.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
        const earnedPoints = totalQty * 50;

        try {
          const profileRes = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}&select=points`, { headers });
          const profileRows = await profileRes.json();
          const currentPoints = profileRows?.[0]?.points || 0;

          await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({ points: currentPoints + earnedPoints }),
          });
        } catch (e) {
          console.error("Failed to update points via REST:", e);
        }
      }
    }

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
