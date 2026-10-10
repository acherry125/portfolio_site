import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { SITE_URL } from './src/lib/site.mjs';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  integrations: [react()],
  vite: {
    build: {
      cssMinify: true,
    },
  },
  server: {
    port: 4321,
  },
});
