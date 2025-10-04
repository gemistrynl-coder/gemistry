// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Detecteer automatisch of we in productie zijn
const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
    base: isProd ? './' : '/', // ⬅️ relatieve paden in productie, absolute lokaal
    plugins: [vue(), vueDevTools()],
    resolve: {
        alias: {
            '@desktop': fileURLToPath(new URL('./src/desktop', import.meta.url)),
            '@mobile': fileURLToPath(new URL('./src/mobile', import.meta.url)),
            '@': fileURLToPath(new URL('./src', import.meta.url)), // globaal
        },
    },
})
