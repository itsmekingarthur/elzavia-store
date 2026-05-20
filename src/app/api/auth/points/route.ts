import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { supabase } from "@/lib/supabase";

const sdb = supabaseAdmin || supabase;

export async function PATCH(req: Request) {
  try {
    const { userId, points } = await req.json();
    if (!userId || typeof points !== "number") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    await sdb.from("profiles").update({ points }).eq("id", userId);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
