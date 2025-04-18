"use client";

import React from 'react';
import styles from './test-scroll.module.css';

export default function TestScrollPage() {
  return (
    <div className={styles.testContainer}>
      <div className={styles.spacer}>Scroll down to test header behavior</div>
      
      {/* Create many sections to ensure plenty of scrolling space */}
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className={styles.section}>
          <h2>Section {index + 1}</h2>
          <p>This is a test section to provide scrolling content.</p>
          <p>Scroll down to see if the header behaves correctly.</p>
          <p>The header should shrink when scrolling down.</p>
          <p>It should return to normal size when scrolling back to the top.</p>
        </div>
      ))}
      
      <div className={styles.footer}>
        <p>This is a test footer to simulate your page's footer</p>
        <p>The header should return to normal when near this footer</p>
      </div>
    </div>
  );
}