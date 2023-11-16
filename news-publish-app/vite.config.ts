import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const roodDirectory = process.cwd()
  const env = loadEnv(mode, roodDirectory)
  return {
    plugins: [react()],
    resolve: {
      alias: {
        ".node_modules": path.resolve("./node_modules"),
        "~": path.resolve("./src"),
        "~api": path.resolve("./src/api"),
        "~components": path.resolve("./src/components"),
        "~routes": path.resolve("./src/routes"),
        "~store": path.resolve("./src/store"),
        "~utils": path.resolve("./src/utils"),
      }
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      } 
    },
    define: {
      global: {}
    }
  }
})