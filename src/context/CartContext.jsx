'use client';

import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('surgical_cart');
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('surgical_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.variant === product.variant);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.variant === product.variant 
            ? { ...item, quantity: item.quantity + product.quantity } 
            : item
        );
      }
      return [...prev, product];
    });
    setIsDrawerOpen(true);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isDrawerOpen, setIsDrawerOpen }}>
      {children}
    </CartContext.Provider>
  );
};
