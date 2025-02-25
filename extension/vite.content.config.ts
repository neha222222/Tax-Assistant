import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [svgr(),react()],
  define: {
    'process.env': {},
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    lib: {
      formats: ['iife'],
      entry: [
        resolve(__dirname, './content.tsx'),
      ],
      name: 'Conntent-Script Vite Configuration'
    },
    
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        extend: true,
      }
    }
  }
})