import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    port: 80,
    host: "0.0.0.0",
    allowedHosts: ["dzencomments-ydk8.onrender.com"],
  },
  build: {
    outDir: "dist",
  },
});
