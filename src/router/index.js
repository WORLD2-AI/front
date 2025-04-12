import staticRoutes from "./router_static";
import { createRouter, createWebHistory,createWebHashHistory } from "vue-router";
const modules = import.meta.glob("../views/**/*.vue");
// console.log(modules,"modules");

// console.log(staticRoutes);
export default function () {
  return createRouter({
    history: createWebHashHistory(),
    routes: staticRoutes,
    // files,
  });
}
// import { createRouter, createWebHistory } from 'vue-router'

// // 导入你的组件
// import Home from '../view/index.vue'
// import About from '../view/About.vue'

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     component: About
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

// export default router
