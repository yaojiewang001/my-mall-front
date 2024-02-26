import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
/* 导入全局样式 */
import "./assets/css/global.css"
/* 导入字体 */
import "./assets/fonts/iconfont.css"

/* 导入树形表格 */
import TreeTable from 'vue-table-with-tree-grid'
/* 导入富文本编辑器 */
/* import VueQuillEditor from 'vue-quill-editor' */
/* 富文本编辑器对应的样式 */
/* import 'quill/dist/quill.core.css' 
import 'quill/dist/quill.snow.css' 
import 'quill/dist/quill.bubble.css' */ 
// 将富文本编辑器，注册为全局可用的组件
/* Vue.use(VueQuillEditor) */
/* 导入，挂载到Vue原型上 */
import axios from 'axios'

/* 导入进度条 */
import NProgress from 'nprogress'
/* import 'nprogress/nprogress.css' */

/* 配置请求根路径 */
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
/* 请求拦截 */
axios.interceptors.request.use(config=>{
  NProgress.start();/* 展示进度条 */

  /* 为请求头添加token验证的Authorization字段 */
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

/* 在response拦截器中隐藏进度条 */
axios.interceptors.response.use(config=>{
  NProgress.done();/* 隐藏进度条 */
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component("tree-table",TreeTable)

/* 全局过滤器 */
Vue.filter("dateFormat",function(originVal){
    const dt = new Date(originVal)

    const y = dt.getFullYear()
    const m = (dt.getMonth()+1+"").padStart(2,"0")
    const d = (dt.getDate()+"").padStart(2,"0")

    const hh = (dt.getHours()+"").padStart(2,"0")
    const mm = (dt.getMinutes()+"").padStart(2,"0")
    const ss = (dt.getSeconds()+"").padStart(2,"0")

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
