import type { CatalogDatabase } from "@/lib/catalog.server";

export async function createNotification(database: CatalogDatabase, title: string, message: string, orderId?: string): Promise<void> {
  await database.prepare("INSERT INTO notifications (type, title, message, order_id, created_at) VALUES (?, ?, ?, ?, ?)").bind("order", title, message, orderId ?? null, new Date().toISOString()).run();
}

export async function listNotifications(database: CatalogDatabase) {
  const result = await database.prepare("SELECT id, type, title, message, order_id, read_at, created_at FROM notifications ORDER BY created_at DESC LIMIT 100").bind().all<{ id: number; type: string; title: string; message: string; order_id: string | null; read_at: string | null; created_at: string }>();
  return result.results;
}

export async function sendArkeselSms(phones: string[], message: string): Promise<void> {
  const apiKey = process.env["ARKESEL_API_KEY"];
  const sender = process.env["ARKESEL_SENDER_ID"] ?? "BigPeeKicks";
  const recipients = [...new Set(phones.map(normalizeGhanaPhone).filter((phone): phone is string => Boolean(phone)))];
  if (!apiKey || recipients.length === 0) return;
  const response = await fetch("https://sms.arkesel.com/api/v2/sms/send", {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json" },
    body: JSON.stringify({ sender, message, recipients }),
  });
  const responseBody = await response.text();
  let providerResult: { status?: boolean; message?: string } = {};
  try { providerResult = JSON.parse(responseBody) as typeof providerResult; } catch { /* Arkesel may return plain text. */ }
  if (!response.ok || providerResult.status === false) throw new Error(`Arkesel SMS failed with status ${response.status}: ${providerResult.message ?? responseBody.slice(0, 300)}`);
  console.info(`Arkesel SMS accepted for ${recipients.length} recipient(s): ${responseBody.slice(0, 300)}`);
}

export async function getAdminPhone(database: CatalogDatabase): Promise<string> {
  const result = await database.prepare("SELECT value FROM store_settings WHERE key = ?").bind("adminPhone").all<{ value: string }>();
  return result.results[0]?.value ?? process.env["ADMIN_PHONE"] ?? "";
}

function normalizeGhanaPhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (/^0\d{9}$/.test(digits)) return `233${digits.slice(1)}`;
  if (/^233\d{9}$/.test(digits)) return digits;
  return null;
}

export async function markNotificationsRead(database: CatalogDatabase): Promise<void> {
  await database.prepare("UPDATE notifications SET read_at = ? WHERE read_at IS NULL").bind(new Date().toISOString()).run();
}