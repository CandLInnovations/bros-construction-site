"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // New state for footer detection
  const [isNearFooter, setIsNearFooter] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Get the footer element
    const footer = document.querySelector('footer');

    const handleScroll = () => {
      // Basic scroll detection
      const scrollY = window.scrollY;
      const scrollThreshold = 10;
      
      // Check if scrolled past threshold
      const hasScrolled = scrollY > scrollThreshold;
      
      // Check if near footer
      let nearFooter = false;
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // If footer is visible or about to be visible
        nearFooter = footerRect.top < windowHeight + 100;
        
        console.log(`
          Scroll Y: ${scrollY}px
          Footer top: ${footerRect.top}px
          Window height: ${windowHeight}px
          Near footer: ${nearFooter}
        `);
      }

      // Update states
      setIsScrolled(hasScrolled && !nearFooter);
      setIsNearFooter(nearFooter);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Run once on mount
    handleScroll();
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debug styles to visualize state
  const debugStyle = {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '12px',
    zIndex: 9999
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <Link href="/">
          <div className={styles.navbarLogo}>
            <Image
              src="/bros-logo-orig-small-white.webp"
              alt="Bro's Construction Roofing and Siding"
              width={155}
              height={123}
              priority
              className={styles.logoImage}
            />
          </div>
        </Link>
        <div className={styles.phoneArea}>
          <p>
            <a href="tel:+8018670576" className={styles.phoneLink}>(801) 867-0576</a>
          </p>
        </div>
        <nav className={styles.navbar}>
          <div className={styles.container}>
            <button className={styles.navbarToggle} onClick={toggleMenu} aria-label="Toggle navigation menu">
              <span className={styles.navbarToggleIcon}>{isOpen ? '✕' : '☰'}</span>
            </button>
            <ul className={`${styles.navbarMenu} ${isOpen ? styles.active : ''}`}>
              <li className={styles.navbarItem}>
                <Link href="/" className={styles.navbarLink}>Home</Link>
              </li>
              <li className={styles.navbarItem}>
                <Link href="/about" className={styles.navbarLink}>About</Link>
              </li>
              <li className={styles.navbarItem}>
                <Link href="/services" className={styles.navbarLink}>Services</Link>
              </li>
              <li className={styles.navbarItem}>
                <Link href="/portfolio" className={styles.navbarLink}>Portfolio</Link>
              </li>
              <li className={styles.navbarItem}>
                <Link href="/contact" className={styles.navbarLink}>Contact</Link>
              </li>
              <li className={styles.navbarItem}>
                <Link href="/contact" className={styles.navbarCta}>Get a Quote</Link>
              </li>
              <li className={`${styles.navbarItem} ${styles.phoneItem}`}>
                <a href="tel:+8018670576" className={styles.phoneLink}>(801) 867-0576</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      
      {/* Debug panel */}
      <div style={debugStyle}>
        <div>Scrolled: {isScrolled ? 'Yes' : 'No'}</div>
        <div>Near Footer: {isNearFooter ? 'Yes' : 'No'}</div>
      </div>
    </>
  );
}