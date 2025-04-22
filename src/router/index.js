import staticRoutes from "./router_static";
import { createRouter, createWebHistory,createWebHashHistory } from "vue-router";
import userApi from "../api/user";
const modules = import.meta.glob("../views/**/*.vue");
// console.log(modules,"modules");

// console.log(staticRoutes);
const router =createRouter({
    history: createWebHashHistory(),
    routes: staticRoutes,
  });
router.beforeEach((to, from, next) => {
  console.log('Coming soon:', to.path);
  let isLoggedIn=false
  userApi.profile().then((res)=>{
    isLoggedIn=res.data.status==='success'
    if (to.meta.requiresAuth && !isLoggedIn) {
      next('/login'); // Jump to login page
    } else {
      next(); // Release
    }
  })
  // Check if login is required
});

export default router
