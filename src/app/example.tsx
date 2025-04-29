"use client";

import React from 'react';
import Image from 'next/image';
import styles from './page.module.css'; // Your existing page styles
import ContentLayout from '../components/ContentLayout';
import YellowAccent from '../components/YellowAccent';

export default function ServicesPage() {
  return (
    <div className={styles.overflowWrapper}>
      {/* Hero section or other page-specific elements */}
      <section className={styles.hero}>
        {/* Hero content */}
      </section>
      
      {/* Use the ContentLayout for consistent styling */}
      <ContentLayout>
        <h2 className={styles.sectionTitle}>Our Services</h2>
        
        <div className={styles.contentText}>
          <p>We offer a wide range of roofing and construction services...</p>
        </div>
        
        <section className={styles.contentSection}>
          {/* First content row */}
          <div className={styles.contentRow}>
            <div className={styles.imageContainer} style={{ overflow: 'visible' }}>
              {/* Use the reusable YellowAccent component */}
              <YellowAccent position="left" />
              <div className={styles.imageWrapper}>
                <Image
                  src="/service-1.webp"
                  alt="Service 1"
                  width={618}
                  height={363}
                  className={styles.contentImage}
                />
              </div>
            </div>
            <div className={styles.contentText}>
              <h2>Residential Roofing</h2>
              <p>
                Our residential roofing services include...
              </p>
            </div>
          </div>

          {/* Second content row with right-positioned accent */}
          <div className={styles.contentRow}>
            <div className={styles.imageContainer} style={{ overflow: 'visible' }}>
              <YellowAccent position="right" />
              <div className={styles.imageWrapper}>
                <Image
                  src="/service-2.webp"
                  alt="Service 2" 
                  width={618}
                  height={363}
                  className={styles.contentImage}
                />
              </div>
            </div>
            <div className={styles.contentText}>
              <h2>Commercial Roofing</h2>
              <p>
                Our commercial roofing services include...
              </p>
            </div>
          </div>
        </section>
        
        {/* Background image section with margin fixes */}
        <div className={styles.bgImageSection} style={{ 
          margin: '0rem -1rem 2rem -1rem',
          maxWidth: 'calc(100% + 2rem)'
        }}>
          <h2 className={styles.sectionTitle}>Service Guarantee</h2>
          <div className={styles.contentText}>
            <p>We stand behind all our work with a comprehensive warranty...</p>
          </div>
        </div>
      </ContentLayout>
    </div>
  );
}