"use client";

import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import ContentLayout from '../components/ContentLayout';
import YellowAccent from '../components/YellowAccent';

export default function Home() {
  return (
    <div className={styles.overflowWrapper}>
      {/* Hero section with 80vh height */}
      <section className={styles.hero}>
        {/* Video background */}
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
        
        {/* Hero overlay with text */}
        <div className={styles.heroOverlay}>
          <div className={styles.textContainer}>
            <h1 className={styles.heroTitle}>
              <span className={styles.shineText}>Welcome to Bro's Construction</span>
              <span className={styles.shineText}>Highest Quality Roofing</span>
              <span className={styles.shineText}>Salt Lake City & The Wasatch Front</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Use ContentLayout component instead of div with inline styles */}
      <ContentLayout>
        <h2 className={styles.sectionTitle} style={{ fontSize: 'clamp(1.1rem, 4vw, 1.75rem)' }}>Premium Roofing & Custom Metal Siding</h2>
        
        <div className={styles.contentText}>
          <p>Elevate your home's curb-appeal, whether you're looking for a new roof, re-roof, or repair, we can help you achieve the beautiful custom exterior you crave. Bro's specializes in high-quality roofing and custom metal siding for both residential and commercial properties. Based in the heart of Salt Lake City, we proudly serve homeowners and businesses throughout the Wasatch Front and beyond.</p>
        </div>
            
        <h2 className={styles.sectionTitle} style={{ fontSize: 'clamp(1.1rem, 4vw, 1.75rem)' }}>Why Choose Us?</h2>
        <section className={styles.contentSection}>
          <div className={styles.contentRow}>
            <div className={styles.imageContainer} style={{ overflow: 'visible' }}>
              {/* Use YellowAccent component */}
              <YellowAccent position="left" />
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
              <h2 style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}>Roofing Materials Expertise</h2>
              <p>
                24 years of commercial and residential roofing, siding, and gutters. Bro's Construction has installed and repaired it all; from flat roofing, TPO (Thermoplastic Polyolefin), EPDM (Ethylene Propylene Diene Monomer), and PVC, to metal roofing and traditional shingles or shake.
              </p>
            </div>
          </div>

          <div className={styles.contentRow}>
            <div className={styles.imageContainer} style={{ overflow: 'visible' }}>
              {/* Use YellowAccent component */}
              <YellowAccent position="right" />
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
              <h2 style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}>Local Proficiency</h2>
              <p>
                Bro's knows Utah! Rest assured that your project is in qualified, local hands. Heated roofing and snow retention roofs are a common task we perform throughout Salt Lake and Utah counties.
              </p>
            </div>
          </div>
            
          <div className={styles.contentRow} style={{ marginBottom: '3rem' }}>
            <div className={styles.imageContainer} style={{ overflow: 'visible' }}>
              {/* Use YellowAccent component */}
              <YellowAccent position="left" />
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
              <h2 style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}>Expert Roofing Services</h2>
              <p>Built to withstand Utah's tough weather, from snowy winters to scorching summers, and the freezing and thawing in between.</p>
            </div>
          </div>
        </section>
          
        {/* Section with background image */}
        <div className={styles.bgImageSection} style={{ 
          margin: '0rem -1rem 2rem -1rem',
          maxWidth: 'calc(100% + 2rem)'
        }}>
          <h2 className={styles.sectionTitle} style={{ fontSize: 'clamp(1.1rem, 4vw, 1.75rem)' }}>Protecting Your Property, One Roof at a Time</h2>
          <div className={styles.contentText}>
            <p>Whether it's a leaky roof, storm damage, or a siding upgrade, our skilled team brings precision and reliability to every job. We're committed to quality craftsmanship, using premium steel, metal, wood, synthetic shake or shingles that stand the test of time in Utah's unique climate.</p>
          </div>
        </div>
          
        <h2 className={styles.sectionTitle} style={{ fontSize: 'clamp(1.1rem, 4vw, 1.75rem)' }}>Space for scroll</h2>
        <div className={styles.contentText}>
          <p>Looking for durable, high-quality roofing or siding in Utah? At Bro's Construction, we specialize in metal and steel roofing, delivering top-tier repair, replacement, maintenance and inspection services for both residential and commercial properties. Based in the heart of Salt Lake City, we proudly serve homeowners and businesses throughout Utah County and beyond.</p>
        </div>
      </ContentLayout>
    </div>
  );
}