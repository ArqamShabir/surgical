'use client';

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartContext } from '../context/CartContext';
import ProductImage from './ProductImage';

const formatPrice = (price) => `$${Number(price || 0).toFixed(2)}`;
const getLineTotal = (item) => Number(item.price || 0) * Number(item.quantity || 0);

const CartDrawer = () => {
  const { cart, removeFromCart, isDrawerOpen, setIsDrawerOpen } = useContext(CartContext);
  const router = useRouter();
  const cartTotal = cart.reduce((total, item) => total + getLineTotal(item), 0);

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
              <div key={index} className="drawer-item">
                <ProductImage image={item.image} alt={item.name} className="drawer-item-image" sizes="60px" />
                <div className="drawer-item-details">
                  <div className="drawer-item-title">{item.name}</div>
                  <div className="drawer-item-meta">{item.variant || 'Standard'}</div>
                  <div className="drawer-item-price-row">
                    <span>{formatPrice(item.price)} each</span>
                    <strong>{formatPrice(getLineTotal(item))}</strong>
                  </div>
                  <div className="drawer-item-actions">
                    <span>Qty: {item.quantity}</span>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="drawer-remove-btn"
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
          <div className="drawer-total">
            <span>Total</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
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
