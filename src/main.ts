import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import setupLocatorUI from '@locator/runtime'
import './assets/base.scss'
import { worker } from './mocks/browser'

worker.start()
if (process.env.NODE_ENV === 'development') {
    setupLocatorUI({
        adapter: 'vue',
    })
}

const app = createApp(App)

app.use(router)

app.mount('#app')
