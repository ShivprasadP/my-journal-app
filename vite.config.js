import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: {
      'crypto-js': path.resolve(__dirname, 'node_modules/crypto-js'),
    },
  },
  build: {
    rollupOptions: {
      external: ['crypto-js'],
    },
  },
})
