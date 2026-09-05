import { randomBytes } from "node:crypto";
import type { CartLine } from "@/components/CartDrawer";
import type { CatalogDatabase } from "@/lib/catalog.server";
import { createNotification, getAdminPhone, sendArkeselSms } from "@/lib/notifications.server";

export type PendingOrderInput = {
  email: string;
  phone?: string;
  recipient?: { name: string; phone: string; address: string; city: string; country: string };
  name: string;
  address: string;
  city: string;
  country: string;
  subtotal: number;
  shipping: number;
  total: number;
  lines: CartLine[];
};

export async function createPendingOrder(database: CatalogDatabase, input: PendingOrderInput) {
  const now = new Date().toISOString();
  const customerId = `customer-${randomBytes(8).toString("hex")}`;
  const orderId = `BPK-${Date.now().toString().slice(-8)}`;
  await database.prepare(
    `INSERT INTO customers (id, name, email, phone, address, city, country, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(email) DO UPDATE SET name = excluded.name, address = excluded.address, city = excluded.city, country = excluded.country, updated_at = excluded.updated_at`,
  ).bind(customerId, input.name, input.email, input.phone ?? null, input.address, input.city, input.country, now, now).run();
  const customer = await database.prepare("SELECT id FROM customers WHERE email = ?").bind(input.email).all<{ id: string }>();
  const savedCustomerId = customer.results[0]?.id ?? customerId;
  await database.prepare(
    `INSERT INTO orders (id, customer_id, subtotal, shipping, total, delivery_email, delivery_name, delivery_address, delivery_city, delivery_country, delivery_phone, recipient_name, recipient_phone, recipient_address, recipient_city, recipient_country, placed_at, estimated_delivery)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(orderId, savedCustomerId, input.subtotal, input.shipping, input.total, input.email, input.name, input.address, input.city, input.country, input.phone ?? null, input.recipient?.name ?? input.name, input.recipient?.phone ?? input.phone ?? null, input.recipient?.address ?? input.address, input.recipient?.city ?? input.city, input.recipient?.country ?? input.country, now, new Date(Date.now() + 5 * 86400000).toISOString()).run();
  for (const line of input.lines) {
    await database.prepare("INSERT INTO order_items (order_id, product_id, product_name, size, quantity, unit_price) VALUES (?, ?, ?, ?, ?, ?)").bind(orderId, line.product.id, line.product.name, line.size, line.qty, line.product.price).run();
  }
  await createNotification(database, "New order awaiting payment", `Order ${orderId} was placed by ${input.name}. Amount due: GHS ${input.total.toFixed(2)}. Delivery: ${input.city}, ${input.country}. Payment is still pending.`, orderId);
  return orderId;
}

export async function markOrderPaid(database: CatalogDatabase, reference: string): Promise<void> {
  const order = await database.prepare("SELECT id, payment_status, delivery_name, delivery_email, delivery_phone, recipient_phone, total FROM orders WHERE payment_reference = ?").bind(reference).all<{ id: string; payment_status: string; delivery_name: string; delivery_email: string; delivery_phone: string | null; recipient_phone: string | null; total: number }>();
  if (!order.results[0]) throw new Error("Payment reference does not match an order");
  if (order.results[0].payment_status !== "Pending") return;
  await database.prepare("UPDATE orders SET payment_status = 'Paid', paid_at = ? WHERE id = ? AND payment_status = 'Pending'").bind(new Date().toISOString(), order.results[0].id).run();
  const items = await database.prepare("SELECT product_id, size, quantity FROM order_items WHERE order_id = ?").bind(order.results[0].id).all<{ product_id: string; size: number; quantity: number }>();
  for (const item of items.results) {
    await database.prepare("UPDATE product_sizes SET stock = GREATEST(0, stock - ?) WHERE product_id = ? AND size = ?").bind(item.quantity, item.product_id, item.size).run();
  }
  await createNotification(database, "Payment confirmed", `Payment confirmed for order ${order.results[0].id}. Buyer: ${order.results[0].delivery_name}. Amount paid: GHS ${order.results[0].total.toFixed(2)}. Stock was updated and the order is ready for processing.`, order.results[0].id);
  await sendArkeselSms([order.results[0].delivery_phone ?? "", order.results[0].recipient_phone ?? ""], `Big Pee Kicks: payment confirmed for order ${order.results[0].id}. Amount paid: GHS ${order.results[0].total.toFixed(2)}. We will prepare your delivery.`).catch((error) => console.error(error));
  await sendArkeselSms([await getAdminPhone(database)], `Big Pee Kicks admin: payment confirmed. Order ${order.results[0].id}, buyer ${order.results[0].delivery_name}, amount GHS ${order.results[0].total.toFixed(2)}. Please process the order.`).catch((error) => console.error(error));
}

export async function attachPaymentReference(database: CatalogDatabase, orderId: string, reference: string): Promise<void> {
  await database.prepare("UPDATE orders SET payment_reference = ? WHERE id = ? AND payment_status = 'Pending'").bind(reference, orderId).run();
}

export async function listOrders(database: CatalogDatabase, customerId?: string, email?: string) {
  const filter = customerId ? "o.customer_id = ?" : email ? "c.email = ?" : "1 = 1";
  const value = customerId ?? email;
  const orders = await database.prepare(`SELECT o.id, o.status, o.payment_status, o.payment_reference, o.total, o.shipping, o.delivery_email, o.delivery_name, o.delivery_address, o.delivery_city, o.delivery_country, o.delivery_phone, o.recipient_name, o.recipient_phone, o.recipient_address, o.recipient_city, o.recipient_country, o.placed_at, o.estimated_delivery, r.status AS return_status, r.reason AS return_reason FROM orders o JOIN customers c ON c.id = o.customer_id LEFT JOIN returns r ON r.order_id = o.id WHERE ${filter} ORDER BY o.placed_at DESC`).bind(...(value ? [value] : [])).all<{ id: string; status: string; payment_status: string; payment_reference: string | null; total: number; shipping: number; delivery_email: string; delivery_name: string; delivery_address: string; delivery_city: string; delivery_country: string; delivery_phone: string | null; recipient_name: string | null; recipient_phone: string | null; recipient_address: string | null; recipient_city: string | null; recipient_country: string | null; placed_at: string; estimated_delivery: string; return_status: "Requested" | "Approved" | "Rejected" | null; return_reason: string | null }>();
  const items = await database.prepare("SELECT order_id, product_id, product_name, size, quantity, unit_price FROM order_items").bind().all<{ order_id: string; product_id: string; product_name: string; size: number; quantity: number; unit_price: number }>();
  return orders.results.map((order) => ({
    id: order.id,
    lines: items.results.filter((item) => item.order_id === order.id).map((item) => ({ product: { id: item.product_id, name: item.product_name, price: item.unit_price, image: "", category: "Shoes", tag: "", sizes: [item.size], description: "", popularity: 0, createdAt: "" }, size: item.size, qty: item.quantity })),
    total: order.total,
    shipping: order.shipping,
    status: order.status,
    paymentStatus: order.payment_status,
    paymentReference: order.payment_reference ?? undefined,
    placedAt: order.placed_at,
    estimatedDelivery: order.estimated_delivery,
    delivery: { email: order.delivery_email, name: order.recipient_name ?? order.delivery_name, address: order.recipient_address ?? order.delivery_address, city: order.recipient_city ?? order.delivery_city, country: order.recipient_country ?? order.delivery_country },
    returnStatus: order.return_status ?? undefined,
    returnReason: order.return_reason ?? undefined,
  }));
}

export async function requestOrderReturn(database: CatalogDatabase, orderId: string, email?: string, reason = "Buyer requested a return") {
  const order = await database.prepare(`SELECT o.id, o.delivery_name, o.total FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.id = ? ${email ? "AND LOWER(c.email) = LOWER(?)" : ""}`).bind(...(email ? [orderId, email] : [orderId])).all<{ id: string; delivery_name: string; total: number }>();
  if (!order.results[0]) throw new Error("Order not found");
  const existing = await database.prepare("SELECT id FROM returns WHERE order_id = ?").bind(orderId).all<{ id: number }>();
  if (!existing.results[0]) {
    await database.prepare("INSERT INTO returns (order_id, reason, status, created_at) VALUES (?, ?, 'Requested', ?)").bind(orderId, reason, new Date().toISOString()).run();
    await createNotification(database, "Return request received", `Buyer ${order.results[0].delivery_name} requested a return for order ${orderId}. Order amount: GHS ${order.results[0].total.toFixed(2)}. Reason: ${reason}. Admin review is required.`, orderId);
  }
}

export async function updateReturnStatus(database: CatalogDatabase, orderId: string, status: string): Promise<void> {
  if (!["Requested", "Approved", "Rejected"].includes(status)) throw new Error("Invalid return status");
  const order = await database.prepare("SELECT delivery_name, delivery_phone, recipient_phone FROM orders WHERE id = ?").bind(orderId).all<{ delivery_name: string; delivery_phone: string | null; recipient_phone: string | null }>();
  if (!order.results[0]) throw new Error("Order not found");
  await database.prepare("UPDATE returns SET status = ? WHERE order_id = ?").bind(status, orderId).run();
  await createNotification(database, `Return ${status.toLowerCase()}`, `Return decision for order ${orderId}: ${status}. Buyer: ${order.results[0].delivery_name}. The buyer has been notified by SMS.`, orderId);
  await sendArkeselSms([order.results[0].delivery_phone ?? "", order.results[0].recipient_phone ?? ""], `Big Pee Kicks: your return request for order ${orderId} was ${status.toLowerCase()}. Please check your account for the next steps.`).catch((error) => console.error(error));
}

export async function updateOrderStatus(database: CatalogDatabase, orderId: string, status: string): Promise<void> {
  if (!["Processing", "Shipped", "Delivered", "Cancelled"].includes(status)) throw new Error("Invalid order status");
  const order = await database.prepare("SELECT delivery_name, delivery_phone, recipient_phone FROM orders WHERE id = ?").bind(orderId).all<{ delivery_name: string; delivery_phone: string | null; recipient_phone: string | null }>();
  if (!order.results[0]) throw new Error("Order not found");
  await database.prepare("UPDATE orders SET status = ? WHERE id = ?").bind(status, orderId).run();
  if (status === "Shipped") {
    await createNotification(database, "Order shipped", `Order ${orderId} for ${order.results[0].delivery_name} was marked as shipped. The buyer has been notified by SMS.`, orderId);
    await sendArkeselSms([order.results[0].delivery_phone ?? "", order.results[0].recipient_phone ?? ""], `Big Pee Kicks: order ${orderId} has shipped. Please keep your phone available for delivery updates.`).catch((error) => console.error(error));
    await sendArkeselSms([await getAdminPhone(database)], `Big Pee Kicks admin: order ${orderId} for ${order.results[0].delivery_name} was marked as shipped successfully.`).catch((error) => console.error(error));
  }
}