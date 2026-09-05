import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import logo from "../../logo/logo.png";
import { useWishlist } from "@/context/wishlist";

export function SiteHeader({ showBack = true }: { showBack?: boolean }) {
  const { ids } = useWishlist();

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          {showBack && <BackButton />}
          <Link to="/" className="font-display text-lg leading-none">
            <img src={logo} alt="Big Pee Kicks" className="h-9 w-auto object-contain" />
          </Link>
        </div>
        <Link to="/wishlist" aria-label="Open wishlist" className="relative rounded-md border border-border p-2 text-muted-foreground hover:border-primary hover:text-primary">
          <Heart className="size-4" />
          {ids.length > 0 && <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-primary px-1 text-center text-[10px] leading-5 text-primary-foreground">{ids.length}</span>}
        </Link>

      </div>
    </header>
  );
}
