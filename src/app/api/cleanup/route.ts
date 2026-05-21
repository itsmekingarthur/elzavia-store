import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = "https://pmvidjjauvosqfuxkrrg.supabase.co";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const headers = {
    "apikey": key,
    "Authorization": `Bearer ${key}`,
    "Content-Type": "application/json",
    "Prefer": "return=minimal",
  };

  const results: Record<string, string> = {};

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/orders?id=gte.0`, { method: "DELETE", headers });
    const text = await res.text();
    results.orders = `${res.status}: ${(text || "ok").slice(0, 100)}`;
  } catch (e: any) {
    results.orders = `error: ${e.message}`;
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/messages?id=gte.0`, { method: "DELETE", headers });
    const text = await res.text();
    results.messages = `${res.status}: ${(text || "ok").slice(0, 100)}`;
  } catch (e: any) {
    results.messages = `error: ${e.message}`;
  }

  return NextResponse.json(results);
}
