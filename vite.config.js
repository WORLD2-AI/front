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
  // Enabling Agent Logging
  server: {
    proxy: {
      "/rolesreder": {
        target: "http://192.168.1.35:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rolesreder/, ""),
        configure: (proxy, options) => {
          proxy.on("error", (err) => {
            console.error("rolesreder agent error:", err);
          });
          proxy.on("proxyReq", (proxyReq) => {
            console.log("rolesreder proxy request:", proxyReq.path);
          });
          proxy.on("proxyRes", (proxyRes) => {
            console.log(
              "rolesreder Agent Response Status:",
              proxyRes.statusCode
            );
          });
        },
      },
      "/characters": {
        target: "http://192.168.1.35:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/characters/, ""),
        configure: (proxy, options) => {
          proxy.on("error", (err) => {
            console.error("characters agent error:", err);
          });
          proxy.on("proxyReq", (proxyReq) => {
            console.log("characters proxy request:", proxyReq.path);
          });
          proxy.on("proxyRes", (proxyRes) => {
            console.log(
              "characters Agent Response Status:",
              proxyRes.statusCode
            );
          });
        },
      },
      "/login": {
        target: "http://192.168.1.6:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/login/, "/"),
        bypass: (req) => {
          if (req.url.includes(".jpg") || req.url.includes(".png")) {
            return req.url; // Directly return to the original path without using a proxy
          }
        },
        configure: (proxy, options) => {
          proxy.on("error", (err) => {
            console.error("login agent error:", err);
          });
          proxy.on("proxyReq", (proxyReq) => {
            console.log("login proxy request:", proxyReq.path);
          });
          proxy.on("proxyRes", (proxyRes) => {
            console.log("login Agent Response Status:", proxyRes.statusCode);
          });
        },
      },
    },
  },
});
