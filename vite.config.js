import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// On GitHub Pages the site is served from /<repo>/, so production assets need
// that base. Local dev stays at /. Override with VITE_BASE if the repo is renamed.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? (process.env.VITE_BASE || '/sheleads-uz/') : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
}))
