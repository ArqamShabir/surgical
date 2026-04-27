import React from 'react';
import PageBanner from '../components/PageBanner';

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'accel8295@gmail.com';
const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT || '/contact.php';

const Contact = () => {
  const [status, setStatus] = React.useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const honeypot = formData.get('website');

    if (honeypot) return;

    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const company = String(formData.get('company') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          subject,
          message,
          hp: honeypot
        })
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Message could not be sent.');
      }

      setStatus({ type: 'success', message: 'Message sent successfully.' });
      e.currentTarget.reset();
    } catch (error) {
      setStatus({
        type: 'error',
        message: `Message could not be sent from the form. Please email ${contactEmail} directly.`
      });
    } finally {
      setIsSubmitting(false);
    }
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
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {status.message && <div className={`form-status ${status.type}`}>{status.message}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
