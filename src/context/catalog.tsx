import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { products as seedProducts, type CatalogProduct } from "@/data/products";

export type { CatalogProduct } from "@/data/products";

type CatalogContextValue = {
  products: CatalogProduct[];
  addProduct: (product: Omit<CatalogProduct, "id">) => void;
  updateProduct: (id: string, changes: Partial<CatalogProduct>) => void;
  removeProduct: (id: string) => void;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);
const initialProducts: CatalogProduct[] = seedProducts.map((product) => ({
  ...product,
  stock: 12,
  status: "Active",
}));

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) throw new Error("useCatalog must be used inside CatalogProvider");
  return context;
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [catalogProducts, setCatalogProducts] = useState<CatalogProduct[]>(initialProducts);
  const pendingAdds = useRef(new Map<string, CatalogProduct>());

  useEffect(() => {
    let active = true;
    void fetch("/api/products").then((response) => {
      if (!response.ok) throw new Error(`Catalog request failed with status ${response.status}`);
      return response.json() as Promise<CatalogProduct[]>;
    }).then((serverProducts) => {
      if (active) {
        setCatalogProducts([...pendingAdds.current.values(), ...serverProducts.filter((product) => !pendingAdds.current.has(product.id))]);
      }
    }).catch(() => {
      if (active) setCatalogProducts(initialProducts);
    });
    return () => { active = false; };
  }, []);

  const addProduct = (product: Omit<CatalogProduct, "id">) => {
    const nextProduct = { ...product, id: `product-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` };
    pendingAdds.current.set(nextProduct.id, nextProduct);
    setCatalogProducts((currentProducts) => [nextProduct, ...currentProducts]);
    void fetch("/api/products", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "create", product: nextProduct }) })
      .then((response) => { if (!response.ok) throw new Error("Unable to save product"); return response.json(); })
      .then(() => { pendingAdds.current.delete(nextProduct.id); })
      .catch(() => {
        pendingAdds.current.delete(nextProduct.id);
        setCatalogProducts((currentProducts) => currentProducts.filter((currentProduct) => currentProduct.id !== nextProduct.id));
      });
  };

  const updateProduct = (id: string, changes: Partial<CatalogProduct>) => {
    const nextProducts = catalogProducts.map((product) => (product.id === id ? { ...product, ...changes } : product));
    const nextProduct = nextProducts.find((product) => product.id === id);
    if (!nextProduct) return;
    void fetch("/api/products", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "update", product: nextProduct }) })
      .then((response) => { if (!response.ok) throw new Error("Unable to update product"); return response.json(); })
      .then(() => setCatalogProducts(nextProducts))
      .catch(() => setCatalogProducts(nextProducts));
  };

  const removeProduct = (id: string) => {
    const nextProducts = catalogProducts.filter((product) => product.id !== id);
    void fetch("/api/products", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "delete", id }) })
      .then((response) => { if (!response.ok) throw new Error("Unable to delete product"); return response.json(); })
      .then(() => setCatalogProducts(nextProducts))
      .catch(() => setCatalogProducts(nextProducts));
  };

  return (
    <CatalogContext.Provider value={{ products: catalogProducts, addProduct, updateProduct, removeProduct }}>
      {children}
    </CatalogContext.Provider>
  );
}