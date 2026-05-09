'use client';

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import PageBanner from '../components/PageBanner';
import FormModal from '../components/FormModal';
import { CartContext } from '../context/CartContext';
import ProductImage from '../components/ProductImage';

const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || '/contact.php';
const formatPrice = (price) => `$${Number(price || 0).toFixed(2)}`;
const getLineTotal = (item) => Number(item.price || 0) * Number(item.quantity || 0);

const Quote = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [modal, setModal] = React.useState({ open: false, type: 'success', title: '', message: '', redirectOnClose: false });
  const router = useRouter();
  const cartTotal = cart.reduce((total, item) => total + getLineTotal(item), 0);

  const closeModal = () => {
    const shouldRedirect = modal.redirectOnClose;
    setModal((current) => ({ ...current, open: false, redirectOnClose: false }));
    if (shouldRedirect) {
      router.push('/');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setModal({
        open: true,
        type: 'error',
        title: 'Lista de Consulta Vacía',
        message: 'Agregue al menos un instrumento antes de enviar una solicitud de cotización.',
        redirectOnClose: false
      });
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const company = String(formData.get('company') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const items = cart.map((item) => ({
      name: item.name,
      article: item.id,
      variant: item.variant || 'Estándar',
      quantity: item.quantity,
      unitPrice: item.price || 0,
      lineTotal: getLineTotal(item)
    }));

    clearCart();
    form.reset();
    setModal({
      open: true,
      type: 'success',
      title: 'Solicitud de Cotización Enviada',
      message: 'Gracias. Su lista de consulta ha sido enviada y un representante se comunicará con usted dentro de 24 horas.',
      redirectOnClose: true
    });

    void fetch(contactEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'quote',
        name,
        email,
        company,
        message,
        items
      })
    }).catch(() => {
      // The server can send the email while Hostinger returns an unreliable response.
    });
  };

  return (
    <>
      <PageBanner title="Lista de Consulta" />
      <div className="container section" style={{ paddingTop: 0 }}>
        <div className="section-header" style={{ textAlign: 'left' }}>
          <h2 style={{ color: 'var(--color-primary-teal)' }}>Solicitar Cotización</h2>
          <p style={{ color: 'var(--color-gray-dark)' }}>Revise los instrumentos seleccionados y envíe sus datos para una cotización B2B personalizada.</p>
        </div>

        <div className="quote-layout">
          <div className="cart-section">
            <h3 style={{ marginBottom: '1rem', color: 'var(--color-charcoal)' }}>Instrumentos Seleccionados</h3>
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <p style={{ marginBottom: '1rem' }}>Su lista de consulta está vacía.</p>
                  <button onClick={() => router.push('/catalog')} className="btn btn-outline">Ver Catálogo</button>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <ProductImage image={item.image} alt={item.name} className="cart-item-image" sizes="100px" />
                    <div className="item-details">
                      <div className="item-title">{item.name}</div>
                      <div className="item-sku">Artículo {item.id} | {item.variant || 'Estándar'}</div>
                      <div className="item-price-row">
                        <span>{formatPrice(item.price)} c/u</span>
                        <strong>{formatPrice(getLineTotal(item))}</strong>
                      </div>
                      <div className="item-actions">
                        <span>Cantidad: <strong>{item.quantity}</strong></span>
                        <button className="remove-btn" onClick={() => removeFromCart(index)}>Eliminar</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
              {cart.length > 0 && (
                <div className="cart-total-row">
                  <span>Total</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>
              )}
            </div>
          </div>

          <div className="inquiry-form-card">
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-charcoal)' }}>Datos del Cliente</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre Completo</label>
                <input type="text" name="name" className="form-control" maxLength="80" required />
              </div>
              <div className="form-group">
                <label>Correo Electrónico</label>
                <input type="email" name="email" className="form-control" maxLength="120" required />
              </div>
              <div className="form-group">
                <label>Empresa / Organización</label>
                <input type="text" name="company" className="form-control" maxLength="120" required />
              </div>
              <div className="form-group">
                <label>Requisitos Adicionales</label>
                <textarea name="message" className="form-control" rows="4" maxLength="2000"></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={cart.length === 0}>
                Enviar Solicitud de Cotización
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
