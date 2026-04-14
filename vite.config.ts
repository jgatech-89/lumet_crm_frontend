import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** En Docker, apuntar al servicio backend (ej. http://lumet-crm-backend:8000; evitar '_' en el hostname). */
const devProxyTarget =
  process.env.VITE_DEV_PROXY_TARGET ?? "http://127.0.0.1:8000";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        target: devProxyTarget,
        changeOrigin: true,
      },
    },
  },
});
