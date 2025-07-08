import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'next.config.ts',
        'postcss.config.mjs',
        'tailwind.config.ts',
        'vitest.config.ts',
        'vite.config.ts',
        '.next/**',
        'axe.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
});
