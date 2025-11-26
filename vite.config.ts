import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// dev は "/"、build(=GitHub Pages) は "/usedcar-finder/"
const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  base: isProd ? '/usedcar-finder/' : '/',
  plugins: [react()],
})
