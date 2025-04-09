import React from 'react';
import Image from 'next/image'; // Import Next.js Image
import styles from './page.module.css';

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

      <main className="container section">
        <h2>Expert Roofing & Siding Contractors in Salt Lake City and Utah County</h2>
        <section className={styles.contentSection}>
          <div className={styles.contentRow}>
            <Image
              src="/roofing-exterior-home.webp"
              alt="Roofing Project"
              width={618} // Adjust to your image dimensions
              height={363}
              className={styles.contentImage}
            />
            <div className={styles.contentText}>
              <h2>Expert Roofing Services</h2>
              <p>
                At Bro’s Construction, we specialize in high-quality roofing solutions tailored to your needs. Whether it’s a repair or a full replacement, our team delivers durability and craftsmanship.
              </p>
            </div>
          </div>

          <div className={styles.contentRow}>
            <Image
              src="/roofing-exterior-home.webp"
              alt="Siding Project"
              width={618}
              height={363}
              className={styles.contentImage}
            />
            <div className={styles.contentText}>
              <h2>Top-Notch Siding Installation</h2>
              <p>
                Enhance your home’s curb appeal and protection with our premium siding services. We offer a variety of materials and styles to match your vision and budget.
              </p>
            </div>
          </div>

          <div className={styles.contentRow}>
            <Image
              src="/roofing-exterior-home.webp"
              alt="Trusted Local Experts"
              width={618}
              height={363}
              className={styles.contentImage}
            />
            <div className={styles.contentText}>
              <h2>Trusted Local Experts</h2>
              <p>
                Serving Salt Lake City and Utah County, we’re your local go-to for reliable construction services. Our reputation is built on trust, quality, and customer satisfaction.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}