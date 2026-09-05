import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, extname, join, normalize } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { deflateSync, inflateSync } from "node:zlib";
//#region node_modules/.nitro/vite/services/ssr/index.js
var lastCapturedError;
var TTL_MS = 5e3;
function record(error) {
	lastCapturedError = {
		error,
		at: Date.now()
	};
}
var CAUSE_DEPTH_LIMIT = 5;
var DESCRIPTION_LENGTH_LIMIT = 8e3;
function describeError(error) {
	const parts = [];
	let current = error;
	for (let depth = 0; depth < CAUSE_DEPTH_LIMIT && current != null; depth++) {
		if (!(current instanceof Error)) {
			parts.push(typeof current === "string" ? current : safeStringify(current));
			break;
		}
		const label = depth === 0 ? "" : "caused by: ";
		const status = describeStatus(current);
		parts.push(`${label}${current.stack ?? `${current.name}: ${current.message}`}${status}`);
		current = current.cause;
	}
	return parts.join("\n").slice(0, DESCRIPTION_LENGTH_LIMIT);
}
function describeStatus(error) {
	const { status, statusCode } = error;
	const value = status ?? statusCode;
	return typeof value === "number" ? ` (status ${value})` : "";
}
function safeStringify(value) {
	try {
		return JSON.stringify(value) ?? String(value);
	} catch {
		return String(value);
	}
}
function isErrorLike(value) {
	return value instanceof Error;
}
var originalConsoleError = console.error.bind(console);
console.error = (...args) => {
	originalConsoleError(...args.map((arg) => {
		if (!isErrorLike(arg)) return arg;
		record(arg);
		return describeError(arg);
	}));
};
if (typeof globalThis.addEventListener === "function") {
	globalThis.addEventListener("error", (event) => record(event.error ?? event));
	globalThis.addEventListener("unhandledrejection", (event) => record(event.reason));
}
function consumeLastCapturedError() {
	if (!lastCapturedError) return void 0;
	if (Date.now() - lastCapturedError.at > TTL_MS) {
		lastCapturedError = void 0;
		return;
	}
	const { error } = lastCapturedError;
	lastCapturedError = void 0;
	return error;
}
function renderErrorPage() {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
async function listActiveProducts(database) {
	const { results } = await database.prepare(`SELECT p.id, p.category, p.name, p.tag, p.price, p.image_url, p.description,
              p.popularity, p.created_at,
              GROUP_CONCAT(ps.size) AS sizes,
              COALESCE(MAX(ps.stock), 0) AS stock
       FROM products p
       LEFT JOIN product_sizes ps ON ps.product_id = p.id
       WHERE p.status = ?
       GROUP BY p.id
       ORDER BY p.created_at DESC`).bind("Active").all();
	return results.map((product) => ({
		id: product.id,
		category: product.category,
		name: product.name,
		tag: product.tag,
		price: product.price,
		image: product.image_url,
		sizes: product.sizes ? product.sizes.split(",").map(Number) : [],
		description: product.description,
		popularity: product.popularity,
		createdAt: product.created_at,
		stock: product.stock ?? 0,
		status: "Active"
	}));
}
async function createProduct(database, product) {
	const now = (/* @__PURE__ */ new Date()).toISOString();
	await database.prepare(`INSERT INTO products (id, category, name, tag, price, image_url, description, popularity, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(product.id, product.category, product.name, product.tag, product.price, product.image, product.description, product.popularity, product.status, product.createdAt, now).run();
	for (const size of product.sizes) await database.prepare("INSERT INTO product_sizes (product_id, size, stock) VALUES (?, ?, ?)").bind(product.id, size, product.stock).run();
}
async function updateProduct(database, product) {
	await database.prepare(`UPDATE products SET category = ?, name = ?, tag = ?, price = ?, image_url = ?, description = ?, popularity = ?, status = ?, updated_at = ? WHERE id = ?`).bind(product.category, product.name, product.tag, product.price, product.image, product.description, product.popularity, product.status, (/* @__PURE__ */ new Date()).toISOString(), product.id).run();
	await database.prepare("DELETE FROM product_sizes WHERE product_id = ?").bind(product.id).run();
	for (const size of product.sizes) await database.prepare("INSERT INTO product_sizes (product_id, size, stock) VALUES (?, ?, ?)").bind(product.id, size, product.stock).run();
}
async function deleteProduct(database, id) {
	await database.prepare("UPDATE products SET status = 'Archived', updated_at = ? WHERE id = ?").bind((/* @__PURE__ */ new Date()).toISOString(), id).run();
}
var databasePath = process.env["BIG_PEE_DATABASE_PATH"] ?? join(process.cwd(), "data", "big-pee-kicks.sqlite");
var database;
function createDatabase() {
	mkdirSync(dirname(databasePath), { recursive: true });
	const nativeDatabase = new DatabaseSync(databasePath);
	const isNewDatabase = !existsSync(databasePath);
	nativeDatabase.exec(readFileSync(join(process.cwd(), "database/migrations/0001_initial_schema.sql"), "utf8"));
	if (isNewDatabase) nativeDatabase.exec(readFileSync(join(process.cwd(), "database/migrations/0002_seed_products.sql"), "utf8"));
	nativeDatabase.exec(readFileSync(join(process.cwd(), "database/migrations/0003_production_tables.sql"), "utf8"));
	nativeDatabase.exec(readFileSync(join(process.cwd(), "database/migrations/0004_settings.sql"), "utf8"));
	nativeDatabase.exec(readFileSync(join(process.cwd(), "database/migrations/0005_buyer_accounts.sql"), "utf8"));
	nativeDatabase.exec(readFileSync(join(process.cwd(), "database/migrations/0007_carts.sql"), "utf8"));
	nativeDatabase.exec(readFileSync(join(process.cwd(), "database/migrations/0008_shipping_rates.sql"), "utf8"));
	const orderColumns = nativeDatabase.prepare("PRAGMA table_info(orders)").all();
	const existingColumns = new Set(orderColumns.map((column) => column.name));
	for (const column of [
		"recipient_name",
		"recipient_phone",
		"recipient_address",
		"recipient_city",
		"recipient_country"
	]) if (!existingColumns.has(column)) nativeDatabase.exec(`ALTER TABLE orders ADD COLUMN ${column} TEXT`);
	return { prepare(query) {
		const statement = nativeDatabase.prepare(query);
		return { bind(...values) {
			return {
				async all() {
					return { results: statement.all(...values) };
				},
				async run() {
					statement.run(...values);
				}
			};
		} };
	} };
}
function getLocalDatabase() {
	database ??= createDatabase();
	return database;
}
var SESSION_COOKIE$1 = "big_pee_admin_session";
function passwordHash(password, salt) {
	return scryptSync(password, salt, 32);
}
function storedPassword(password) {
	const salt = randomBytes(16).toString("hex");
	return `${salt}:${passwordHash(password, salt).toString("hex")}`;
}
function passwordMatches(password, stored) {
	const [salt, hash] = stored.split(":");
	if (!salt || !hash) return false;
	const expected = Buffer.from(hash, "hex");
	const actual = passwordHash(password, salt);
	return expected.length === actual.length && timingSafeEqual(expected, actual);
}
async function ensureAdmin(database) {
	const existing = await database.prepare("SELECT id, email, password_hash FROM admin_users LIMIT 1").bind().all();
	if (existing.results[0]) return existing.results[0];
	const admin = {
		id: "admin-owner",
		email: process.env["ADMIN_EMAIL"] ?? "admin@bigpeekicks.com",
		password_hash: storedPassword(process.env["ADMIN_PASSWORD"] ?? "bigpee")
	};
	await database.prepare("INSERT INTO admin_users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)").bind(admin.id, admin.email, admin.password_hash, (/* @__PURE__ */ new Date()).toISOString()).run();
	return admin;
}
async function loginAdmin(database, password) {
	const admin = await ensureAdmin(database);
	if (!passwordMatches(password, admin.password_hash)) return null;
	const token = randomBytes(32).toString("hex");
	const expiresAt = new Date(Date.now() + 480 * 60 * 1e3).toISOString();
	await database.prepare("INSERT INTO admin_sessions (token_hash, admin_id, expires_at, created_at) VALUES (?, ?, ?, ?)").bind(createHash("sha256").update(token).digest("hex"), admin.id, expiresAt, (/* @__PURE__ */ new Date()).toISOString()).run();
	return {
		name: "Big Pee",
		cookie: `${SESSION_COOKIE$1}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=28800`
	};
}
async function isAdminRequest(database, request) {
	const token = request.headers.get("cookie")?.match(new RegExp(`${SESSION_COOKIE$1}=([^;]+)`))?.[1];
	if (!token) return false;
	const result = await database.prepare("SELECT expires_at FROM admin_sessions WHERE token_hash = ?").bind(createHash("sha256").update(token).digest("hex")).all();
	return Boolean(result.results[0] && result.results[0].expires_at >= (/* @__PURE__ */ new Date()).toISOString());
}
async function logoutAdmin(database, request) {
	const token = request.headers.get("cookie")?.match(new RegExp(`${SESSION_COOKIE$1}=([^;]+)`))?.[1];
	if (token) await database.prepare("DELETE FROM admin_sessions WHERE token_hash = ?").bind(createHash("sha256").update(token).digest("hex")).run();
	return token ? `${SESSION_COOKIE$1}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0` : null;
}
async function adminName(database, request) {
	const token = request.headers.get("cookie")?.match(new RegExp(`${SESSION_COOKIE$1}=([^;]+)`))?.[1];
	if (!token) return null;
	return (await database.prepare("SELECT a.id FROM admin_sessions s JOIN admin_users a ON a.id = s.admin_id WHERE s.token_hash = ? AND s.expires_at >= ?").bind(createHash("sha256").update(token).digest("hex"), (/* @__PURE__ */ new Date()).toISOString()).all()).results[0] ? "Big Pee" : null;
}
async function changeAdminPassword(database, request, currentPassword, newPassword) {
	if (!request.headers.get("cookie")?.match(new RegExp(`${SESSION_COOKIE$1}=([^;]+)`))?.[1] || newPassword.length < 10) return false;
	const admin = await ensureAdmin(database);
	if (!passwordMatches(currentPassword, admin.password_hash)) return false;
	await database.prepare("UPDATE admin_users SET password_hash = ? WHERE id = ?").bind(storedPassword(newPassword), admin.id).run();
	await database.prepare("DELETE FROM admin_sessions WHERE admin_id = ?").bind(admin.id).run();
	return true;
}
function formatPrice(amount) {
	return new Intl.NumberFormat("en-GH", {
		style: "currency",
		currency: "GHS",
		currencyDisplay: "narrowSymbol",
		maximumFractionDigits: 2
	}).format(amount);
}
function toPesewas(amount) {
	return Math.round(amount * 100);
}
async function initializePaystackPayment(input) {
	const secretKey = process.env["PAYSTACK_SECRET_KEY"];
	if (!secretKey) throw new Error("PAYSTACK_SECRET_KEY is not configured");
	const reference = `BPK-${Date.now()}-${randomBytes(4).toString("hex")}`;
	const response = await fetch("https://api.paystack.co/transaction/initialize", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${secretKey}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email: input.email,
			amount: toPesewas(input.amount),
			currency: "GHS",
			reference,
			callback_url: input.callbackUrl,
			metadata: input.metadata
		})
	});
	const result = await response.json();
	if (!response.ok || !result.status || !result.data) throw new Error(result.message || "Paystack initialization failed");
	return result.data;
}
async function verifyPaystackPayment(reference) {
	const secretKey = process.env["PAYSTACK_SECRET_KEY"];
	if (!secretKey) throw new Error("PAYSTACK_SECRET_KEY is not configured");
	const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, { headers: { Authorization: `Bearer ${secretKey}` } });
	const result = await response.json();
	return response.ok && result.status && result.data?.status === "success";
}
async function createNotification(database, title, message, orderId) {
	await database.prepare("INSERT INTO notifications (type, title, message, order_id, created_at) VALUES (?, ?, ?, ?, ?)").bind("order", title, message, orderId ?? null, (/* @__PURE__ */ new Date()).toISOString()).run();
}
async function listNotifications(database) {
	return (await database.prepare("SELECT id, type, title, message, order_id, read_at, created_at FROM notifications ORDER BY created_at DESC LIMIT 100").bind().all()).results;
}
async function sendArkeselSms(phones, message) {
	const apiKey = process.env["ARKESEL_API_KEY"];
	const sender = process.env["ARKESEL_SENDER_ID"] ?? "BigPeeKicks";
	const recipients = [...new Set(phones.map(normalizeGhanaPhone).filter((phone) => Boolean(phone)))];
	if (!apiKey || recipients.length === 0) return;
	const response = await fetch("https://sms.arkesel.com/api/v2/sms/send", {
		method: "POST",
		headers: {
			"api-key": apiKey,
			"content-type": "application/json"
		},
		body: JSON.stringify({
			sender,
			message,
			recipients
		})
	});
	const responseBody = await response.text();
	let providerResult = {};
	try {
		providerResult = JSON.parse(responseBody);
	} catch {}
	if (!response.ok || providerResult.status === false) throw new Error(`Arkesel SMS failed with status ${response.status}: ${providerResult.message ?? responseBody.slice(0, 300)}`);
	console.info(`Arkesel SMS accepted for ${recipients.length} recipient(s): ${responseBody.slice(0, 300)}`);
}
async function getAdminPhone(database) {
	return (await database.prepare("SELECT value FROM store_settings WHERE key = ?").bind("adminPhone").all()).results[0]?.value ?? process.env["ADMIN_PHONE"] ?? "";
}
function normalizeGhanaPhone(phone) {
	const digits = phone.replace(/\D/g, "");
	if (/^0\d{9}$/.test(digits)) return `233${digits.slice(1)}`;
	if (/^233\d{9}$/.test(digits)) return digits;
	return null;
}
async function markNotificationsRead(database) {
	await database.prepare("UPDATE notifications SET read_at = ? WHERE read_at IS NULL").bind((/* @__PURE__ */ new Date()).toISOString()).run();
}
async function createPendingOrder(database, input) {
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const customerId = `customer-${randomBytes(8).toString("hex")}`;
	const orderId = `BPK-${Date.now().toString().slice(-8)}`;
	await database.prepare(`INSERT INTO customers (id, name, email, phone, address, city, country, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(email) DO UPDATE SET name = excluded.name, address = excluded.address, city = excluded.city, country = excluded.country, updated_at = excluded.updated_at`).bind(customerId, input.name, input.email, input.phone ?? null, input.address, input.city, input.country, now, now).run();
	const savedCustomerId = (await database.prepare("SELECT id FROM customers WHERE email = ?").bind(input.email).all()).results[0]?.id ?? customerId;
	await database.prepare(`INSERT INTO orders (id, customer_id, subtotal, shipping, total, delivery_email, delivery_name, delivery_address, delivery_city, delivery_country, delivery_phone, recipient_name, recipient_phone, recipient_address, recipient_city, recipient_country, placed_at, estimated_delivery)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(orderId, savedCustomerId, input.subtotal, input.shipping, input.total, input.email, input.name, input.address, input.city, input.country, input.phone ?? null, input.recipient?.name ?? input.name, input.recipient?.phone ?? input.phone ?? null, input.recipient?.address ?? input.address, input.recipient?.city ?? input.city, input.recipient?.country ?? input.country, now, new Date(Date.now() + 5 * 864e5).toISOString()).run();
	for (const line of input.lines) await database.prepare("INSERT INTO order_items (order_id, product_id, product_name, size, quantity, unit_price) VALUES (?, ?, ?, ?, ?, ?)").bind(orderId, line.product.id, line.product.name, line.size, line.qty, line.product.price).run();
	return orderId;
}
async function markOrderPaid(database, reference) {
	const order = await database.prepare("SELECT id, payment_status, delivery_name, delivery_email, delivery_phone, recipient_phone, total FROM orders WHERE payment_reference = ?").bind(reference).all();
	if (!order.results[0]) throw new Error("Payment reference does not match an order");
	if (order.results[0].payment_status !== "Pending") return;
	await database.prepare("UPDATE orders SET payment_status = 'Paid', paid_at = ? WHERE id = ? AND payment_status = 'Pending'").bind((/* @__PURE__ */ new Date()).toISOString(), order.results[0].id).run();
	const items = await database.prepare("SELECT product_id, size, quantity FROM order_items WHERE order_id = ?").bind(order.results[0].id).all();
	for (const item of items.results) await database.prepare("UPDATE product_sizes SET stock = MAX(0, stock - ?) WHERE product_id = ? AND size = ?").bind(item.quantity, item.product_id, item.size).run();
	await createNotification(database, "Payment received", `${order.results[0].delivery_name}'s order ${order.results[0].id} is paid.`, order.results[0].id);
	await sendArkeselSms([order.results[0].delivery_phone ?? "", order.results[0].recipient_phone ?? ""], `Big Pee Kicks: payment received for order ${order.results[0].id}. Thank you.`).catch((error) => console.error(error));
	await sendArkeselSms([await getAdminPhone(database)], `Big Pee Kicks admin: payment received for order ${order.results[0].id} from ${order.results[0].delivery_name}.`).catch((error) => console.error(error));
}
async function attachPaymentReference(database, orderId, reference) {
	await database.prepare("UPDATE orders SET payment_reference = ? WHERE id = ? AND payment_status = 'Pending'").bind(reference, orderId).run();
}
async function listOrders(database, customerId, email) {
	const filter = customerId ? "o.customer_id = ?" : email ? "c.email = ?" : "1 = 1";
	const value = customerId ?? email;
	const orders = await database.prepare(`SELECT o.id, o.status, o.payment_status, o.payment_reference, o.total, o.shipping, o.delivery_email, o.delivery_name, o.delivery_address, o.delivery_city, o.delivery_country, o.delivery_phone, o.recipient_name, o.recipient_phone, o.recipient_address, o.recipient_city, o.recipient_country, o.placed_at, o.estimated_delivery, r.status AS return_status, r.reason AS return_reason FROM orders o JOIN customers c ON c.id = o.customer_id LEFT JOIN returns r ON r.order_id = o.id WHERE ${filter} ORDER BY o.placed_at DESC`).bind(...value ? [value] : []).all();
	const items = await database.prepare("SELECT order_id, product_id, product_name, size, quantity, unit_price FROM order_items").bind().all();
	return orders.results.map((order) => ({
		id: order.id,
		lines: items.results.filter((item) => item.order_id === order.id).map((item) => ({
			product: {
				id: item.product_id,
				name: item.product_name,
				price: item.unit_price,
				image: "",
				category: "Shoes",
				tag: "",
				sizes: [item.size],
				description: "",
				popularity: 0,
				createdAt: ""
			},
			size: item.size,
			qty: item.quantity
		})),
		total: order.total,
		shipping: order.shipping,
		status: order.status,
		paymentStatus: order.payment_status,
		paymentReference: order.payment_reference ?? void 0,
		placedAt: order.placed_at,
		estimatedDelivery: order.estimated_delivery,
		delivery: {
			email: order.delivery_email,
			name: order.recipient_name ?? order.delivery_name,
			address: order.recipient_address ?? order.delivery_address,
			city: order.recipient_city ?? order.delivery_city,
			country: order.recipient_country ?? order.delivery_country
		},
		returnStatus: order.return_status ?? void 0,
		returnReason: order.return_reason ?? void 0
	}));
}
async function requestOrderReturn(database, orderId, email, reason = "Buyer requested a return") {
	if (!(await database.prepare(`SELECT o.id FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.id = ? ${email ? "AND c.email = ?" : ""}`).bind(...email ? [orderId, email] : [orderId]).all()).results[0]) throw new Error("Order not found");
	if (!(await database.prepare("SELECT id FROM returns WHERE order_id = ?").bind(orderId).all()).results[0]) await database.prepare("INSERT INTO returns (order_id, reason, status, created_at) VALUES (?, ?, 'Requested', ?)").bind(orderId, reason, (/* @__PURE__ */ new Date()).toISOString()).run();
}
async function updateReturnStatus(database, orderId, status) {
	if (![
		"Requested",
		"Approved",
		"Rejected"
	].includes(status)) throw new Error("Invalid return status");
	const order = await database.prepare("SELECT delivery_name, delivery_phone, recipient_phone FROM orders WHERE id = ?").bind(orderId).all();
	if (!order.results[0]) throw new Error("Order not found");
	await database.prepare("UPDATE returns SET status = ? WHERE order_id = ?").bind(status, orderId).run();
	await createNotification(database, `Return ${status.toLowerCase()}`, `${order.results[0].delivery_name}'s return request for ${orderId} was ${status.toLowerCase()}.`, orderId);
	await sendArkeselSms([order.results[0].delivery_phone ?? "", order.results[0].recipient_phone ?? ""], `Big Pee Kicks: your return request for order ${orderId} was ${status.toLowerCase()}.`).catch((error) => console.error(error));
}
async function updateOrderStatus(database, orderId, status) {
	if (![
		"Processing",
		"Shipped",
		"Delivered",
		"Cancelled"
	].includes(status)) throw new Error("Invalid order status");
	const order = await database.prepare("SELECT delivery_name, delivery_phone, recipient_phone FROM orders WHERE id = ?").bind(orderId).all();
	if (!order.results[0]) throw new Error("Order not found");
	await database.prepare("UPDATE orders SET status = ? WHERE id = ?").bind(status, orderId).run();
	if (status === "Shipped") {
		await createNotification(database, "Order shipped", `${order.results[0].delivery_name}'s order ${orderId} has shipped.`, orderId);
		await sendArkeselSms([order.results[0].delivery_phone ?? "", order.results[0].recipient_phone ?? ""], `Big Pee Kicks: order ${orderId} has shipped.`).catch((error) => console.error(error));
		await sendArkeselSms([await getAdminPhone(database)], `Big Pee Kicks admin: order ${orderId} was marked as shipped.`).catch((error) => console.error(error));
	}
}
var mimeExtensions = {
	"image/jpeg": ".jpg",
	"image/png": ".png",
	"image/webp": ".webp"
};
async function storeProductImage(id, dataUrl) {
	const match = dataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,(.+)$/);
	if (!match) return dataUrl;
	const mimeType = match[1];
	const encoded = match[2];
	if (!mimeType || !encoded) return dataUrl;
	const extension = mimeExtensions[mimeType] ?? extname(mimeType);
	const directory = join(process.cwd(), "uploads", "products");
	await mkdir(directory, { recursive: true });
	await writeFile(join(directory, `${id}${extension}`), Buffer.from(encoded, "base64"));
	return `/uploads/products/${id}${extension}`;
}
var CART_COOKIE = "big_pee_cart";
function cookieValue(request) {
	return request.headers.get("cookie")?.match(new RegExp(`${CART_COOKIE}=([^;]+)`))?.[1];
}
async function getCartId(database, request) {
	const existing = cookieValue(request);
	if (existing) {
		if ((await database.prepare("SELECT id FROM carts WHERE id = ?").bind(existing).all()).results[0]) return { id: existing };
	}
	const id = randomBytes(18).toString("hex");
	const now = (/* @__PURE__ */ new Date()).toISOString();
	await database.prepare("INSERT INTO carts (id, created_at, updated_at) VALUES (?, ?, ?)").bind(id, now, now).run();
	return {
		id,
		cookie: `${CART_COOKIE}=${id}; Path=/; SameSite=Lax; Max-Age=31536000`
	};
}
async function readCart(database, cartId) {
	return (await database.prepare(`SELECT p.id, p.category, p.name, p.tag, p.price, p.image_url, p.description, p.popularity, p.created_at, ci.size, ci.quantity FROM cart_items ci JOIN products p ON p.id = ci.product_id WHERE ci.cart_id = ? ORDER BY ci.rowid`).bind(cartId).all()).results.map((row) => ({
		product: {
			id: row.id,
			category: row.category,
			name: row.name,
			tag: row.tag,
			price: row.price,
			image: row.image_url,
			sizes: [row.size],
			description: row.description,
			popularity: row.popularity,
			createdAt: row.created_at
		},
		size: row.size,
		qty: row.quantity
	}));
}
async function replaceCart(database, cartId, lines) {
	await database.prepare("INSERT OR IGNORE INTO carts (id, created_at, updated_at) VALUES (?, ?, ?)").bind(cartId, (/* @__PURE__ */ new Date()).toISOString(), (/* @__PURE__ */ new Date()).toISOString()).run();
	await database.prepare("DELETE FROM cart_items WHERE cart_id = ?").bind(cartId).run();
	for (const line of lines) if ((await database.prepare("SELECT id FROM products WHERE id = ?").bind(line.product.id).all()).results[0] && line.qty > 0) await database.prepare("INSERT INTO cart_items (cart_id, product_id, size, quantity) VALUES (?, ?, ?, ?)").bind(cartId, line.product.id, line.size, line.qty).run();
	await database.prepare("UPDATE carts SET updated_at = ? WHERE id = ?").bind((/* @__PURE__ */ new Date()).toISOString(), cartId).run();
	return readCart(database, cartId);
}
var SESSION_COOKIE = "big_pee_buyer_session";
var hashToken = (token) => createHash("sha256").update(token).digest("hex");
var hashPassword = (password, salt) => scryptSync(password, salt, 32);
var storePassword = (password) => {
	const salt = randomBytes(16).toString("hex");
	return `${salt}:${hashPassword(password, salt).toString("hex")}`;
};
var matchesPassword = (password, stored) => {
	const [salt, hash] = stored.split(":");
	if (!salt || !hash) return false;
	const expected = Buffer.from(hash, "hex");
	const actual = hashPassword(password, salt);
	return expected.length === actual.length && timingSafeEqual(expected, actual);
};
function tokenFrom(request) {
	return request.headers.get("cookie")?.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))?.[1];
}
async function registerBuyer(database, name, email, password) {
	if (name.trim().length < 2 || password.length < 6) return null;
	if ((await database.prepare("SELECT id FROM buyer_accounts WHERE email = ?").bind(email.trim()).all()).results[0]) return null;
	const buyer = {
		id: `buyer-${randomBytes(8).toString("hex")}`,
		name: name.trim(),
		email: email.trim(),
		password_hash: storePassword(password)
	};
	await database.prepare("INSERT INTO buyer_accounts (id, name, email, password_hash, created_at) VALUES (?, ?, ?, ?, ?)").bind(buyer.id, buyer.name, buyer.email, buyer.password_hash, (/* @__PURE__ */ new Date()).toISOString()).run();
	return createSession(database, buyer.id, buyer.name, buyer.email);
}
async function loginBuyer(database, email, password) {
	const buyer = (await database.prepare("SELECT id, name, email, password_hash FROM buyer_accounts WHERE email = ?").bind(email.trim()).all()).results[0];
	if (!buyer || !matchesPassword(password, buyer.password_hash)) return null;
	return createSession(database, buyer.id, buyer.name, buyer.email);
}
async function createSession(database, id, name, email) {
	const token = randomBytes(32).toString("hex");
	await database.prepare("INSERT INTO buyer_sessions (token_hash, buyer_id, expires_at, created_at) VALUES (?, ?, ?, ?)").bind(hashToken(token), id, new Date(Date.now() + 30 * 864e5).toISOString(), (/* @__PURE__ */ new Date()).toISOString()).run();
	return {
		buyer: {
			id,
			name,
			email
		},
		cookie: `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`
	};
}
async function currentBuyer(database, request) {
	const token = tokenFrom(request);
	if (!token) return null;
	return (await database.prepare("SELECT b.id, b.name, b.email FROM buyer_sessions s JOIN buyer_accounts b ON b.id = s.buyer_id WHERE s.token_hash = ? AND s.expires_at >= ?").bind(hashToken(token), (/* @__PURE__ */ new Date()).toISOString()).all()).results[0] ?? null;
}
async function logoutBuyer(database, request) {
	const token = tokenFrom(request);
	if (token) await database.prepare("DELETE FROM buyer_sessions WHERE token_hash = ?").bind(hashToken(token)).run();
	return token ? `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0` : null;
}
var loginAttempts = /* @__PURE__ */ new Map();
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-B-E_GMHl.mjs").then((m) => m.default ?? m);
	return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!isH3SwallowedErrorBody(body)) return response;
	console.error(consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`));
	return new Response(renderErrorPage(), {
		status: 500,
		headers: { "content-type": "text/html; charset=utf-8" }
	});
}
function isH3SwallowedErrorBody(body) {
	try {
		const payload = JSON.parse(body);
		return payload.unhandled === true && payload.message === "HTTPError";
	} catch {
		return false;
	}
}
function preparePngForPdf(png) {
	const width = png.readUInt32BE(16);
	const height = png.readUInt32BE(20);
	const colorType = png[25] ?? 2;
	let offset = 8;
	const chunks = [];
	while (offset < png.length) {
		const length = png.readUInt32BE(offset);
		if (png.toString("ascii", offset + 4, offset + 8) === "IDAT") chunks.push(png.subarray(offset + 8, offset + 8 + length));
		offset += length + 12;
	}
	const source = inflateSync(Buffer.concat(chunks));
	const bytesPerPixel = colorType === 6 ? 4 : 3;
	const rowLength = width * bytesPerPixel;
	const pixels = Buffer.alloc(height * rowLength);
	const paeth = (left, above, upperLeft) => {
		const estimate = left + above - upperLeft;
		const leftDistance = Math.abs(estimate - left);
		const aboveDistance = Math.abs(estimate - above);
		const upperLeftDistance = Math.abs(estimate - upperLeft);
		return leftDistance <= aboveDistance && leftDistance <= upperLeftDistance ? left : aboveDistance <= upperLeftDistance ? above : upperLeft;
	};
	for (let row = 0; row < height; row += 1) {
		const filter = source[row * (rowLength + 1)] ?? 0;
		const start = row * (rowLength + 1) + 1;
		const previous = row === 0 ? void 0 : pixels.subarray((row - 1) * rowLength, row * rowLength);
		const target = pixels.subarray(row * rowLength, (row + 1) * rowLength);
		for (let index = 0; index < rowLength; index += 1) {
			const left = index >= bytesPerPixel ? target[index - bytesPerPixel] ?? 0 : 0;
			const above = previous?.[index] ?? 0;
			const upperLeft = index >= bytesPerPixel ? previous?.[index - bytesPerPixel] ?? 0 : 0;
			const value = source[start + index] ?? 0;
			target[index] = filter === 0 ? value : filter === 1 ? value + left & 255 : filter === 2 ? value + above & 255 : filter === 3 ? value + Math.floor((left + above) / 2) & 255 : value + paeth(left, above, upperLeft) & 255;
		}
	}
	const rgb = Buffer.alloc(height * (width * 3 + 1));
	for (let row = 0; row < height; row += 1) {
		rgb[row * (width * 3 + 1)] = 0;
		for (let column = 0; column < width; column += 1) {
			const sourceIndex = row * rowLength + column * bytesPerPixel;
			const targetIndex = row * (width * 3 + 1) + 1 + column * 3;
			rgb[targetIndex] = pixels[sourceIndex] ?? 0;
			rgb[targetIndex + 1] = pixels[sourceIndex + 1] ?? 0;
			rgb[targetIndex + 2] = pixels[sourceIndex + 2] ?? 0;
		}
	}
	return {
		width,
		height,
		data: deflateSync(rgb)
	};
}
function createReceiptPdf(order, items, logo) {
	const image = preparePngForPdf(logo);
	const money = (amount) => `GHS ${amount.toFixed(2)}`;
	const escape = (value) => value.replace(/[\\()]/g, (character) => `\\${character}`).replace(/[^\x20-\x7E]/g, "?");
	const text = (value, x, y, size = 10, font = "F1") => `BT /${font} ${size} Tf ${x} ${y} Td (${escape(value)}) Tj ET`;
	const rowText = items.slice(0, 12).map((item, index) => {
		const y = 520 - index * 25;
		return `${`0.88 0.88 0.88 RG 55 ${y - 10} m 557 ${y - 10} l S`} ${text(item.product_name, 58, y, 9)} ${text(String(item.size), 310, y, 9)} ${text(String(item.quantity), 380, y, 9)} ${text(money(item.unit_price * item.quantity), 440, y, 9)}`;
	}).join(" ");
	const content = [
		"q 0.98 0.72 0.12 rg 40 650 532 100 re f Q",
		"q 1 1 1 rg 40 40 532 590 re f Q",
		"q 1 1 1 rg 55 690 80 80 re f Q",
		"q 78 0 0 78 56 691 cm /Logo Do Q",
		"0 0 0 rg",
		text("BIG PEE KICKS", 155, 731, 20, "F2"),
		text("OFFICIAL SALES RECEIPT", 155, 708, 9, "F2"),
		text(`ORDER ${order.id}`, 430, 728, 9, "F2"),
		text(new Date(order.placed_at).toLocaleDateString("en-GH"), 430, 710, 9),
		"0.16 0.16 0.16 rg",
		text("CUSTOMER", 58, 625, 8, "F2"),
		text(order.delivery_name, 58, 608, 11, "F2"),
		text(order.delivery_email, 58, 590, 9),
		text("DELIVERY", 330, 625, 8, "F2"),
		text(order.delivery_address, 330, 608, 9),
		text(`${order.delivery_city}, ${order.delivery_country}`, 330, 590, 9),
		"0.98 0.72 0.12 RG 40 565 m 572 565 l S",
		text("ITEM", 58, 548, 8, "F2"),
		text("SIZE", 310, 548, 8, "F2"),
		text("QTY", 380, 548, 8, "F2"),
		text("AMOUNT", 440, 548, 8, "F2"),
		rowText,
		"0.98 0.72 0.12 rg 360 105 212 115 re f",
		"0.16 0.16 0.16 rg",
		text(`Subtotal  ${money(order.subtotal)}`, 385, 195, 9),
		text(`Shipping  ${money(order.shipping)}`, 385, 175, 9),
		text(`TOTAL  ${money(order.total)}`, 385, 143, 13, "F2"),
		text("PAYMENT STATUS", 58, 195, 8, "F2"),
		text("PAID", 58, 177, 12, "F2"),
		text(`REFERENCE  ${order.payment_reference ?? "N/A"}`, 58, 157, 8),
		text("Thank you for shopping with Big Pee Kicks.", 58, 92, 9, "F2"),
		text("This receipt is an official record of your completed purchase.", 58, 74, 8)
	].join(" ");
	const objects = [
		Buffer.from("<</Type /Catalog /Pages 2 0 R>>"),
		Buffer.from("<</Type /Pages /Kids [3 0 R] /Count 1>>"),
		Buffer.from("<</Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> /XObject << /Logo 7 0 R >> >> >>"),
		Buffer.from(`<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`),
		Buffer.from("<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>"),
		Buffer.from("<</Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold>>"),
		Buffer.concat([
			Buffer.from(`<</Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode /DecodeParms << /Predictor 15 /Colors 3 /BitsPerComponent 8 /Columns ${image.width} >> /Length ${image.data.length} >>\nstream\n`),
			image.data,
			Buffer.from("\nendstream")
		])
	];
	const body = [Buffer.from("%PDF-1.4\n%ÿÿÿÿ\n")];
	const offsets = [0];
	for (let index = 0; index < objects.length; index += 1) {
		offsets.push(Buffer.concat(body).length);
		body.push(Buffer.from(`${index + 1} 0 obj\n`), objects[index] ?? Buffer.alloc(0), Buffer.from("\nendobj\n"));
	}
	const xrefOffset = Buffer.concat(body).length;
	body.push(Buffer.from(`xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n `).join("\n")}\ntrailer\n<</Root 1 0 R /Size ${objects.length + 1}>>\nstartxref\n${xrefOffset}\n%%EOF`));
	return Buffer.concat(body);
}
var server_default = { async fetch(request, env, ctx) {
	try {
		const requestUrl = new URL(request.url);
		if (requestUrl.pathname.startsWith("/uploads/products/") && request.method === "GET") {
			const relativePath = decodeURIComponent(requestUrl.pathname.slice(9));
			const filePath = normalize(join(process.cwd(), "uploads", relativePath));
			if (!filePath.startsWith(normalize(join(process.cwd(), "uploads")))) return new Response("Not found", { status: 404 });
			try {
				const file = await readFile(filePath);
				const contentType = filePath.endsWith(".png") ? "image/png" : filePath.endsWith(".webp") ? "image/webp" : "image/jpeg";
				return new Response(file, { headers: {
					"content-type": contentType,
					"cache-control": "public, max-age=31536000, immutable"
				} });
			} catch {
				return new Response("Not found", { status: 404 });
			}
		}
		if (requestUrl.pathname === "/api/cart" && (request.method === "GET" || request.method === "PUT" || request.method === "DELETE")) {
			const database = getLocalDatabase();
			const cart = await getCartId(database, request);
			const headers = cart.cookie ? { "set-cookie": cart.cookie } : void 0;
			if (request.method === "GET") return new Response(JSON.stringify(await readCart(database, cart.id)), { headers: {
				"content-type": "application/json",
				...headers ?? {}
			} });
			if (request.method === "DELETE") {
				await replaceCart(database, cart.id, []);
				return new Response("[]", { headers: {
					"content-type": "application/json",
					...headers ?? {}
				} });
			}
			const lines = await request.json();
			return new Response(JSON.stringify(await replaceCart(database, cart.id, lines)), { headers: {
				"content-type": "application/json",
				...headers ?? {}
			} });
		}
		if (requestUrl.pathname === "/api/health" && request.method === "GET") return Response.json({
			ok: true,
			service: "big-pee-kicks"
		});
		if (requestUrl.pathname === "/api/shipping/quote" && request.method === "POST") {
			const payload = await request.json();
			const database = getLocalDatabase();
			const location = payload.city?.trim() || "Other";
			const rates = await database.prepare("SELECT standard, express FROM shipping_rates WHERE location = ? COLLATE NOCASE").bind(location).all();
			const fallback = await database.prepare("SELECT standard, express FROM shipping_rates WHERE location = 'Other'").bind().all();
			const settingsRates = (await database.prepare("SELECT key, value FROM store_settings WHERE key IN ('standardShipping', 'expressShipping', 'freeDeliveryThreshold')").bind().all()).results.reduce((values, setting) => ({
				...values,
				[setting.key]: Number(setting.value)
			}), {});
			const rate = rates.results[0] ?? fallback.results[0] ?? {
				standard: settingsRates.standardShipping,
				express: settingsRates.expressShipping
			};
			const freeDeliveryThreshold = settingsRates.freeDeliveryThreshold !== void 0 && Number.isFinite(settingsRates.freeDeliveryThreshold) ? settingsRates.freeDeliveryThreshold : 200;
			const shipping = (payload.subtotal ?? 0) >= freeDeliveryThreshold ? 0 : rate?.[payload.method === "express" ? "express" : "standard"] ?? 0;
			return Response.json({
				shipping,
				freeDeliveryThreshold,
				location: rates.results[0] ? location : "Other"
			});
		}
		if (requestUrl.pathname === "/api/buyer/register" && request.method === "POST") {
			const payload = await request.json();
			const result = await registerBuyer(getLocalDatabase(), payload.name ?? "", payload.email ?? "", payload.password ?? "");
			if (!result) return Response.json({ error: "Unable to create account" }, { status: 400 });
			return new Response(JSON.stringify(result.buyer), { headers: {
				"content-type": "application/json",
				"set-cookie": result.cookie
			} });
		}
		if (requestUrl.pathname === "/api/buyer/login" && request.method === "POST") {
			const payload = await request.json();
			const result = await loginBuyer(getLocalDatabase(), payload.email ?? "", payload.password ?? "");
			if (!result) return Response.json({ error: "Email or password is incorrect" }, { status: 401 });
			return new Response(JSON.stringify(result.buyer), { headers: {
				"content-type": "application/json",
				"set-cookie": result.cookie
			} });
		}
		if (requestUrl.pathname === "/api/buyer/session" && request.method === "GET") return Response.json(await currentBuyer(getLocalDatabase(), request));
		if (requestUrl.pathname === "/api/buyer/logout" && request.method === "POST") {
			const cookie = await logoutBuyer(getLocalDatabase(), request);
			return new Response("{}", { headers: {
				"content-type": "application/json",
				...cookie ? { "set-cookie": cookie } : {}
			} });
		}
		if (requestUrl.pathname === "/api/buyer/orders" && request.method === "GET") {
			const buyer = await currentBuyer(getLocalDatabase(), request);
			if (!buyer) return Response.json({ error: "Buyer authentication required" }, { status: 401 });
			return Response.json(await listOrders(getLocalDatabase(), void 0, buyer.email));
		}
		if (requestUrl.pathname === "/api/orders" && request.method === "GET") {
			const database = getLocalDatabase();
			if (!await isAdminRequest(database, request)) return Response.json({ error: "Admin authentication required" }, { status: 401 });
			return Response.json(await listOrders(database));
		}
		if (requestUrl.pathname.startsWith("/api/orders/") && request.method === "PATCH") {
			const database = getLocalDatabase();
			if (!await isAdminRequest(database, request)) return Response.json({ error: "Admin authentication required" }, { status: 401 });
			const payload = await request.json();
			if (payload.returnStatus) {
				await updateReturnStatus(database, requestUrl.pathname.split("/").pop() ?? "", payload.returnStatus);
				return Response.json({ updated: true });
			}
			await updateOrderStatus(database, requestUrl.pathname.split("/").pop() ?? "", payload.status ?? "");
			return Response.json({ updated: true });
		}
		if (requestUrl.pathname.startsWith("/api/orders/") && requestUrl.pathname.endsWith("/return") && request.method === "POST") {
			const database = getLocalDatabase();
			const buyer = await currentBuyer(database, request);
			const orderId = requestUrl.pathname.split("/").at(-2) ?? "";
			if (!buyer && !await isAdminRequest(database, request)) return Response.json({ error: "Authentication required" }, { status: 401 });
			await requestOrderReturn(database, orderId, buyer?.email);
			return Response.json({ requested: true });
		}
		if (requestUrl.pathname.startsWith("/api/orders/") && requestUrl.pathname.endsWith("/receipt") && request.method === "GET") {
			const orderId = requestUrl.pathname.split("/").at(-2) ?? "";
			const reference = requestUrl.searchParams.get("reference");
			const database = getLocalDatabase();
			const order = await database.prepare("SELECT id, payment_status, payment_reference, delivery_email, delivery_name, delivery_address, delivery_city, delivery_country, subtotal, shipping, total, placed_at FROM orders WHERE id = ?").bind(orderId).all();
			if (!order.results[0] || order.results[0].payment_status !== "Paid" || reference !== order.results[0].payment_reference && !await isAdminRequest(database, request)) return Response.json({ error: "Receipt unavailable" }, { status: 404 });
			const orderRecord = order.results[0];
			const items = await database.prepare("SELECT product_name, size, quantity, unit_price FROM order_items WHERE order_id = ? ORDER BY id").bind(orderId).all();
			const logo = await readFile(join(process.cwd(), "logo", "logo.png"));
			const pdf = createReceiptPdf(orderRecord, items.results, logo);
			return new Response(pdf, { headers: {
				"content-type": "application/pdf",
				"content-disposition": `attachment; filename="${orderId}-receipt.pdf"`
			} });
		}
		if (requestUrl.pathname === "/api/admin/login" && request.method === "POST") {
			const address = request.headers.get("x-forwarded-for") ?? "unknown";
			const attempt = loginAttempts.get(address);
			if (attempt && attempt.resetAt > Date.now() && attempt.count >= 5) return Response.json({ error: "Too many login attempts" }, { status: 429 });
		}
		if (requestUrl.pathname === "/api/admin/password" && request.method === "POST") {
			const database = getLocalDatabase();
			if (!await isAdminRequest(database, request)) return Response.json({ error: "Admin authentication required" }, { status: 401 });
			const payload = await request.json();
			return await changeAdminPassword(database, request, payload.currentPassword ?? "", payload.newPassword ?? "") ? Response.json({ changed: true }) : Response.json({ error: "Password change failed" }, { status: 400 });
		}
		if (new URL(request.url).pathname === "/api/products") {
			const database = getLocalDatabase();
			if (request.method === "GET") return Response.json(await listActiveProducts(database));
			if (!await isAdminRequest(database, request)) return Response.json({ error: "Admin authentication required" }, { status: 401 });
			const payload = await request.json();
			if (payload.action === "create" && payload.product) {
				payload.product.image = await storeProductImage(payload.product.id, payload.product.image);
				await createProduct(database, payload.product);
				return Response.json(payload.product, { status: 201 });
			}
			if (payload.action === "update" && payload.product) {
				payload.product.image = await storeProductImage(payload.product.id, payload.product.image);
				await updateProduct(database, payload.product);
				return Response.json(payload.product);
			}
			if (payload.action === "delete" && payload.id) {
				await deleteProduct(database, payload.id);
				return Response.json({ id: payload.id });
			}
			return Response.json({ error: "Invalid product request" }, { status: 400 });
		}
		if (new URL(request.url).pathname === "/api/admin/login" && request.method === "POST") {
			const payload = await request.json();
			const result = await loginAdmin(getLocalDatabase(), payload.password ?? "");
			if (!result) {
				const address = request.headers.get("x-forwarded-for") ?? "unknown";
				const current = loginAttempts.get(address);
				loginAttempts.set(address, {
					count: (current?.count ?? 0) + 1,
					resetAt: current?.resetAt && current.resetAt > Date.now() ? current.resetAt : Date.now() + 900 * 1e3
				});
				return Response.json({ error: "Invalid password" }, { status: 401 });
			}
			return new Response(JSON.stringify({ name: result.name }), { headers: {
				"content-type": "application/json",
				"set-cookie": result.cookie
			} });
		}
		if (new URL(request.url).pathname === "/api/admin/session" && request.method === "GET") {
			const database = getLocalDatabase();
			return Response.json({
				isAdmin: await isAdminRequest(database, request),
				name: await adminName(database, request)
			});
		}
		if (new URL(request.url).pathname === "/api/admin/logout" && request.method === "POST") {
			const cookie = await logoutAdmin(getLocalDatabase(), request);
			return new Response("{}", { headers: {
				"content-type": "application/json",
				...cookie ? { "set-cookie": cookie } : {}
			} });
		}
		if (new URL(request.url).pathname === "/api/admin/notifications" && request.method === "GET") {
			const database = getLocalDatabase();
			if (!await isAdminRequest(database, request)) return Response.json({ error: "Admin authentication required" }, { status: 401 });
			return Response.json(await listNotifications(database));
		}
		if (requestUrl.pathname === "/api/admin/notifications/read" && request.method === "POST") {
			const database = getLocalDatabase();
			if (!await isAdminRequest(database, request)) return Response.json({ error: "Admin authentication required" }, { status: 401 });
			await markNotificationsRead(database);
			return Response.json({ marked: true });
		}
		if (requestUrl.pathname === "/api/admin/settings" && (request.method === "GET" || request.method === "PUT")) {
			const database = getLocalDatabase();
			if (!await isAdminRequest(database, request)) return Response.json({ error: "Admin authentication required" }, { status: 401 });
			const defaults = {
				storeName: "Big Pee Kicks",
				email: "hello@bigpeekicks.com",
				standardShipping: "12",
				expressShipping: "28",
				promoCode: "BIGPEE10",
				promoDiscount: "10",
				adminPhone: process.env["ADMIN_PHONE"] ?? ""
			};
			if (request.method === "GET") {
				const rows = await database.prepare("SELECT key, value FROM store_settings").bind().all();
				return Response.json(rows.results.reduce((settings, row) => ({
					...settings,
					[row.key]: row.value
				}), defaults));
			}
			const settings = await request.json();
			for (const key of Object.keys(defaults)) if (typeof settings[key] === "string") await database.prepare("INSERT INTO store_settings (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at").bind(key, settings[key], (/* @__PURE__ */ new Date()).toISOString()).run();
			return Response.json({ saved: true });
		}
		if (requestUrl.pathname === "/api/admin/shipping-rates" && (request.method === "GET" || request.method === "PUT")) {
			const database = getLocalDatabase();
			if (!await isAdminRequest(database, request)) return Response.json({ error: "Admin authentication required" }, { status: 401 });
			if (request.method === "GET") return Response.json((await database.prepare("SELECT location, standard, express FROM shipping_rates ORDER BY location").bind().all()).results);
			const rates = await request.json();
			for (const rate of rates) if (rate.location && Number.isFinite(rate.standard) && Number.isFinite(rate.express) && rate.standard >= 0 && rate.express >= 0) await database.prepare("INSERT INTO shipping_rates (location, standard, express, updated_at) VALUES (?, ?, ?, ?) ON CONFLICT(location) DO UPDATE SET standard = excluded.standard, express = excluded.express, updated_at = excluded.updated_at").bind(rate.location.trim(), rate.standard, rate.express, (/* @__PURE__ */ new Date()).toISOString()).run();
			return Response.json({ saved: true });
		}
		if (new URL(request.url).pathname === "/api/payments/paystack/initialize" && request.method === "POST") {
			const payload = await request.json();
			if (!payload.email || !payload.name || !payload.lines?.length || typeof payload.total !== "number") return Response.json({ error: "Complete checkout details are required" }, { status: 400 });
			const database = getLocalDatabase();
			const orderId = await createPendingOrder(database, payload);
			const payment = await initializePaystackPayment({
				email: payload.email,
				amount: payload.total,
				callbackUrl: new URL(`/order-confirmation?orderId=${orderId}`, request.url).toString(),
				metadata: { orderId }
			});
			await attachPaymentReference(database, orderId, payment.reference);
			return Response.json({
				...payment,
				orderId
			});
		}
		if (new URL(request.url).pathname === "/api/payments/paystack/verify" && request.method === "POST") {
			const payload = await request.json();
			if (!payload.reference) return Response.json({ error: "Payment reference is required" }, { status: 400 });
			if (!await verifyPaystackPayment(payload.reference)) return Response.json({ paid: false }, { status: 402 });
			await markOrderPaid(getLocalDatabase(), payload.reference);
			return Response.json({ paid: true });
		}
		if (new URL(request.url).pathname === "/api/payments/paystack/webhook" && request.method === "POST") {
			const secretKey = process.env["PAYSTACK_SECRET_KEY"];
			const body = await request.text();
			const signature = request.headers.get("x-paystack-signature") ?? "";
			const expected = secretKey ? createHmac("sha512", secretKey).update(body).digest("hex") : "";
			const signatureBuffer = Buffer.from(signature);
			const expectedBuffer = Buffer.from(expected);
			if (!signature || !expected || signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) return Response.json({ error: "Invalid signature" }, { status: 401 });
			const event = JSON.parse(body);
			if (event.event === "charge.success" && event.data?.reference) await markOrderPaid(getLocalDatabase(), event.data.reference);
			return Response.json({ received: true });
		}
		return await normalizeCatastrophicSsrResponse(await (await getServerEntry()).fetch(request, env, ctx));
	} catch (error) {
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
//#endregion
export { server_default as default, renderErrorPage as n, formatPrice as t };
