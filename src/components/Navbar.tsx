"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const phoneAreaRef = useRef<HTMLDivElement>(null);

  console.log('Navbar component rendered');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      console.log('Window is undefined - running on server');
      return;
    }

    console.log('useEffect is running');
    const handleScroll = () => {
      if (navRef.current && phoneAreaRef.current) {
        const scrollPosition = document.documentElement.scrollTop; // Main document scroll
        console.log('Scroll position (document):', scrollPosition);
        console.log('Condition check (scrollPosition > 0):', scrollPosition > 0);
        if (scrollPosition > 0) {
          navRef.current.classList.add(styles.scrolled);
          phoneAreaRef.current.classList.add(styles.scrolled);
          console.log('Added scrolled class');
        } else {
          navRef.current.classList.remove(styles.scrolled);
          phoneAreaRef.current.classList.remove(styles.scrolled);
          console.log('Removed scrolled class');
        }
      } else {
        console.log('navRef or phoneAreaRef is null');
      }
    };

    // Attach to the document instead of window
    document.addEventListener('scroll', handleScroll, true); // Use capture phase
    return () => {
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.navbarLogo}>
          <Image
            src="/bros-logo-orig-small-white.webp"
            alt="Bro's Construction Roofing and Siding"
            width={155}
            height={123}
            priority
            className={styles.logoImage}
            onError={() => console.log('Image failed to load')}
          />
        </div>
      </Link>
      <div ref={phoneAreaRef} className={styles.phoneArea}>
        <p>
          <a href="tel:+8018670576" className={styles.phoneLink}>(801) 867-0576</a>
        </p>
      </div>
      <nav ref={navRef} className={styles.navbar}>
        <div className={styles.container}>
          <button className={styles.navbarToggle} onClick={toggleMenu}>
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
  );
}