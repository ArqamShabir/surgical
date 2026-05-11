import products from '@/data/activeProducts';
import { getProductPath } from '@/utils/productUrls';

const siteUrl = 'https://coinsurgical.shop';

export const dynamic = 'force-static';

export default function sitemap() {
  const now = new Date();
  const staticRoutes = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/catalog', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/quote', priority: 0.6, changeFrequency: 'monthly' },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...products.map((product) => ({
      url: `${siteUrl}${getProductPath(product)}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}
