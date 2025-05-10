"use client";

import React, { useEffect, useState } from 'react';

interface YellowAccentProps {
  position?: 'left' | 'right';
}

export default function YellowAccent({ position = 'left' }: YellowAccentProps) {
  // State to track if we're on desktop
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Check screen size on mount and window resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: '1rem',
      // On desktop, always position on left side regardless of passed position
      // On mobile, use the passed position
      [isDesktop ? 'left' : position === 'left' ? 'left' : 'right']: '-30px',
      width: '100%',
      paddingBottom: '58.74%',
      height: '0',
      backgroundColor: '#f5a623',
      borderRadius: '0.5rem',
      zIndex: 1,
      transform: 'translateY(1rem)',
      boxShadow: '0 4px 12px rgba(245, 166, 35, 0.4)',
    }}></div>
  );
}