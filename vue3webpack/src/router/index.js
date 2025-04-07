//emptyLayout 打包没有菜单布局
import { createRouter, emptyLayout } from "@base/base_common_ui";
// import Layout from "@/layout";
import store from "@/store";
const files = require.context("@/views", true, /\.vue$/);
//是否嵌套到iframe主框架中
// const baseLayout = process.env.VUE_APP_IFRAME_STYLE === "in-iframe" ? emptyLayout : Layout;

import staticRoutes from '@/router/router_static'
let beforeGetMenuPromise
let isJustStaticRouters = true
const noMenuStaticRoutes = [
  {
    //对应SYS_MENU中的url
    "path": "/iframe",
    //对应SYS_MENU中的component
    "component": emptyLayout,
    //对应SYS_MENU中的is_home_page，如果为true则不在菜单中显示
    //对应SYS_MENU中的code
    "name": "ifrme",
    "redirect": "/iframe/index",
    "children": [
      {
        "path": "/iframe/index",
        "component": "test/index",
        "name": "tasklist",
      },
     
    ]
  },
  
];;
//是否是ifram主框架
const isIframeView = false;
const mode = 'hash';
// hash history
/**
 * 用于创建VueRouter
 * @param {*} store 用来存储过程中产生的router、menu、isIframeView等信息
 * @param {*} baseLayout 传入EmptyLayout或FrameworkLayout组件，基于具体的功能是基于Iframe加载还是基于Router-view加载，控制一级路由对应的布局容器是EmptyLayout还是FrameworkLayout
 * @param {*} files 业务系统views目录下的所有`*.vue`的文件，基于require.context获取，基于其控制是否懒加载
 * @param {*} staticRoutes 静态的路由菜单配置，基于`getUserMenu`获取的路由菜单和staticRoutes的路由菜单都不存在时，说明当前用户没有权限，加载一个path为*的redirect401的router，用来显示无权限。
 * @param {*} noMenuStaticRoutes 没有菜单的静态路由配置，主要是为了类似流程中业务单据预览界面使用。
 * @param {*} isIframeView true或false，view部分是否为iframe，如果是iframe，则对应的所有二级路由的component都设置为EmptyLayout
 * @param {*} beforeGetMenuPromise 一个Promise，在基于`getUserMenu`获取路由菜单前，首先调用该Promise，用于类似供应商系统，首先设置当前选定的具体供应商到后端后，再调用具体的获取菜单接口。
 * @param {*} isJustStaticRouters true或false，如果为true，则不再基于`getUserMenu`获取路由菜单，仅加载staticRoutes的路由菜单以及noMenuStaticRoutes的路由。
 */


export default function () {
  // baseLayout,
  return  createRouter({
    mode,
    store,
    files,
    staticRoutes,
    noMenuStaticRoutes,
    isIframeView,
    beforeGetMenuPromise,
    isJustStaticRouters,
    routerBase:"/"
  });
}