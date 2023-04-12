import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import router from './router'
import axios from 'axios'

const emitter = mitt();
const app = createApp(App)

app.use(router)


app.config.globalProperties.$axios = axios;
app.config.globalProperties.$serverUrl = 'http://127.0.0.1:3000/location' //api server
app.config.globalProperties.emitter = emitter;

app.mount('#app')