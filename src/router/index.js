import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
/* 路由懒加载，用到在请求 */
//const Login = () => import(/* webpackChunkName: "login-home-welcome" */ '../components/login.vue')
//const Home = () => import(/* webpackChunkName: "login-home-welcome" */ '../components/home.vue')
//const Welcome = () => import(/* webpackChunkName: "login-home-welcome" */ '../components/welcome.vue')

import User from '../components/user/users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
//const User = () => import(/* webpackChunkName: "User-Rights-Roles" */ '../components/user/users.vue')
//const Rights = () => import(/* webpackChunkName: "User-Rights-Roles" */ '../components/power/Rights.vue')
//const Roles = () => import(/* webpackChunkName: "User-Rights-Roles" */ '../components/power/Roles.vue')


import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue'
//const Cate = () => import(/* webpackChunkName: "Cate-Params" */ '../components/goods/Cate.vue')
//const Params = () => import(/* webpackChunkName: "Cate-Params" */ '../components/goods/Params.vue')

import List from '../components/goods/List.vue'
import Add from '../components/goods/add.vue'
//const List = () => import(/* webpackChunkName: "List-Add" */ '../components/goods/List.vue')
//const Add = () => import(/* webpackChunkName: "List-Add" */ '../components/goods/add.vue')

import Order from '../components/order/Order.vue'
import Report from '../components/report/Report.vue'
//const Order = () => import(/* webpackChunkName: "Order-Report" */ '../components/order/Order.vue')
//const Report = () => import(/* webpackChunkName: "Order-Report" */ '../components/report/Report.vue')


Vue.use(VueRouter)

const routes = [
  { path:"/", redirect:"/login" },
  { path:"/login", component: Login },
  { path:"/home", component: Home,
  redirect:'/welcome',
  children:[
    { path:"/welcome", component: Welcome },
    { path:"/users", component: User },
    { path:"/rights", component: Rights },
    { path:"/roles", component: Roles },
    { path:"/categories", component: Cate },
    { path:"/params", component: Params },
    { path:"/goods", component: List },
    { path:"/goods/add", component: Add },
    { path:"/orders", component: Order },
    { path:"/reports", component: Report },
  ] }
]

const router = new VueRouter({
  // mode: 'hash',
  routes
})

// 挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  // to将要访问的路径
  // from从那个路径来
  // next表示放行，next（），next（"/login"）这是强制跳转
  if(to.path === '/login') return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem("token")
  if (!tokenStr) return next("/login")
  next()

})

export default router
