import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { CartContext } from '../context/CartContext';

const Quote = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry. A representative will contact you within 24 hours.');
    clearCart();
    navigate('/');
  };

  return (
    <>
      <PageBanner title="Inquiry List" />
      <div className="container section" style={{ paddingTop: 0 }}>
        <div className="section-header" style={{ textAlign: 'left' }}>
          <h2 style={{ color: 'var(--color-primary-teal)' }}>Request a Quote</h2>
          <p style={{ color: 'var(--color-gray-dark)' }}>Review your selected instruments and submit your details for a custom B2B quote.</p>
        </div>

        <div className="quote-layout">
          <div className="cart-section">
            <h3 style={{ marginBottom: '1rem', color: 'var(--color-charcoal)' }}>Selected Instruments</h3>
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <p style={{ marginBottom: '1rem' }}>Your inquiry list is empty.</p>
                  <button onClick={() => navigate('/catalog')} className="btn btn-outline">Browse Catalog</button>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <div className="item-title">{item.name}</div>
                      <div className="item-sku">Article {item.id} | {item.variant || 'Standard'}</div>
                      <div className="item-actions">
                        <span>Quantity: <strong>{item.quantity}</strong></span>
                        <button className="remove-btn" onClick={() => removeFromCart(index)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="inquiry-form-card">
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-charcoal)' }}>Customer Details</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Company / Organization</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Additional Requirements</label>
                <textarea className="form-control" rows="4"></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Submit Quote Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quote;
