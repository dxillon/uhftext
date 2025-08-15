// vite.config.ts - SAFE VERSION
// Use this if the advanced config causes issues
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  assetsInclude: ['**/*.pdf'],
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    sourcemap: false,
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Simple manual chunks - keeps React together
        manualChunks: {
          // Keep React core together - CRITICAL
          'react-vendor': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],
          
          // Large libraries get their own chunks
          'framer-motion': ['framer-motion'],
          'three-js': ['three', '@react-three/fiber', '@react-three/drei'],
          
          // Group UI libraries
          'ui-libs': ['@emotion/react', '@emotion/styled', 'lucide-react', 'react-icons'],
          
          // Group media libraries
          'media-libs': ['react-player', 'swiper', 'lottie-react', '@lottiefiles/dotlottie-react'],
          
          // Group utility libraries
          'utils-libs': ['animejs', 'canvas-confetti', 'react-marquee-slider', 'jspdf'],
          
          // Group service libraries
          'service-libs': ['@supabase/supabase-js', '@emailjs/browser', 'emailjs-com'],
          
          // Group misc libraries
          'misc-libs': ['react-helmet-async', 'react-helmet', 'react-responsive', 'react-select'],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react-router-dom',
    ],
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