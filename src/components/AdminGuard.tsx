import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/context/auth";

export function AdminGuard({ children }: { children?: ReactNode }) {
  const { isAdmin } = useAuth();
  if (isAdmin) return <>{children}</>;
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="max-w-sm text-center">
        <h1 className="text-4xl">Admin access required</h1>
        <p className="mt-3 text-sm text-muted-foreground">Sign in to manage the Big Pee Kicks store.</p>
        <Link to="/admin-login" className="ember-fill mt-6 inline-block rounded-md px-6 py-3 font-display text-xs tracking-widest">Go to admin login</Link>
      </div>
    </div>
  );
}