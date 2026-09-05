import { randomBytes } from "node:crypto";
import type { CatalogDatabase } from "@/lib/catalog.server";
import type { CartLine } from "@/components/CartDrawer";

export const CART_COOKIE = "big_pee_cart";

type CartRow = {
  id: string;
  category: "Shoes" | "Sneakers" | "Slippers";
  name: string;
  tag: string;
  price: number;
  image_url: string;
  description: string;
  popularity: number;
  created_at: string;
  size: number;
  quantity: number;
};

function cookieValue(request: Request): string | undefined {
  return request.headers.get("cookie")?.match(new RegExp(`${CART_COOKIE}=([^;]+)`))?.[1];
}

export async function getCartId(database: CatalogDatabase, request: Request): Promise<{ id: string; cookie?: string }> {
  const existing = cookieValue(request);
  if (existing) {
    const cart = await database.prepare("SELECT id FROM carts WHERE id = ?").bind(existing).all<{ id: string }>();
    if (cart.results[0]) return { id: existing };
  }
  const id = randomBytes(18).toString("hex");
  const now = new Date().toISOString();
  await database.prepare("INSERT INTO carts (id, created_at, updated_at) VALUES (?, ?, ?)").bind(id, now, now).run();
  return { id, cookie: `${CART_COOKIE}=${id}; Path=/; SameSite=Lax; Max-Age=31536000` };
}

export async function readCart(database: CatalogDatabase, cartId: string): Promise<CartLine[]> {
  const result = await database.prepare(`SELECT p.id, p.category, p.name, p.tag, p.price, p.image_url, p.description, p.popularity, p.created_at, ci.size, ci.quantity FROM cart_items ci JOIN products p ON p.id = ci.product_id WHERE ci.cart_id = ? ORDER BY ci.product_id, ci.size`).bind(cartId).all<CartRow>();
  return result.results.map((row) => ({ product: { id: row.id, category: row.category, name: row.name, tag: row.tag, price: row.price, image: row.image_url, sizes: [row.size], description: row.description, popularity: row.popularity, createdAt: row.created_at }, size: row.size, qty: row.quantity }));
}

export async function replaceCart(database: CatalogDatabase, cartId: string, lines: CartLine[]): Promise<CartLine[]> {
  await database.prepare("INSERT INTO carts (id, created_at, updated_at) VALUES (?, ?, ?) ON CONFLICT (id) DO NOTHING").bind(cartId, new Date().toISOString(), new Date().toISOString()).run();
  await database.prepare("DELETE FROM cart_items WHERE cart_id = ?").bind(cartId).run();
  for (const line of lines) {
    const product = await database.prepare("SELECT id FROM products WHERE id = ?").bind(line.product.id).all<{ id: string }>();
    if (product.results[0] && line.qty > 0) await database.prepare("INSERT INTO cart_items (cart_id, product_id, size, quantity) VALUES (?, ?, ?, ?)").bind(cartId, line.product.id, line.size, line.qty).run();
  }
  await database.prepare("UPDATE carts SET updated_at = ? WHERE id = ?").bind(new Date().toISOString(), cartId).run();
  return readCart(database, cartId);
}