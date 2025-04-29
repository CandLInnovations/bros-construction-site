"use client";

import React from 'react';
import styles from './ContentLayout.module.css';

interface ContentLayoutProps {
  children: React.ReactNode;
}

export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div className={styles.backgroundGradient}>
      <div className={styles.contentContainer}>
        {children}
      </div>
    </div>
  );
}