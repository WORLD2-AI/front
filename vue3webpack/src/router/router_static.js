import Home from '../views/Home/HomePage.vue'
import About from '../views/About/AboutPage.vue'
export default [
  {
    path: '/',
    isHomePage: false,
    name: 'home',
    redirect: '/about',
    meta: {
      title: '首页',
      icon: 'chart',
      affix: false
    },
    children:[
      {
        path:"/",
        name:"home",
        component:Home
      },
      {
        path:"/about",
        name:"about",
        component:About
      }
    ]
  }
]
