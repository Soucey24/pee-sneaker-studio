import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Heart, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart } from "@/context/cart";
import { useCatalog } from "@/context/catalog";
import { useWishlist } from "@/context/wishlist";
import { formatPrice } from "@/lib/currency";

export const Route = createFileRoute("/products/$productId")({
  head: ({ params }) => ({ meta: [{ title: `${params.productId} | Big Pee Kicks` }] }),
  component: ProductDetailsPage,
});

function ProductDetailsPage() {
  const { productId } = Route.useParams();
  const { products } = useCatalog();
  const { addToCart } = useCart();
  const { has, toggle } = useWishlist();
  const product = products.find((item) => item.id === productId);
  const [size, setSize] = useState(product?.sizes[0] ?? 0);
  const [quantity, setQuantity] = useState(1);

  if (!product) throw notFound();
  const stock = product.stock;
  const related = products.filter((item) => item.id !== product.id && item.category === product.category && item.status === "Active").slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 pb-20 pt-32">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" /> Back to shop</Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="relative overflow-hidden bg-surface-2">
            <img src={product.image} alt={`${product.name} ${product.category.toLowerCase()}`} className="aspect-square w-full object-cover" />
            <span className="absolute left-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1 text-xs uppercase tracking-widest text-primary">{product.tag}</span>
          </div>
          <section className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">{product.category}</p>
            <div className="mt-3 flex items-start justify-between gap-4">
              <h1 className="text-4xl leading-none sm:text-6xl">{product.name}</h1>
              <button onClick={() => toggle(product.id)} aria-label="Toggle wishlist" className="rounded-full border border-border p-3 hover:border-primary"><Heart className={`size-5 ${has(product.id) ? "fill-primary text-primary" : ""}`} /></button>
            </div>
            <p className="mt-5 font-display text-2xl text-primary">{formatPrice(product.price)}</p>
            <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>
            <div className="mt-8 border-y border-border py-6">
              <div className="flex items-center justify-between"><span className="font-display text-sm">Select size</span><span className="text-sm text-muted-foreground">EU</span></div>
              <div className="mt-4 flex flex-wrap gap-2">{product.sizes.map((item) => <button key={item} onClick={() => setSize(item)} className={`min-w-11 rounded border px-3 py-2 text-sm ${item === size ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-foreground"}`}>{item}</button>)}</div>
              <p className={`mt-4 text-sm ${stock < 5 ? "text-primary" : "text-muted-foreground"}`}>{stock > 0 ? `${stock} pairs available` : "Currently sold out"}</p>
            </div>
            <div className="mt-6 flex gap-3"><div className="flex items-center border border-border"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-3 text-lg">−</button><span className="w-10 text-center text-sm">{quantity}</span><button onClick={() => setQuantity(Math.min(stock, quantity + 1))} className="px-3 py-3 text-lg">+</button></div><button disabled={!stock} onClick={() => { for (let index = 0; index < quantity; index += 1) addToCart(product, size); }} className="ember-fill flex-1 rounded-md px-5 py-3 font-display text-xs tracking-widest disabled:opacity-40">{stock ? "Add to bag" : "Sold out"}</button></div>
            <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2"><p className="flex gap-2"><Truck className="size-4 text-primary" /> 2–5 day delivery</p><p className="flex gap-2"><ShieldCheck className="size-4 text-primary" /> Legit-checked pair</p></div>
          </section>
        </div>
        {related.length > 0 && <section className="mt-20 border-t border-border pt-12"><h2 className="text-3xl sm:text-4xl">More in the rotation</h2><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <ProductCard key={item.id} product={item} onAdd={addToCart} />)}</div></section>}
      </main>
      <SiteFooter />
    </div>
  );
}
