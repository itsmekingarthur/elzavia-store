import { NextResponse } from "next/server";

const ADMIN_USER = process.env.ADMIN_USER || "";
const ADMIN_PASS = process.env.ADMIN_PASS || "";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (ADMIN_USER && ADMIN_PASS && username === ADMIN_USER && password === ADMIN_PASS) {
      const token = Buffer.from(`${username}:${Date.now()}`).toString("base64");
      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          "Set-Cookie": `elzavia-admin-token=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=28800`,
        },
      });
    }
    return NextResponse.json({ success: false }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function GET(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  const authed = cookie.includes("elzavia-admin-token=");
  return NextResponse.json({ authed });
}

export async function DELETE() {
  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Set-Cookie": "elzavia-admin-token=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0",
    },
  });
}
