import { createApp } from 'vue'

import App from './App.vue'

Object.defineProperty(globalThis, 'CESIUM_BASE_URL', {
  value: `/${import.meta.env.VITE_CESIUM_LIBS_PATH}/`
})

createApp(App).mount('#app')
