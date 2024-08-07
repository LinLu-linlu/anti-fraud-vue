import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import allConstants from './assets/const'

const app = createApp(App)
app.config.globalProperties.$CONST = allConstants;
app.use(router)
app.use(ElementPlus)
app.mount('#app')
