import './bootstrap'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'https://php-laravel-vue-api-main-5vew6q.laravel.cloud'

createApp(App).use(router).mount('#app')