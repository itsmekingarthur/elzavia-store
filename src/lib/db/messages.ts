import { getHeaders, sanitize, supabaseUrl } from "./client";

export const MESSAGE_COLUMNS = [
  "id",
  "name",
  "email",
  "message",
  "date",
  "user_id",
  "admin_reply",
  "user_reply",
];

export async function getMessages(userId?: string): Promise<any[]> {
  let url = `${supabaseUrl}/rest/v1/messages?select=*&order=date.desc`;
  if (userId) url += `&user_id=eq.${encodeURIComponent(userId)}`;
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function addMessage(msg: any) {
  const sanitized = sanitize(msg, MESSAGE_COLUMNS);
  const res = await fetch(`${supabaseUrl}/rest/v1/messages`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(sanitized),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to add message: ${res.status} ${text}`);
  }
}

export async function deleteMessage(date: string) {
  await fetch(`${supabaseUrl}/rest/v1/messages?date=eq.${encodeURIComponent(date)}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
}

export async function updateMessage(date: string, updates: Record<string, any>) {
  const sanitized = sanitize(updates, MESSAGE_COLUMNS);
  if (!Object.keys(sanitized).length) return;
  const res = await fetch(`${supabaseUrl}/rest/v1/messages?date=eq.${encodeURIComponent(date)}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(sanitized),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update message: ${res.status} ${text}`);
  }
}
