import LoginLayout from "../views/Login/LoginLayout.vue";
import Login from "../views/Login/login.vue";
import Register from "../views/Login/register.vue";
import Home from "../views/Home/home.vue";
export default [
  {
    path: "/",
    name: "登录",
    component: LoginLayout,
    redirect: "/login",
    meta: {
      title: "登录",
      icon: "chart",
      affix: false,
    },
    children: [
      {
        path: "/login",
        name: "登录页",
        component: Login,
      },
      {
        path: "/register",
        name: "注册页",
        component: Register,
      },
    ],
  },
  {
    path: "/home",
    name: "首页",
    component: Home,
  },
];
