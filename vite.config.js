import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        // target: 'https://5000-firebase-canteen-1764412202290.cluster-iktsryn7xnhpexlu6255bftka4.cloudworkstations.dev', 
        target: 'http://localhost:5000', 
        changeOrigin: true, 
        // rewrite: (path) => path.replace(/^\/api/, ''), // Optional: remove the /api prefix
        // secure: false, // Optional: disable SSL certificate verification for dev
        // ws: true, // Optional: enable WebSocket proxying
      },
      '/socket.io': {  // <-- Socket.IO path
        target: 'http://localhost:5000',
        ws: true,       // <-- enable WebSocket proxy
        changeOrigin: true,
      },
    },
  },
})
