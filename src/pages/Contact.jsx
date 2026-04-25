import React from 'react';
import PageBanner from '../components/PageBanner';

const Contact = () => {
  return (
    <>
      <PageBanner title="Contact Us" />
      <div className="container section" style={{ paddingTop: 0 }}>
        <div className="contact-layout">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>Our dedicated B2B sales team is ready to assist you with catalog requests, custom orders, and global distribution inquiries.</p>
            <ul className="contact-details">
              <li><strong>Email:</strong> sales@coinsurgical.com</li>
              <li><strong>Phone:</strong> +1 (800) 555-0198</li>
              <li><strong>Headquarters:</strong><br/>123 Medical Parkway, Suite 400<br/>New York, NY 10001, USA</li>
            </ul>
          </div>

          <div className="contact-form-section">
            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-primary-teal)' }}>Send a Message</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully.'); e.target.reset(); }}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Company / Hospital</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea className="form-control" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
