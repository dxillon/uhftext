// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';



export default defineConfig({
  plugins: [
    sitemap({
      hostname: 'https://uhfilms.in',
      outDir: 'dist',
      robots: true,
      routes() {
        return [
          '/',
          '/team',
          '/about',
          '/careers',
          '/contact',
          '/privacy',
          '/cookies',
          '/terms',
          '/articles',
          '/journey',
          '/faq',
          '/projects',
        ];
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          framer: ['framer-motion'],
          router: ['react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Optional: raise warning limit
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
