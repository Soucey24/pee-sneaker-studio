import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";
import { CartDrawer, type CartLine } from "@/components/CartDrawer";

type CartCtx = {
  lines: CartLine[];
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  addToCart: (product: Product, size: number) => void;
  changeQty: (index: number, delta: number) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const value = useMemo<CartCtx>(() => {
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
      setOpen(true);
    };

    const changeQty = (index: number, delta: number) =>
      setLines((prev) =>
        prev
          .map((l, i) => (i === index ? { ...l, qty: l.qty + delta } : l))
          .filter((l) => l.qty > 0),
      );

    return { lines, count, open, setOpen, addToCart, changeQty };
  }, [lines, open]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <CartDrawer
        open={open}
        lines={lines}
        onClose={() => setOpen(false)}
        onQty={value.changeQty}
      />
    </Ctx.Provider>
  );
}
