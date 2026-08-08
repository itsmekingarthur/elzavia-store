export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pmvidjjauvosqfuxkrrg.supabase.co";

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export function getHeaders() {
  return {
    "Content-Type": "application/json",
    "apikey": serviceRoleKey,
    "Authorization": `Bearer ${serviceRoleKey}`,
    "Accept": "application/json",
    "Prefer": "return=minimal",
  };
}

export function sanitize(obj: Record<string, any>, allowed: string[]) {
  const result: Record<string, any> = {};
  for (const col of allowed) {
    if (obj[col] !== undefined) result[col] = obj[col];
  }
  return result;
}
