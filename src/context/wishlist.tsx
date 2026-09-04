import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "big-pee-wishlist";

type WishlistContextValue = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

function readWishlist() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function useWishlist() {
  const value = useContext(WishlistContext);
  if (!value) throw new Error("useWishlist must be used inside WishlistProvider");
  return value;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(readWishlist());
  }, []);

  const toggle = (id: string) => {
    setIds((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return <WishlistContext.Provider value={{ ids, toggle, has: (id) => ids.includes(id) }}>{children}</WishlistContext.Provider>;
}
