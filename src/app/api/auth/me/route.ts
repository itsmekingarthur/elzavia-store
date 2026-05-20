import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) return NextResponse.json({ user: null });

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) return NextResponse.json({ user: null });

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  return NextResponse.json({
    user: { id: user.id, email: user.email },
    profile: profile || null,
  });
}
