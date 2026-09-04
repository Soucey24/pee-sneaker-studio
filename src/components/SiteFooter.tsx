import { Reveal } from "@/components/Reveal";
import { useState } from "react";

export function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer id="contact" className="mx-auto max-w-6xl px-5 py-16">
      <Reveal>
        <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-deep">
          <h2 className="text-3xl sm:text-4xl">Get the drop first</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            One email a month, only when new heat lands.
          </p>
            <form
            onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="flex-1 rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
            />
              <button disabled={subscribed} className="ember-fill rounded-md px-6 py-3 font-display text-xs tracking-widest transition-transform duration-300 hover:scale-105 disabled:opacity-60">
              {subscribed ? "You're on the list" : "Notify me"}
            </button>
          </form>
        </div>
      </Reveal>

      <div className="mt-10 flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
        <span>© {new Date().getFullYear()} Big Pee Kicks</span>
        <span>Built for sneaker heads, worldwide.</span>
      </div>
    </footer>
  );
}
