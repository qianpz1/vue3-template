import { createApp } from 'vue'
import { i18n } from '@/locales'
import { router } from '@/router'
import '@/assets/styles/reset.css'
import 'element-plus/theme-chalk/base.css'
import App from './App.vue'

const app = createApp(App)
app.use(router).use(i18n)
app.mount('#app')