import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.jsx"],
            ssr: "resources/js/ssr.js",
            refresh: true,
        }),
        react(),
    ],
    ssr: {
        noExternal: ["@inertiajs/react"], // Prevent @inertiajs/react from being treated as external
    },
});
