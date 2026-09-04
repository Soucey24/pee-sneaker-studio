import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CartLine } from "@/components/CartDrawer";

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";
export type PaymentStatus = "Pending" | "Paid" | "Failed" | "Refunded";
export type Order = {
  id: string;
  buyerId?: string;
  lines: CartLine[];
  total: number;
  shipping: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  placedAt: string;
  estimatedDelivery: string;
  delivery: { email: string; name: string; address: string; city: string; country: string };
  returnStatus?: "Requested" | "Approved" | "Rejected";
  returnReason?: string;
};

type OrdersContextValue = {
  orders: Order[];
  placeOrder: (order: Omit<Order, "id" | "placedAt" | "status" | "paymentStatus" | "estimatedDelivery">) => Order;
  requestReturn: (id: string) => void;
  updateOrder: (id: string, changes: Partial<Order>) => void;
};

const OrdersContext = createContext<OrdersContextValue | null>(null);
const STORAGE_KEY = "big-pee-orders";

function readOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Order[]; } catch { return []; }
}

export function useOrders() {
  const value = useContext(OrdersContext);
  if (!value) throw new Error("useOrders must be used inside OrdersProvider");
  return value;
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    setOrders(readOrders());
  }, []);
  const persist = (next: Order[]) => { setOrders(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); };
  const placeOrder = (order: Omit<Order, "id" | "placedAt" | "status" | "paymentStatus" | "estimatedDelivery">) => {
    const nextOrder: Order = { ...order, id: `BPK-${Date.now().toString().slice(-8)}`, placedAt: new Date().toISOString(), status: "Processing", paymentStatus: "Pending", estimatedDelivery: new Date(Date.now() + 5 * 86400000).toISOString() };
    persist([nextOrder, ...orders]);
    return nextOrder;
  };
  const requestReturn = (id: string) => persist(orders.map((order) => order.id === id ? { ...order, returnStatus: "Requested" } : order));
  const updateOrder = (id: string, changes: Partial<Order>) => persist(orders.map((order) => order.id === id ? { ...order, ...changes } : order));
  return <OrdersContext.Provider value={{ orders, placeOrder, requestReturn, updateOrder }}>{children}</OrdersContext.Provider>;
}
