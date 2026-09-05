import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type WishlistContextValue = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function useWishlist() {
  const value = useContext(WishlistContext);
  if (!value) throw new Error("useWishlist must be used inside WishlistProvider");
  return value;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = window.localStorage.getItem("big-pee-wishlist");
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved) as unknown;
      return Array.isArray(parsed) && parsed.every((id) => typeof id === "string") ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem("big-pee-wishlist", JSON.stringify(ids));
  }, [ids]);

  const toggle = (id: string) => {
    setIds((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      return next;
    });
  };

  return <WishlistContext.Provider value={{ ids, toggle, has: (id) => ids.includes(id) }}>{children}</WishlistContext.Provider>;
}
