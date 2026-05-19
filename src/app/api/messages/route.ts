import { NextResponse } from "next/server";
import { getMessages, addMessage } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getMessages());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    addMessage(body);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 400 });
  }
}
