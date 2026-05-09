'use client';

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartContext } from '../context/CartContext';
import ProductImage from './ProductImage';

const CartDrawer = () => {
  const { cart, removeFromCart, isDrawerOpen, setIsDrawerOpen } = useContext(CartContext);
  const router = useRouter();

  const handleClose = () => setIsDrawerOpen(false);

  useEffect(() => {
    if (!isDrawerOpen) return;

    const scrollY = window.scrollY;
    document.documentElement.classList.add('drawer-open');
    document.body.classList.add('drawer-open');
    document.body.style.top = `-${scrollY}px`;

    return () => {
      document.documentElement.classList.remove('drawer-open');
      document.body.classList.remove('drawer-open');
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    };
  }, [isDrawerOpen]);

  return (
    <>
      <div 
        className={`drawer-overlay ${isDrawerOpen ? 'active' : ''}`} 
        onClick={handleClose}
      ></div>
      <div className={`drawer ${isDrawerOpen ? 'active' : ''}`}>
        <div className="drawer-header">
          <h2>Inquiry List</h2>
          <button className="drawer-close" onClick={handleClose} aria-label="Close inquiry list">&times;</button>
        </div>
        <div className="drawer-content">
          {cart.length === 0 ? (
            <p className="text-center" style={{ padding: '2rem', color: '#888' }}>
              Your inquiry list is empty.
            </p>
          ) : (
            cart.map((item, index) => (
              <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                <ProductImage image={item.image} alt={item.name} className="drawer-item-image" sizes="60px" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#888' }}>{item.variant || 'Standard'}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem' }}>Qty: {item.quantity}</span>
                    <button 
                      onClick={() => removeFromCart(index)}
                      style={{ background: 'none', border: 'none', color: 'var(--color-primary-teal)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="drawer-footer">
          <button 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            onClick={() => {
              handleClose();
              router.push('/quote');
            }}
          >
            Send for Inquiry
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
