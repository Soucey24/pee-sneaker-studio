import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Package, Truck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { useOrders } from "@/context/orders";

export const Route = createFileRoute("/order-confirmation")({
  validateSearch: (search: Record<string, unknown>) => ({ orderId: String(search["orderId"] ?? "") }),
  component: OrderConfirmationPage,
});

function OrderConfirmationPage() {
  const { orderId } = Route.useSearch();
  const { orders } = useOrders();
  const order = orders.find((item) => item.id === orderId) ?? orders[0];
  return <div className="min-h-screen bg-background"><SiteHeader /><main className="mx-auto max-w-3xl px-5 pb-20 pt-36">{order ? <><div className="text-center"><div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="size-8" /></div><p className="mt-6 text-xs uppercase tracking-[0.25em] text-primary">Order confirmed</p><h1 className="mt-3 text-5xl leading-none sm:text-6xl">Heat is on the way</h1><p className="mx-auto mt-5 max-w-md text-muted-foreground">Order {order.id} is being prepared. Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}.</p></div><div className="mt-12 grid gap-4 border-y border-border py-6 sm:grid-cols-2"><div><p className="text-xs uppercase tracking-widest text-muted-foreground">Delivery to</p><p className="mt-2 text-sm">{order.delivery.name}<br />{order.delivery.address}<br />{order.delivery.city}, {order.delivery.country}</p></div><div><p className="text-xs uppercase tracking-widest text-muted-foreground">Order total</p><p className="mt-2 font-display text-2xl text-primary">${order.total}</p></div></div><div className="mt-8 space-y-3"><p className="flex gap-3 text-sm text-muted-foreground"><Package className="size-4 text-primary" /> {order.lines.length} product line(s)</p><p className="flex gap-3 text-sm text-muted-foreground"><Truck className="size-4 text-primary" /> {order.status} · estimated delivery in 2–5 days</p></div><div className="mt-10 flex flex-wrap justify-center gap-3"><Link to="/account" className="ember-fill rounded-md px-5 py-3 font-display text-xs tracking-widest">Track order</Link><Link to="/shop" className="rounded-md border border-border px-5 py-3 font-display text-xs tracking-widest text-muted-foreground">Continue shopping</Link></div></> : <div className="text-center"><h1 className="text-4xl">No order found</h1><Link to="/shop" className="ember-fill mt-6 inline-block rounded-md px-5 py-3 font-display text-xs tracking-widest">Back to shop</Link></div>}</main></div>;
}
