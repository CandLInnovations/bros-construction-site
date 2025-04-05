export default function Home() {
  return (
    <div className="container section">
      <button className="navbar-toggle" aria-label="Toggle navigation" aria-expanded="false">
  <span className="navbar-toggle-icon">☰</span>
</button>
      <h1>Welcome to Bro’s Construction</h1>
      <p style={{ marginTop: '1rem' }}>
        We provide top-quality roofing and siding services for residential and commercial projects.
      </p>
      <button className="btn-primary" style={{ marginTop: '1.5rem' }}>
        Get a Quote
      </button>
    </div>
  );
}
import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© 2025 Bro's Construction</p>
        <a href="#" className="footer-link">Contact</a>
      </div>
    </footer>
  );
}

export { Footer };