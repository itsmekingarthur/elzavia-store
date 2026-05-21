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
    const res = await fetch(`${supabaseUrl}/rest/v1/orders?id=neq.nonexistent`, { method: "DELETE", headers });
    const text = await res.text();
    results.orders = `${res.status}: ${(text || "ok").slice(0, 100)}`;
  } catch (e: any) {
    results.orders = `error: ${e.message}`;
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/messages?id=neq.nonexistent`, { method: "DELETE", headers });
    const text = await res.text();
    results.messages = `${res.status}: ${(text || "ok").slice(0, 100)}`;
  } catch (e: any) {
    results.messages = `error: ${e.message}`;
  }

  return new Response(
    `<html dir="rtl"><head><meta charset="utf-8"><title>تنظيف</title></head><body style="font-family:sans-serif;padding:2rem;background:#0b0f1a;color:#fff;text-align:center">
    <h1>🧹 التنظيف</h1>
    <p>Supabase: ${results.orders} / ${results.messages}</p>
    <p>جاري مسخ localStorage...</p>
    <script>localStorage.clear(); document.write('<p style="color:#10b981">✅ تم مسح localStorage بنجاح</p>'); setTimeout(() => { window.location.href = '/account' }, 2000);</script>
    <noscript><p>يرجى فتح F12 → Console ← اكتب: localStorage.clear() ثم refresh</p></noscript>
    </body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
