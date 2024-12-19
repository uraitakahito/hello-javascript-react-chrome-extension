// Vitest supports the same extensions for your configuration file as Vite does:
// .js, .mjs, .cjs, .ts, .cts, .mts.

import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        service_worker: resolve(__dirname, 'src/service_worker.js'),
      },
      output: {
        // https://rollupjs.org/configuration-options/#output-entryfilenames
        entryFileNames: ({ name }) => {
          const specialEntries = ['service_worker'];
          if (specialEntries.includes(name)) {
            return '[name].js';
          }
          return 'assets/[name].js';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  plugins: [react()],
});
