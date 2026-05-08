'use client';

import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import PageBanner from '../components/PageBanner';
import { CartContext } from '../context/CartContext';
import products from '../data/products.json';
import { getProductPath } from '../utils/productUrls';
import ProductImage, { getImageAlt, getImageSrc } from '../components/ProductImage';

const formatPrice = (price) => `$${Number(price).toFixed(2)}`;

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

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [mainImage, setMainImage] = useState(product.images?.[0] || null);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.variants?.[0]?.sizes?.[0]?.name || product.sizes?.[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [showMsg, setShowMsg] = useState(false);
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setMainImage(product.images?.[0] || null);
    setSelectedVariant(product.variants?.[0]?.name || '');
    setSelectedSize(product.variants?.[0]?.sizes?.[0]?.name || product.sizes?.[0]?.name || '');
    setQuantity(1);
    setIsZoomActive(false);
    setZoomPosition({ x: 50, y: 50 });
  }, [product]);

  const images = product.images || [];
  const selectedVariantData = product.variants?.find((variant) => variant.name === selectedVariant);
  const availableSizes = selectedVariantData?.sizes || product.sizes || [];
  const selectedSizeData = availableSizes.find((size) => size.name === selectedSize);
  const selectedTitle = selectedVariantData?.title || selectedVariantData?.name || product.title;
  const selectedArticle = selectedSizeData?.code || selectedSizeData?.article || selectedVariantData?.code || product.article;
  const selectedPrice = selectedVariantData?.price ?? product.price;

  const handleZoomMove = (event) => {
    if (!isZoomActive) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    setZoomPosition({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y))
    });
  };

  const handleZoomTouchMove = (event) => {
    if (!isZoomActive) return;

    const touch = event.touches[0];
    if (!touch) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((touch.clientX - bounds.left) / bounds.width) * 100;
    const y = ((touch.clientY - bounds.top) / bounds.height) * 100;

    setZoomPosition({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y))
    });
  };

  useEffect(() => {
    const variantSizes = selectedVariantData?.sizes || product.sizes || [];

    if (variantSizes.length && !variantSizes.some((size) => size.name === selectedSize)) {
      setSelectedSize(variantSizes[0].name);
    }
  }, [product.sizes, selectedSize, selectedVariantData]);

  const handleAdd = () => {
    addToCart({
      id: selectedArticle,
      name: selectedTitle,
      image: getImageSrc(mainImage),
      price: selectedPrice,
      quantity,
      variant: [selectedVariant, selectedSize].filter(Boolean).join(' / ')
    });
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 3000);
  };

  return (
    <>
      <PageBanner title={selectedTitle} parent="Our Products" parentLink="/catalog" />
      <div className="container section" style={{ paddingTop: 0 }}>
        <div className="product-detail-layout">
          <div className="product-gallery-container">
            <div
              className={`main-image-container product-zoom-target ${isZoomActive ? 'zoom-active' : ''}`}
              onMouseMove={handleZoomMove}
              onMouseLeave={() => setIsZoomActive(false)}
              onTouchMove={handleZoomTouchMove}
              style={{
                '--zoom-x': `${zoomPosition.x}%`,
                '--zoom-y': `${zoomPosition.y}%`,
                '--zoom-image': `url("${getImageSrc(mainImage)}")`
              }}
            >
              <button
                type="button"
                className="image-zoom-btn"
                onClick={() => setIsZoomActive((active) => !active)}
                aria-label={isZoomActive ? 'Turn off image zoom' : 'Zoom product image'}
              >
                <svg className="zoom-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <circle cx="10.5" cy="10.5" r="6.5"></circle>
                  <path d="M15.5 15.5L21 21"></path>
                  <path d="M10.5 7.5V13.5"></path>
                  <path d="M7.5 10.5H13.5"></path>
                </svg>
              </button>
              <ProductImage
                image={mainImage}
                alt={getImageAlt(mainImage, selectedTitle)}
                className="main-product-image"
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
              <button
                type="button"
                className="image-click-target"
                onClick={() => setIsZoomActive((active) => !active)}
                aria-label={isZoomActive ? 'Turn off image zoom' : 'Zoom product image'}
              ></button>
            </div>
            <div className="thumbnail-grid">
              {images.map((img, i) => (
                <div
                  key={getImageSrc(img) || i}
                  className={`thumbnail ${getImageSrc(mainImage) === getImageSrc(img) ? 'active' : ''}`}
                  onClick={() => setMainImage(img)}
                >
                  <ProductImage image={img} alt={getImageAlt(img, `${selectedTitle} view ${i + 1}`)} sizes="120px" />
                </div>
              ))}
            </div>
          </div>

          <div className="product-details">
            <div className="product-header">
              <div className="product-code" style={{ fontSize: '1.1rem' }}>Article {selectedArticle}</div>
              <h1 style={{ color: 'var(--color-charcoal)', marginBottom: '1rem' }}>{selectedTitle}</h1>
            </div>

            {selectedPrice && <div className="price-display">{formatPrice(selectedPrice)}</div>}

            <p className="product-description">{product.description}</p>

            {!!product.variants?.length && (
              <div className="variant-selector">
                <h4>Select Variant</h4>
                <div className="variant-options">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.name}
                      className={`variant-btn ${selectedVariant === variant.name ? 'active' : ''}`}
                      onClick={() => setSelectedVariant(variant.name)}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!!availableSizes.length && (
              <div className="variant-selector">
                <h4>Select Size</h4>
                <div className="variant-options">
                  {availableSizes.map((size) => (
                    <button
                      key={size.name}
                      className={`variant-btn ${selectedSize === size.name ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size.name)}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!!product.specs?.length && (
              <table className="technical-specs">
                <tbody>
                  {product.specs.map((spec) => (
                    <tr key={spec.label}>
                      <th>{spec.label}</th>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="add-to-inquiry">
              <div className="qty-selector">
                <button className="qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <input
                  type="number"
                  className="qty-input"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                />
                <button className="qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
              <button className="btn btn-primary" onClick={handleAdd} style={{ flex: 1 }}>Add to Inquiry List</button>
            </div>

            {showMsg && <div style={{ color: 'var(--color-primary-teal)', fontSize: '0.9rem', marginTop: '1rem', fontWeight: 600 }}>Item added to your inquiry list.</div>}
          </div>
        </div>

        <div className="section-header" style={{ margin: '2rem' }}>
          <h2>Related Instruments</h2>
        </div>
        <div className="product-grid">
          {products.filter((item) => item.id !== product.id).slice(0, 2).map((item) => (
            <div className="product-card" key={item.id}>
              <Link href={getProductPath(item)} className="product-image">
                <ProductImage image={item.images?.[0]} altFallback={item.title} />
              </Link>
              <div className="product-info">
                <div className="product-code">Article {item.article}</div>
                <h3 className="product-title">{item.title}</h3>
                <Link href={getProductPath(item)} className="btn btn-outline product-action" style={{ width: '100%' }}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default Product;
