import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => {
  if (command === "build") process.env["NODE_ENV"] = "production";

  return {
    plugins: [
      tanstackStart({
        server: { entry: "server" },
      }),
      tailwindcss(),
      nitro({ preset: "vercel" }),
      react({
        jsxRuntime: "automatic",
        babel: {
          plugins: [["@babel/plugin-transform-react-jsx", { runtime: "automatic", development: false }]],
        },
      }),
    ],
    resolve: {
      tsconfigPaths: true,
    },
    ssr: {
      noExternal: ["@tanstack/react-start"],
    },
    build: {
      sourcemap: false,
    },
  };
});
