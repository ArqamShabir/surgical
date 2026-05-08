'use client';

import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import BrandMarquee from './BrandMarquee';
import { Suspense } from 'react';
import { CartProvider } from '../context/CartContext';

const AppShell = ({ children }) => {
  return (
    <CartProvider>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <CartDrawer />
      <main style={{ minHeight: '60vh' }}>
        {children}
      </main>
      <BrandMarquee />
      <Footer />
    </CartProvider>
  );
};

export default AppShell;
