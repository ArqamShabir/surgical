import { notFound, redirect } from 'next/navigation';
import Product from '@/views/Product';
import products from '@/data/products.json';
import { findProductByParam, getProductPath, getProductSlug } from '@/utils/productUrls';

export function generateStaticParams() {
  return products.map((product) => ({
    id: getProductSlug(product),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = findProductByParam(products, id);

  if (!product) {
    return {
      title: 'Product Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const image = typeof product.images?.[0] === 'string' ? product.images[0] : product.images?.[0]?.src;
  const canonical = getProductPath(product);

  return {
    title: product.title,
    description: product.description || `View ${product.title}, a precision surgical instrument from CoinSurgical.`,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      title: `${product.title} | CoinSurgical`,
      description: product.description,
      url: canonical,
      images: image ? [image] : ['/logo.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | CoinSurgical`,
      description: product.description,
      images: image ? [image] : ['/logo.png'],
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const product = findProductByParam(products, id);

  if (!product) {
    notFound();
  }

  if (id !== getProductSlug(product)) {
    redirect(getProductPath(product));
  }

  const image = typeof product.images?.[0] === 'string' ? product.images[0] : product.images?.[0]?.src;
  const price = product.price ?? product.variants?.find((variant) => typeof variant.price === 'number')?.price;
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    sku: product.article,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'CoinSurgical',
    },
    ...(image ? { image } : {}),
    ...(typeof price === 'number'
      ? {
          offers: {
            '@type': 'Offer',
            price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: `https://coinsurgical.shop${getProductPath(product)}`,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Product product={product} />
    </>
  );
}
