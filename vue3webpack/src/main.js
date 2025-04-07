import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const creteRouter=router()
console.log(creteRouter);
const app = createApp(App)

app.use(creteRouter)

app.mount('#app')