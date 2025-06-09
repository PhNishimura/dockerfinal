
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/users': 'http://localhost:3001',
      '/purchases': 'http://localhost:3001',
      '/items': 'http://localhost:3001'
    }
  }
})
