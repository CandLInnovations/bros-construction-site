"use client";

import React from 'react';
import Image from 'next/image';
import styles from './about.module.css';
import ContentLayout from '../../components/ContentLayout';
import YellowAccent from '../../components/YellowAccent';
import Link from 'next/link';

export default function About() {
  return (
    <div className={styles.overflowWrapper}>
      {/* Hero Section with Video */}
      <section className={styles.aboutHero}>
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/bros-construction-roof-poster.webp"
        >
          <source src="/bros-construction-roof.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.heroOverlay}>
          <div className={styles.textContainer}>
            <h1 className={styles.heroTitle}>
              <span className={styles.shineText}>Our Story</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Four decades of family tradition in roofing excellence
            </p>
          </div>
        </div>
      </section>

      <ContentLayout>
        {/* Company Origin Section */}
        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Founded on Brotherhood & Craftsmanship</h2>
          
          <div className={styles.contentRow}>
            <div className={styles.imageContainer}>
              <YellowAccent position="left" />
              <div className={styles.imageWrapper}>
                <Image
                  src="/Bros-roofing-hero-poster.jpg"
                  alt="Bro's Construction roofing project"
                  width={618}
                  height={363}
                  className={styles.contentImage}
                  priority={false}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHh8P/EABUBAQEAAAAAAAAAAAAAAAAAAAAAAAAB/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8A0XGARp4P8AgA8AHwDz8gA8AH8AgA8AH8A8AH8A8A8A8A8A8A8A8A8A8A8A8A"
                />
              </div>
            </div>
            <div className={styles.contentText}>
              <p>
                Bro's Construction was founded in 2001 by brothers Kent and Mike Mangum, but their story in roofing began much earlier. Working side by side since 1976, these two brothers built their expertise over 25 years before establishing the company that would become synonymous with quality roofing throughout the Wasatch Front.
              </p>
              <p>
                What started as two brothers with a shared passion for craftsmanship has evolved into a trusted family business that continues to uphold the values of integrity, quality, and dedication that Kent and Mike established from day one.
              </p>
            </div>
          </div>
        </section>

        {/* Legacy & Transition Section */}
        <section className={styles.contentSection}>
          <div className={styles.contentRow}>
            <div className={styles.imageContainer}>
              <YellowAccent position="right" />
              <div className={styles.imageWrapper}>
                <Image
                  src="/Bros-home-kamas-metal-roof.webp"
                  alt="Family legacy in roofing"
                  width={618}
                  height={363}
                  className={styles.contentImage}
                  priority={false}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHh8P/EABUBAQEAAAAAAAAAAAAAAAAAAAAAAAAB/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8A0XGARp4P8AgA8AHwDz8gA8AH8AgA8AH8A8AH8A8A8A8A8A8A8A8A8A8A8A8A"
                />
              </div>
            </div>
            <div className={styles.contentText}>
              <h3>Continuing the Legacy</h3>
              <p>
                In 2008, the Mangum family faced an immense loss when Mike passed away after a courageous battle with cancer. His passing left a profound impact on the family and the company, but it also strengthened their resolve to honor his memory through continued excellence in their work.
              </p>
              <p>
                During this challenging time, Jordan Mangum, Kent's son, stepped up to take on greater responsibilities in the company's operations. Having grown up around the business and learned the trade from his father and uncle, Jordan brought fresh energy while maintaining the core values that made Bro's Construction successful.
              </p>
            </div>
          </div>
        </section>

        {/* Current Leadership Section */}
        <section className={styles.leadershipSection}>
          <h2 className={styles.sectionTitle}>Today's Leadership Team</h2>
          
          <div className={`${styles.leadershipGrid} ${styles.twoCards}`}>
            <div className={styles.leaderCard}>
              <div className={styles.leaderImageContainer}>
                <div className={styles.leaderImagePlaceholder}>
                  <span className={styles.leaderInitials}>JM</span>
                </div>
              </div>
              <div className={styles.leaderInfo}>
                <h3>Jordan Mangum</h3>
                <p className={styles.leaderTitle}>President</p>
                <p className={styles.leaderDescription}>
                  Jordan officially became President of Bro's Construction in 2016, bringing innovative approaches while honoring the company's founding principles. His leadership has guided the company through modernization and expansion while maintaining the personal touch that customers have come to expect.
                </p>
              </div>
            </div>

            <div className={styles.leaderCard}>
              <div className={styles.leaderImageContainer}>
                <div className={styles.leaderImagePlaceholder}>
                  <span className={styles.leaderInitials}>SM</span>
                </div>
              </div>
              <div className={styles.leaderInfo}>
                <h3>Savannah Mangum</h3>
                <p className={styles.leaderTitle}>Vice President</p>
                <p className={styles.leaderDescription}>
                  As Vice President, Savannah brings strategic oversight and operational excellence to Bro's Construction. Her leadership ensures that every project meets the high standards of quality and customer service that the Mangum family has built their reputation on.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Expertise Section */}
        <section className={styles.contentSection}>
          <div className={styles.contentRow}>
            <div className={styles.imageContainer}>
              <YellowAccent position="left" />
              <div className={styles.imageWrapper}>
                <Image
                  src="/cabin-kamas-utah-metal-roof.webp"
                  alt="Decades of roofing expertise"
                  width={618}
                  height={360}
                  className={styles.contentImage}
                  priority={false}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHh8P/EABUBAQEAAAAAAAAAAAAAAAAAAAAAAAAB/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8A0XGARp4P8AgA8AHwDz8gA8AH8AgA8AH8A8AH8A8A8A8A8A8A8A8A8A8A8A8A"
                />
              </div>
            </div>
            <div className={styles.contentText}>
              <h3>Four Decades of Excellence</h3>
              <p>
                From our humble beginnings in 1976 to becoming one of Utah's most trusted roofing contractors, we've built our reputation one roof at a time. Our experience spans residential and commercial projects throughout Salt Lake City and the Wasatch Front, with expertise in everything from traditional shingles to cutting-edge metal roofing systems.
              </p>
              <p>
                Today, with our state-of-the-art equipment and time-tested techniques, we continue to set the standard for quality roofing in Utah. Every project we undertake carries forward the legacy of craftsmanship that Kent and Mike established, ensuring that the Bro's name remains synonymous with excellence for generations to come.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className={styles.ctaSection}>
          <h2>Ready to Work with Utah's Roofing Family?</h2>
          <p>
            Experience the difference that four decades of family craftsmanship makes. From initial consultation to project completion, we treat your home like our own.
          </p>
          <Link href="/quote" className={styles.btnPrimary}>
            Get a Free Estimate
          </Link>
        </section>
      </ContentLayout>
    </div>
  );
}