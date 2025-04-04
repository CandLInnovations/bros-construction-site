"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  console.log("Navbar component is rendering"); // Debug

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link href="/" className="navbar-logo">
        <Image
            src="/bros-logo-orig-small-final.webp"
            alt="Bro's Construction Roofing and Siding"
            width={155}
            height={123} 
            priority
          />
        </Link>
        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="navbar-toggle-icon">{isOpen ? '✕' : '☰'}</span>
        </button>
        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link href="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link href="/about" className="navbar-link">
              About
            </Link>
          </li>
          <li className="navbar-item">
            <Link href="/services" className="navbar-link">
              Services
            </Link>
          </li>
          <li className="navbar-item">
            <Link href="/portfolio" className="navbar-link">
              Portfolio
            </Link>
          </li>
          <li className="navbar-item">
            <Link href="/contact" className="navbar-link">
              Contact
            </Link>
          </li>
          <li className="navbar-item">
            <Link href="/contact" className="navbar-cta">
              Get a Quote
            </Link>
            </li>
        </ul>
      </div>
    </nav>
  );
}