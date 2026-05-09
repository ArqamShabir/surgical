'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PageBanner from '../components/PageBanner';
import products from '../data/products.json';
import { getProductPath } from '../utils/productUrls';
import ProductImage from '../components/ProductImage';

const formatPrice = (price) => `$${Number(price).toFixed(2)}`;
const collectionLabels = {
  'Facelift Scissors': 'Tijeras para Lifting Facial',
  'Dissecting Scissors': 'Tijeras de Disección',
  Scissors: 'Tijeras',
  'Tenotomy Scissors': 'Tijeras de Tenotomía',
  'Needle Holders': 'Portaagujas',
  'Dissecting Forceps': 'Pinzas de Disección',
  'Retractors & Skin Hooks': 'Separadores y Ganchos de Piel',
  'Self Retaining Retractors': 'Separadores Autoestáticos',
  'Rhinoplasty Sets': 'Sets de Rinoplastia',
  Dissectors: 'Disectores',
  'Scalpel Handles': 'Mangos de Bisturí',
  'FaceLift Forceps': 'Pinzas para Lifting Facial',
  'Areola Markers': 'Marcadores de Areola',
  'Breast Retractors': 'Separadores Mamarios',
  'Nasal Instruments': 'Instrumental Nasal',
  'Browlift Instruments': 'Instrumental para Lifting de Cejas',
  'Maxillofacial Instruments': 'Instrumental Maxilofacial',
  'Micro Surgery Instruments': 'Instrumental de Microcirugía',
  'Ultra Fine Micro Instruments': 'Microinstrumental Ultrafino'
};

const collections = [
  'Facelift Scissors',
  'Dissecting Scissors',
  'Scissors',
  'Tenotomy Scissors',
  'Needle Holders',
  'Dissecting Forceps',
  'Retractors & Skin Hooks',
  'Self Retaining Retractors',
  'Rhinoplasty Sets',
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchTerm = searchParams.get('q') || '';
  const selectedCollections = searchParams.getAll('collection');

  const setSearchParams = (nextParams) => {
    const queryString = nextParams.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

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
    setSearchParams(new URLSearchParams());
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
      <PageBanner title="Nuestros Productos" />
      <div className="container section" style={{ paddingTop: 0 }}>
        <div className="section-header" style={{ textAlign: 'left' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--color-primary-teal)' }}>Instrumental Quirúrgico</h1>
        </div>

        <div className="catalog-summary">
          <div>{filteredProducts.length} producto{filteredProducts.length === 1 ? '' : 's'} encontrado{filteredProducts.length === 1 ? '' : 's'}</div>
          {searchTerm && <div>Búsqueda: <strong>{searchTerm}</strong></div>}
        </div>

        <div className="catalog-layout">
          <aside className={`filters ${filtersOpen ? 'active' : ''}`}>
            <button type="button" className="mobile-filter-close" onClick={() => setFiltersOpen(false)} aria-label="Cerrar filtros">&times;</button>
            <div className="filter-group">
              <div className="filters-heading">
                <h3>Colección</h3>
                {(selectedCollections.length > 0 || searchTerm) && (
                  <button type="button" className="filter-clear" onClick={clearFilters}>Limpiar</button>
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
                      <span>{collectionLabels[collection] || collection}</span>
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
                  <Link href={getProductPath(product)} className="product-image">
                    <ProductImage image={product.images?.[0]} altFallback={product.title} />
                  </Link>
                  <div className="product-info">
                    <div className="product-code">Artículo {product.article}</div>
                    <h3 className="product-title">{product.title}</h3>
                    <div className="product-price">{getProductPriceRange(product)}</div>
                    <Link href={getProductPath(product)} className="btn btn-outline product-action" style={{ width: '100%' }}>Ver Detalles</Link>
                  </div>
                </div>
                ))}
              </div>
            ) : (
              <div className="empty-catalog">
                <h3>No se encontraron productos</h3>
                <p>Pruebe con otro término de búsqueda o limpie los filtros de colección.</p>
                <button type="button" className="btn btn-outline" onClick={clearFilters}>Limpiar Filtros</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        type="button"
        className={`mobile-filter-overlay ${filtersOpen ? 'active' : ''}`}
        onClick={() => setFiltersOpen(false)}
        aria-label="Cerrar filtros"
      ></button>
      <button type="button" className="mobile-filter-fab" onClick={() => setFiltersOpen(true)}>Filtros</button>
    </>
  );
};

export default Catalog;
