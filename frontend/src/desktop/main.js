import { createApp } from 'vue'
import App from './App.vue'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

import router from './router'



if (/Mobi|Android|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)) {
    // 🚨 Redirect naar mobile.html als het een mobiel apparaat is
    window.location.replace('/mobile.html')
} else {
    const app = createApp(App)
    app.use(VCalendar, {})
    app.use(router)
    app.mount('#app')
}
