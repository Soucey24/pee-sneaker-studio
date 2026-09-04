import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, LockKeyhole, Truck } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart } from "@/context/cart";
import { useOrders } from "@/context/orders";
import { useAuth } from "@/context/auth";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Big Pee Kicks" },
      { name: "description", content: "Complete your Big Pee Kicks order." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { lines, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { buyer } = useAuth();
  const navigate = useNavigate();
  const [reviewing, setReviewing] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [promo, setPromo] = useState("");
  const [promoError, setPromoError] = useState("");
  const [discount, setDiscount] = useState(0);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);
  const shipping = subtotal >= 200 || subtotal === 0 ? 0 : shippingMethod === "express" ? 28 : 12;
  const total = Math.max(0, subtotal + shipping - discount);

  const handleCheckout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (!reviewing) {
      if (promo.trim().toUpperCase() === "BIGPEE10") { setDiscount(Math.round(subtotal * 0.1)); setPromoError(""); }
      else if (promo.trim()) { setPromoError("That code is not active."); return; }
      setReviewing(true);
      return;
    }
    const order = placeOrder({ ...(buyer ? { buyerId: buyer.id } : {}), lines, total, shipping, delivery: { email: String(form.get("email")), name: `${String(form.get("firstName"))} ${String(form.get("lastName"))}`, address: String(form.get("address")), city: String(form.get("city")), country: String(form.get("country")) } });
    clearCart();
    navigate({ to: "/order-confirmation", search: { orderId: order.id } });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 pb-20 pt-32">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Continue shopping
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_380px]">
          <section>
            <div className="mb-8">
              <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-primary">Secure checkout</p>
              <h1 className="text-5xl leading-none sm:text-6xl">Finish the fit</h1>
            </div>

            {lines.length === 0 ? (
              <div className="border-y border-border py-12">
                <p className="text-muted-foreground">Your bag is empty. Find a pair before checking out.</p>
                <Link to="/shop" className="ember-fill mt-6 inline-block rounded-md px-6 py-3 font-display text-xs tracking-widest">
                  Browse the shelf
                </Link>
              </div>
            ) : (
              <>
              {!buyer && !reviewing && <div className="mb-8 border border-primary/30 bg-surface p-5"><p className="font-display text-sm">Want order tracking?</p><p className="mt-2 text-sm text-muted-foreground">Sign in for order history, saved details, and easy returns. Guest checkout is still available.</p><div className="mt-4 flex flex-wrap gap-3"><Link to="/buyer-login" className="ember-fill rounded-md px-4 py-2 text-xs font-display tracking-widest">Sign in / register</Link><span className="flex items-center text-xs text-muted-foreground">or continue below as guest</span></div></div>}
              <form onSubmit={handleCheckout} className="space-y-8">
                <fieldset className="space-y-4">
                  <legend className="font-display text-lg">Contact</legend>
                  <input name="email" required defaultValue={buyer?.email ?? ""} type="email" placeholder="Email address" className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
                </fieldset>

                <fieldset className="space-y-4">
                  <legend className="font-display text-lg">Delivery details</legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input name="firstName" required placeholder="First name" className="rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
                    <input name="lastName" required placeholder="Last name" className="rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
                  </div>
                  <input name="address" required placeholder="Address" className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
                  <div className="grid gap-4 sm:grid-cols-3">
                    <input name="city" required placeholder="City" className="rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
                    <input name="postalCode" required placeholder="Postal code" className="rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
                    <input name="country" required placeholder="Country" className="rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
                  </div>
                </fieldset>

                <fieldset className="space-y-4">
                  <legend className="font-display text-lg">Payment</legend>
                  <div className="border border-primary/40 bg-surface p-5"><p className="font-display text-sm">Pay securely with Paystack</p><p className="mt-2 text-sm text-muted-foreground">You will be redirected to Paystack to complete your payment securely.</p><p className="mt-4 text-xs text-muted-foreground">Payment processing will be connected through the Paystack public key and backend verification.</p></div>
                </fieldset>

                <fieldset className="space-y-3">
                  <legend className="font-display text-lg">Shipping method</legend>
                  <label className="flex cursor-pointer items-center justify-between border border-border bg-surface p-4 text-sm"><span><input type="radio" name="shipping" checked={shippingMethod === "standard"} onChange={() => setShippingMethod("standard")} className="mr-3 accent-[var(--primary)]" />Standard delivery</span><span className="text-muted-foreground">{shippingMethod === "standard" && shipping === 0 ? "Free" : "$12"}</span></label>
                  <label className="flex cursor-pointer items-center justify-between border border-border bg-surface p-4 text-sm"><span><input type="radio" name="shipping" checked={shippingMethod === "express"} onChange={() => setShippingMethod("express")} className="mr-3 accent-[var(--primary)]" />Express delivery</span><span className="text-muted-foreground">$28</span></label>
                </fieldset>

                <div><label className="font-display text-sm">Promo code</label><div className="mt-2 flex gap-2"><input value={promo} onChange={(event) => setPromo(event.target.value)} placeholder="Try BIGPEE10" className="min-w-0 flex-1 rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary" /><span className="flex items-center px-2 text-sm text-primary">{discount ? `-$${discount}` : ""}</span></div>{promoError && <p className="mt-2 text-sm text-red-400">{promoError}</p>}</div>

                {reviewing && <div className="border border-primary/40 bg-surface p-4 text-sm"><p className="font-display">Review your order</p><p className="mt-2 text-muted-foreground">{lines.length} item(s) · {shippingMethod === "express" ? "Express" : "Standard"} delivery · ${total} total</p></div>}

                <button type="submit" className="ember-fill w-full rounded-md py-4 font-display text-sm tracking-widest transition-transform hover:scale-[1.01]">
                  {reviewing ? `Confirm order · $${total}` : "Review order"}
                </button>
              </form>
              </>
            )}
          </section>

          <aside className="h-fit border border-border bg-surface p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-lg">Order summary</h2>
            <div className="mt-6 space-y-4">
              {lines.map((line) => (
                <div key={`${line.product.id}-${line.size}`} className="flex gap-3">
                  <img src={line.product.image} alt={line.product.name} className="size-16 rounded-md object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-xs">{line.product.name}</p>
                    <p className="text-xs text-muted-foreground">EU {line.size} · Qty {line.qty}</p>
                  </div>
                  <span className="text-sm">${line.product.price * line.qty}</span>
                </div>
              ))}
              {lines.length === 0 && <p className="text-sm text-muted-foreground">No items yet.</p>}
            </div>
            <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping}`}</span></div>
              <div className="flex justify-between font-display text-lg"><span>Total</span><span className="text-primary">${total}</span></div>
            </div>
            <div className="mt-6 space-y-3 border-t border-border pt-5 text-xs text-muted-foreground">
              <p className="flex gap-2"><LockKeyhole className="size-4 shrink-0 text-primary" /> Secure payment processing</p>
              <p className="flex gap-2"><Truck className="size-4 shrink-0 text-primary" /> Free delivery over $200</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
