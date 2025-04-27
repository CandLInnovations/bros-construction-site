"use client";

import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      {/* Hero section with 80vh height */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '80vh',
        overflow: 'hidden'
      }}>
        {/* Video container */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}>
          <video
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
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
        </div>
        
        {/* Overlay with text */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          zIndex: 2
        }}>
          <div className={styles.textContainer}>
            <h1 className={styles.heroTitle}>
              <span className={styles.shineText}>Welcome to Bro's Construction</span>
              <span className={styles.shineText}>Best Quality Roofing</span>
              <span className={styles.shineText}>Salt Lake City & Utah County</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Create a new direct container for main content to avoid existing CSS */}
      <div style={{
        position: 'relative',
        backgroundColor: '#d0d2d5',
        width: '100%',
        margin: '0',
        padding: '0',
        marginTop: '-20px' /* Negative margin to pull content up */
      }}>
        {/* Background gradient */}
        <div className={styles.gradientBackground}></div>
        
        {/* Main content with modified classes to avoid CSS conflicts */}
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0.5rem 1.5rem',
          position: 'relative',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(to bottom right, #9ca4bf, #e6e9f0)'
        }}>
          <h2 className={styles.sectionTitle}>Premium Roofing & Custom Metal Siding</h2>
          <div className={styles.contentText}>
            <p>Elevate your home's curb-appeal, whether you're looking for a new roof, re-roof, or repair, we can help you achieve the beautiful custom exterior you crave. Bro's specializes in high-quality roofing and custom metal siding for both residential and commercial properties. Based in the heart of Salt Lake City, we proudly serve homeowners and businesses throughout the Wasatch Front and beyond.</p>
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
                  24 years of commercial and residential roofing, siding, and gutters. Bro's Construction has installed and repaired it all; from flat roofing, TPO (Thermoplastic Polyolefin), EPDM (Ethylene Propylene Diene Monomer), and PVC, to metal roofing and traditional shingles or shake.
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
                  Bro's knows Utah! Rest assured that your project is in qualified, local hands. Heated roofing and snow retention roofs are a common task we perform throughout Salt Lake and Utah counties.
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
                <p>Built to withstand Utah's tough weather, from snowy winters to scorching summers, and the freezing and thawing in between.</p>
              </div>
            </div>
          </section>
          
          <h2 className={styles.sectionTitle}>Protecting Your Property, One Roof at a Time</h2>
          <div className={styles.contentText}>
            <p>Whether it's a leaky roof, storm damage, or a siding upgrade, our skilled team brings precision and reliability to every job. We're committed to quality craftsmanship, using premium steel, metal, wood, synthetic shake or shingles that stand the test of time in Utah's unique climate.</p>
            <h2 className={styles.sectionTitle}>Space for scroll</h2>
            <p>Looking for durable, high-quality roofing or siding in Utah? At Bro's Construction, we specialize in metal and steel roofing, delivering top-tier repair, replacement, maintenance and inspection services for both residential and commercial properties. Based in the heart of Salt Lake City, we proudly serve homeowners and businesses throughout Utah County and beyond.</p>
          </div>
        </div>
        
        {/* Mobile-specific styles */}
        <style jsx global>{`
          @media (max-width: 768px) {
            .sectionTitle {
              margin-top: 0;
              padding-top: 0;
            }
          }
        `}</style>
      </div>
    </>
  );
}