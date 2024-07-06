import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import "dotenv/config";

export default defineConfig({
    /*build: {
        minify: process.env.APP_ENV === "production" ? "esbuild" : false,
        cssMinify: process.env.APP_ENV === "production",
    },*/
    plugins: [
        react(),
        laravel({
            input: ["resources/js/app.tsx"],
            refresh: true,
        }),
    ],
});
