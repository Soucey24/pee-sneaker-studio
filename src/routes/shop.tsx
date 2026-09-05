import { createFileRoute } from "@tanstack/react-router";
import { Filter, Search, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart } from "@/context/cart";
import { useCatalog } from "@/context/catalog";
import { formatPrice } from "@/lib/currency";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop | Big Pee Kicks" },
      { name: "description", content: "Shop the latest hand-picked sneakers from Big Pee Kicks." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { addToCart, count, setOpen } = useCart();
  const { products } = useCatalog();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [maxPrice, setMaxPrice] = useState("2000");
  const [sort, setSort] = useState("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const visibleProducts = products.filter((product) => product.status === "Active");
  const filteredProducts = visibleProducts.filter((product) => {
    const matchesQuery = `${product.name} ${product.tag}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    const matchesSize = size === "All" || product.sizes.includes(Number(size));
    return matchesQuery && matchesCategory && matchesSize && product.price <= Number(maxPrice);
  }).sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : sort === "popular" ? b.popularity - a.popularity : b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 pb-16 pt-32">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 border-b border-border pb-10 sm:flex-row sm:items-end">
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.25em] text-primary">Drop 04 / Shop</p>
              <h1 className="text-5xl leading-none sm:text-7xl">The Shelf</h1>
              <p className="mt-5 max-w-lg text-muted-foreground">
                No filler. Every pair is hand-picked, checked, and ready for the next rotation.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="size-4 text-primary" />
                <span>{filteredProducts.length} pairs available</span>
              </div>
              <button onClick={() => setOpen(true)} aria-label="Open cart" className="ember-fill relative inline-flex items-center gap-2 rounded-md px-4 py-2 font-display text-xs tracking-widest">
                <ShoppingBag className="size-4" />
                Bag{count > 0 ? ` (${count})` : ""}
              </button>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
          <button onClick={() => setFiltersOpen(true)} className="fixed bottom-20 left-0 z-30 rounded-r-md border border-border bg-surface px-2 py-4 text-[10px] font-display uppercase tracking-widest text-primary shadow-deep lg:hidden" aria-label="Open filters">Filter</button>
          {filtersOpen && <div onClick={() => setFiltersOpen(false)} className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden" />}
          <aside className={`fixed bottom-0 left-0 top-0 z-50 w-[min(82vw,280px)] overflow-y-auto border-r border-border bg-surface p-5 transition-transform lg:static lg:z-auto lg:block lg:w-auto lg:overflow-visible lg:border lg:p-5 ${filtersOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
            <div className="flex items-center justify-between lg:block"><p className="font-display text-sm">Filter the shelf</p><button onClick={() => setFiltersOpen(false)} className="text-sm text-muted-foreground lg:hidden" aria-label="Close filters">Close</button></div>
            <label className="mt-4 flex items-center gap-2 border border-border bg-background px-3 py-2"><Search className="size-4 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></label>
            <label className="mt-4 block text-xs uppercase tracking-widest text-muted-foreground">Category<select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm normal-case tracking-normal"><option>All</option><option>Shoes</option><option>Sneakers</option><option>Slippers</option></select></label>
            <label className="mt-4 block text-xs uppercase tracking-widest text-muted-foreground">Size<select value={size} onChange={(event) => setSize(event.target.value)} className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm normal-case tracking-normal"><option>All</option>{[39, 40, 41, 42, 43, 44, 45, 46].map((item) => <option key={item} value={item}>EU {item}</option>)}</select></label>
            <label className="mt-4 block text-xs uppercase tracking-widest text-muted-foreground">Sort<select value={sort} onChange={(event) => setSort(event.target.value)} className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm normal-case tracking-normal"><option value="newest">Newest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="popular">Popularity</option></select></label>
            <label className="mt-5 block text-xs uppercase tracking-widest text-muted-foreground">Max price<span className="mt-2 flex items-center gap-2 normal-case tracking-normal"><input type="range" min="50" max="2000" step="10" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} className="min-w-0 flex-1 accent-[var(--primary)]" /><span className="text-primary">{formatPrice(Number(maxPrice))}</span></span></label>
          </aside>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {filteredProducts.map((product, index) => (
            <Reveal key={product.id} delay={index * 90}>
              <ProductCard product={product} onAdd={addToCart} />
            </Reveal>
          ))}
        </div>
        {!filteredProducts.length && <p className="py-20 text-center text-muted-foreground">No pairs match those filters.</p>}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
