import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pmvidjjauvosqfuxkrrg.supabase.co";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  let restTest = "not tested";
  let profileFetch = "not tested";
  let ordersCheck = "not tested";
  let insertTest = "not tested";

  if (serviceKey) {
    const headers = { "apikey": serviceKey, "Authorization": `Bearer ${serviceKey}`, "Content-Type": "application/json", "Accept": "application/json" };
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/profiles?select=count&limit=0`, { headers });
      restTest = `status ${res.status}`;
    } catch (e: any) {
      restTest = `error: ${e.message}`;
    }
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/profiles?select=id,points&limit=5`, { headers });
      const rows = await res.json();
      profileFetch = Array.isArray(rows) ? `${rows.length} profiles found` : `not array: ${JSON.stringify(rows).slice(0, 200)}`;
    } catch (e: any) {
      profileFetch = `error: ${e.message}`;
    }
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/orders?select=id,user_id,items,status&limit=5`, { headers });
      const rows = await res.json();
      ordersCheck = Array.isArray(rows) ? `${rows.length} orders found` : `not array: ${JSON.stringify(rows).slice(0, 200)}`;
    } catch (e: any) {
      ordersCheck = `error: ${e.message}`;
    }
    try {
      const testOrder = {
        id: "TEST-" + Date.now(),
        items: [{ name: "test", quantity: 1, price: 199 }],
        total: 199,
        status: "test",
        customer: { name: "test" },
        createdAt: new Date().toISOString(),
      };
      const res = await fetch(`${supabaseUrl}/rest/v1/orders`, {
        method: "POST",
        headers,
        body: JSON.stringify(testOrder),
      });
      if (res.ok) {
        insertTest = "OK (inserted and deleted)";
        await fetch(`${supabaseUrl}/rest/v1/orders?id=eq.${encodeURIComponent(testOrder.id)}`, { method: "DELETE", headers });
      } else {
        const text = await res.text();
        insertTest = `FAIL: ${res.status} ${text.slice(0, 300)}`;
      }
    } catch (e: any) {
      insertTest = `error: ${e.message}`;
    }
  }

  return NextResponse.json({
    hasServiceRoleKey: !!serviceKey,
    supabaseUrl,
    restTest,
    profileFetch,
    ordersCheck,
    insertTest,
  });
}
