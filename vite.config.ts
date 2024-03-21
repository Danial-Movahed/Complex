import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'

export default defineConfig({
    plugins: [
        adonisjs({
            /**
             * Entrypoints of your application. Each entrypoint will
             * result in a separate bundle.
             */
            entrypoints: ['app/controllers/dashboard_controller.ts'],
            // entrypoints: ['resources/css/login.css', 'resources/js/login.js'],

            /**
             * Paths to watch and reload the browser on file change
             */
            reload: ['resources/views/**/*.edge'],
        }),
    ],
})
