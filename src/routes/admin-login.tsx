import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { BackButton } from "@/components/BackButton";

export const Route = createFileRoute("/admin-login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Big Pee Kicks" },
      { name: "description", content: "Admin access to inventory management." },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { isAdmin, login } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAdmin) return <Navigate to="/admin" />;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    // Simulate a small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (login(password)) {
      navigate({ to: "/admin" });
    } else {
      setError("Invalid password. Try again.");
      setPassword("");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="w-full max-w-sm border border-border bg-surface p-8 rounded-xl">
        <BackButton homeOnly />
        <div className="mb-8 flex justify-center">
          <Lock className="size-8 text-primary" />
        </div>

        <h1 className="text-center font-display text-2xl">Admin Access</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Enter the password to manage inventory.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={loading}
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary disabled:opacity-50"
            autoFocus
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="ember-fill w-full rounded-md py-3 font-display text-sm tracking-widest transition-all hover:scale-[1.01] disabled:opacity-50"
          >
            {loading ? "Checking..." : "Enter"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <span className="block">Demo password: <span className="font-mono text-primary">bigpee</span></span>
        </p>
      </div>
    </div>
  );
}
