// 入口文件: 引入 vue3 createApp方法
import { createApp } from 'vue'
// 引入 pinia 仓库
import pinia from './stores'
// element-plus UI组件库, 中文的
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
// 引入 App 根组建
import App from './App.vue'
// 引入路由器
import router from './router'
import './styles/index.scss'
// 引入自己封装的图标全局组件
import ElSvg from './components/SvgIcon/ElSvg'
// 引入路由鉴权
import './permission'
// 引入全局组件
import Category from '@/components/Category/index.vue'
const app = createApp(App)
ElSvg(app)
app.use(pinia)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .component('Category',Category)// 挂载全局组件
  .mount('#app')
