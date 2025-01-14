import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.viqtech.co.ke', // Django API URL
        changeOrigin: true, // Modify the origin header to the target URL
        secure: true, // Set to true if using https
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite the /api path
      },
    },
    hmr: {
      overlay: false, // Disable error overlay for a smoother dev experience
    },
  },
  optimizeDeps: {
    exclude: ['.git'], // Exclude .git directory from dependency optimization
  },
  build: {
    rollupOptions: {
      external: ['.git/**'], // Ensure .git files are excluded from the build
    },
  },
});
