// TanStack Start/Vite config included by the project runtime — keep the standard setup
// and avoid custom output overrides that trigger stale Vercel build artifacts.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "vercel",
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
