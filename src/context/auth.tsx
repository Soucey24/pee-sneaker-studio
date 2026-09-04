import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AuthCtx = {
  isAdmin: boolean;
  adminName: string | null;
  login: (password: string) => boolean;
  logout: () => void;
  buyer: { id: string; name: string; email: string } | null;
  buyerLogin: (email: string, password: string) => boolean;
  buyerRegister: (name: string, email: string, password: string) => boolean;
  buyerLogout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

// Simple password check (demo only; never use in production)
const ADMIN_PASSWORD = "bigpee";
const BUYER_ACCOUNT_KEY = "big-pee-buyer";
const BUYER_ACCOUNTS_KEY = "big-pee-buyer-accounts";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const [adminName, setAdminName] = useState<string | null>(null);

  const [buyer, setBuyer] = useState<AuthCtx["buyer"]>(null);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("admin-session") === "true");
    setAdminName(localStorage.getItem("admin-name"));
    try {
      setBuyer(JSON.parse(localStorage.getItem(BUYER_ACCOUNT_KEY) ?? "null") as AuthCtx["buyer"]);
    } catch {
      setBuyer(null);
    }
  }, []);

  const readBuyerAccounts = (): Array<{ id: string; name: string; email: string; password: string }> => {
    try {
      return JSON.parse(localStorage.getItem(BUYER_ACCOUNTS_KEY) ?? "[]") as Array<{ id: string; name: string; email: string; password: string }>;
    } catch {
      return [];
    }
  };

  const saveBuyer = (account: { id: string; name: string; email: string }) => {
    setBuyer(account);
    localStorage.setItem(BUYER_ACCOUNT_KEY, JSON.stringify(account));
  };

  const buyerLogin = (email: string, password: string) => {
    const account = readBuyerAccounts().find((item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password);
    if (!account) return false;
    saveBuyer({ id: account.id, name: account.name, email: account.email });
    return true;
  };

  const buyerRegister = (name: string, email: string, password: string) => {
    const accounts = readBuyerAccounts();
    if (accounts.some((item) => item.email.toLowerCase() === email.trim().toLowerCase())) return false;
    const account = { id: `buyer-${Date.now()}`, name: name.trim(), email: email.trim(), password };
    localStorage.setItem(BUYER_ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
    saveBuyer({ id: account.id, name: account.name, email: account.email });
    return true;
  };

  const buyerLogout = () => {
    setBuyer(null);
    localStorage.removeItem(BUYER_ACCOUNT_KEY);
  };

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setAdminName("Big Pee");
      localStorage.setItem("admin-session", "true");
      localStorage.setItem("admin-name", "Big Pee");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    setAdminName(null);
    localStorage.removeItem("admin-session");
    localStorage.removeItem("admin-name");
  };

  return (
    <Ctx.Provider value={{ isAdmin, adminName, login, logout, buyer, buyerLogin, buyerRegister, buyerLogout }}>
      {children}
    </Ctx.Provider>
  );
}
