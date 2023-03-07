import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import { Vue } from 'vue'

const app = createApp(App)

app.use(router)

app.mount('#app')


// createApp(App).use(store).mount('#app')