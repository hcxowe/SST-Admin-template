import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import App from './App.vue'
import 'element-plus/dist/index.css'
import './styles/index.scss'

createApp(App).use(ElementPlus, {
    size: 'small',
    locale: zhCn
}).use(createPinia()).use(router).mount('#app')