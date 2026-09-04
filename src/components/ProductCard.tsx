import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { useWishlist } from "@/context/wishlist";

export function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product, size: number, quantity?: number) => void;
}) {
  const { has, toggle } = useWishlist();
  const stock = (product as Product & { stock?: number }).stock ?? 99;
  const [size, setSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)]!);
  const [quantity, setQuantity] = useState(1);

  return (
    <article className="card-tilt group min-w-0 overflow-hidden rounded-xl border border-border bg-surface">
      <div className="relative aspect-square overflow-hidden bg-surface-2">
        <Link to="/products/$productId" params={{ productId: product.id }} className="block size-full">
          <img
            src={product.image}
            alt={`${product.name} ${product.category.toLowerCase()}`}
            loading="lazy"
            width={800}
            height={800}
            className="size-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3"
          />
        </Link>
        <button onClick={() => toggle(product.id)} aria-label={has(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} className="absolute right-2 top-2 rounded-full border border-border bg-background/80 p-1.5 backdrop-blur transition-colors hover:border-primary sm:right-3 sm:top-3 sm:p-2">
          <Heart className={`size-3.5 sm:size-4 ${has(product.id) ? "fill-primary text-primary" : "text-foreground"}`} />
        </button>
        <span className="absolute left-3 top-3 rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] uppercase tracking-widest text-primary backdrop-blur">
          {product.tag}
        </span>
      </div>

      <div className="space-y-2 p-2 sm:space-y-3 sm:p-4">
        <div className="flex items-baseline justify-between gap-2">
          <Link to="/products/$productId" params={{ productId: product.id }} className="min-w-0 break-words text-xs transition-colors hover:text-primary sm:text-base">{product.name}</Link>
          <span className="font-display text-xs text-primary sm:text-base">
            ${product.price}
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
                className={`min-w-7 rounded border px-1.5 py-1 text-[10px] transition-colors sm:min-w-9 sm:px-2 sm:text-xs ${
                s === size
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="flex shrink-0 items-center border border-border">
            <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 py-1.5 text-sm sm:px-3">-</button>
            <span className="w-6 text-center text-xs tabular-nums">{quantity}</span>
            <button type="button" onClick={() => setQuantity(Math.min(stock, quantity + 1))} disabled={quantity >= stock} className="px-2 py-1.5 text-sm disabled:opacity-40 sm:px-3">+</button>
          </div>
          <button
            onClick={() => onAdd(product, size, quantity)}
          disabled={stock < 1}
            className="min-w-0 flex-1 rounded-md border border-primary py-2 font-display text-[10px] tracking-widest text-primary transition-all duration-300 hover:ember-fill hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 sm:py-2.5 sm:text-xs"
          >
            {stock < 1 ? "Sold out" : "Add to bag"}
          </button>
        </div>
      </div>
    </article>
  );
}
