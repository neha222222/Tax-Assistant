import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}
  },
  build: {
    emptyOutDir: false,
    outDir: resolve(__dirname, 'dist'),
    lib: {
      formats: ['iife'],
      entry: resolve(__dirname, './popup.js'),
      name: 'Popup File Vite Configuration'
    },
    
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        extend: true,
      }
    }
  }
})