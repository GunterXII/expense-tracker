import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,   // porta usata
    watch: {
      usePolling: true // migliora il rilevamento delle modifiche su WSL/Windows
    }
  }
})
