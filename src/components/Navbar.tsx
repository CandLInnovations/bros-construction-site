"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Only add scroll detection on the client side
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Simple scroll handler
    const handleScroll = () => {
      // Set scrolled state based on scroll position
      setIsScrolled(window.scrollY > 50);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
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
              <Link href="/gallery" className={styles.navbarLink}>Gallery</Link>
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
  );
}