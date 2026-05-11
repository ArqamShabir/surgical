import Link from 'next/link';
import activeProducts, { featuredSet } from '../data/activeProducts';
import { getProductPath } from '../utils/productUrls';
import ProductImage from '../components/ProductImage';

const Home = () => {
  const featuredProducts = activeProducts;
  const rhinoplastySet = featuredSet;

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Instrumental Quirúrgico Premium</h1>
          <p>Explore nuestro catálogo completo de instrumental quirúrgico diseñado para precisión, durabilidad y máxima confiabilidad en el quirófano.</p>
          <div className="hero-actions">
            <Link href="/catalog" className="btn btn-ghost">Ver Productos</Link>
          </div>
        </div>
      </section>

      <section className="trust-bar" style={{ backgroundColor: 'var(--color-off-white)', padding: '2rem 0', borderBottom: '1px solid var(--color-gray-light)' }}>
        <div className="container trust-inner" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem' }}>
          <div className="trust-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <span className="trust-icon" style={{ color: 'var(--color-primary-teal)', fontSize: '1.5rem' }}>✔</span>
            <span className="trust-text">Certificación ISO 13485</span>
          </div>
          <div className="trust-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <span className="trust-icon" style={{ color: 'var(--color-primary-teal)', fontSize: '1.5rem' }}>✦</span>
            <span className="trust-text">Acero de Grado Premium</span>
          </div>
          <div className="trust-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <span className="trust-icon" style={{ color: 'var(--color-primary-teal)', fontSize: '1.5rem' }}>⟳</span>
            <span className="trust-text">Distribución Global</span>
          </div>
          <div className="trust-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <span className="trust-icon" style={{ color: 'var(--color-primary-teal)', fontSize: '1.5rem' }}>🛡</span>
            <span className="trust-text">Marcado CE</span>
          </div>
        </div>
      </section>

      {rhinoplastySet && (
        <section className="section featured-set-section">
          <div className="container">
            <div className="featured-set">
              <Link href={getProductPath(rhinoplastySet)} className="featured-set-image">
                <ProductImage
                  image={rhinoplastySet.images?.[0]}
                  altFallback={rhinoplastySet.title}
                  sizes="(max-width: 900px) 100vw, 48vw"
                  priority
                />
              </Link>
              <div className="featured-set-content">
                <div className="product-code">Set Destacado</div>
                <h2>{rhinoplastySet.title}</h2>
                <p>{rhinoplastySet.description}</p>
                <div className="featured-set-price">$750.00</div>
                <div className="featured-set-note">Envío mundial gratis por una oferta limitada de 30 días.</div>
                <Link href={getProductPath(rhinoplastySet)} className="btn btn-primary">Ver Detalles</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Productos Destacados</h2>
          </div>
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <Link href={getProductPath(product)} className="product-image">
                  <ProductImage image={product.images?.[0]} altFallback={product.title} priority={product.id === featuredProducts[0]?.id} />
                </Link>
                <div className="product-info">
                  <div className="product-code">Artículo {product.article}</div>
                  <h3 className="product-title">{product.title}</h3>
                  <Link href={getProductPath(product)} className="btn btn-outline product-action" style={{ width: '100%', marginTop: '1rem' }}>Ver Detalles</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link href="/catalog" className="btn btn-primary">Ver Todos los Productos</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
