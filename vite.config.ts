import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vibecoding-demo/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@usecases': path.resolve(__dirname, './src/usecases'),
      '@adapters': path.resolve(__dirname, './src/adapters'),
      '@frameworks': path.resolve(__dirname, './src/frameworks'),
    },
  },
  // Vitest 설정은 defineConfig의 test 속성으로 분리
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: [...configDefaults.exclude],
  },
});
