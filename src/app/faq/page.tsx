"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './FAQ.module.css';
import faqData, { FAQItem } from './faqData';

const initialItems: FAQItem[] = faqData;

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Filter items based on active category
  const filteredItems = activeCategory === "all" 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory);

  // Toggle FAQ item open/closed
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Handle category change
  const changeCategory = (category: string) => {
    setActiveCategory(category);
    setActiveIndex(null); // Close any open item when changing categories
  };

  return (
    <div className={styles.faqSection}>
      <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
      
      {/* Category navigation */}
      <div className={styles.categoryNav}>
        <button 
          className={`${styles.categoryButton} ${activeCategory === "all" ? styles.activeCategory : ""}`}
          onClick={() => changeCategory("all")}
        >
          All
        </button>
        <button 
          className={`${styles.categoryButton} ${activeCategory === "general" ? styles.activeCategory : ""}`}
          onClick={() => changeCategory("general")}
        >
          General
        </button>
        <button 
          className={`${styles.categoryButton} ${activeCategory === "services" ? styles.activeCategory : ""}`}
          onClick={() => changeCategory("services")}
        >
          Services
        </button>
        <button 
          className={`${styles.categoryButton} ${activeCategory === "materials" ? styles.activeCategory : ""}`}
          onClick={() => changeCategory("materials")}
        >
          Materials
        </button>
        <button 
          className={`${styles.categoryButton} ${activeCategory === "process" ? styles.activeCategory : ""}`}
          onClick={() => changeCategory("process")}
        >
          Process
        </button>
        <button 
          className={`${styles.categoryButton} ${activeCategory === "cost" ? styles.activeCategory : ""}`}
          onClick={() => changeCategory("cost")}
        >
          Cost & Warranty
        </button>
        <button 
          className={`${styles.categoryButton} ${activeCategory === "suppliers" ? styles.activeCategory : ""}`}
          onClick={() => changeCategory("suppliers")}
        >
          Suppliers
        </button>
      </div>
      
      {/* FAQ accordion */}
      <div className={styles.faqContainer}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${filteredItems.indexOf(item) === activeIndex ? styles.active : ""}`}
            >
              <button 
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(filteredItems.indexOf(item))}
              >
                {item.question}
                <span className={styles.faqIcon}>
                  {filteredItems.indexOf(item) === activeIndex ? "−" : "+"}
                </span>
              </button>
              <div className={`${styles.faqAnswer} ${filteredItems.indexOf(item) === activeIndex ? styles.open : ""}`}>
                {item.answer}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No FAQs found in this category. Please try another category.</p>
        )}
      </div>
      
      {/* Supplier logos section */}
      <div className={styles.supplierSection}>
        <h3 className={styles.supplierTitle}>Our Trusted Suppliers</h3>
        <div className={styles.supplierLogos}>
          <div className={styles.supplierLogo}>
            <Image
              src="/certainteed-logo.webp" 
              alt="CertainTeed"
              width={120}
              height={60}
            />
          </div>
          <div className={styles.supplierLogo}>
            <Image
              src="/cmg-logo.png" 
              alt="CMG"
              width={120}
              height={60}
            />
          </div>
          <div className={styles.supplierLogo}>
            <Image
              src="/davinci-logo.png" 
              alt="DaVinci"
              width={120}
              height={60}
            />
          </div>
          <div className={styles.supplierLogo}>
            <Image
              src="/carlisle-logo.webp" 
              alt="Carlisle"
              width={120}
              height={60}
            />
          </div>
          <div className={styles.supplierLogo}>
            <Image
              src="/bartile-logo.webp" 
              alt="Bartile"
              width={120}
              height={60}
            />
          </div>
        </div>
        <p className={styles.supplierNote}>
        </p>
      </div>
      
      {/* Call to action */}
      <div className={styles.faqCta}>
        <h3>Still have questions?</h3>
        <p>Contact our expert team for answers to your specific roofing needs.</p>
        <button className={styles.ctaButton}>Contact Us Today</button>
      </div>
    </div>
  );
}
