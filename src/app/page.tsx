import React from 'react';
import Image from 'next/image';
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

      <div className={styles.overflowWrapper}>
        <div className="container">
          <div className={styles.gradientBackground}></div>
          <main className="container section">
            <h2 className={styles.sectionTitle}>Expert Roofing & Siding Contractors in Salt Lake City and Utah County</h2>
            <div className={styles.contentText}>
              <p>Looking for durable, high-quality roofing or siding in Utah? At Bro’s Construction, we specialize in metal and steel roofing, delivering top-tier repair, replacement, maintenance and inspection services for both residential and commercial properties. Based in the heart of Salt Lake City, we proudly serve homeowners and businesses throughout Utah County and beyond.</p>
              <h3>Why Choose Us?</h3>
              <ul>
                <li>Bro’s Construction has more than 20 years of experience, roofing homes and cabins throughout Utah</li>
                <li>Bro’s are specialists in Metal & Steel Roofing: Built to withstand Utah’s tough weather, from snowy winters to scorching summers, and the freezing and thawing in between. Bro’s has done it’s share of storm damage repair in the Valley.</li>
                <li>Local Expertise: Bro’s knows SLC and Utah County like the back of our hands—your project is in trusted, local hands. Heated roofing and snow retention roofs are a common task we perform throughout Salt Lake and Utah counties.</li>
                <li>Roofing Materials Expertise: 24 years of commercial and residential roofing, siding, and gutters. Bro’s Construction has installed and repaired it all; from flat roofing, TPO (Thermoplastic Polyolefin), EPDM (Ethylene Propylene Diene Monomer), and PVC, to metal roofing and traditional shingles or shake.</li>
                <li>Full-Service Care: From free estimates to seamless repairs and full replacements, we’ve got you covered.</li>
              </ul>
            </div>
            <section className={styles.contentSection}>
              <div className={styles.contentRow}>
                <div className={styles.imageContainer}>
                  <div className={styles.yellowAccent}></div>
                  <div className={styles.imageWrapper}>
                    <Image
                      src="/roofing-exterior-home.webp"
                      alt="Roofing Project"
                      width={618}
                      height={363}
                      className={styles.contentImage}
                    />
                  </div>
                </div>
                <div className={styles.contentText}>
                  <h2>Expert Roofing Services</h2>
                  <p>
                    At Bro’s Construction, we specialize in high-quality roofing solutions tailored to your needs. Whether it’s a repair or a full replacement, our team delivers durability and craftsmanship.
                  </p>
                </div>
              </div>

              <div className={styles.contentRow}>
                <div className={styles.imageContainer}>
                  <div className={styles.yellowAccent}></div>
                  <div className={styles.imageWrapper}>
                    <Image
                      src="/roofing-exterior-home.webp"
                      alt="Siding Project"
                      width={618}
                      height={363}
                      className={styles.contentImage}
                    />
                  </div>
                </div>
                <div className={styles.contentText}>
                  <h2>Top-Notch Siding Installation</h2>
                  <p>
                    Enhance your home’s curb appeal and protection with our premium siding services. We offer a variety of materials and styles to match your vision and budget.
                  </p>
                </div>
              </div>

              <div className={styles.contentRow}>
                <div className={styles.imageContainer}>
                  <div className={styles.yellowAccent}></div>
                  <div className={styles.imageWrapper}>
                    <Image
                      src="/roofing-exterior-home.webp"
                      alt="Trusted Local Experts"
                      width={618}
                      height={363}
                      className={styles.contentImage}
                    />
                  </div>
                </div>
                <div className={styles.contentText}>
                  <h2>Trusted Local Experts</h2>
                  <p>
                    Serving Salt Lake City and Utah County, we’re your local go-to for reliable construction services. Our reputation is built on trust, quality, and customer satisfaction.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}