import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // The API only allows http://localhost:5173 (CORS), so never fall back to another port
    port: 5173,
    strictPort: true,
  },
});
