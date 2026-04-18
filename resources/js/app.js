// resources/js/app.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Base URL axios ke API Laravel
axios.defaults.baseURL = '/api'
axios.defaults.headers.common['Accept'] = 'application/json'

// Auto attach token kalau ada
const token = localStorage.getItem('token')
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const app = createApp(App)
app.use(router)
app.config.globalProperties.$axios = axios
app.mount('#app')