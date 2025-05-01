import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../app/page.module.css';
import YellowAccent from './YellowAccent';

// Define the RoofType interface
interface RoofType {
  id: string;
  name: string;
  tagline: string;
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
  badge: string;
}

const roofTypes: RoofType[] = [
  {
    id: 'shingle',
    name: 'Asphalt Shingles',
    tagline: 'Classic elegance with architectural-grade materials',
    title: 'Premium Asphalt Shingles',
    description: 'Our high-performance architectural shingles deliver exceptional visual appeal and lasting protection. Using only premium materials with enhanced wind and impact resistance for Utah\'s variable weather patterns.',
    features: [
      'Class 4 impact resistance',
      'Wind resistance up to 130 mph',
      'Wide variety of colors and styles',
      'Cost-effective quality'
    ],
    imageSrc: '/asphalt-shingle-new-roof.webp',
    badge: 'Most Popular'
  },
  {
    id: 'metal',
    name: 'Metal Roofing',
    tagline: '50+ year lifespan with superior durability in Utah\'s climate',
    title: 'Metal Roofing Excellence',
    description: 'Our premium metal roofing systems combine unmatched durability with sophisticated aesthetics. Engineered specifically for Utah\'s extreme weather conditions, from heavy snow loads to intense summer heat.',
    features: [
      'Lifetime warranty available',
      'Energy-efficient design',
      'Custom color options',
      'Superior snow shedding'
    ],
    imageSrc: '/coated-metals-group-standing-seam-roof.webp',
    badge: 'Premium Choice'
  },
  {
    id: 'shake',
    name: 'Shake Roofing',
    tagline: 'Natural wood appearance without maintenance concerns',
    title: 'Advanced Synthetic Shake',
    description: 'Our synthetic shake roofing systems capture the warmth and character of cedar shake without the maintenance concerns. Perfect for mountain properties with Class A fire ratings and extreme weather resistance.',
    features: [
      'Authentic wood appearance',
      'Class A fire rating',
      'Impervious to insects and rot',
      'Enhanced UV stability'
    ],
    imageSrc: '/davinci-shake-shingle-roof.webp',
    badge: 'Mountain Favorite'
  },
  {
    id: 'flat',
    name: 'Flat Roofing',
    tagline: 'Commercial-grade systems for maximum weather protection',
    title: 'Commercial Flat Roofing Systems',
    description: 'Our specialized TPO, EPDM, and PVC flat roofing solutions deliver superior waterproofing and energy efficiency for commercial buildings, with expert installation that ensures long-term performance.',
    features: [
      'TPO, EPDM & PVC options',
      'Excellent UV reflection',
      'Puncture-resistant membrane',
      'Low maintenance requirements'
    ],
    imageSrc: '/roofers-installing-commercial-flat-roof.webp',
    badge: 'Commercial Grade'
  },
  {
    id: 'tile',
    name: 'Tile Roofing',
    tagline: 'Distinctive appearance with superior longevity',
    title: 'Luxury Tile Roofing',
    description: 'Our concrete and clay tile roofing options add timeless character and prestige to high-end properties. These premium systems are engineered to withstand Utah\'s freeze-thaw cycles while providing superior insulation.',
    features: [
      'Clay and concrete options',
      '75+ year lifespan',
      'Enhanced curb appeal',
      'Excellent insulation properties'
    ],
    imageSrc: '/bartile-roof.webp',
    badge: 'Luxury Choice'
  }
];

const RoofTypes: React.FC = () => {
  // State to track the current featured roof type
  const [featuredRoof, setFeaturedRoof] = useState<RoofType>(roofTypes[0]);
  
  // Handle click on a grid item
  const handleRoofSelect = (roofType: RoofType) => {
    setFeaturedRoof(roofType);
  };
  
  // Get alternative roof types (all roof types except the featured one)
  const alternativeRoofs = roofTypes.filter(roof => roof.id !== featuredRoof.id);
  
  return (
    <section className={styles.roofComparisonSection}>
      <h2 className={styles.sectionTitle} style={{ fontSize: 'clamp(1.1rem, 4vw, 1.75rem)' }}>
        Elite Roofing Options
      </h2>

      {/* Mobile Selector - Only visible on mobile */}
      <div className={styles.mobileRoofSelector}>
        <p className={styles.selectorLabel}>Select a roof type:</p>
        <div className={styles.thumbnailStrip}>
          {roofTypes.map((roof) => (
            <div 
              key={roof.id}
              className={`${styles.roofThumbnail} ${roof.id === featuredRoof.id ? styles.activeThumbnail : ''}`}
              onClick={() => handleRoofSelect(roof)}
              title={roof.name}
            >
              <Image
                src={roof.imageSrc}
                alt={roof.name}
                width={80}
                height={60}
                className={styles.thumbnailImage}
              />
              <span className={styles.thumbnailName}>{roof.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.splitScreenDisplay}>
        {/* Featured roof type - larger display on left */}
        <div className={styles.featuredRoof}>
          <div className={styles.featuredImageContainer} style={{ overflow: 'visible' }}>
            <YellowAccent position="left" />
            <div className={styles.featuredImageWrapper}>
              <Image
                src={featuredRoof.imageSrc}
                alt={`Premium ${featuredRoof.name}`}
                width={600}
                height={450}
                className={styles.featuredImage}
              />
              <div className={styles.featuredOverlay}>
                <span className={styles.premiumBadge}>{featuredRoof.badge}</span>
                <h3>{featuredRoof.name}</h3>
                <p>{featuredRoof.tagline}</p>
              </div>
            </div>
          </div>
          
          <div className={styles.featuredDetails}>
            <h3>{featuredRoof.title}</h3>
            <p>{featuredRoof.description}</p>
            <ul className={styles.roofFeatures}>
              {featuredRoof.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button className={styles.btnPrimary}>Explore {featuredRoof.name}</button>
          </div>
        </div>
        
        {/* Alternative roof types - 2x2 grid on right (desktop) or hidden on mobile */}
        <div className={styles.alternativeRoofs}>
          <div className={styles.roofGrid}>
            {alternativeRoofs.slice(0, 4).map((roof, _index) => (
              <div 
                key={roof.id}
                className={styles.roofGridItem}
                onClick={() => handleRoofSelect(roof)}
              >
                <div className={styles.gridImageWrapper}>
                  <Image
                    src={roof.imageSrc}
                    alt={roof.name}
                    width={280}
                    height={200}
                    className={styles.gridImage}
                  />
                  <div className={styles.gridOverlay}>
                    <h4>{roof.name}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.compareText}>
            <p>Compare our premium roofing solutions to find the perfect match for your property&apos;s style and requirements.</p>
            <a href="/roofing-options" className={styles.compareLink}>Visit Our Photo Gallery</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoofTypes;