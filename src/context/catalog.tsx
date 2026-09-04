import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products as seedProducts, type Product } from "@/data/products";

export type CatalogProduct = Product & {
  stock: number;
  status: "Active" | "Draft" | "Archived";
};

type CatalogContextValue = {
  products: CatalogProduct[];
  addProduct: (product: Omit<CatalogProduct, "id">) => void;
  updateProduct: (id: string, changes: Partial<CatalogProduct>) => void;
  removeProduct: (id: string) => void;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);
const STORAGE_KEY = "big-pee-catalog";

const initialProducts: CatalogProduct[] = seedProducts.map((product) => ({
  ...product,
  stock: 12,
  status: "Active",
}));

function readProducts() {
  if (typeof window === "undefined") return initialProducts;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CatalogProduct[]) : initialProducts;
  } catch {
    return initialProducts;
  }
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) throw new Error("useCatalog must be used inside CatalogProvider");
  return context;
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [catalogProducts, setCatalogProducts] = useState<CatalogProduct[]>(initialProducts);

  useEffect(() => {
    setCatalogProducts(readProducts());
  }, []);

  const persist = (next: CatalogProduct[]) => {
    setCatalogProducts(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addProduct = (product: Omit<CatalogProduct, "id">) => {
    persist([{ ...product, id: `product-${Date.now()}` }, ...catalogProducts]);
  };

  const updateProduct = (id: string, changes: Partial<CatalogProduct>) => {
    persist(catalogProducts.map((product) => (product.id === id ? { ...product, ...changes } : product)));
  };

  const removeProduct = (id: string) => {
    persist(catalogProducts.filter((product) => product.id !== id));
  };

  return (
    <CatalogContext.Provider value={{ products: catalogProducts, addProduct, updateProduct, removeProduct }}>
      {children}
    </CatalogContext.Provider>
  );
}