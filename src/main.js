import { createApp } from 'vue'

import App from './App.vue'

Object.defineProperty(globalThis, 'CESIUM_BASE_URL', {
  value: '/libs/cesium'
})

createApp(App).mount('#app')
