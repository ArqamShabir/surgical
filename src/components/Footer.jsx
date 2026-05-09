import Link from 'next/link';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M14 8.5V6.75C14 6.2 14.45 6 14.93 6H17V2.5h-3.02C10.9 2.5 10 4.45 10 6.37V8.5H7.5V12H10v9.5h4V12h2.72l.53-3.5H14Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.25" cy="6.75" r="1" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M6.5 9.5V21h-4V9.5h4ZM4.5 3a2.25 2.25 0 1 1 0 4.5A2.25 2.25 0 0 1 4.5 3ZM21.5 14.35V21h-4v-5.98c0-1.5-.53-2.52-1.88-2.52-1.02 0-1.63.69-1.9 1.35-.1.24-.12.58-.12.9V21h-4s.05-10.15 0-11.5h4v1.63c.53-.82 1.48-1.98 3.62-1.98 2.65 0 4.28 1.72 4.28 5.2Z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Enlaces Rápidos</h4>
            <ul className="footer-links">
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/about">Nosotros</Link></li>
              <li><Link href="/catalog">Productos</Link></li>
              <li><Link href="/quote">Consulta</Link></li>
              <li><Link href="/contact">Contacto</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contáctenos</h4>
            <ul className="footer-links">
              <li>Teléfono: +92 3494846107</li>
              <li style={{display:'none'}}>Fax: +1 800 555 0199</li>
              <li>Correos:</li>
              <li>coinsurgical@gmail.com</li>
              <li>accel8295@gmail.com</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Síganos</h4>
            <div className="footer-social">
              <a href="https://www.facebook.com/coinsurgical" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/coinsurgical.shop/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://www.linkedin.com/company/coinsurgical" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Dirección</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8 }}>
              Sialkot, Punjab<br/>
              Pakistán
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 CoinSurgical. Todos los derechos reservados.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ fontWeight: 600 }}>ISO 9001:2015</span>
            <span style={{ fontWeight: 600 }}>Marcado CE</span>
            <span style={{ fontWeight: 600 }}>Aprobado por FDA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
