"use strict";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";
function resolve(dir) {
  return path.join(__dirname, dir);
}
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  // 开启代理日志
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.1.6:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "") + "/",
        configure: (proxy, options) => {
          proxy.on("error", (err) => {
            console.error("Assets代理错误:", err);
          });
          proxy.on("proxyReq", (proxyReq) => {
            console.log("Assets代理请求:", proxyReq.path);
          });
          proxy.on("proxyRes", (proxyRes) => {
            console.log("Assets代理响应状态:", proxyRes.statusCode);
          });
        },
      },
      "/assets": {
        target: "http://192.168.1.6:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/assets/, "/static/assets"),
        configure: (proxy, options) => {
          proxy.on("error", (err) => {
            console.error("Assets代理错误:", err);
          });
          proxy.on("proxyReq", (proxyReq) => {
            console.log("Assets代理请求:", proxyReq.path);
          });
          proxy.on("proxyRes", (proxyRes) => {
            console.log("Assets代理响应状态:", proxyRes.statusCode);
          });
        },
      },
    },
  },
});
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })
