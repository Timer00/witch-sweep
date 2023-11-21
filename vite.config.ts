import { defineConfig } from "vite";
import eslintPlugin from "@nabla/vite-plugin-eslint";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({}),
    VitePWA({
      includeAssets: ["**/*"],
      manifest: {
        // content of your manifest
        name: "Hocus Focus",
        short_name: "HocusFocus",
        theme_color: "#000000",
        background_color: "#000000",
        orientation: 'landscape',
        icons: [
          {
            src: "./icons/icon-192.webp",
            sizes: "192x192",
            type: "image/webp",
          },
          {
            src: "./icons/icon-512.webp",
            sizes: "512x512",
            type: "image/webp",
          },
        ],
      },
      workbox: {
        // workbox options for generating service worker
        globPatterns: ["**/*.{js,css,html,ico,png,svg,mov,otf}"],
        maximumFileSizeToCacheInBytes: 70000000,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "video",
            handler: "CacheFirst",
            options: {
              cacheName: "videos",
              expiration: {
                maxEntries: 10, // Adjust based on your needs
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // other runtime caching rules...
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.mov"],
  server: {
    host: true,
  },
});
