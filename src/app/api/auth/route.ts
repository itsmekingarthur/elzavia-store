import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_USER = process.env.ADMIN_USER || "";
const ADMIN_PASS = process.env.ADMIN_PASS || "";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (ADMIN_USER && ADMIN_PASS && username === ADMIN_USER && password === ADMIN_PASS) {
      const token = Buffer.from(`${username}:${Date.now()}`).toString("base64");
      const res = NextResponse.json({ success: true });
      res.cookies.set("elzavia-admin-token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 8,
      });
      return res;
    }
    return NextResponse.json({ success: false }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function GET() {
  const token = cookies().get("elzavia-admin-token")?.value;
  return NextResponse.json({ authed: !!token });
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set("elzavia-admin-token", "", { maxAge: 0, path: "/" });
  return res;
}
