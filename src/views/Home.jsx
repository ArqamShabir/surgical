import Link from 'next/link';
import products from '../data/products.json';
import { getProductPath } from '../utils/productUrls';
import ProductImage from '../components/ProductImage';

const Home = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Premium Surgical Instruments</h1>
          <p>Explore our comprehensive catalog of surgical tools engineered for perfection, durability, and absolute reliability in the operating room.</p>
          <div className="hero-actions">
            <Link href="/catalog" className="btn btn-ghost">Check Our Products</Link>
          </div>
        </div>
      </section>

      <section className="trust-bar" style={{ backgroundColor: 'var(--color-off-white)', padding: '2rem 0', borderBottom: '1px solid var(--color-gray-light)' }}>
        <div className="container trust-inner" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem' }}>
          <div className="trust-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <span className="trust-icon" style={{ color: 'var(--color-primary-teal)', fontSize: '1.5rem' }}>✔</span>
            <span className="trust-text">ISO 13485 Certified</span>
          </div>
          <div className="trust-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <span className="trust-icon" style={{ color: 'var(--color-primary-teal)', fontSize: '1.5rem' }}>✦</span>
            <span className="trust-text">Premium Grade Steel</span>
          </div>
          <div className="trust-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <span className="trust-icon" style={{ color: 'var(--color-primary-teal)', fontSize: '1.5rem' }}>⟳</span>
            <span className="trust-text">Global Distribution</span>
          </div>
          <div className="trust-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <span className="trust-icon" style={{ color: 'var(--color-primary-teal)', fontSize: '1.5rem' }}>🛡</span>
            <span className="trust-text">CE Marked</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
          </div>
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <Link href={getProductPath(product)} className="product-image">
                  <ProductImage image={product.images?.[0]} altFallback={product.title} priority={product.id === featuredProducts[0]?.id} />
                </Link>
                <div className="product-info">
                  <div className="product-code">Article {product.article}</div>
                  <h3 className="product-title">{product.title}</h3>
                  <Link href={getProductPath(product)} className="btn btn-outline product-action" style={{ width: '100%', marginTop: '1rem' }}>View Details</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link href="/catalog" className="btn btn-primary">View All Products</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
