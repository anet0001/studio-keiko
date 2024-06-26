import { defineConfig } from 'vite';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [compression()],
  assetsInclude: ['**/*.svg'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/app'),
    },
  },
  build: {
    outDir: 'assets',
    assetsDir: '',
    minify: 'terser',
    cssCodeSplit: false,
    terserOptions: {
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      input: {
        main: 'src/app/index.js',
      },
      output: {
        chunkFileNames: '[name].js',
        entryFileNames: '[name].js',
        format: 'es',
        inlineDynamicImports: false,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'style.css') return 'main.css';
          return assetInfo.name;
        },
      },
      plugins: [
        postcss({
          sourceMap: true,
          minimize: true,
          use: {
            sass: {},
          },
        }),
      ],
    },
  },
  css: {
    preprocessorOptions: {},
  },
  server: {
    port: 3000, // specify a port
    open: true, // open the browser on server start
  },
});
