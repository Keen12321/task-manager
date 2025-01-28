import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import laravel from 'laravel-vite-plugin';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  base: '/',
  plugins: [
    laravel(['resources/ts/index.tsx']),
    react(),
  ],
  root: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/ts'),
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
      ],
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'public/build'),
    manifest: "manifest.json",
    emptyOutDir: true,
    publicPath: process.env.APP_URL || '/',
  },
});