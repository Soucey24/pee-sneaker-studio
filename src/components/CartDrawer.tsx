import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";

export type CartLine = { product: Product; size: number; qty: number };

export function CartDrawer({
  open,
  lines,
  onClose,
  onQty,
  onRemove,
  getLineLimit,
}: {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onQty: (index: number, delta: number) => void;
  onRemove: (index: number) => void;
  getLineLimit: (line: CartLine) => number;
}) {
  const total = lines.reduce((s, l) => s + l.product.price * l.qty, 0);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col border-l border-border bg-surface transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionTimingFunction: "var(--ease-out-soft)" }}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="text-lg">Your bag</h3>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {lines.length === 0 && <div className="py-8 text-center"><p className="text-sm text-muted-foreground">Your bag is empty.</p><Link to="/shop" onClick={onClose} className="mt-4 inline-block text-sm text-primary hover:underline">Browse the shop</Link></div>}
          {lines.map((line, i) => (
            <div
              key={`${line.product.id}-${line.size}`}
              className="flex gap-3 rounded-lg border border-border bg-surface-2 p-3"
            >
              <img
                src={line.product.image}
                alt={line.product.name}
                loading="lazy"
                width={800}
                height={800}
                className="size-16 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="font-display text-sm">{line.product.name}</p>
                <p className="text-xs text-muted-foreground">
                  Size EU {line.size}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <button
                    onClick={() => onQty(i, -1)}
                    aria-label="Decrease quantity"
                    className="rounded border border-border p-1 transition-colors hover:border-primary"
                  >
                    <Minus className="size-3" />
                  </button>
                  <span className="text-sm tabular-nums">{line.qty}</span>
                  <button
                    onClick={() => onQty(i, 1)}
                    disabled={line.qty >= getLineLimit(line)}
                    aria-label="Increase quantity"
                    className="rounded border border-border p-1 transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Plus className="size-3" />
                  </button>
                  <button onClick={() => onRemove(i)} aria-label={`Remove ${line.product.name}`} className="rounded border border-border p-1 text-muted-foreground hover:border-red-400 hover:text-red-400"><Trash2 className="size-3" /></button>
                  <span className="ml-auto text-sm text-primary">
                    ${line.product.price * line.qty}
                  </span>
                </div>
                {line.qty >= getLineLimit(line) && <p className="mt-2 text-xs text-primary" aria-live="polite">Maximum available quantity reached</p>}
                {getLineLimit(line) < 5 && getLineLimit(line) > line.qty && <p className="mt-2 text-xs text-primary" aria-live="polite">Only {getLineLimit(line) - line.qty} left</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 border-t border-border p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-display text-lg">${total}</span>
          </div>
          <Link
            to="/checkout"
            onClick={onClose}
            className={`ember-fill block w-full rounded-md py-3 text-center font-display text-sm tracking-wide transition-transform duration-300 hover:scale-[1.02] ${
              lines.length === 0 ? "pointer-events-none opacity-40" : ""
            }`}
            aria-disabled={lines.length === 0}
          >
            Checkout
          </Link>
          <p className="text-center text-xs text-muted-foreground">
            Free delivery on orders over $200
          </p>
        </div>
      </aside>
    </>
  );
}
