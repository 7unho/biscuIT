import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { ViteDevServer } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  esbuild: {
    // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-macros', 'babel-plugin-styled-components'],
      },
    }),
    viteTsconfigPaths(),
    svgrPlugin(),
  ],
  server: {
    proxy: {
      '/kmong': {
        target: 'https://blog.kmong.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/kmong/, ''),
      },
      '/sk': {
        target: 'https://devocean.sk.com/blog/techBoardDetail.do',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/sk/, ''),
      },
      '/coupang': {
        target: 'https://medium.com/coupang-engineering/',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/coupang/, ''),
      },
      '/aws': {
        target: 'https://aws.amazon.com/ko/blogs/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/aws/, ''),
      },
      '/29cm': {
        target: 'https://medium.com/29cm/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/29cm/, ''),
      },
    },
  },
});
