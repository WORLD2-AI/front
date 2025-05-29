import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/index.css'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  input: {
    trim: false, // 关闭自动 trim
  }
});

app.mount('#app')