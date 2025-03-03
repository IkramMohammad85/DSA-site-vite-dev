import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv(),
        cssnano(), // Ensures CSS is minified
      ],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "base/variables" as *;`,
      },
    },
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].min.js',
        chunkFileNames: 'assets/[name]-[hash].min.js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  assetsInclude: ['**/*.css'],
  resolve: {
    alias: {
      '/@fs/': '/',
    },
  }, 
});
