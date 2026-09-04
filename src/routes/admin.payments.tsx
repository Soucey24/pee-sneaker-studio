import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CreditCard } from "lucide-react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminGuard } from "@/components/AdminGuard";
import { useAuth } from "@/context/auth";
import { useOrders } from "@/context/orders";

export const Route = createFileRoute("/admin/payments")({ component: AdminPaymentsPage });
function AdminPaymentsPage() {
  const { isAdmin } = useAuth();
  const { orders } = useOrders();
  if (!isAdmin) return <AdminGuard />;
  const paid = orders.filter((order) => order.paymentStatus === "Paid").reduce((sum, order) => sum + order.total, 0);
  const pending = orders.filter((order) => order.paymentStatus === "Pending").reduce((sum, order) => sum + order.total, 0);
  return <div className="min-h-screen bg-background"><AdminSidebar /><main className="lg:ml-64"><div className="mx-auto max-w-6xl px-5 pb-20 pt-8"><Link to="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" /> Inventory</Link><div className="mt-8 border-b border-border pb-8"><p className="text-xs uppercase tracking-[0.25em] text-primary">Admin / Finance</p><h1 className="mt-3 text-5xl leading-none">Payments</h1></div><div className="grid gap-4 py-8 sm:grid-cols-3"><div className="border border-border bg-surface p-5"><p className="text-sm text-muted-foreground">Paid</p><p className="mt-2 font-display text-3xl text-primary">${paid}</p></div><div className="border border-border bg-surface p-5"><p className="text-sm text-muted-foreground">Pending</p><p className="mt-2 font-display text-3xl text-primary">${pending}</p></div><div className="border border-border bg-surface p-5"><p className="text-sm text-muted-foreground">Transactions</p><p className="mt-2 font-display text-3xl text-primary">{orders.length}</p></div></div><div className="space-y-3">{orders.map((order) => <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 border border-border bg-surface p-4"><span className="flex items-center gap-3 text-sm"><CreditCard className="size-4 text-primary" />{order.id}</span><span className="text-sm text-muted-foreground">{order.delivery.email}</span><span className="text-xs text-muted-foreground">{order.paymentReference ?? "Awaiting reference"}</span><span className="font-display">${order.total}</span><span className="text-sm text-primary">{order.paymentStatus}</span></div>)}</div></div></main></div>;
}
