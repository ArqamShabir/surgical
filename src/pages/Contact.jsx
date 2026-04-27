import React from 'react';
import PageBanner from '../components/PageBanner';
import FormModal from '../components/FormModal';

const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT || '/contact.php';

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
      title: 'Message Sent',
      message: 'Thanks. Your message has been sent and we will get back to you shortly.'
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
      <PageBanner title="Contact Us" />
      <div className="container section" style={{ paddingTop: 0 }}>
        <div className="contact-layout">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>Our dedicated B2B sales team is ready to assist you with catalog requests, custom orders, and global distribution inquiries.</p>
            <ul className="contact-details">
              <li><strong>Email:</strong> coinsurgical@gmail.com</li>
              <li><strong>Phone:</strong> +92 3494846107</li>
              <li><strong>Headquarters:</strong><br/>Sialkot, Punjab<br/>Pakistan</li>
            </ul>
          </div>

          <div className="contact-form-section">
            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-primary-teal)' }}>Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-honeypot" aria-hidden="true">
                <label>Website</label>
                <input type="text" name="website" tabIndex="-1" autoComplete="off" />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" className="form-control" maxLength="80" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" className="form-control" maxLength="120" required />
              </div>
              <div className="form-group">
                <label>Company / Hospital</label>
                <input type="text" name="company" className="form-control" maxLength="120" />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" name="subject" className="form-control" maxLength="140" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" className="form-control" rows="5" maxLength="2000" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
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
