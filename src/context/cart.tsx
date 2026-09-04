import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";
import { CartDrawer, type CartLine } from "@/components/CartDrawer";

type CartCtx = {
  lines: CartLine[];
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  addToCart: (product: Product, size: number, quantity?: number) => void;
  changeQty: (index: number, delta: number) => void;
  clearCart: () => void;
  removeLine: (index: number) => void;
  getLineLimit: (line: CartLine) => number;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "big-pee-cart";

function readLines(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as CartLine[];
  } catch {
    return [];
  }
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLines(readLines());
  }, []);

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);

    const addToCart = (product: Product, size: number, quantity = 1) => {
      setLines((prev) => {
        const i = prev.findIndex(
          (l) => l.product.id === product.id && l.size === size,
        );
        if (i >= 0) {
          const next = [...prev];
          const line = next[i]!;
          next[i] = { ...line, qty: Math.min(line.qty + quantity, (line.product as Product & { stock?: number }).stock ?? 99) };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          return next;
        }
        const next = [...prev, { product, size, qty: Math.min(quantity, (product as Product & { stock?: number }).stock ?? 99) }];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    };

    const changeQty = (index: number, delta: number) => {
      setLines((prev) => {
        const next = prev
          .map((line, i) => {
            if (i !== index) return line;
            const stock = (line.product as Product & { stock?: number }).stock ?? 99;
            return { ...line, qty: Math.min(stock, line.qty + delta) };
          })
          .filter((line) => line.qty > 0);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    };

        const clearCart = () => {
          setLines([]);
          localStorage.removeItem(STORAGE_KEY);
        };

        const removeLine = (index: number) => {
          setLines((prev) => {
            const next = prev.filter((_, currentIndex) => currentIndex !== index);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            return next;
          });
        };

        const getLineLimit = (line: CartLine) =>
          (line.product as Product & { stock?: number }).stock ?? 99;

        return { lines, count, open, setOpen, addToCart, changeQty, clearCart, removeLine, getLineLimit };
  }, [lines, open]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <CartDrawer
        open={open}
        lines={lines}
        onClose={() => setOpen(false)}
        onQty={value.changeQty}
        onRemove={value.removeLine}
        getLineLimit={value.getLineLimit}
      />
    </Ctx.Provider>
  );
}
