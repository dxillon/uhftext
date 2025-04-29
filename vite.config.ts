import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://uhfilms.in',
      outDir: 'dist',
      // 👇 Prevents plugin from touching robots.txt
      generateRobotsTxt: false,
      defaults: {
        lastmod: new Date().toISOString(),
      }
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173,
    host: true,
    open: true,
  },
  preview: {
    port: 4173,
    host: true,
    open: true,
  },
});
