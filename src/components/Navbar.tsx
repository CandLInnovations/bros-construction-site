"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.navbarLogo}>
        <Image
          src="/bros-logo-orig-small-final.webp"
          alt="Bro's Construction Roofing and Siding"
          width={155}
          height={123}
          priority
          className={styles.logoImage}
        />
      </Link>
      <div className={styles.phoneArea}>
        <p>
        <a href="tel:+8018670576" className={styles.phoneLink}>(801) 867-0576</a>
        </p>
      </div>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <button className={styles.navbarToggle} onClick={toggleMenu}>
            <span className={styles.navbarToggleIcon}>{isOpen ? '✕' : '☰'}</span>
          </button>
          <ul className={`${styles.navbarMenu} ${isOpen ? styles.active : ''}`}>
            <li className={styles.navbarItem}>
              <Link href="/" className={styles.navbarLink}>
                Home
              </Link>
            </li>
            <li className={styles.navbarItem}>
              <Link href="/about" className={styles.navbarLink}>
                About
              </Link>
            </li>
            <li className={styles.navbarItem}>
              <Link href="/services" className={styles.navbarLink}>
                Services
              </Link>
            </li>
            <li className={styles.navbarItem}>
              <Link href="/portfolio" className={styles.navbarLink}>
                Portfolio
              </Link>
            </li>
            <li className={styles.navbarItem}>
              <Link href="/contact" className={styles.navbarLink}>
                Contact
              </Link>
            </li>
            <li className={styles.navbarItem}>
              <Link href="/contact" className={styles.navbarCta}>
                Get a Quote
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}