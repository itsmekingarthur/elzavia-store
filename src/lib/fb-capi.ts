import { createHash } from "crypto";

const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
const ACCESS_TOKEN = process.env.FACEBOOK_CAPI_TOKEN;

function sha256(str: string): string {
  return createHash("sha256").update(str).digest("hex");
}

export async function sendPurchaseEvent(order: {
  id: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  customer: { name?: string; phone?: string; address?: string };
  createdAt: string;
}, request?: Request) {
  if (!PIXEL_ID || !ACCESS_TOKEN) return;

  const ip = request?.headers?.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";
  const ua = request?.headers?.get("user-agent") || "";

  const eventData: Record<string, any> = {
    event_name: "Purchase",
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    event_source_url: "https://www.elzavia.shop",
    user_data: {
      client_ip_address: ip,
      client_user_agent: ua,
    },
    custom_data: {
      value: order.total,
      currency: "MAD",
      content_ids: order.items.map((i) => i.name),
      content_name: order.items.map((i) => i.name).join(", "),
      content_type: "product",
      num_items: order.items.reduce((s, i) => s + i.quantity, 0),
    },
    event_id: order.id,
  };

  if (order.customer?.phone) {
    eventData.user_data.ph = sha256(order.customer.phone);
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v22.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [eventData] }),
      }
    );
    const body = await res.json();
    if (!res.ok) {
      console.error("CAPI error:", JSON.stringify(body));
    }
  } catch (e) {
    console.error("CAPI request failed:", e);
  }
}
