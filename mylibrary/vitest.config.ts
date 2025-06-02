import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true, // ✅ potřebné pro jest-dom + expect atd.
    environment: 'jsdom', // ✅ protože testuješ React komponenty
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ✅ alias @ -> /src
    },
  },
});
