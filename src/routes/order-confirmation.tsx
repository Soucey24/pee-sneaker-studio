import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Package, Truck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { useOrders } from "@/context/orders";
import { formatPrice } from "@/lib/currency";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/order-confirmation")({
  validateSearch: (search: Record<string, unknown>) => ({ orderId: String(search["orderId"] ?? "") }),
  component: OrderConfirmationPage,
});

function OrderConfirmationPage() {
  const { orderId } = Route.useSearch();
  const { orders } = useOrders();
  const order = orders.find((item) => item.id === orderId) ?? orders[0];
  const [paymentState, setPaymentState] = useState<"checking" | "paid" | "failed">("checking");
  useEffect(() => {
    const reference = new URLSearchParams(window.location.search).get("reference") ?? new URLSearchParams(window.location.search).get("trxref");
    if (!reference) {
      setPaymentState(order ? "paid" : "failed");
      return;
    }
    void fetch("/api/payments/paystack/verify", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ reference }) })
      .then((response) => { setPaymentState(response.ok ? "paid" : "failed"); })
      .catch(() => setPaymentState("failed"));
  }, [order]);
  if (!order && paymentState === "checking") return <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">Verifying payment...</div>;
  if (!order && paymentState === "paid") return <div className="min-h-screen bg-background"><SiteHeader /><main className="mx-auto max-w-3xl px-5 pb-20 pt-36 text-center"><div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="size-8" /></div><p className="mt-6 text-xs uppercase tracking-[0.25em] text-primary">Payment received</p><h1 className="mt-3 text-5xl leading-none">Order confirmed</h1><p className="mx-auto mt-5 max-w-md text-muted-foreground">Your payment was verified successfully. Order reference: {orderId}.</p><Link to="/shop" className="ember-fill mt-10 inline-block rounded-md px-5 py-3 font-display text-xs tracking-widest">Continue shopping</Link></main></div>;
  if (!order && paymentState === "failed") return <div className="min-h-screen bg-background"><SiteHeader /><main className="mx-auto max-w-3xl px-5 pb-20 pt-36 text-center"><h1 className="text-4xl">Payment needs attention</h1><p className="mt-4 text-muted-foreground">We could not verify this payment yet. Please contact support with reference {orderId}.</p><Link to="/checkout" className="ember-fill mt-8 inline-block rounded-md px-5 py-3 font-display text-xs tracking-widest">Return to checkout</Link></main></div>;
  return <div className="min-h-screen bg-background"><SiteHeader /><main className="mx-auto max-w-3xl px-5 pb-20 pt-36">{order ? <><div className="text-center"><div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="size-8" /></div><p className="mt-6 text-xs uppercase tracking-[0.25em] text-primary">Order confirmed</p><h1 className="mt-3 text-5xl leading-none sm:text-6xl">Heat is on the way</h1><p className="mx-auto mt-5 max-w-md text-muted-foreground">Order {order.id} is being prepared. Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}.</p></div><div className="mt-12 grid gap-4 border-y border-border py-6 sm:grid-cols-2"><div><p className="text-xs uppercase tracking-widest text-muted-foreground">Delivery to</p><p className="mt-2 text-sm">{order.delivery.name}<br />{order.delivery.address}<br />{order.delivery.city}, {order.delivery.country}</p></div><div><p className="text-xs uppercase tracking-widest text-muted-foreground">Order total</p><p className="mt-2 font-display text-2xl text-primary">{formatPrice(order.total)}</p></div></div><div className="mt-8 space-y-3"><p className="flex gap-3 text-sm text-muted-foreground"><Package className="size-4 text-primary" /> {order.lines.length} product line(s)</p><p className="flex gap-3 text-sm text-muted-foreground"><Truck className="size-4 text-primary" /> {order.status} · estimated delivery in 2–5 days</p></div><div className="mt-10 flex flex-wrap justify-center gap-3"><Link to="/account" className="ember-fill rounded-md px-5 py-3 font-display text-xs tracking-widest">Track order</Link><Link to="/shop" className="rounded-md border border-border px-5 py-3 font-display text-xs tracking-widest text-muted-foreground">Continue shopping</Link></div></> : <div className="text-center"><h1 className="text-4xl">No order found</h1><Link to="/shop" className="ember-fill mt-6 inline-block rounded-md px-5 py-3 font-display text-xs tracking-widest">Back to shop</Link></div>}</main></div>;
}
