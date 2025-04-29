"use client";

import React from 'react';

interface YellowAccentProps {
  position?: 'left' | 'right';
}

export default function YellowAccent({ position = 'left' }: YellowAccentProps) {
  return (
    <div style={{
      position: 'absolute',
      top: '1rem',
      [position === 'left' ? 'left' : 'right']: '-30px',
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