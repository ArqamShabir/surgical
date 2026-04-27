import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import FormModal from '../components/FormModal';
import { CartContext } from '../context/CartContext';

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'arqamking128@gmail.com';
const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT || '/contact.php';

const Quote = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [modal, setModal] = React.useState({ open: false, type: 'success', title: '', message: '', redirectOnClose: false });
  const navigate = useNavigate();

  const closeModal = () => {
    const shouldRedirect = modal.redirectOnClose;
    setModal((current) => ({ ...current, open: false, redirectOnClose: false }));
    if (shouldRedirect) {
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setModal({
        open: true,
        type: 'error',
        title: 'Inquiry List Empty',
        message: 'Please add at least one instrument before submitting a quote request.',
        redirectOnClose: false
      });
      return;
    }

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const company = String(formData.get('company') || '').trim();
    const message = String(formData.get('message') || '').trim();

    setIsSubmitting(true);

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'quote',
          name,
          email,
          company,
          message,
          items: cart.map((item) => ({
            name: item.name,
            article: item.id,
            variant: item.variant || 'Standard',
            quantity: item.quantity
          }))
        })
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Quote request could not be sent.');
      }

      clearCart();
      e.currentTarget.reset();
      setModal({
        open: true,
        type: 'success',
        title: 'Quote Request Sent',
        message: 'Thanks. Your inquiry list has been sent and a representative will contact you within 24 hours.',
        redirectOnClose: true
      });
    } catch (error) {
      setModal({
        open: true,
        type: 'error',
        title: 'Quote Not Sent',
        message: `Your quote request could not be sent from the form. Please email ${contactEmail} directly.`,
        redirectOnClose: false
      });
    } finally {
      setIsSubmitting(false);
    }
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
                <input type="text" name="name" className="form-control" maxLength="80" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" className="form-control" maxLength="120" required />
              </div>
              <div className="form-group">
                <label>Company / Organization</label>
                <input type="text" name="company" className="form-control" maxLength="120" required />
              </div>
              <div className="form-group">
                <label>Additional Requirements</label>
                <textarea name="message" className="form-control" rows="4" maxLength="2000"></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isSubmitting || cart.length === 0}>
                {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <FormModal
        open={modal.open}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
      />
    </>
  );
};

export default Quote;
