import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import type { CatalogDatabase } from "@/lib/catalog.server";

const SESSION_COOKIE = "big_pee_admin_session";
function passwordHash(password: string, salt: string): Buffer {
  return scryptSync(password, salt, 32);
}

function storedPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${passwordHash(password, salt).toString("hex")}`;
}

function passwordMatches(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = passwordHash(password, salt);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

async function ensureAdmin(database: CatalogDatabase): Promise<{ id: string; email: string; password_hash: string }> {
  const existing = await database.prepare("SELECT id, email, password_hash FROM admin_users LIMIT 1").bind().all<{ id: string; email: string; password_hash: string }>();
  if (existing.results[0]) return existing.results[0];
  const admin = { id: "admin-owner", email: process.env["ADMIN_EMAIL"] ?? "admin@bigpeekicks.com", password_hash: storedPassword(process.env["ADMIN_PASSWORD"] ?? "bigpee") };
  await database.prepare("INSERT INTO admin_users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)").bind(admin.id, admin.email, admin.password_hash, new Date().toISOString()).run();
  return admin;
}

export async function loginAdmin(database: CatalogDatabase, password: string): Promise<{ name: string; cookie: string } | null> {
  const admin = await ensureAdmin(database);
  if (!passwordMatches(password, admin.password_hash)) return null;
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();
  await database.prepare("INSERT INTO admin_sessions (token_hash, admin_id, expires_at, created_at) VALUES (?, ?, ?, ?)").bind(createHash("sha256").update(token).digest("hex"), admin.id, expiresAt, new Date().toISOString()).run();
  return { name: "Big Pee", cookie: `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=28800` };
}

export async function isAdminRequest(database: CatalogDatabase, request: Request): Promise<boolean> {
  const token = request.headers.get("cookie")?.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))?.[1];
  if (!token) return false;
  const result = await database.prepare("SELECT expires_at FROM admin_sessions WHERE token_hash = ?").bind(createHash("sha256").update(token).digest("hex")).all<{ expires_at: string }>();
  return Boolean(result.results[0] && result.results[0].expires_at >= new Date().toISOString());
}

export async function logoutAdmin(database: CatalogDatabase, request: Request): Promise<string | null> {
  const token = request.headers.get("cookie")?.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))?.[1];
  if (token) await database.prepare("DELETE FROM admin_sessions WHERE token_hash = ?").bind(createHash("sha256").update(token).digest("hex")).run();
  return token ? `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0` : null;
}

export async function adminName(database: CatalogDatabase, request: Request): Promise<string | null> {
  const token = request.headers.get("cookie")?.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))?.[1];
  if (!token) return null;
  const result = await database.prepare("SELECT a.id FROM admin_sessions s JOIN admin_users a ON a.id = s.admin_id WHERE s.token_hash = ? AND s.expires_at >= ?").bind(createHash("sha256").update(token).digest("hex"), new Date().toISOString()).all<{ id: string }>();
  return result.results[0] ? "Big Pee" : null;
}

export async function changeAdminPassword(database: CatalogDatabase, request: Request, currentPassword: string, newPassword: string): Promise<boolean> {
  const token = request.headers.get("cookie")?.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))?.[1];
  if (!token || newPassword.length < 10) return false;
  const admin = await ensureAdmin(database);
  if (!passwordMatches(currentPassword, admin.password_hash)) return false;
  await database.prepare("UPDATE admin_users SET password_hash = ? WHERE id = ?").bind(storedPassword(newPassword), admin.id).run();
  await database.prepare("DELETE FROM admin_sessions WHERE admin_id = ?").bind(admin.id).run();
  return true;
}

