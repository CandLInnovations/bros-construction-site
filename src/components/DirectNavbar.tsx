"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CSSProperties } from 'react';

export default function DirectNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1024); // Default to desktop

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Get initial window width
    setWindowWidth(window.innerWidth);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Simple check if scrolled past threshold
      setIsScrolled(currentScrollY > 10);
      
      // Debug output
      console.log(`DirectNavbar: ScrollY = ${currentScrollY}, isScrolled = ${currentScrollY > 10}`);
    };
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Run once on mount
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Define inline styles to ensure they're applied
  const headerStyle: CSSProperties = {
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    transition: 'all 0.3s ease',
    ...(isScrolled ? {
      paddingTop: 0,
      background: '#1e2761',
      height: '60px'
    } : {})
  };

  const phoneAreaStyle: CSSProperties = {
    backgroundColor: '#0e122d',
    textAlign: 'right',
    color: 'white',
    padding: 0,
    fontSize: '0.6rem',
    lineHeight: 2,
    transition: 'opacity 0.3s ease, max-height 0.3s ease',
    position: 'relative',
    zIndex: 1001,
    maxHeight: isScrolled ? '0' : '30px',
    opacity: isScrolled ? 0 : 1,
    overflow: 'hidden',
    pointerEvents: isScrolled ? 'none' as const : 'auto' as const
  };

  const navbarStyle: CSSProperties = {
    background: 'linear-gradient(to bottom, #4f4f4f, #1e2761)',
    color: '#ffffff',
    padding: isScrolled ? '0.5rem 0' : '2.2rem 0',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'padding 0.3s ease'
  };

  const logoStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: isScrolled ? '0' : '2px',
    left: '1.5rem',
    zIndex: 1004,
    transition: 'transform 0.3s ease',
    transform: isScrolled ? 'scale(0.7)' : 'scale(1)',
    transformOrigin: 'top left'
  };

  const containerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1.5rem',
    position: 'relative',
    zIndex: 1002
  };

  const buttonStyle: CSSProperties = {
    display: windowWidth <= 768 ? 'block' : 'none',
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '1.5rem',
    cursor: 'pointer'
  };

  const navMenuStyle: CSSProperties = {
    display: windowWidth <= 768 ? (isOpen ? 'flex' : 'none') : 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    alignItems: windowWidth <= 768 ? 'flex-end' : 'center',
    justifyContent: 'flex-end',
    flexDirection: windowWidth <= 768 ? 'column' : 'row',
    position: windowWidth <= 768 ? 'absolute' : 'relative',
    top: windowWidth <= 768 ? '100%' : 'auto',
    right: windowWidth <= 768 ? 0 : 'auto',
    width: windowWidth <= 768 ? '50%' : 'auto',
    maxWidth: windowWidth <= 768 ? '250px' : 'none',
    background: windowWidth <= 768 ? 'linear-gradient(to bottom, #1e2761, #4f4f4f)' : 'none',
    boxShadow: windowWidth <= 768 ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
    zIndex: 1003
  };

  const navItemStyle: CSSProperties = { 
    margin: windowWidth <= 768 ? '0.5rem 0' : '0 0 0 1.5rem' 
  };

  const navLinkStyle: CSSProperties = {
    color: '#ffffff',
    fontSize: '1.125rem',
    lineHeight: 1,
    transition: 'color 0.3s ease, text-shadow 0.3s ease',
    position: 'relative',
    padding: '0.2rem 0',
    textDecoration: 'none'
  };

  const ctaLinkStyle: CSSProperties = {
    backgroundColor: 'transparent',
    color: '#d97706',
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1,
    padding: '0.2rem 0',
    borderRadius: '0.5rem',
    position: 'relative',
    transition: 'color 0.3s ease, transform 0.3s ease',
    display: 'inline-block',
    textDecoration: 'none'
  };

  const mobileNavItemStyle: CSSProperties = { 
    display: windowWidth <= 768 ? 'block' : 'none',
    margin: '0.5rem 0',
    width: 'auto'
  };

  const mobilePhoneLinkStyle: CSSProperties = {
    color: '#f5a623',
    fontSize: '1rem',
    fontWeight: 500,
    textAlign: 'right',
    display: 'flex',
    justifyContent: 'flex-end',
    textDecoration: 'none'
  };

  const debugPanelStyle: CSSProperties = {
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
      <header style={headerStyle}>
        <div style={phoneAreaStyle}>
          <p style={{ margin: 0, padding: '0 1.5rem' }}>
            <a href="tel:+8018670576" 
               style={{ 
                 color: 'white', 
                 textDecoration: 'none',
                 display: 'flex',
                 justifyContent: 'flex-end',
                 alignItems: 'center',
                 gap: '0.5rem',
                 fontWeight: 600
               }}>
              <span style={{ fontSize: '1rem' }}>📞</span>(801) 867-0576
            </a>
          </p>
        </div>
        <nav style={navbarStyle}>
          <div style={containerStyle}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={logoStyle}>
                <Image
                  src="/bros-logo-orig-small-white.webp"
                  alt="Bro's Construction Roofing and Siding"
                  width={155}
                  height={123}
                  priority
                  style={{ width: '155px', height: 'auto', transition: 'opacity 0.2s ease' }}
                />
              </div>
            </Link>
            <button 
              style={buttonStyle} 
              onClick={toggleMenu} 
              aria-label="Toggle navigation menu"
            >
              <span>{isOpen ? '✕' : '☰'}</span>
            </button>
            <ul style={navMenuStyle}>
              <li style={navItemStyle}>
                <Link href="/" style={navLinkStyle}>Home</Link>
              </li>
              <li style={navItemStyle}>
                <Link href="/about" style={navLinkStyle}>About</Link>
              </li>
              <li style={navItemStyle}>
                <Link href="/services" style={navLinkStyle}>Services</Link>
              </li>
              <li style={navItemStyle}>
                <Link href="/portfolio" style={navLinkStyle}>Portfolio</Link>
              </li>
              <li style={navItemStyle}>
                <Link href="/contact" style={navLinkStyle}>Contact</Link>
              </li>
              <li style={navItemStyle}>
                <Link href="/contact" style={ctaLinkStyle}>Get a Quote</Link>
              </li>
              <li style={mobileNavItemStyle}>
                <a href="tel:+8018670576" style={mobilePhoneLinkStyle}>(801) 867-0576</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      
      {/* Debug panel */}
      <div style={debugPanelStyle}>
        <div>Scrolled: {isScrolled ? 'Yes' : 'No'}</div>
        <div>ScrollY: {scrollY}px</div>
        <div>Width: {windowWidth}px</div>
      </div>
    </>
  );
}