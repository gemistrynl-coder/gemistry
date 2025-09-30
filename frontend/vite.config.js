import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
    ],
    resolve: {
        alias: {
            '@desktop': fileURLToPath(new URL('./desktop/src', import.meta.url)),
            '@mobile': fileURLToPath(new URL('./mobile/src', import.meta.url)),
            // eventueel een globale @ naar frontend/src als je dat later wilt gebruiken
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})
