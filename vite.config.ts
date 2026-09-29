import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  build: {
    // leaflet-routing-machine (~550 kB) ya se carga bajo demanda en /contacto
    chunkSizeWarningLimit: 600,
  },
  server: {
    // En desarrollo, las peticiones a /api se reenvían al servidor Express
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
