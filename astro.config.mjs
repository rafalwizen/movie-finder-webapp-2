// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  // Enable privacy-friendly Vercel Web Analytics (no cookies, GDPR-compliant).
  adapter: vercel({ webAnalytics: { enabled: true } }),
  vite: {
    plugins: [tailwindcss()],
  },
});
