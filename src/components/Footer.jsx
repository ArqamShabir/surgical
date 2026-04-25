import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/catalog">Our Products</Link></li>
              <li><Link to="/quote">Trade Show</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Get In Touch</h4>
            <ul className="footer-links">
              <li>Phone: +1 800 555 0198</li>
              <li>Fax: +1 800 555 0199</li>
              <li>Email: sales@coinsurgical.com</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="footer-social">
              <a href="#">FB</a>
              <a href="#">IG</a>
              <a href="#">IN</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Address</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8 }}>
              123 Medical Parkway<br/>
              Suite 400<br/>
              New York, NY 10001<br/>
              United States
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 CoinSurgical. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ fontWeight: 600 }}>ISO 9001:2015</span>
            <span style={{ fontWeight: 600 }}>CE Mark</span>
            <span style={{ fontWeight: 600 }}>FDA Approved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
