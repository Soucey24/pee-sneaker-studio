import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";
import { CartDrawer, type CartLine } from "@/components/CartDrawer";
import { toast } from "sonner";

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
export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let active = true;
    void fetch("/api/cart").then((response) => response.ok ? response.json() as Promise<CartLine[]> : Promise.reject()).then((savedLines) => { if (active) setLines(savedLines); }).catch(() => undefined);
    return () => { active = false; };
  }, []);

  const syncCart = (next: CartLine[]) => {
    void fetch("/api/cart", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(next) }).catch(() => toast.error("Your bag could not be saved"));
  };

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
          syncCart(next);
          return next;
        }
        const next = [...prev, { product, size, qty: Math.min(quantity, (product as Product & { stock?: number }).stock ?? 99) }];
        syncCart(next);
        return next;
      });
      toast.success(`${product.name} added to your bag`);
    };

    const changeQty = (index: number, delta: number) => {
      const line = lines[index];
      setLines((prev) => {
        const next = prev
          .map((line, i) => {
            if (i !== index) return line;
            const stock = (line.product as Product & { stock?: number }).stock ?? 99;
            return { ...line, qty: Math.min(stock, line.qty + delta) };
          })
          .filter((line) => line.qty > 0);
        syncCart(next);
        return next;
      });
      if (line) toast.success(delta > 0 ? "Quantity increased" : "Quantity decreased");
    };

        const clearCart = () => {
          setLines([]);
          void fetch("/api/cart", { method: "DELETE" }).catch(() => toast.error("Your bag could not be cleared"));
          toast.success("Bag cleared");
        };

        const removeLine = (index: number) => {
          const line = lines[index];
          setLines((prev) => {
            const next = prev.filter((_, currentIndex) => currentIndex !== index);
            syncCart(next);
            return next;
          });
          if (line) toast.success(`${line.product.name} removed from your bag`);
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
