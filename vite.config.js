import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";
import observerPlugin from "mobx-react-observer/babel-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
     viteReact({
      babel: {
        plugins: [
          // observerPlugin()
        ]
      }
     }),
    //  react({

    //  })
    ],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  }
});
