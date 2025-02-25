import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [svgr(),react()],
  build: {
    emptyOutDir: false,
    rollupOptions: {
      output: {
        entryFileNames: 'my-app.js',
        chunkFileNames: 'my-chunk-[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
})