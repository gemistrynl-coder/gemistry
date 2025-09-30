import { createRouter, createWebHistory } from 'vue-router'

// 👇 relative paths naar mobile/src/pages
import Home from '../src/pages/home.vue'
import ContactUs from '../src/pages/contact_us.vue'
import OurServices from '../src/pages/our_services.vue'
import OverOns from '../src/pages/over_ons.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/contact', name: 'Contact', component: ContactUs },
    { path: '/services', name: 'Services', component: OurServices },
    { path: '/over_ons', name: 'OverOns', component: OverOns },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router