import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { getProductPath } from './src/utils/productUrls.js';

const siteUrl = 'https://coinsurgical.shop';
const lastmod = '2026-04-28';

const sitemapUrl = (path, changefreq, priority) => `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const generateSitemap = () => ({
  name: 'generate-sitemap',
  closeBundle() {
    const products = JSON.parse(readFileSync('src/data/products.json', 'utf8'));
    const staticUrls = [
      ['/', 'weekly', '1.0'],
      ['/about', 'monthly', '0.7'],
      ['/catalog', 'weekly', '0.9'],
      ['/quote', 'monthly', '0.6'],
      ['/contact', 'monthly', '0.6'],
    ];
    const productUrls = products.map((product) => [getProductPath(product), 'monthly', '0.8']);
    const urls = [...staticUrls, ...productUrls]
      .map(([path, changefreq, priority]) => sitemapUrl(path, changefreq, priority))
      .join('\n');

    writeFileSync(
      'dist/sitemap.xml',
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
    );
  },
});

const copyHtaccess = () => ({
  name: 'copy-htaccess',
  closeBundle() {
    if (existsSync('public/.htaccess')) {
      copyFileSync('public/.htaccess', 'dist/.htaccess');
    }
  },
});

export default defineConfig({
  plugins: [react(), generateSitemap(), copyHtaccess()],
});
