import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/desktop/pages/home.vue'
import OurServices from '@/desktop/pages/our_services.vue'
import OverOns from '@/desktop/pages/over_ons.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/services', name: 'Services', component: OurServices },
    { path: '/over_ons', name: 'OverOns', component: OverOns },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
