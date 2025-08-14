import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  assetsInclude: ['**/*.pdf'], // ✅ Allow PDF in `import` or `public` access
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild', // Fast minifier (default)
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          framer: ['framer-motion'],
          router: ['react-router-dom'],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'], // ✅ Optional for smaller dev builds
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
