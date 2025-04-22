import LoginLayout from "../views/Login/LoginLayout.vue";
import Login from "../views/Login/login.vue";
import Register from "../views/Login/register.vue";
import Profile from "../views/profile/index.vue";
import Home from "../views/Home/home.vue";
import waitlistSignup from "../views/waitlistSignup/index.vue";
export default [
  {
    path: "/",
    name: "Login",
    component: LoginLayout,
    redirect: "/waitlistSignup",
    meta: {
      title: "Login",
      icon: "Login",
      affix: false,
    },
    children: [
      {
        path: "/login",
        name: "LoginPage",
        component: Login,
      },
      {
        path: "/register",
        name: "RegisterPage",
        component: Register,
      },
    ],
  },
  {
    path: "/waitlistSignup",
    name: "WaitingPage",
    component: waitlistSignup,
  },
  {
    path: "/profile",
    name: "profilePage",
    component: Profile,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: "/home",
    name: "HomePage",
    component: Home,
  },
];
