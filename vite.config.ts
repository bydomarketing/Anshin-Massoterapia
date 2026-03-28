import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    base: './',
    build: {
      emptyOutDir: true,
      outDir: 'dist',
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || '';
            if (/\.(css)$/.test(name)) {
              return 'css/[name]-[hash][extname]';
            }
            if (/\.(gif|jpe?g|png|svg|webp)$/.test(name)) {
              return 'assets/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
