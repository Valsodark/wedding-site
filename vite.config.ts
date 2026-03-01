import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    tailwindcss(),
    ViteImageOptimizer({
      include: /NataliaZhivko_.*\.webp$/i,
      webp: {
        quality: 70,
        lossless: false,
      },
    }),

  ],
  base: "./"
});