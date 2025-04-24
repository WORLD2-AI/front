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
      console.log("/login");
    } else {
      if (to.path === '/login' && isLoggedIn) {
        console.log("When logged in and accessing/login, jump to the homepage");
        next('/home'); // When logged in and accessing/login, jump to the homepage
      } else {
        next();
      }
    }
    
  }).catch((req)=>{
    if(!to.meta.requiresAuth){
      next()
    }else{
      next("/login")
    }
  })
  // Check if login is required
  
});

export default router
