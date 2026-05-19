import { NextResponse } from "next/server";
import { getCoupons, addCoupon, deleteCoupon } from "@/lib/store";

export async function GET() {
  return NextResponse.json(await getCoupons());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await addCoupon(body);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteCoupon(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 400 });
  }
}
