import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'


import "./assets/css/reset.css"



// Vue.prototype.$axios = axios;

// createApp(App).mount('#app')


const app = createApp(App).use(router)

app.config.globalProperties.axios=axios

app.mount('#app')