import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { vRevelar } from './directives/revelar'

createApp(App).use(router).directive('revelar', vRevelar).mount('#app')
