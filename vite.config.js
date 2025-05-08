import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    port: 80,
    host: "0.0.0.0",
    allowedHosts: ["dzencomments-ydk8.onrender.com"],
  },
});
