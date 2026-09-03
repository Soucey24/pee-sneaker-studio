import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { ShoppingBag, Menu, X, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { products, type Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer, type CartLine } from "@/components/CartDrawer";
import { Reveal } from "@/components/Reveal";

const ShoeScene = lazy(() => import("@/components/ShoeScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Big Pee Kicks | Sneaker Shop for Rare Heat" },
      {
        name: "description",
        content:
          "Big Pee Kicks is a sneaker shop built on rare heat — hi-tops, runners and court classics, hand-picked by Big Pee and shipped worldwide.",
      },
      { property: "og:title", content: "Big Pee Kicks | Sneaker Shop for Rare Heat" },
      {
        property: "og:description",
        content:
          "Shop hand-picked sneakers from Big Pee — limited drops, court classics and everyday runners.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const count = lines.reduce((s, l) => s + l.qty, 0);

  const addToCart = (product: Product, size: number) => {
    setLines((prev) => {
      const i = prev.findIndex(
        (l) => l.product.id === product.id && l.size === size,
      );
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i]!, qty: next[i]!.qty + 1 };
        return next;
      }
      return [...prev, { product, size, qty: 1 }];
    });
    setCartOpen(true);
  };

  const changeQty = (index: number, delta: number) =>
    setLines((prev) =>
      prev
        .map((l, i) => (i === index ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    );

  const navLinks = [
    { label: "Shop", href: "#shop" },
    { label: "The Story", href: "#story" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="font-display text-lg leading-none">
            BIG<span className="ember-text">PEE</span>
          </a>

          <nav className="hidden gap-8 text-sm md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative rounded-full border border-border p-2.5 transition-colors hover:border-primary hover:text-primary"
            >
              <ShoppingBag className="size-4" />
              {count > 0 && (
                <span className="ember-fill absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full text-[10px] font-bold">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setNavOpen((v) => !v)}
              aria-label="Toggle menu"
              className="rounded-full border border-border p-2.5 md:hidden"
            >
              {navOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {navOpen && (
          <nav className="flex flex-col gap-1 border-t border-border px-5 py-3 md:hidden">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setNavOpen(false)}
                className="py-2 text-sm text-muted-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative pt-28 md:pt-32">
        <div
          className="pointer-events-none absolute left-1/2 top-24 -z-10 size-[36rem] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
          style={{ background: "var(--gradient-ember)" }}
        />
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 md:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-primary">
              Drop 04 — live now
            </p>
            <h1 className="text-5xl leading-[0.9] sm:text-6xl lg:text-7xl">
              Kicks with <span className="ember-text">weight</span> behind them
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground">
              Big Pee hunts the heat so you don't have to. Spin the shoe, pick
              your size, and step out different.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#shop"
                className="ember-fill shadow-ember rounded-md px-7 py-3.5 font-display text-sm tracking-widest transition-transform duration-300 hover:scale-105"
              >
                Shop the drop
              </a>
              <a
                href="#story"
                className="rounded-md border border-border px-7 py-3.5 font-display text-sm tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Meet Big Pee
              </a>
            </div>
          </div>

          <div className="relative h-[340px] sm:h-[440px] md:h-[560px]">
            <ClientOnly
              fallback={
                <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
                  Loading 3D…
                </div>
              }
            >
              <Suspense
                fallback={
                  <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
                    Loading 3D…
                  </div>
                }
              >
                <ShoeScene />
              </Suspense>
            </ClientOnly>
            <p className="absolute inset-x-0 bottom-0 text-center text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Drag to spin
            </p>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="mt-14 overflow-hidden border-y border-border bg-surface py-4">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0">
              {[
                "Rare heat",
                "Worldwide shipping",
                "100% authentic",
                "Hand-picked by Big Pee",
                "New drops monthly",
              ].map((t) => (
                <span
                  key={t + k}
                  className="px-8 font-display text-sm tracking-widest text-muted-foreground"
                >
                  {t} <span className="text-primary">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Shop */}
      <section id="shop" className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-4xl sm:text-5xl">The Shelf</h2>
            <p className="text-sm text-muted-foreground">
              Four pairs. No filler.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <ProductCard product={p} onAdd={addToCart} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl">
              Run by <span className="ember-text">Big Pee</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              What started as one man trading pairs out of a duffel bag turned
              into a shop with a reputation. Big Pee checks every stitch, every
              box and every insole himself — if it wouldn't go on his feet, it
              doesn't hit the shelf.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                ["12k+", "Pairs shipped"],
                ["9 yrs", "In the game"],
                ["4.9", "Customer rating"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-2xl text-primary">{n}</p>
                  <p className="text-xs text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-1">
            {[
              [Truck, "Fast worldwide delivery", "2–5 days to most cities."],
              [ShieldCheck, "Legit-checked", "Every pair verified in-store."],
              [RefreshCw, "14-day swaps", "Wrong size? Easy exchange."],
            ].map(([Icon, title, copy], i) => {
              const I = Icon as typeof Truck;
              return (
                <Reveal key={title as string} delay={i * 100}>
                  <div className="flex items-start gap-4 rounded-xl border border-border bg-background p-5 transition-colors hover:border-primary">
                    <I className="mt-0.5 size-5 text-primary" />
                    <div>
                      <p className="font-display text-sm">{title as string}</p>
                      <p className="text-sm text-muted-foreground">
                        {copy as string}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact / footer */}
      <footer id="contact" className="mx-auto max-w-6xl px-5 py-16">
        <Reveal>
          <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-deep">
            <h2 className="text-3xl sm:text-4xl">Get the drop first</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              One email a month, only when new heat lands.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="flex-1 rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
              <button className="ember-fill rounded-md px-6 py-3 font-display text-xs tracking-widest transition-transform duration-300 hover:scale-105">
                Notify me
              </button>
            </form>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Big Pee Kicks</span>
          <span>Built for sneaker heads, worldwide.</span>
        </div>
      </footer>

      <CartDrawer
        open={cartOpen}
        lines={lines}
        onClose={() => setCartOpen(false)}
        onQty={changeQty}
      />
    </div>
  );
}
