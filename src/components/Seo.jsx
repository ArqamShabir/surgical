import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import products from '../data/products.json';
import { findProductByParam, getProductPath } from '../utils/productUrls';

const siteUrl = 'https://coinsurgical.shop';
const siteName = 'CoinSurgical';
const defaultImage = `${siteUrl}/logo.png`;
const defaultTitle = 'CoinSurgical | Premium Medical Instruments';
const defaultDescription = 'CoinSurgical supplies high-quality precision surgical and medical instruments for healthcare professionals, clinics, distributors, and trade buyers.';

const pageMeta = {
  '/': {
    title: defaultTitle,
    description: defaultDescription,
  },
  '/about': {
    title: 'About CoinSurgical | Surgical Instrument Supplier',
    description: 'Learn about CoinSurgical, a supplier of precision surgical and medical instruments for clinics, distributors, and healthcare professionals.',
  },
  '/catalog': {
    title: 'Surgical Instruments Catalog | CoinSurgical',
    description: 'Browse CoinSurgical surgical instruments including facelift scissors, dissecting scissors, forceps, retractors, and precision medical tools.',
  },
  '/quote': {
    title: 'Request a Quote | CoinSurgical',
    description: 'Send CoinSurgical your selected surgical instruments and request trade pricing or product information.',
  },
  '/contact': {
    title: 'Contact CoinSurgical | Surgical Instruments',
    description: 'Contact CoinSurgical for surgical instrument inquiries, trade requests, product details, and supplier information.',
  },
};

const ensureTag = (selector, createTag) => {
  const existing = document.head.querySelector(selector);
  if (existing) return existing;

  const tag = createTag();
  document.head.appendChild(tag);
  return tag;
};

const setMetaName = (name, content) => {
  const tag = ensureTag(`meta[name="${name}"]`, () => {
    const element = document.createElement('meta');
    element.setAttribute('name', name);
    return element;
  });
  tag.setAttribute('content', content);
};

const setMetaProperty = (property, content) => {
  const tag = ensureTag(`meta[property="${property}"]`, () => {
    const element = document.createElement('meta');
    element.setAttribute('property', property);
    return element;
  });
  tag.setAttribute('content', content);
};

const setCanonical = (url) => {
  const tag = ensureTag('link[rel="canonical"]', () => {
    const element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    return element;
  });
  tag.setAttribute('href', url);
};

const getImageSrc = (image) => {
  const src = typeof image === 'string' ? image : image?.src;
  return src || defaultImage;
};

const getRouteMeta = (pathname) => {
  if (pathname.startsWith('/product/')) {
    const param = pathname.replace('/product/', '');
    const product = findProductByParam(products, param);

    if (product) {
      const productUrl = `${siteUrl}${getProductPath(product)}`;
      return {
        title: `${product.title} | CoinSurgical`,
        description: product.description || `View ${product.title}, a precision surgical instrument from CoinSurgical.`,
        canonicalUrl: productUrl,
        ogUrl: productUrl,
        ogImage: getImageSrc(product.images?.[0]),
        type: 'product',
      };
    }
  }

  const meta = pageMeta[pathname] || pageMeta['/'];
  const canonicalUrl = `${siteUrl}${pathname === '/' ? '/' : pathname}`;

  return {
    ...meta,
    canonicalUrl,
    ogUrl: canonicalUrl,
    ogImage: defaultImage,
    type: 'website',
  };
};

const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);

    document.title = meta.title;
    setMetaName('description', meta.description);
    setMetaName('robots', 'index, follow');
    setCanonical(meta.canonicalUrl);
    setMetaProperty('og:type', meta.type);
    setMetaProperty('og:site_name', siteName);
    setMetaProperty('og:title', meta.title);
    setMetaProperty('og:description', meta.description);
    setMetaProperty('og:url', meta.ogUrl);
    setMetaProperty('og:image', meta.ogImage);
    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', meta.title);
    setMetaName('twitter:description', meta.description);
    setMetaName('twitter:image', meta.ogImage);
  }, [pathname]);

  return null;
};

export default Seo;
