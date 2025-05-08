"use client";

import React from 'react';

interface YellowAccentProps {
  position?: 'left' | 'right';
}

export default function YellowAccent({ position = 'left' }: YellowAccentProps) {
  // Base styles for all screen sizes
  const baseStyles = {
    position: 'absolute' as const,
    top: '1rem',
    width: '100%',
    paddingBottom: '58.74%',
    height: '0',
    backgroundColor: '#f5a623',
    borderRadius: '0.5rem',
    zIndex: 1,
    transform: 'translateY(1rem)',
    boxShadow: '0 4px 12px rgba(245, 166, 35, 0.4)',
  };

  // Determine position based on screen size using media query and data attribute
  return (
    <div 
      style={{
        ...baseStyles,
        [position === 'left' ? 'left' : 'right']: '-30px',
      }}
      data-position={position}
      className="yellow-accent"
    />
  );
}