import React from 'react';
import styles from './page.module.css'; // Import CSS module for styling

export default function Home() {
  return (
    <>
      <div className={styles.hero}>
        <video
          className={styles.heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/Bros-roofing-hero-poster.jpg"
        >
          <source src="/Bros-construction-hero-video.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
        <div className={styles.heroOverlay}>
          <div className={styles.textContainer}>
            <h1 className={styles.heroTitle}>
              <span className={styles.shineText}>Welcome to Bro’s Construction</span>
              <span className={styles.shineText}>Best Quality Roofing & Siding</span>
              <span className={styles.shineText}>Salt Lake City & Utah County</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container section">
        <button className="btn-primary" style={{ marginTop: '1.5rem' }}>
          Get a Quote
        </button>
      </main>
    </>
  );
}