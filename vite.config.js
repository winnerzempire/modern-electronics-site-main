import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.viqtech.co.ke', // Django API URL
        changeOrigin: true, // Modify the origin header to the target URL
        secure: false, // Set to true if using https
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite the /api path
      },
    },
  },
})
