import React from 'react';
import styles from './page.module.css'; // Import CSS module for styling

export default function Home() {
  return (
    <div>
      {/* Hero Section with Video Background */}
      <section className={styles.hero}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/Bros-roofing-hero-poster.jpg"
          className={styles.heroVideo}
        >
          <source src="/Bros-construction-hero-video.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
        <div className={styles.heroOverlay}>
          <h1>Welcome to Bro's Construction</h1>
          <p>
            We provide top-quality roofing and siding services for residential and commercial projects.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container section">
        <button className="btn-primary" style={{ marginTop: '1.5rem' }}>
          Get a Quote
        </button>
      </main>
    </div>
  );
}