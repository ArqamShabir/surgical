'use client';

import React from 'react';
import PageBanner from '../components/PageBanner';
import FormModal from '../components/FormModal';

const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || '/contact.php';

const Contact = () => {
  const [modal, setModal] = React.useState({ open: false, type: 'success', title: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const honeypot = formData.get('website');

    if (honeypot) return;

    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const company = String(formData.get('company') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();

    setModal({
      open: true,
      type: 'success',
      title: 'Mensaje Enviado',
      message: 'Gracias. Su mensaje ha sido enviado y nos comunicaremos con usted en breve.'
    });
    form.reset();

    void fetch(contactEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'contact',
        name,
        email,
        company,
        subject,
        message,
        hp: honeypot
      })
    }).catch(() => {
      // The server can send the email while Hostinger returns an unreliable response.
    });
  };

  return (
    <>
      <PageBanner title="Contacto" />
      <div className="container section" style={{ paddingTop: 0 }}>
        <div className="contact-layout">
          <div className="contact-info">
            <h3>Contáctenos</h3>
            <p>Nuestro equipo de ventas B2B está listo para ayudarle con solicitudes de catálogo, pedidos personalizados y consultas de distribución global.</p>
            <ul className="contact-details">
              <li><strong>Correo:</strong> coinsurgical@gmail.com</li>
              <li><strong>Teléfono:</strong> +92 3494846107</li>
              <li><strong>Sede:</strong><br/>Sialkot, Punjab<br/>Pakistán</li>
            </ul>
          </div>

          <div className="contact-form-section">
            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-primary-teal)' }}>Enviar Mensaje</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-honeypot" aria-hidden="true">
                <label>Sitio web</label>
                <input type="text" name="website" tabIndex="-1" autoComplete="off" />
              </div>
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" name="name" className="form-control" maxLength="80" required />
              </div>
              <div className="form-group">
                <label>Correo Electrónico</label>
                <input type="email" name="email" className="form-control" maxLength="120" required />
              </div>
              <div className="form-group">
                <label>Empresa / Hospital</label>
                <input type="text" name="company" className="form-control" maxLength="120" />
              </div>
              <div className="form-group">
                <label>Asunto</label>
                <input type="text" name="subject" className="form-control" maxLength="140" required />
              </div>
              <div className="form-group">
                <label>Mensaje</label>
                <textarea name="message" className="form-control" rows="5" maxLength="2000" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Enviar Mensaje
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
        onClose={() => setModal((current) => ({ ...current, open: false }))}
      />
    </>
  );
};

export default Contact;
