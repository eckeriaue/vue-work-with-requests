import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { requests } from './plugins/requests'
import RequestsBlockPlugin from './plugins/vue-requests-block'




// https://vite.dev/config/
export default defineConfig({
  plugins: [
    requests(),
    RequestsBlockPlugin(),
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
