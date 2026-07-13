// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
    integrations: [react(), sitemap()],
    vite: {
        plugins: [tailwindcss()],
    },
    markdown: {
        // shiki syntax highlighting with a warm theme
        shikiConfig: {
            theme: 'github-dark',
        },
    },
});
