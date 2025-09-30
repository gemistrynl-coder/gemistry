// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
    plugins: [vue(), vueDevTools()],
    resolve: {
        alias: {
            '@desktop': fileURLToPath(new URL('./desktop', import.meta.url)),
            '@mobile': fileURLToPath(new URL('./mobile', import.meta.url)),
            '@': fileURLToPath(new URL('./src', import.meta.url)), // globaal
        },
    },
})
