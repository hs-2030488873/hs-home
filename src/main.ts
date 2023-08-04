import { createApp } from 'vue'
import './assets/styles/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'

const app = createApp(App)

app.use(config)
app.use(store)
app.use(router)
app.mount('#app')
