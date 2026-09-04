import { Link } from "@tanstack/react-router";
import { Package, LogOut, Menu, X, ShoppingCart, CreditCard, Users, RotateCcw, LayoutDashboard, Settings } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { BackButton } from "@/components/BackButton";
import logo from "../../logo/logo.png";

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard" as const, icon: LayoutDashboard },
  { label: "Inventory", to: "/admin" as const, icon: Package },
  { label: "Orders", to: "/admin/orders" as const, icon: ShoppingCart },
  { label: "Payments", to: "/admin/payments" as const, icon: CreditCard },
  { label: "Customers", to: "/admin/customers" as const, icon: Users },
  { label: "Returns", to: "/admin/returns" as const, icon: RotateCcw },
  { label: "Settings", to: "/admin/settings" as const, icon: Settings },
];

export function AdminSidebar() {
  const { adminName, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-surface transition-transform lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-5 py-6">
            <div className="flex items-center gap-3">
              <BackButton />
              <Link to="/" className="font-display text-lg leading-none">
                <img src={logo} alt="Big Pee Kicks" className="h-10 w-auto object-contain" />
              </Link>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close sidebar"
            >
              <X className="size-4" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-5">
            {navItems.map(({ label, to, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: to === "/admin" }}
                onClick={() => setIsOpen(false)}
                activeProps={{ className: "ember-fill" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                className="flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-display transition-colors"
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="space-y-3 border-t border-border px-3 py-5">
            <p className="text-xs text-muted-foreground">
              Logged in as <span className="text-foreground font-display">{adminName}</span>
            </p>
            <button
              onClick={logout}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-xs font-display tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-5 top-20 z-40 flex items-center justify-center rounded-full border border-border bg-surface p-3 shadow-deep lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="size-5 text-primary" />
      </button>

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!isOpen}
      />
    </>
  );
}
