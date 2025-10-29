import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://marc-iglesias.dev',
  output: 'static',
  integrations: [
    react(),
    tailwind({
      config: {
        applyBaseStyles: false
      }
    })
  ]
});
