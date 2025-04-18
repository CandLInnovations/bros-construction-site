"use client";

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
            <h2 className={styles.sectionTitle}>Premium Roofing & Custom Metal Siding</h2>
            <div className={styles.contentText}>
              <p>Elevate your home’s curb-appeal, whether you’re looking for a new roof, re-roof, or repair, we can help you achieve the beautiful custom exterior you crave. Bro’s specializes in high-quality roofing and custom metal siding for both residential and commercial properties. Based in the heart of Salt Lake City, we proudly serve homeowners and businesses throughout the Wasatch Front and beyond.</p>
            </div>
            <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
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
                  <h2>Roofing Materials Expertise</h2>
                  <p>
                    24 years of commercial and residential roofing, siding, and gutters. Bro’s Construction has installed and repaired it all; from flat roofing, TPO (Thermoplastic Polyolefin), EPDM (Ethylene Propylene Diene Monomer), and PVC, to metal roofing and traditional shingles or shake.
                  </p>
                </div>
              </div>

              <div className={styles.contentRow}>
                <div className={styles.imageContainer}>
                  <div className={styles.yellowAccent}></div>
                  <div className={styles.imageWrapper}>
                    <Image
                      src="/Bros-home-kamas-metal-roof.webp"
                      alt="Roofing Project, Park City Utah"
                      width={618}
                      height={363}
                      className={styles.contentImage}
                    />
                  </div>
                </div>
                <div className={styles.contentText}>
                  <h2>Local Proficiency</h2>
                  <p>
                    Bro’s knows Utah! Rest assured that your project is in qualified, local hands. Heated roofing and snow retention roofs are a common task we perform throughout Salt Lake and Utah counties.
                  </p>
                </div>
              </div>
              <div className={styles.contentRow}>
                <div className={styles.imageContainer}>
                  <div className={styles.yellowAccent}></div>
                  <div className={styles.imageWrapper}>
                    <Image
                      src="/cabin-kamas-utah-metal-roof.webp"
                      alt="Trusted Local Experts"
                      width={618}
                      height={360}
                      className={styles.contentImage}
                    />
                  </div>
                </div>
                <div className={styles.contentText}>
                  <h2>Expert Roofing Services</h2>
                  <p>Built to withstand Utah’s tough weather, from snowy winters to scorching summers, and the freezing and thawing in between.</p>
                </div>
              </div>
            </section>
            <h2 className={styles.sectionTitle}>Protecting Your Property, One Roof at a Time</h2>
            <div className={styles.contentText}>
              <p>Whether it’s a leaky roof, storm damage, or a siding upgrade, our skilled team brings precision and reliability to every job. We’re committed to quality craftsmanship, using premium steel, metal, wood, synthetic shake or shingles that stand the test of time in Utah’s unique climate.</p>
              <h2 className={styles.sectionTitle}>Space for scroll</h2>
              <p>Looking for durable, high-quality roofing or siding in Utah? At Bro’s Construction, we specialize in metal and steel roofing, delivering top-tier repair, replacement, maintenance and inspection services for both residential and commercial properties. Based in the heart of Salt Lake City, we proudly serve homeowners and businesses throughout Utah County and beyond.</p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}