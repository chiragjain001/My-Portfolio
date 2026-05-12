import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    // ── Phase 3: Image Optimization ──────────────────────────────────────────
    // Compresses PNG/JPG assets at build time.
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|avif)$/i,   // SVG excluded (no svgo at runtime)
      includePublic: true,
      logStats: true,
      ansiColors: true,
      png:  { quality: 80 },
      jpeg: { quality: 80 },
      jpg:  { quality: 80 },
      webp: { lossless: false, quality: 82, alphaQuality: 90 },
      avif: { lossless: false, quality: 70 },
    }),

    // ── Phase 4: PWA ─────────────────────────────────────────────────────────
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg', 'assets/**/*'],
      workbox: {
        // Raise limit to 4MB so sky.jpg (3.5MB) is included in precache
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,ico,svg,png,jpg,webp,woff2}'],
        runtimeCaching: [
          {
            // Cache .glb / .hdr files at runtime (too large for precache)
            urlPattern: /\.(glb|hdr|wasm)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'heavy-assets-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            // Google Fonts
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
      manifest: {
        name: "Chirag Jain – Portfolio",
        short_name: "CJ Portfolio",
        description: "Full-stack & 3D web developer portfolio by Chirag Jain",
        theme_color: "#030412",
        background_color: "#030412",
        display: "standalone",
        start_url: "/",
        scope: "/",
        orientation: "portrait-primary",
        icons: [
          { src: "/vite.svg", sizes: "any", type: "image/svg+xml" },
          { src: "/vite.svg", sizes: "192x192", type: "image/png" },
          { src: "/vite.svg", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],

  build: {
    // Raise warning threshold slightly (Three.js vendor chunk is intentionally large)
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // ── Phase 3: Manual Chunk Splitting ─────────────────────────────────
        manualChunks(id) {
          // Vendor: React ecosystem  → vendor-react.[hash].js
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/')
          ) {
            return 'vendor-react';
          }

          // Vendor: Three.js & R3F  → vendor-three.[hash].js
          if (
            id.includes('node_modules/three/') ||
            id.includes('node_modules/@react-three/fiber') ||
            id.includes('node_modules/@react-three/drei') ||
            id.includes('node_modules/@react-three/postprocessing') ||
            id.includes('node_modules/@react-spring/') ||
            id.includes('node_modules/postprocessing/') ||
            id.includes('node_modules/maath/')
          ) {
            return 'vendor-three';
          }

          // Vendor: Framer Motion + Motion  → vendor-motion.[hash].js
          if (
            id.includes('node_modules/framer-motion/') ||
            id.includes('node_modules/motion/')
          ) {
            return 'vendor-motion';
          }

          // Vendor: EmailJS + other utilities  → vendor-utils.[hash].js
          if (
            id.includes('node_modules/@emailjs/') ||
            id.includes('node_modules/lenis/') ||
            id.includes('node_modules/cobe/') ||
            id.includes('node_modules/tailwind-merge/')
          ) {
            return 'vendor-utils';
          }
        },
      },
    },
  },
});
