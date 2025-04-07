'use strict'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path';
function resolve(dir) {
  return path.join(__dirname, dir)
}
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      }
    },
  },
})
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })