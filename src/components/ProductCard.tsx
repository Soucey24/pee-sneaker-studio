import { useState } from "react";
import type { Product } from "@/data/products";

export function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product, size: number) => void;
}) {
  const [size, setSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)]!);

  return (
    <article className="card-tilt group overflow-hidden rounded-xl border border-border bg-surface">
      <div className="relative aspect-square overflow-hidden bg-surface-2">
        <img
          src={product.image}
          alt={`${product.name} sneaker`}
          loading="lazy"
          width={800}
          height={800}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3"
        />
        <span className="absolute left-3 top-3 rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] uppercase tracking-widest text-primary backdrop-blur">
          {product.tag}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-base">{product.name}</h3>
          <span className="font-display text-base text-primary">
            ${product.price}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`min-w-9 rounded border px-2 py-1 text-xs transition-colors ${
                s === size
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={() => onAdd(product, size)}
          className="w-full rounded-md border border-primary py-2.5 font-display text-xs tracking-widest text-primary transition-all duration-300 hover:ember-fill hover:scale-[1.02]"
        >
          Add to bag
        </button>
      </div>
    </article>
  );
}
