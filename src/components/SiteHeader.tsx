import { Link } from "@tanstack/react-router";
import { BackButton } from "@/components/BackButton";
import logo from "../../logo/logo.png";

export function SiteHeader({ showBack = true }: { showBack?: boolean }) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          {showBack && <BackButton />}
          <Link to="/" className="font-display text-lg leading-none">
            <img src={logo} alt="Big Pee Kicks" className="h-9 w-auto object-contain" />
          </Link>
        </div>

      </div>
    </header>
  );
}
