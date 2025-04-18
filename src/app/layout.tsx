"use client";

import './globals.css';
import { useEffect } from 'react';
import ScrollNavbarWrapper from '../components/ScrollNavbarWrapper';
import Footer from '../components/Footer';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Add global scroll handler directly in layout
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Get header element
      const header = document.querySelector('header');
      
      if (!header) return;
      
      // Log scroll position
      console.log(`Layout scroll handler: ${scrollY}px`);
      
      // Add or remove scrolled class based on scroll position
      if (scrollY > 10) {
        header.classList.add('scrolled'); // Add plain class for CSS modules
        console.log('Adding scrolled class from layout');
      } else {
        header.classList.remove('scrolled');
        console.log('Removing scrolled class from layout');
      }
    };
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Run once on mount
    setTimeout(handleScroll, 100);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <ScrollNavbarWrapper />
        {children}
        <Footer />
      </body>
    </html>
  );
}