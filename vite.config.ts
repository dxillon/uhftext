import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://uhfilms.in',
      outDir: 'dist',
      robotsTxt: true,
      routes() {
        const pages = [
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
        console.log('Sitemap routes:', pages);
        return pages;
      },
    }),
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
    chunkSizeWarningLimit: 1000,
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
