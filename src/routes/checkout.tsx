import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, LockKeyhole, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";
import { formatPrice } from "@/lib/currency";
import { useNavigate } from "@tanstack/react-router";

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
  const { buyer } = useAuth();
  const navigate = useNavigate();
  const [reviewing, setReviewing] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [promo, setPromo] = useState("");
  const [promoError, setPromoError] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentError, setPaymentError] = useState("");
  const [paying, setPaying] = useState(false);
  const [deliverToSomeoneElse, setDeliverToSomeoneElse] = useState(false);
  const [city, setCity] = useState("");
  const [shippingRate, setShippingRate] = useState(0);
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState(200);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);
  const shipping = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : shippingRate;
  const total = Math.max(0, subtotal + shipping - discount);

  useEffect(() => {
    if (document.querySelector("script[data-paystack-inline]")) return;
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v2/inline.js";
    script.dataset["paystackInline"] = "true";
    document.body.appendChild(script);
  }, []);

  const handleCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (!reviewing) {
      if (promo.trim().toUpperCase() === "BIGPEE10") {
        setDiscount(Math.round(subtotal * 0.1));
        setPromoError("");
      } else if (promo.trim()) {
        setPromoError("That code is not active.");
        return;
      }
      const quoteResponse = await fetch("/api/shipping/quote", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ city: String(form.get("city")), method: shippingMethod, subtotal }) });
      if (quoteResponse.ok) {
        const quote = await quoteResponse.json() as { shipping: number; freeDeliveryThreshold?: number };
        setShippingRate(quote.shipping);
        if (typeof quote.freeDeliveryThreshold === "number") setFreeDeliveryThreshold(quote.freeDeliveryThreshold);
      }
      setCity(String(form.get("city")));
      setReviewing(true);
      return;
    }
    setPaying(true);
    setPaymentError("");
    try {
      const response = await fetch("/api/payments/paystack/initialize", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: String(form.get("email")),
          phone: String(form.get("phone") ?? ""),
          name: `${String(form.get("firstName"))} ${String(form.get("lastName"))}`,
          address: String(form.get("address")),
          city: String(form.get("city")),
          country: "Ghana",
          subtotal,
          shipping,
          total,
          lines,
          recipient: deliverToSomeoneElse ? { name: String(form.get("recipientName")), phone: String(form.get("recipientPhone")), address: String(form.get("recipientAddress")), city: String(form.get("recipientCity")), country: "Ghana" } : undefined,
        }),
      });
      const responseText = await response.text();
      let payment: { reference?: string; orderId?: string; error?: string };
      try { payment = JSON.parse(responseText) as typeof payment; } catch { throw new Error(responseText.startsWith("<!doctype") ? "Payment server error. Check the terminal for details." : "Invalid payment server response"); }
      if (!response.ok || !payment.reference || !payment.orderId)
        throw new Error(payment.error ?? "Unable to start payment");
      const publicKey = import.meta.env["VITE_PAYSTACK_PUBLIC_KEY"] as string | undefined;
      const paystack = (window as Window & { PaystackPop?: new () => { newTransaction: (options: Record<string, unknown>) => void } }).PaystackPop;
      if (!publicKey || !paystack) throw new Error("Paystack popup is not configured");
      new paystack().newTransaction({ key: publicKey, email: String(form.get("email")), amount: Math.round(total * 100), currency: "GHS", ref: payment.reference, onSuccess: async (result: { reference: string }) => { const verification = await fetch("/api/payments/paystack/verify", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ reference: result.reference }) }); if (!verification.ok) throw new Error("Payment could not be verified"); clearCart(); window.location.assign(`/order-confirmation?orderId=${encodeURIComponent(payment.orderId!)}&reference=${encodeURIComponent(result.reference)}`); }, onCancel: () => setPaying(false) });
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : "Unable to start payment");
      setPaying(false);
    }
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
              <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-primary">
                Secure checkout
              </p>
              <h1 className="text-5xl leading-none sm:text-6xl">Finish the fit</h1>
            </div>

            {lines.length === 0 ? (
              <div className="border-y border-border py-12">
                <p className="text-muted-foreground">
                  Your bag is empty. Find a pair before checking out.
                </p>
                <Link
                  to="/shop"
                  className="ember-fill mt-6 inline-block rounded-md px-6 py-3 font-display text-xs tracking-widest"
                >
                  Browse the shelf
                </Link>
              </div>
            ) : (
              <>
                {!buyer && !reviewing && (
                  <div className="mb-8 border border-primary/30 bg-surface p-5">
                    <p className="font-display text-sm">Want order tracking?</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Sign in for order history, saved details, and easy returns. Guest checkout is
                      still available.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link
                        to="/buyer-login"
                        className="ember-fill rounded-md px-4 py-2 text-xs font-display tracking-widest"
                      >
                        Sign in / register
                      </Link>
                      <span className="flex items-center text-xs text-muted-foreground">
                        or continue below as guest
                      </span>
                    </div>
                  </div>
                )}
                <form onSubmit={handleCheckout} className="space-y-8">
                  <fieldset className="space-y-4">
                    <legend className="font-display text-lg">Contact</legend>
                    <input
                      name="email"
                      required
                      defaultValue={buyer?.email ?? ""}
                      type="email"
                      placeholder="Email address"
                      className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                    />
                    <input
                      name="phone"
                      required
                      type="tel"
                      placeholder="Phone number, e.g. 0241234567"
                      className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                    />
                  </fieldset>

                  <fieldset className="space-y-4">
                    <legend className="font-display text-lg">Delivery details</legend>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        name="firstName"
                        required
                        placeholder="First name"
                        className="rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                      />
                      <input
                        name="lastName"
                        required
                        placeholder="Last name"
                        className="rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                      />
                    </div>
                    <input
                      name="address"
                      required
                      placeholder="Address"
                      className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        name="city"
                        required
                        placeholder="City"
                        className="rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                      />
                      <input value="Ghana" readOnly className="rounded-md border border-border bg-background px-4 py-3 text-sm text-muted-foreground" />
                    </div>
                    <label className="flex items-center gap-3 text-sm text-muted-foreground"><input type="checkbox" checked={deliverToSomeoneElse} onChange={(event) => setDeliverToSomeoneElse(event.target.checked)} /> Deliver to someone else</label>
                    {deliverToSomeoneElse && <div className="space-y-4 border-l-2 border-primary/40 pl-4"><p className="font-display text-sm">Recipient details</p><input name="recipientName" required placeholder="Recipient full name" className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm" /><input name="recipientPhone" required type="tel" placeholder="Recipient phone number" className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm" /><input name="recipientAddress" required placeholder="Recipient address" className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm" /><input name="recipientCity" required placeholder="Recipient city" className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm" /><p className="text-xs text-muted-foreground">Delivery country: Ghana</p></div>}
                  </fieldset>

                  <fieldset className="space-y-3">
                    <legend className="font-display text-lg">Shipping method</legend>
                    <label className="flex cursor-pointer items-center justify-between border border-border bg-surface p-4 text-sm">
                      <span>
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === "standard"}
                          onChange={async () => { setShippingMethod("standard"); const quote = await fetch("/api/shipping/quote", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ city, method: "standard", subtotal }) }); if (quote.ok) { const result = await quote.json() as { shipping: number; freeDeliveryThreshold?: number }; setShippingRate(result.shipping); if (typeof result.freeDeliveryThreshold === "number") setFreeDeliveryThreshold(result.freeDeliveryThreshold); } }}
                          className="mr-3 accent-[var(--primary)]"
                        />
                        Standard delivery
                      </span>
                      <span className="text-muted-foreground">
                        {shipping === 0 ? "Free" : formatPrice(shippingRate)}
                      </span>
                    </label>
                    <label className="flex cursor-pointer items-center justify-between border border-border bg-surface p-4 text-sm">
                      <span>
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === "express"}
                          onChange={async () => { setShippingMethod("express"); const quote = await fetch("/api/shipping/quote", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ city, method: "express", subtotal }) }); if (quote.ok) { const result = await quote.json() as { shipping: number; freeDeliveryThreshold?: number }; setShippingRate(result.shipping); if (typeof result.freeDeliveryThreshold === "number") setFreeDeliveryThreshold(result.freeDeliveryThreshold); } }}
                          className="mr-3 accent-[var(--primary)]"
                        />
                        Express delivery
                      </span>
                      <span className="text-muted-foreground">{shippingMethod === "express" && shipping === 0 ? "Free" : formatPrice(shippingRate)}</span>
                    </label>
                  </fieldset>

                  <div>
                    <label className="font-display text-sm">Promo code</label>
                    <div className="mt-2 flex gap-2">
                      <input
                        value={promo}
                        onChange={(event) => setPromo(event.target.value)}
                        placeholder="Try BIGPEE10"
                        className="min-w-0 flex-1 rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary"
                      />
                      <span className="flex items-center px-2 text-sm text-primary">
                        {discount ? `-${formatPrice(discount)}` : ""}
                      </span>
                    </div>
                    {promoError && <p className="mt-2 text-sm text-red-400">{promoError}</p>}
                  </div>

                  {reviewing && (
                    <div className="border border-primary/40 bg-surface p-4 text-sm">
                      <p className="font-display">Review your order</p>
                      <p className="mt-2 text-muted-foreground">
                        {lines.length} item(s) ·{" "}
                        {shippingMethod === "express" ? "Express" : "Standard"} delivery ·{" "}
                        {formatPrice(total)} total
                      </p>
                    </div>
                  )}

                  {paymentError && (
                    <p className="text-sm text-red-400" role="alert">
                      {paymentError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={paying}
                    className="ember-fill w-full rounded-md py-4 font-display text-sm tracking-widest transition-transform hover:scale-[1.01] disabled:opacity-50"
                  >
                    {paying
                      ? "Redirecting to Paystack..."
                      : reviewing
                        ? `Pay ${formatPrice(total)}`
                        : "Review order"}
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
                  <img
                    src={line.product.image}
                    alt={line.product.name}
                    className="size-16 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-xs">{line.product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      EU {line.size} · Qty {line.qty}
                    </p>
                  </div>
                  <span className="text-sm">{formatPrice(line.product.price * line.qty)}</span>
                </div>
              ))}
              {lines.length === 0 && <p className="text-sm text-muted-foreground">No items yet.</p>}
            </div>
            <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-display text-lg">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>
            <div className="mt-6 space-y-3 border-t border-border pt-5 text-xs text-muted-foreground">
              <p className="flex gap-2">
                <LockKeyhole className="size-4 shrink-0 text-primary" /> Secure payment processing
              </p>
              <p className="flex gap-2">
                <Truck className="size-4 shrink-0 text-primary" /> Free delivery over {formatPrice(freeDeliveryThreshold)}
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
