import { NextResponse } from "next/server";
import { getCoupons, addCoupon, deleteCoupon } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getCoupons());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    addCoupon(body);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    deleteCoupon(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 400 });
  }
}
