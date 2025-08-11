import {defineConfig} from 'vite'
import tailwindcss from '@tailwindcss/vite'
import {resolve} from 'path';
import path from "node:path";

export default defineConfig({
    plugins: [
        tailwindcss()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                shop: resolve(__dirname, "shop/index.html"),
                admin: resolve(__dirname, "account/index.html"),
            }
        }
    },
    server: {
        host: '0.0.0.0',
        port: 3000,
        proxy: {
            "/api": {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                secure: false,
            }
        }
    }
})
