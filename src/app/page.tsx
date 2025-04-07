import React from 'react';

export default function Home() {
  return (
    <div>
      <main className="container section">
        <h1>Welcome to Bro's Construction</h1>
        <p style={{ marginTop: '1rem' }}>
          We provide top-quality roofing and siding services for residential and commercial projects.
        </p>
        <button className="btn-primary" style={{ marginTop: '1.5rem' }}>
          Get a Quote
        </button>
      </main>
    </div>
  );
}