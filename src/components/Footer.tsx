import React from 'react';

const Footer: React.FC = () => {
  const startYear = 2025;
  const currentYear = new Date().getFullYear();
  const yearDisplay = startYear === currentYear ? startYear : `${startYear}-${currentYear}`;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-service-area">
            <p className="footer-service-heading">SERVING THE WASATCH FRONT</p>
            <p className="footer-service-counties">Salt Lake • Utah • Davis • Weber • Summit Counties</p>
            <p className="footer-service-license">Licensed & Insured in Utah</p>
          </div>
        </div>
        <a href="/quote" className="footer-cta">Get a Quote</a>
      </div>
      <div className="footer-bottom">
        <p className="footer-bottom-text">
          © {yearDisplay} Bro's Construction • Website by{' '}
          <a
            href="https://www.candl-innovations.net"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-credit-link"
          >
            C&L Innovations
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;