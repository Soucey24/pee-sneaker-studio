import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminGuard } from "@/components/AdminGuard";
import { useAuth } from "@/context/auth";
import { useOrders } from "@/context/orders";
import { useEffect } from "react";

export const Route = createFileRoute("/admin/returns")({ component: AdminReturnsPage });
function AdminReturnsPage() {
  const { isAdmin } = useAuth();
  const { orders, updateOrder, reloadOrders } = useOrders();
  useEffect(() => { if (isAdmin) void reloadOrders().catch(() => undefined); }, [isAdmin, reloadOrders]);
  const returns = orders.filter((order) => order.returnStatus);
  if (!isAdmin) return <AdminGuard />;
  return <div className="min-h-screen bg-background"><AdminSidebar /><main className="lg:ml-64"><div className="mx-auto max-w-6xl px-5 pb-20 pt-8"><Link to="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" /> Inventory</Link><div className="mt-8 border-b border-border pb-8"><p className="text-xs uppercase tracking-[0.25em] text-primary">Admin / Support</p><h1 className="mt-3 text-5xl leading-none">Returns</h1><p className="mt-4 text-muted-foreground">Review buyer return and exchange requests.</p></div>{returns.length === 0 ? <p className="py-16 text-muted-foreground">No return requests yet.</p> : <div className="mt-8 space-y-4">{returns.map((order) => <div key={order.id} className="flex flex-wrap items-center justify-between gap-4 border border-border bg-surface p-5"><div><p className="flex items-center gap-2 font-display"><RotateCcw className="size-4 text-primary" />{order.id}</p><p className="mt-2 text-sm text-muted-foreground">{order.delivery.name} · {order.delivery.email}</p><p className="mt-1 text-xs text-muted-foreground">Reason: {order.returnReason ?? "Not provided"}</p></div><span className="text-sm text-primary">{order.returnStatus}</span><div className="flex gap-2"><button onClick={() => updateOrder(order.id, { returnStatus: "Approved" })} disabled={order.returnStatus === "Approved"} className="rounded-md border border-border px-4 py-2 text-xs text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-50">Approve</button><button onClick={() => updateOrder(order.id, { returnStatus: "Rejected" })} disabled={order.returnStatus === "Rejected"} className="rounded-md border border-border px-4 py-2 text-xs text-muted-foreground hover:border-red-400 hover:text-red-400 disabled:opacity-50">Reject</button></div></div>)}</div>}</div></main></div>;
}
