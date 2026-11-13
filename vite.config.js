import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Root-domain GitHub Pages repository (smaransai2911.github.io) => base is "/".
// If you ever deploy to a project repo (user.github.io/repo), change this to "/repo/".
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
