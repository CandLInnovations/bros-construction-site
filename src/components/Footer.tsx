import React from 'react';

const Footer: React.FC = () => {
  const startYear = 2025;
  const currentYear = new Date().getFullYear();
  const yearDisplay = startYear === currentYear ? startYear : `${startYear}-${currentYear}`;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <p className="footer-copyright">
            © {yearDisplay} Bro's Construction
          </p>
          <p className="footer-credit">
            Website by{' '}
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
        <a href="#" className="footer-cta">Get a Quote</a>
      </div>
    </footer>
  );
};

export default Footer;