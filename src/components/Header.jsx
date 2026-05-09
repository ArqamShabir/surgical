'use client';

import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CartContext } from '../context/CartContext';
import products from '../data/products.json';
import { getProductPath } from '../utils/productUrls';
import ProductImage from './ProductImage';

const Header = () => {
  const { cart, setIsDrawerOpen } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const pathname = usePathname();
  const router = useRouter();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path) => pathname === path ? 'active' : '';

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    document.documentElement.classList.toggle('no-scroll', mobileSearchOpen);
    document.body.classList.toggle('no-scroll', mobileSearchOpen);

    return () => {
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
    };
  }, [mobileSearchOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateHeaderVisibility = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const shouldHide = isScrollingDown && currentScrollY > 140 && !mobileMenuOpen && !mobileSearchOpen;

      setHeaderHidden(shouldHide);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', updateHeaderVisibility, { passive: true });

    return () => window.removeEventListener('scroll', updateHeaderVisibility);
  }, [mobileMenuOpen, mobileSearchOpen]);

  const updateSearch = (value) => {
    setSearchTerm(value);
    setDesktopSearchOpen(Boolean(value.trim()));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    router.push(query ? `/catalog?q=${encodeURIComponent(query)}` : '/catalog');
    setMobileMenuOpen(false);
    closeSearchResults();
  };

  const searchQuery = searchTerm.trim().toLowerCase();
  const searchResults = searchQuery
    ? products.filter((product) => {
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

      return searchableFields.some((field) => field.startsWith(searchQuery));
    }).slice(0, 8)
    : [];

  const closeMobileSearch = () => {
    setMobileSearchOpen(false);
  };

  const closeSearchResults = () => {
    setDesktopSearchOpen(false);
    setMobileSearchOpen(false);
  };

  return (
    <header className={`site-header ${headerHidden ? 'site-header-hidden' : ''}`}>
      <div className="shipping-topbar">
        Envío mundial gratis durante los próximos 30 días
      </div>
      <div className="container header-inner">
        <div className="brand-row">
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir o cerrar navegación"
            style={{ marginTop: '5px' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
          <Link href="/" className="logo">
            <Image src="/logo.png" alt="CoinSurgical" className="logo-image" width={180} height={62} priority />
          </Link>
        </div>
        <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <Link href="/" className={isActive('/')} onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
          <Link href="/about" className={isActive('/about')} onClick={() => setMobileMenuOpen(false)}>Nosotros</Link>
          <Link href="/catalog" className={isActive('/catalog')} onClick={() => setMobileMenuOpen(false)}>Productos</Link>
          <Link href="/quote" className={isActive('/quote')} onClick={() => setMobileMenuOpen(false)}>Consulta</Link>
          <Link href="/contact" className={isActive('/contact')} onClick={() => setMobileMenuOpen(false)}>Contacto</Link>
        </nav>
        <div className="header-actions">
          <form className="header-search" onSubmit={handleSearchSubmit}>
            <input
              type="search"
              className="search-box"
              placeholder="Buscar productos"
              value={searchTerm}
              onFocus={() => setDesktopSearchOpen(Boolean(searchTerm.trim()))}
              onChange={(event) => updateSearch(event.target.value)}
            />
            {desktopSearchOpen && (
              <div className="desktop-search-results">
                {searchQuery && searchResults.length === 0 && <div className="desktop-search-empty">No se encontraron productos.</div>}
                {searchResults.map((product) => (
                  <Link key={product.id} href={getProductPath(product)} className="desktop-search-result" onClick={closeSearchResults}>
                    <ProductImage image={product.images?.[0]} altFallback={product.title} className="search-result-image" sizes="54px" />
                    <span>
                      <strong>{product.title}</strong>
                      <small>Artículo {product.article}</small>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </form>
          <button className="mobile-search-btn" type="button" onClick={() => setMobileSearchOpen(true)} aria-label="Abrir búsqueda">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>
          <div className="cart-btn" onClick={() => setIsDrawerOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
            <span className="cart-count">{cartCount}</span>
          </div>
        </div>
      </div>
      <div className={`mobile-search-overlay ${mobileSearchOpen ? 'active' : ''}`} onClick={closeMobileSearch}>
        <form className="mobile-search-panel" onSubmit={handleSearchSubmit} onClick={(event) => event.stopPropagation()}>
          <div className="mobile-search-row">
            <input
              type="search"
              className="mobile-search-input"
              placeholder="Buscar productos"
              value={searchTerm}
              autoFocus={mobileSearchOpen}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button type="button" className="mobile-search-close" onClick={closeMobileSearch} aria-label="Cerrar búsqueda">&times;</button>
          </div>
          <div className="mobile-search-results">
            {searchQuery && searchResults.length === 0 && <div className="mobile-search-empty">No se encontraron productos.</div>}
            {searchResults.map((product) => (
              <Link key={product.id} href={getProductPath(product)} className="mobile-search-result" onClick={closeSearchResults}>
                <ProductImage image={product.images?.[0]} altFallback={product.title} className="search-result-image" sizes="58px" />
                <span>
                  <strong>{product.title}</strong>
                  <small>Artículo {product.article}</small>
                </span>
              </Link>
            ))}
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
