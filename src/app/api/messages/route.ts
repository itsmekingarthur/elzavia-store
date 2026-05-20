import { NextResponse } from "next/server";
import { getMessages, addMessage, deleteMessage } from "@/lib/store";

export async function GET() {
  return NextResponse.json(await getMessages());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await addMessage(body);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    if (!body.date) {
      return NextResponse.json({ success: false, error: "date required" }, { status: 400 });
    }
    await deleteMessage(body.date);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 400 });
  }
}
