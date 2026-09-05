import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart } from "@/context/cart";
import { useCatalog } from "@/context/catalog";
import { useWishlist } from "@/context/wishlist";

export const Route = createFileRoute("/wishlist")({ component: WishlistPage });

function WishlistPage() {
  const { products } = useCatalog();
  const { ids } = useWishlist();
  const { addToCart } = useCart();
  const savedProducts = products.filter((product) => ids.includes(product.id));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 pb-20 pt-32">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Your saved pairs</p>
        <h1 className="mt-3 text-5xl leading-none sm:text-6xl">Wishlist</h1>
        {!savedProducts.length ? (
          <div className="mt-10 border-y border-border py-12">
            <Heart className="size-8 text-primary" />
            <p className="mt-4 text-muted-foreground">Your wishlist is empty.</p>
            <Link to="/shop" className="ember-fill mt-6 inline-block rounded-md px-5 py-3 font-display text-xs tracking-widest">Browse the shelf</Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {savedProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}
          </div>
        )}
      </main>
    </div>
  );
}
