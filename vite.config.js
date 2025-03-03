import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import imageOptimizer from './lib/imageOptimizer.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), imageOptimizer()],
})
