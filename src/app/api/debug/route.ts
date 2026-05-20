import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pmvidjjauvosqfuxkrrg.supabase.co";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  let restTest = "not tested";
  let profileFetch = "not tested";
  let ordersCheck = "not tested";

  if (serviceKey) {
    const headers = { "apikey": serviceKey, "Authorization": `Bearer ${serviceKey}` };
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
  }

  return NextResponse.json({
    hasServiceRoleKey: !!serviceKey,
    supabaseUrl,
    restTest,
    profileFetch,
    ordersCheck,
  });
}
