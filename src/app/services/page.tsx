"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import ContentLayout from '../../components/ContentLayout';
import YellowAccent from '../../components/YellowAccent';

// Define types for services
interface ServiceCategory {
  id: string;
  name: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  categoryId: string;
  features: string[];
}

export default function ServicesPage() {
  // Service categories
  const serviceCategories: ServiceCategory[] = [
    { id: 'all', name: 'All Services' },
    { id: 'roofing', name: 'Roofing' },
    { id: 'siding', name: 'Metal Siding' },
    { id: 'other', name: 'Other Services' }
  ];

  // Services data
  const services: Service[] = [
    {
      id: 'asphalt-shingles',
      title: 'Asphalt Shingles',
      description: 'Premium asphalt shingle roofing that combines durability, aesthetic appeal, and cost-effectiveness. Ideal for most residential homes and available in a wide range of colors and styles.',
      image: '/placeholder.webp',
      categoryId: 'roofing',
      features: [
        'Versatile design options',
        'Cost-effective roofing solution',
        'Excellent weather resistance',
        '25-30 year warranty options',
        'Energy-efficient options available'
      ]
    },
    {
      id: 'metal-roofing',
      title: 'Metal & Steel Roofing',
      description: 'Long-lasting metal roof systems designed to withstand Utah\'s harsh weather conditions. Our metal roofing offers superior durability, energy efficiency, and a modern aesthetic.',
      image: '/placeholder.webp',
      categoryId: 'roofing',
      features: [
        'Longevity of 50+ years',
        'Energy efficient and eco-friendly',
        'Fire-resistant material',
        'Withstands high winds and snow loads',
        'Multiple style and color options'
      ]
    },
    {
      id: 'shake-roofing',
      title: 'Shake & Composite Shake',
      description: 'Classic shake roofing that brings natural beauty and character to your home, with both traditional wood and modern composite options available.',
      image: '/placeholder.webp',
      categoryId: 'roofing',
      features: [
        'Natural, rustic appearance',
        'Excellent insulation properties',
        'Enhanced curb appeal',
        'Composite options for longer life',
        'Weather-resistant treatments available'
      ]
    },
    {
      id: 'tile-roofing',
      title: 'Tile Roofing',
      description: 'Elegant and durable tile roofing solutions that add distinctive character to your home. Our tile roofing options are designed for longevity and minimal maintenance.',
      image: '/placeholder.webp',
      categoryId: 'roofing',
      features: [
        'Exceptional durability (50+ years)',
        'Excellent thermal properties',
        'Low maintenance requirements',
        'Resistant to rot and insect damage',
        'Multiple style options available'
      ]
    },
    {
      id: 'flat-roofing',
      title: 'Flat Roofing Systems',
      description: 'Specialized flat roofing solutions using TPO, EPDM, and other modern materials designed for commercial buildings and specific residential applications.',
      image: '/placeholder.webp',
      categoryId: 'roofing',
      features: [
        'TPO, EPDM, & PVC systems available',
        'Energy-efficient white membrane options',
        'Excellent waterproofing capabilities',
        'Specialized for commercial properties',
        'Options for rooftop equipment installation'
      ]
    },
    {
      id: 'roof-decks',
      title: 'Roof Deck Systems',
      description: 'Transform your flat roof into a usable outdoor space with our roof deck systems featuring wood Ipe or concrete pavers with pedestals for proper drainage.',
      image: '/placeholder.webp',
      categoryId: 'roofing',
      features: [
        'Wood Ipe or concrete paver options',
        'Adjustable pedestal systems',
        'Proper drainage integration',
        'Custom designs available',
        'Adds valuable outdoor living space'
      ]
    },
    {
      id: 'custom-metal-siding',
      title: 'Custom Metal Siding',
      description: 'Premium metal siding solutions that provide durability, low maintenance, and a distinctive modern appearance for your home or commercial building.',
      image: '/placeholder.webp',
      categoryId: 'siding',
      features: [
        'Multiple profile and pattern options',
        'Custom color selections available',
        'Corrosion and weather resistant',
        'Minimal maintenance requirements',
        'Contemporary architectural aesthetic'
      ]
    },
    {
      id: 'standing-seam',
      title: 'Standing Seam Panels',
      description: 'Sleek, modern standing seam metal panels that create clean lines for distinctive architectural expression on both roofs and walls.',
      image: '/placeholder.webp',
      categoryId: 'siding',
      features: [
        'Clean, contemporary appearance',
        'Hidden fastener system',
        'Superior water-tight installation',
        'Ideal for both roofing and siding',
        'Multiple width and color options'
      ]
    },
    {
      id: 'roof-repairs',
      title: 'Roof Repairs & Maintenance',
      description: 'Professional roof repair services addressing leaks, storm damage, and general wear to extend the life of your existing roof system.',
      image: '/placeholder.webp',
      categoryId: 'other',
      features: [
        'Leak detection and repair',
        'Storm damage assessment',
        'Shingle replacement',
        'Flashing repair and replacement',
        'Preventative maintenance programs'
      ]
    },
    {
      id: 'gutter-systems',
      title: 'Gutter Systems',
      description: 'Complete gutter installation and replacement services featuring seamless gutters, downspouts, and gutter guards to protect your property from water damage.',
      image: '/placeholder.webp',
      categoryId: 'other',
      features: [
        'Seamless gutter installation',
        'Downspout configuration',
        'Gutter guard options',
        'Custom color matching',
        'Proper drainage solutions'
      ]
    },
    {
      id: 'heated-roofing',
      title: 'Heated Roofing & Snow Retention',
      description: "Specialized solutions for Utah's snowy winters, including heated roof elements and snow retention systems to prevent dangerous snow slides.",
      image: '/placeholder.webp',
      categoryId: 'other',
      features: [
        'Electric heating cable installation',
        'Snow retention bars and clips',
        'Ice dam prevention',
        'Energy-efficient control systems',
        "Customized for Utah's climate"
      ]
    }
  ];

  // State for active category
  const [activeCategory, setActiveCategory] = useState<string>('all');
  // State for lightbox
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  // Add ESC key functionality
  useEffect(() => {
    const handleEscKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && lightboxOpen) {
        closeLightbox();
      }
    };

    // Add event listener when lightbox is open
    if (lightboxOpen) {
      document.addEventListener('keydown', handleEscKeyPress);
    }

    // Clean up event listener when component unmounts or lightbox closes
    return () => {
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [lightboxOpen]); // Re-run effect when lightboxOpen changes

  // Filter services based on active category
  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.categoryId === activeCategory);

  // Handler for category selection
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  // Handler for opening lightbox
  const openLightbox = (service: Service) => {
    setSelectedService(service);
    setLightboxOpen(true);
  };

  // Handler for closing lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedService(null);
  };

  return (
    <div className={styles.overflowWrapper}>
      {/* Hero Section */}
      <section className={styles.servicesHero}>
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>
            <span className={styles.shineText}>Premium Roofing Services</span>
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <ContentLayout>
        <div className={styles.contentText}>
          <p>
            Bro's Construction offers a comprehensive range of high-quality roofing and siding services designed to protect your property while enhancing its curb appeal. With expertise in various materials and techniques, our skilled team delivers exceptional results for both residential and commercial projects throughout Salt Lake City and the Wasatch Front.
          </p>
        </div>

        {/* Category Selector */}
        <div className={styles.categorySelector}>
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${
                activeCategory === category.id ? styles.activeCategory : ''
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className={styles.servicesGrid}>
          {filteredServices.map((service, index) => (
            <div 
              key={service.id} 
              className={styles.serviceItem}
              onClick={() => openLightbox(service)}
            >
              <div className={styles.imageContainer}>
                {/* On mobile, we'll keep alternating the accent position */}
                {/* On desktop, the CSS will override and keep them all on the left */}
                <YellowAccent position={index % 2 === 0 ? 'left' : 'right'} />
                <div className={styles.imageWrapper}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={300}
                    className={styles.serviceImage}
                  />
                  <div className={styles.overlay}>
                    <h3 className={styles.itemTitle}>{service.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox for Service Details - Updated version */}
        {lightboxOpen && selectedService && (
          <div className={styles.lightbox} onClick={closeLightbox}>
            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeButton} onClick={closeLightbox}>×</button>
              
              <div className={styles.lightboxImageContainer}>
                <div className={styles.lightboxImageWrapper}>
                  <Image
                    src={selectedService.image}
                    alt={selectedService.title}
                    width={600}
                    height={450}
                    className={styles.lightboxImage}
                    priority
                  />
                </div>
              </div>
              
              <div className={styles.lightboxDetails}>
                <h3>{selectedService.title}</h3>
                <p>{selectedService.description}</p>
                
                <div className={styles.featuresList}>
                  <h4>Key Features:</h4>
                  <ul>
                    {selectedService.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <h2>Ready to Transform Your Property?</h2>
          <p>Contact us today for a free consultation and estimate on your roofing or siding project. Our team is ready to help you choose the right materials and solutions for your specific needs.</p>
          <Link href="/contact" className={styles.btnPrimary}>
            Get a Free Estimate
          </Link>
        </div>
        
        {/* Process Section */}
        <section className={styles.processSection}>
          <h2 className={styles.sectionTitle}>Our Installation Process</h2>
          
          <div className={styles.processList}>
            <div className={styles.processItem}>
              <div className={styles.processIcon}>1</div>
              <h3>Consultation</h3>
              <p>We begin with a thorough consultation to understand your needs, preferences, and budget considerations.</p>
            </div>
            
            <div className={styles.processItem}>
              <div className={styles.processIcon}>2</div>
              <h3>Inspection & Estimate</h3>
              <p>Our team conducts a detailed inspection of your property and provides a comprehensive, transparent estimate.</p>
            </div>
            
            <div className={styles.processItem}>
              <div className={styles.processIcon}>3</div>
              <h3>Material Selection</h3>
              <p>We help you choose the perfect materials that balance aesthetic appeal, durability, and performance for Utah's climate.</p>
            </div>
            
            <div className={styles.processItem}>
              <div className={styles.processIcon}>4</div>
              <h3>Professional Installation</h3>
              <p>Our skilled craftsmen complete your installation with precision, attention to detail, and minimal disruption.</p>
            </div>
            
            <div className={styles.processItem}>
              <div className={styles.processIcon}>5</div>
              <h3>Final Inspection</h3>
              <p>We conduct a thorough final inspection to ensure every aspect of the installation meets our high standards.</p>
            </div>
          </div>
        </section>
        
        {/* Quality Guarantee Section */}
        <section className={styles.guaranteeSection}>
          <div className={styles.guaranteeContent}>
            <h2 className={styles.sectionTitle}>Our Quality Guarantee</h2>
            <p>At Bro's Construction, we stand behind our work with confidence. Every roofing and siding project we complete is backed by our comprehensive workmanship warranty, ensuring your peace of mind. We use only premium materials from trusted manufacturers, many of which come with their own extended product warranties for additional protection.</p>
            
            <div className={styles.guaranteeFeatures}>
              <div className={styles.guaranteeItem}>
                <h3>Expert Craftsmanship</h3>
                <p>24 years of experience in the industry ensures your project is completed to the highest standards.</p>
              </div>
              
              <div className={styles.guaranteeItem}>
                <h3>Premium Materials</h3>
                <p>We use only top-quality materials designed to withstand Utah's unique climate challenges.</p>
              </div>
              
              <div className={styles.guaranteeItem}>
                <h3>Clean Worksite</h3>
                <p>Our teams maintain a tidy, safe worksite and perform thorough cleanup after project completion.</p>
              </div>
            </div>
          </div>
        </section>
      </ContentLayout>
    </div>
  );
}