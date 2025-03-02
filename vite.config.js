import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
// import { imageOptimizer } from 'svelte-responsive-images'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
})
