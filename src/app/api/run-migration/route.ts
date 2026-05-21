import { NextResponse } from "next/server";

const SQL_STATEMENTS = [
  `ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS "pointsUsed" INTEGER DEFAULT 0`,
  `ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS "pointsDiscount" NUMERIC DEFAULT 0`,
  `ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS "shippedAt" TIMESTAMPTZ`,
  `ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS "deliveredAt" TIMESTAMPTZ`,
  `ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS "offerB2G1" BOOLEAN DEFAULT false`,
  `ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS "offerDiscount" NUMERIC DEFAULT 0`,
  `ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS "user_reply" TEXT`,
];

export async function GET() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return NextResponse.json({
      success: false,
      error: "DATABASE_URL not set. Add it to Vercel env vars and try again.",
      instructions:
        'DATABASE_URL format: postgresql://postgres:PASSWORD@db.pmvidjjauvosqfuxkrrg.supabase.co:5432/postgres',
      hint: "OR run supabase/migration.sql in Supabase Dashboard SQL Editor",
    });
  }

  try {
    const { default: pg } = await import("pg");
    const pool = new pg.Pool({ connectionString: databaseUrl });
    const results: { sql: string; ok: boolean; error?: string }[] = [];

    for (const sql of SQL_STATEMENTS) {
      try {
        await pool.query(sql);
        results.push({ sql, ok: true });
      } catch (e: any) {
        results.push({ sql, ok: false, error: e.message });
      }
    }

    await pool.end();

    const allOk = results.every((r) => r.ok);
    return NextResponse.json({ success: allOk, results });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message });
  }
}
