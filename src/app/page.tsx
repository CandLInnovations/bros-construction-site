import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="container section">
        <button className="navbar-toggle" aria-label="Toggle navigation" aria-expanded="false">
          <span className="navbar-toggle-icon">☰</span>
        </button>
        <h1>Welcome to Bro's Construction</h1>
        <p style={{ marginTop: '1rem' }}>
          We provide top-quality roofing and siding services for residential and commercial projects.
        </p>
        <button className="btn-primary" style={{ marginTop: '1.5rem' }}>
          Get a Quote
        </button>
      </main>
      <Footer />
    </div>
  );
}