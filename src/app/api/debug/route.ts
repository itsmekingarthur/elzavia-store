import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  let restTest = "not tested";
  if (serviceKey) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/profiles?select=count&limit=0`, {
        headers: { "apikey": serviceKey, "Authorization": `Bearer ${serviceKey}` },
      });
      restTest = `status ${res.status} ${res.ok ? "OK" : "FAIL"}`;
    } catch (e: any) {
      restTest = `error: ${e.message}`;
    }
  }

  return NextResponse.json({
    hasSupabaseAdmin: !!supabaseAdmin,
    hasServiceRoleKey: !!serviceKey,
    hasAnonKey: !!anonKey,
    restTest,
  });
}
