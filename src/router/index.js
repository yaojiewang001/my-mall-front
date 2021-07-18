import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import User from '../components/user/users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'

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
  ] }
]

const router = new VueRouter({
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
