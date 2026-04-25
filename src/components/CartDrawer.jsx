import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartDrawer = () => {
  const { cart, removeFromCart, isDrawerOpen, setIsDrawerOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const handleClose = () => setIsDrawerOpen(false);

  return (
    <>
      <div 
        className={`drawer-overlay ${isDrawerOpen ? 'active' : ''}`} 
        onClick={handleClose}
      ></div>
      <div className={`drawer ${isDrawerOpen ? 'active' : ''}`}>
        <div className="drawer-header">
          <h2>Inquiry List</h2>
          <button className="drawer-close" onClick={handleClose}>&times;</button>
        </div>
        <div className="drawer-content">
          {cart.length === 0 ? (
            <p className="text-center" style={{ padding: '2rem', color: '#888' }}>
              Your inquiry list is empty.
            </p>
          ) : (
            cart.map((item, index) => (
              <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'contain', background: '#f8f9fa' }} />
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
              navigate('/quote');
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
