import { NextRequest, NextResponse } from "next/server";
import { getProducts, addProduct, updateProduct, deleteProduct } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json({ products, _build: "v4" });
  } catch (e) {
    return NextResponse.json({ products: [], _build: "v4" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await addProduct(body);
  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  await updateProduct(body.id, body);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await deleteProduct(id);
  return NextResponse.json({ ok: true });
}
