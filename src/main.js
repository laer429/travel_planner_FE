import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// import { Vue } from 'vue'

const app = createApp(App)

app.use(router)

app.mount('#app')

app.config.globalProperties.$axios = axios;
// createApp(App).use(store).mount('#app')
app.config.globalProperties.$serverUrl = 'http://127.0.0.1:3000/' //api server
