// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://iangabrielsanchez.com',

  // Emit about.html / product/sim.html rather than about/index.html.
  // GitHub Pages resolves extensionless requests to .html at any depth, so
  // this keeps BOTH the existing /about.html URLs (which the old sitemap and
  // any external links use) and the clean /product/sim URLs working, with a
  // real 200 instead of the 404-status the client-side router used to return.
  build: { format: 'file' },
  trailingSlash: 'never',

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
