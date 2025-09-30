import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/home.vue'
import ContactUs from '@/pages/contact_us.vue'
import OurServices from '@/pages/our_services.vue'
import OverOns from '@/pages/over_ons.vue'

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
lt router