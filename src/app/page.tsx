"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import ContentLayout from '../components/ContentLayout';
import YellowAccent from '../components/YellowAccent';
import RoofTypes from '../components/RoofTypes';

export default function Home() {
  // Reference for the video section
  const videoSectionRef = useRef<HTMLDivElement>(null);
  // State to track if video section is visible - initialize to false for SSR consistency
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  // State to track if sound is enabled
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  // Effect for intersection observer to detect when video is visible
  useEffect(() => {
    // Skip running this effect during SSR
    if (typeof window === 'undefined') return;
    
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true);
        } else {
          setIsVideoVisible(false);
        }
      });
    }, options);

    if (videoSectionRef.current) {
      observer.observe(videoSectionRef.current);
    }

    return () => {
      if (videoSectionRef.current) {
        observer.unobserve(videoSectionRef.current);
      }
    };
  }, []);

  // Toggle sound handler
  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
  };

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
          
        <RoofTypes />
        
        {/* New Video Section */}
        <div ref={videoSectionRef} className={styles.videoSection}>
          <h2 className={styles.sectionTitle} style={{ fontSize: 'clamp(1.1rem, 4vw, 1.75rem)' }}>Our Custom Metal Roofing Technology</h2>
          
          <div className={styles.videoContentRow}>
            <div className={styles.videoContainer}>
              {/* Video with lazy loading and controls */}
              <div className={styles.videoWrapper}>
                <video
                  className={styles.contentVideo}
                  // Use ref to control play/pause instead of conditional rendering
                  ref={(el) => {
                    if (el && isVideoVisible && typeof window !== 'undefined') {
                      el.play().catch(error => {
                        console.error("Auto-play failed:", error);
                      });
                    }
                  }}
                  muted={!isSoundEnabled}
                  controls
                  loop
                  playsInline
                  preload="none" // Change to "none" to prevent loading until needed
                  poster="/multipro-roof-wall-panel-machine-still.webp"
                >
                  <source src="/multipro-roof-wall-panel-machine.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Sound toggle button */}
                <button 
                  className={`${styles.soundToggle} ${isSoundEnabled ? styles.soundOn : styles.soundOff}`}
                  onClick={toggleSound}
                  aria-label={isSoundEnabled ? "Mute sound" : "Enable sound"}
                >
                  {isSoundEnabled ? "🔊" : "🔇"}
                </button>
              </div>
            </div>
            
            <div className={styles.videoText}>
              <h2 style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}>SSQ II MultiPro Roof and Wall Panel Machine</h2>
              <p>
                Our state-of-the-art SSQ II MultiPro Panel Machine represents the pinnacle of metal roofing technology. This advanced equipment allows us to create custom metal panels on-site, ensuring precise measurements and seamless installation for your project.
              </p>
              <p>
                The MultiPro system produces architectural standing seam panels with exceptional durability and weather resistance. These panels feature a concealed fastener system that eliminates penetrations through the metal, providing superior protection against leaks and weather damage in Utah's challenging climate.
              </p>
              <p>
                By manufacturing panels right at your location, we minimize transportation damage, reduce waste, and create panels of exact length needed for your specific roof design. This precision ensures a perfect fit every time, enhancing both aesthetics and functionality.
              </p>
              <ul className={styles.machineFeatures}>
                <li>On-site custom panel fabrication</li>
                <li>Seamless panels up to 40 feet in length</li>
                <li>Multiple profile options for architectural versatility</li>
                <li>Weather-tight seam technology</li>
                <li>Superior wind and impact resistance</li>
              </ul>
            </div>
          </div>
        </div>
        
      </ContentLayout>
    </div>
  );
}