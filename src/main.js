import { createApp } from 'vue'
import App from './App.vue'
import routerFun from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/index.css'

const router=routerFun()
const app = createApp(App)

app.use(router)
app.use(ElementPlus)

app.mount('#app')