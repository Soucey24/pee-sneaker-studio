import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Users } from "lucide-react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminGuard } from "@/components/AdminGuard";
import { useAuth } from "@/context/auth";
import { useOrders } from "@/context/orders";

export const Route = createFileRoute("/admin/customers")({ component: AdminCustomersPage });
function AdminCustomersPage() {
  const { isAdmin } = useAuth();
  const { orders } = useOrders();
  if (!isAdmin) return <AdminGuard />;
  const customers = Array.from(new Map(orders.map((order) => [order.delivery.email, order.delivery])).values());
  return <div className="min-h-screen bg-background"><AdminSidebar /><main className="lg:ml-64"><div className="mx-auto max-w-6xl px-5 pb-20 pt-8"><Link to="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" /> Inventory</Link><div className="mt-8 border-b border-border pb-8"><p className="text-xs uppercase tracking-[0.25em] text-primary">Admin / People</p><h1 className="mt-3 text-5xl leading-none">Customers</h1></div>{customers.length === 0 ? <p className="py-16 text-muted-foreground">Customers appear after their first order.</p> : <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{customers.map((customer) => <div key={customer.email} className="border border-border bg-surface p-5"><Users className="size-5 text-primary" /><p className="mt-4 font-display">{customer.name}</p><p className="mt-1 text-sm text-muted-foreground">{customer.email}</p><p className="mt-3 text-xs text-muted-foreground">{customer.city}, {customer.country}</p></div>)}</div>}</div></main></div>;
}
