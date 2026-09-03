import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/cart";

const navLinks = [
  { label: "Home", to: "/" as const },
  { label: "Shop", to: "/shop" as const },
];

export function SiteHeader() {
  const { count, setOpen } = useCart();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="font-display text-lg leading-none">
          BIG<span className="ember-text">PEE</span>
        </Link>

        <nav className="hidden gap-8 text-sm md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/"
            hash="story"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            The Story
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open cart"
            className="relative rounded-full border border-border p-2.5 transition-colors hover:border-primary hover:text-primary"
          >
            <ShoppingBag className="size-4" />
            {count > 0 && (
              <span className="ember-fill absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full text-[10px] font-bold">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setNavOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-full border border-border p-2.5 md:hidden"
          >
            {navOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {navOpen && (
        <nav className="flex flex-col gap-1 border-t border-border px-5 py-3 md:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setNavOpen(false)}
              className="py-2 text-sm text-muted-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/"
            hash="story"
            onClick={() => setNavOpen(false)}
            className="py-2 text-sm text-muted-foreground"
          >
            The Story
          </Link>
        </nav>
      )}
    </header>
  );
}
