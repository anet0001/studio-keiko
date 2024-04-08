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
        // style: 'src/styles/main.scss',
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        format: 'es',
        inlineDynamicImports: false,
      },
      plugins: [
        postcss({
          extract: path.resolve('assets/main.css'),
          minimize: true,
          sourceMap: true,
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
