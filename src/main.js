import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
/* 导入全局样式 */
import "./assets/css/global.css"
/* 导入字体 */
import "./assets/fonts/iconfont.css"

/* 导入树形表格 */
import TreeTable from 'vue-table-with-tree-grid'

/* 导入，挂载到Vue原型上 */
import axios from 'axios'
/* 配置请求根路径 */
axios.defaults.baseURL = "https://lianghj.top:8888/api/private/v1/"
/* 请求拦截 */
axios.interceptors.request.use(config=>{
  /* 为请求头添加token验证的Authorization字段 */
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component("tree-table",TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
