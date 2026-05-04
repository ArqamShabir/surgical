import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import products from '../data/products.json';
import { getProductPath } from '../utils/productUrls';

const formatPrice = (price) => `$${Number(price).toFixed(2)}`;
const fallbackImage = '/scalpel.png';
const getImageSrc = (image) => {
  const src = typeof image === 'string' ? image : image?.src;
  return src || fallbackImage;
};
const getImageAlt = (image, fallback) => typeof image === 'string' ? fallback : image?.alt || fallback;
const collections = [
  'Facelift Scissors',
  'Dissecting Scissors',
  'Scissors',
  'Tenotomy Scissors',
  'Needle Holders',
  'Dissecting Forceps',
  'Retractors & Skin Hooks',
  'Self Retaining Retractors',
  'Dissectors',
  'Scalpel Handles',
  'FaceLift Forceps',
  'Areola Markers',
  'Breast Retractors',
  'Nasal Instruments',
  'Browlift Instruments',
  'Maxillofacial Instruments',
  'Micro Surgery Instruments',
  'Ultra Fine Micro Instruments'
];

const getProductPriceRange = (product) => {
  const prices = [
    product.price,
    ...(product.variants || []).map((variant) => variant.price)
  ].filter((price) => typeof price === 'number');

  if (!prices.length) return '';

  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
};

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchTerm = searchParams.get('q') || '';
  const selectedCollections = searchParams.getAll('collection');

  const toggleCollection = (collection) => {
    const nextParams = new URLSearchParams(searchParams);
    const nextCollections = new Set(selectedCollections);

    if (nextCollections.has(collection)) {
      nextCollections.delete(collection);
    } else {
      nextCollections.add(collection);
    }

    nextParams.delete('collection');
    nextCollections.forEach((item) => nextParams.append('collection', item));
    setSearchParams(nextParams);
    setFiltersOpen(false);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  React.useEffect(() => {
    document.documentElement.classList.toggle('no-scroll', filtersOpen);
    document.body.classList.toggle('no-scroll', filtersOpen);

    return () => {
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
    };
  }, [filtersOpen]);

  const matchesSearch = (product) => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return true;

    const searchableFields = [
      product.article,
      product.title,
      product.category,
      ...(product.variants || []).flatMap((variant) => [
        variant.name,
        variant.code,
        ...(variant.sizes || []).flatMap((size) => [size.name, size.code, size.article])
      ])
    ].filter(Boolean).map((item) => item.toLowerCase());

    return searchableFields.some((field) => field.startsWith(query));
  };

  const matchesCollection = (product) => {
    if (!selectedCollections.length) return true;
    return selectedCollections.includes(product.category);
  };

  const filteredProducts = products.filter((product) => matchesSearch(product) && matchesCollection(product));

  return (
    <>
      <PageBanner title="Our Products" />
      <div className="container section" style={{ paddingTop: 0 }}>
        <div className="section-header" style={{ textAlign: 'left' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--color-primary-teal)' }}>Surgical Instruments</h1>
        </div>

        <div className="catalog-summary">
          <div>{filteredProducts.length} product{filteredProducts.length === 1 ? '' : 's'} found</div>
          {searchTerm && <div>Search: <strong>{searchTerm}</strong></div>}
        </div>

        <div className="catalog-layout">
          <aside className={`filters ${filtersOpen ? 'active' : ''}`}>
            <button type="button" className="mobile-filter-close" onClick={() => setFiltersOpen(false)} aria-label="Close filters">&times;</button>
            <div className="filter-group">
              <div className="filters-heading">
                <h3>Collection</h3>
                {(selectedCollections.length > 0 || searchTerm) && (
                  <button type="button" className="filter-clear" onClick={clearFilters}>Clear</button>
                )}
              </div>
              <ul className="filter-list">
                {collections.map((collection) => (
                  <li key={collection}>
                    <label className="filter-label">
                      <input
                        type="checkbox"
                        checked={selectedCollections.includes(collection)}
                        onChange={() => toggleCollection(collection)}
                      />
                      <span>{collection}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="catalog-content">
            {filteredProducts.length > 0 ? (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <Link to={getProductPath(product)} className="product-image">
                    <img src={getImageSrc(product.images?.[0])} alt={getImageAlt(product.images?.[0], product.title)} onError={(event) => { event.currentTarget.src = fallbackImage; }} />
                  </Link>
                  <div className="product-info">
                    <div className="product-code">Article {product.article}</div>
                    <h3 className="product-title">{product.title}</h3>
                    <div className="product-price">{getProductPriceRange(product)}</div>
                    <Link to={getProductPath(product)} className="btn btn-outline product-action" style={{ width: '100%' }}>View Details</Link>
                  </div>
                </div>
                ))}
              </div>
            ) : (
              <div className="empty-catalog">
                <h3>No Products Found</h3>
                <p>Try a different search term or clear the collection filters.</p>
                <button type="button" className="btn btn-outline" onClick={clearFilters}>Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        type="button"
        className={`mobile-filter-overlay ${filtersOpen ? 'active' : ''}`}
        onClick={() => setFiltersOpen(false)}
        aria-label="Close filters"
      ></button>
      <button type="button" className="mobile-filter-fab" onClick={() => setFiltersOpen(true)}>Filters</button>
    </>
  );
};

export default Catalog;
