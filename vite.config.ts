import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import type { Connect } from 'vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    reactRouter(),
    tailwindcss(),
    {
      // Suppress Chrome DevTools probe — it has no route and spams the dev server log
      name: 'silence-chrome-devtools-probe',
      configureServer(server) {
        server.middlewares.use((req: Connect.IncomingMessage, res, next) => {
          if (req.url === '/.well-known/appspecific/com.chrome.devtools.json') {
            res.writeHead(204)
            res.end()
            return
          }
          next()
        })
      },
    },
  ],
  server: {
    proxy: {
      '/api/onliner': {
        target: 'https://catalog.api.onliner.by',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/onliner/, ''),
        secure: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@features": path.resolve(__dirname, "./src/features"),
    },
  },
})
