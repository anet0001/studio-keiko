import { defineConfig } from 'vite';
import path from 'path';
import postcss from 'rollup-plugin-postcss';

export default defineConfig({
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
    rollupOptions: {
      input: {
        main: 'src/app/index.js',
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
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
