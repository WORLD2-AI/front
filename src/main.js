// import { createApp } from 'vue'
// import router from './router';
// import './style.css'
// import App from './App.vue'

// App.use(router())
// createApp(App).mount('#app')
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/index.css'

const creteRouter=router()
const app = createApp(App)

app.use(creteRouter)
app.use(ElementPlus)

app.mount('#app')