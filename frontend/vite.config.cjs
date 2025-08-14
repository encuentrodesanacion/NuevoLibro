import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Puerto para el frontend (Vite)
    proxy: {
      // Redirige las peticiones que empiezan con '/api'
      "/api": {
        target: "http://localhost:3000", // El puerto donde tu servidor de Node.js está escuchando
        changeOrigin: true,
        secure: false,
        // Opcional: reescribe la ruta si no quieres que el '/api' se envíe al backend
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
