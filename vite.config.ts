import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Uncomment to analyze bundle
// import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  assetsInclude: ['**/*.pdf'], // ✅ Allow PDF in `import` or `public` access
  plugins: [
    react(),
    // Uncomment to analyze bundle size
    // visualizer({
    //   filename: 'dist/stats.html',
    //   open: true,
    //   gzipSize: true,
    // })
  ],
  build: {
    chunkSizeWarningLimit: 600, // Temporarily increased // Lower limit to catch issues earlier
    minify: 'esbuild', // Fast minifier (default)
    sourcemap: false,
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Enable CSS code splitting
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // More aggressive code splitting
        // Function-based chunking for better control
        manualChunks(id) {
          // Vendor libraries
          if (id.includes('node_modules')) {
            // Large libraries get their own chunks
            if (id.includes('react') && !id.includes('react-router') && !id.includes('react-player')) {
              return 'react-vendor';
            }
            if (id.includes('react-router-dom')) return 'react-router';
            if (id.includes('framer-motion')) return 'framer-motion';
            if (id.includes('three') && !id.includes('@react-three')) return 'three-core';
            if (id.includes('@react-three')) return 'three-react';
            if (id.includes('@emotion')) return 'emotion';
            if (id.includes('lucide-react')) return 'lucide-icons';
            if (id.includes('react-icons')) return 'react-icons';
            if (id.includes('react-player')) return 'react-player';
            if (id.includes('swiper')) return 'swiper';
            if (id.includes('lottie-react') || id.includes('@lottiefiles')) return 'lottie';
            if (id.includes('animejs')) return 'animejs';
            if (id.includes('@supabase')) return 'supabase';
            if (id.includes('@emailjs') || id.includes('emailjs-com')) return 'email';
            if (id.includes('@vercel')) return 'vercel';
            if (id.includes('jspdf')) return 'pdf';
            if (id.includes('react-helmet')) return 'helmet';
            if (id.includes('react-select')) return 'react-select';
            if (id.includes('react-responsive')) return 'responsive';
            if (id.includes('canvas-confetti')) return 'confetti';
            if (id.includes('react-marquee-slider')) return 'marquee';
            
            // Group remaining small vendor libraries
            return 'vendor-misc';
          }
          
          // Your application code - split by feature/directory
          if (id.includes('/src/')) {
            // Large components get their own chunks
            if (id.includes('/src/components/Home')) return 'page-home';
            if (id.includes('/src/components/About')) return 'page-about';
            if (id.includes('/src/components/Contact')) return 'page-contact';
            if (id.includes('/src/components/Services')) return 'page-services';
            if (id.includes('/src/components/Portfolio')) return 'page-portfolio';
            if (id.includes('/src/components/ProjectShowcase')) return 'project-showcase';
            if (id.includes('/src/components/VideoPlayer')) return 'video-player';
            if (id.includes('/src/components/FormCast')) return 'form-cast';
            
            // Group smaller components
            if (id.includes('/src/components/ui/') || id.includes('/src/components/common/')) return 'ui-components';
            if (id.includes('/src/components/')) return 'components';
            if (id.includes('/src/hooks/')) return 'hooks';
            if (id.includes('/src/utils/') || id.includes('/src/lib/')) return 'utils';
            if (id.includes('/src/services/') || id.includes('/src/api/')) return 'services';
            if (id.includes('/src/context/') || id.includes('/src/store/')) return 'state';
          }
        },
        
        // Dynamic file naming for better caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.jsx', '').replace('.tsx', '')
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') ?? [];
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name ?? '')) {
            return `images/[name]-[hash].${ext}`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name ?? '')) {
            return `fonts/[name]-[hash].${ext}`;
          }
          if (/\.pdf$/i.test(assetInfo.name ?? '')) {
            return `documents/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      // Pre-bundle these dependencies for faster dev startup
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
    ],
    exclude: [
      'lucide-react', // ✅ Optional for smaller dev builds
    ],
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


// Alternative: Function-based chunking for more control
export const advancedConfig = defineConfig({
  assetsInclude: ['**/*.pdf'],
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 500,
    minify: 'esbuild',
    sourcemap: false,
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Function-based chunking for maximum control
        manualChunks(id) {
          // Vendor libraries
          if (id.includes('node_modules')) {
            // Large libraries get their own chunks
            if (id.includes('react') && !id.includes('react-router')) return 'react-vendor';
            if (id.includes('react-router')) return 'react-router';
            if (id.includes('framer-motion')) return 'framer-motion';
            if (id.includes('lodash')) return 'lodash';
            if (id.includes('@radix-ui') || id.includes('@headlessui')) return 'ui-primitives';
            if (id.includes('lucide-react') || id.includes('@heroicons') || id.includes('react-icons')) return 'icons';
            if (id.includes('axios') || id.includes('swr') || id.includes('@tanstack/react-query')) return 'http';
            if (id.includes('recharts') || id.includes('chart.js') || id.includes('d3')) return 'charts';
            
            // Group remaining vendor libraries
            return 'vendor';
          }
          
          // Your application code
          if (id.includes('/src/')) {
            // Split by feature/directory
            if (id.includes('/src/components/ui/')) return 'ui-components';
            if (id.includes('/src/pages/')) return 'pages';
            if (id.includes('/src/components/')) return 'components';
            if (id.includes('/src/hooks/')) return 'hooks';
            if (id.includes('/src/utils/') || id.includes('/src/lib/')) return 'utils';
            if (id.includes('/src/services/') || id.includes('/src/api/')) return 'services';
            if (id.includes('/src/store/') || id.includes('/src/context/')) return 'state';
          }
        },
        
        // Custom file naming
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: ({name}) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'images/[name]-[hash][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'css/[name]-[hash][extname]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(name ?? '')) {
            return 'fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
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