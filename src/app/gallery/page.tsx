"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Define interfaces for gallery items
interface GalleryItem {
  id: number;
  images: string[];
  alt: string;
  title: string;
  description: string;
  category: 'residential' | 'commercial';
}

// Dynamically import LightboxComponent with SSR disabled
const LightboxComponent = dynamic(() => import('@/components/LightboxComponent'), {
  ssr: false,
  loading: () => <div className="loading">Loading...</div>
});

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<'residential' | 'commercial'>('residential');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Sample gallery items with multiple images per property
  const galleryItems: GalleryItem[] = [
    // Residential Projects
    { 
      id: 1, 
      images: [
        '/roofing-exterior-home.webp',
        '/custom-metal-roof-project.webp',
        '/custom-metal-roof-project3.webp',
        '/custom-metal-roof-project3a.webp',
        '/custom-metal-roof-project4.webp'
      ], 
      alt: 'Residential Roof Project 1', 
      title: 'Mountain Modern Masterpiece', 
      description: 'This striking residence showcases dramatic rooflines with precise angular geometry, highlighting our expert metal roofing craftsmanship. The sleek, contemporary design merges bold architectural statement with superior durability—providing both distinctive mountain aesthetic and exceptional protection against Park City elements for this luxury chalet.', 
      category: 'residential' 
    },
    { 
      id: 2, 
      images: [
        '/Bros-home-kamas-metal-roof.webp'
      ], 
      alt: 'Mountain retreat cabin with standing seam metal roof', 
      title: 'Alpine Sanctuary', 
      description: "This charming mountain cabin features a premium standing seam metal roof that combines rustic warmth with modern durability. The clean, vertical lines enhance the cabin's natural aesthetic while providing superior protection against heavy snow loads and harsh mountain conditions—a perfect blend of traditional charm and contemporary performance.", 
      category: 'residential' 
    },
    { 
      id: 3, 
      images: [
        '/cabin-kamas-utah-metal-roof.webp',
        '/mountain-cabin-roof-project.webp',
        '/mountain-cabin-roof-project3.webp',
        '/mountain-cabin-roof-project4.webp',
        '/mountain-cabin-roof-project5.webp',
        '/mountain-cabin-roof-project6.webp'
      ], 
      alt: 'Residential Roof Project 3', 
      title: 'Mountain Estate', 
      description: "This stunning Kamas property features a premium metal roofing system engineered to withstand harsh alpine conditions. The architectural metal installation complements the home's grand scale and natural surroundings, providing decades of protection against heavy snowfall, UV exposure, and dramatic temperature fluctuations while maintaining its elegant mountain aesthetic.", 
      category: 'residential' 
    },
    { 
      id: 4, 
      images: [
        '/custom-metal-siding.webp',
        '/custom-metal-siding-entry2.webp',
        '/custom-metal-siding-entry3.webp',
        '/custom-metal-siding-garage4.webp',
        '/custom-metal-siding-garage5.webp',
        '/custom-metal-siding-patio6.webp',
        '/custom-metal-siding-exterior-home7.webp',
        '/custom-corrugated-metal-siding8.webp',
        '/custom-metal-siding-garage9.webp',
        '/custom-metal-siding-patio10.webp'
      ], 
      alt: 'Residential Siding Project 4', 
      title: 'Custom Metal Siding', 
      description: 'Premium metal siding installation with complementary roofing materials for a cohesive look.', 
      category: 'residential' 
    },
    { 
      id: 5, 
      images: [
        '/custom-metal-copper-roof-cap.webp',
        '/custom-metal-black-roof-cap2.webp',
        '/custom-metal-black-chimney-cap3.webp',
        '/custom-metal-black-chimney-cap4.webp',
        '/custom-metal-copper-chimney-cap5.webp'
      ], 
      alt: 'Distinctive Custom Metal Chimney Caps', 
      title: 'Distinctive Metal Chimney Caps', 
      description: "Elegantly crafted custom metal crowns that protect your chimney while enhancing your home's architectural profile. Our premium fabrications combine superior weather resistance with artistic design elements tailored specifically for Wasatch Front homes.", 
      category: 'residential' 
    },
    { 
      id: 6, 
      images: [
        '/asphalt-shingle-reroof-home.webp',
        '/asphalt-shingle-new-roof2.webp',
        '/asphalt-shingle-new-roof3.webp'
      ], 
      alt: 'Premium Asphalt New Roof & Reroof', 
      title: 'Premium Asphalt Craftsmanship', 
      description: 'These homes feature architectural-grade asphalt shingles crafted from high-performance materials with enhanced UV resistance and impact protection. The dimensional profiles create sophisticated curb appeal with rich textures and shadow lines, delivering traditional aesthetics enhanced by modern engineering—the perfect investment in both timeless style and long-term performance.', 
      category: 'residential' 
    },
    
    // Commercial Projects
    { 
      id: 7, 
      images: [
        '/commercial-composite-shake-shingle-roof.webp',
        '/commercial-composite-shake-shingle-roof2.webp',
        '/commercial-composite-shake-shingle-roof3.webp'
      ], 
      alt: 'Commercial Roof Project 1', 
      title: 'Office Building', 
      description: 'Flat TPO roofing system installed for this commercial property in downtown Salt Lake City.', 
      category: 'commercial' 
    },
    { 
      id: 8, 
      images: [
        '/apartment-flat-tpo-roof.webp',
        '/apartment-flat-tpo-roof2.webp'
      ], 
      alt: 'Commercial Roof Project 2', 
      title: 'Retail Complex', 
      description: 'Large-scale commercial roofing project featuring our premium EPDM membrane system.', 
      category: 'commercial' 
    },
    { 
      id: 9, 
      images: [
        '/commercial-roof-edpm.webp',
        '/commercial-roof-edpm2.webp',
        '/commercial-roof-edpm3.webp',
        '/commercial-roof-edpm4.webp',
        '/commercial-roof-edpm5.webp',
        '/commercial-roof-edpm6.webp'
      ], 
      alt: 'Commercial Roof Project 3', 
      title: 'Commercial Facility EDPM', 
      description: 'Industrial EDPM roofing solution designed for maximum durability and minimal maintenance.', 
      category: 'commercial' 
    },
    { 
      id: 10, 
      images: [
        '/commercial-metal-arch.webp'
      ], 
      alt: 'Commercial Roof Project 4', 
      title: 'Distinctive Metal Arch Accent', 
      description: 'Elevate your commercial property with our premium architectural metal arches that combine form and function.', 
      category: 'commercial' 
    },
    { 
      id: 11, 
      images: [
        '/Bros-roofing-hero-poster.jpg'
      ], 
      alt: 'Commercial Roof Project 5', 
      title: 'Restaurant Building', 
      description: 'Custom metal accent details and high-performance roofing for this upscale dining establishment.', 
      category: 'commercial' 
    },
    { 
      id: 12, 
      images: [
        '/roofing-exterior-home.webp'
      ], 
      alt: 'Commercial Roof Project 6', 
      title: 'Medical Office', 
      description: 'Premium EPDM roofing system installed for this healthcare facility in the Wasatch Front area.', 
      category: 'commercial' 
    },
    { 
  id: 13, 
  images: [
    '/shake-wood-shingle.webp',
    '/shake-wood-shingle2.webp',
    '/shake-wood-shingle3.webp',
    '/shake-wood-shingle4.webp'
  ], 
  alt: 'Cedar Roof with Metal Accents', 
  title: 'Cedar & Metal Elegance', 
  description: 'Cedar shake shingles paired with sleek metal accents radiate warmth and charm, blending timeless beauty with enduring durability. This stunning roof design elevates any home, ensuring lasting protection and a rustic yet modern appeal.', 
  category: 'residential' 
},
{ 
  id: 14, 
  images: [
    '/flat-roof-metal-accents.webp',
    '/flat-roof-metal-accents2.webp',
    '/flat-roof-metal-accents3.webp'
  ], 
  alt: 'Flat Roof with Metal Accent', 
  title: 'Architectural Excellence', 
  description: 'This commanding custom residence features a sophisticated multi-level flat roof design enhanced with premium metal accent elements. The dynamic terraced planes create visual intrigue while maintaining clean contemporary lines, with strategic metal details adding both distinctive character and superior weather protection to this luxury home.', 
  category: 'residential' 
},
{ 
  id: 15, 
  images: [
    '/custom-metal-roof-new-home.webp'
  ], 
  alt: 'Modern Metal Design', 
  title: 'Modern Metal Design', 
  description: 'I need details on this roof.', 
  category: 'residential' 
},
{ 
  id: 16, 
  images: [
    '/corrugated-metal-residential-roof.webp',
    '/corrugated-metal-residential-roof2.webp'
  ], 
  alt: 'Modern Metal Design', 
  title: 'Energy-efficient Corrugated Metal', 
  description: 'Engineered for exceptional durability, our corrugated metal roofing withstands decades of harsh weather while requiring minimal maintenance.', 
  category: 'residential' 
},
{ 
  id: 17, 
  images: [
    '/modern-residential-home.webp'
  ], 
  alt: 'Contemporaty Metal Style', 
  title: 'Contemporaty Style', 
  description: 'I need details on this roof.', 
  category: 'residential' 
},
{ 
  id: 18, 
  images: [
    '/asphalt-roof-metal-accent.webp',
    '/asphalt-roof-metal-accent2.webp',
    '/asphalt-roof-metal-accent3.webp'
  ], 
  alt: 'Cozy home with asphalt & metal roof', 
  title: 'Architectural Harmony', 
  description: 'This inviting residence showcases the perfect blend of traditional asphalt shingles with modern metal roofing accents. The thoughtful combination creates visual interest while providing superior protection and longevity for a truly distinctive home design.', 
  category: 'residential' 
},
{ 
  id: 19, 
  images: [
    '/IPE-wood-pavers-pedestal.webp',
    '/IPE-wood-pavers-pedestal2.webp',
    '/asphalt-roof-metal-accent3.webp'
  ], 
  alt: 'Roofing in Progress - construction photos', 
  title: 'Elevated Rooftop Surfaces', 
  description: 'Premium IPE hardwood decking and concrete pavers installed on adjustable pedestals, creating elegant, durable outdoor living spaces with perfect drainage and simplified maintenance. Ideal for rooftop terraces and accessible flat roof areas.', 
  category: 'residential' 
},
{ 
  id: 20, 
  images: [
    '/roofing-in-progress.webp',
    '/roofing-in-progress2.webp',
    '/roofing-in-progress3.webp',
    '/roofing-in-progress4.webp',
    '/roofing-in-progress5.webp',
    '/roofing-in-progress6.webp'
  ], 
  alt: 'Roofing in Progress - construction photos', 
  title: 'Roofing in Progress', 
  description: 'Behind-the-scenes glimpses of our skilled craftsmen transforming structures with precision techniques and quality materials. These select construction photos showcase the attention to detail that ensures lasting protection for your home.', 
  category: 'residential' 
},
  ];

  // Check if on mobile - memoized with useCallback
  const checkIfMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  
  useEffect(() => {
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [checkIfMobile]);

  const openLightbox = useCallback((item: GalleryItem, initialImageIndex: number = 0) => {
    setCurrentItem(item);
    setCurrentImageIndex(initialImageIndex);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  }, []);

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    if (!currentItem) return;
    
    if (direction === 'prev') {
      setCurrentImageIndex(prevIndex => 
        prevIndex > 0 ? prevIndex - 1 : currentItem.images.length - 1
      );
    } else {
      setCurrentImageIndex(prevIndex => 
        prevIndex < currentItem.images.length - 1 ? prevIndex + 1 : 0
      );
    }
  }, [currentItem]);

  const navigateGalleryItems = useCallback((direction: 'prev' | 'next') => {
    if (!currentItem) return;
    
    const filteredItems = galleryItems.filter(item => item.category === activeCategory);
    const currentIndex = filteredItems.findIndex(item => item.id === currentItem.id);
    
    if (direction === 'prev') {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
      setCurrentItem(filteredItems[prevIndex]);
      setCurrentImageIndex(0); // Reset to first image of new item
    } else {
      const nextIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
      setCurrentItem(filteredItems[nextIndex]);
      setCurrentImageIndex(0); // Reset to first image of new item
    }
  }, [currentItem, activeCategory]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        if (e.shiftKey) {
          navigateGalleryItems('prev');
        } else {
          navigateLightbox('prev');
        }
      } else if (e.key === 'ArrowRight') {
        if (e.shiftKey) {
          navigateGalleryItems('next');
        } else {
          navigateLightbox('next');
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, navigateLightbox, navigateGalleryItems, closeLightbox]);

  return (
    <div className="overflowWrapper" style={{ width: '100%', minHeight: '100vh' }}>
      {/* Main content with gradient background */}
      <div className="mainWrapper" style={{
        position: 'relative',
        width: '100%',
        background: 'linear-gradient(to bottom, #1e2761, #9ca4bf)',
        padding: '2rem 0',
        marginTop: 0,
        overflow: 'visible',
        minHeight: '100px'
      }}>
        <div className="mainContainer" style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0',
          overflow: 'visible'
        }}>
          {/* Gradient background to match home page */}
          <div style={{
            content: '',
            position: 'absolute',
            top: '2rem',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom right, #9ca4bf, #e6e9f0)',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            zIndex: -1,
            margin: '0 1.5rem',
          }}></div>

          <div style={{ padding: '3rem 1rem' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#f5a623',
              textAlign: 'center',
              marginTop: '2rem',
              marginBottom: '2rem',
              lineHeight: 1.2,
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              Our Project Gallery
            </h1>
            
            <h2 className="sectionTitle" style={{ 
              fontSize: 'clamp(1.1rem, 4vw, 1.75rem)',
              fontWeight: 700,
              color: '#1e2761',
              textAlign: 'center',
              marginTop: '2rem',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}>
              Explore Our Quality Craftsmanship
            </h2>
            
            <div className="contentText" style={{
              width: '100%',
              padding: '1rem',
              margin: '0 auto',
              marginTop: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              maxWidth: '1280px'
            }}>
              <p style={{
                fontSize: '1rem',
                color: '#111827',
                textAlign: 'center',
                margin: '0 auto',
                maxWidth: '90%',
                paddingLeft: 0,
                paddingRight: 0
              }}>
                Browse through our portfolio of completed roofing and exterior projects. 
                From residential homes to commercial buildings, we take pride in delivering
                exceptional quality and craftsmanship throughout Salt Lake City and the Wasatch Front.
              </p>
            </div>

            {/* Category Selection */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1.5rem',
              margin: '2rem 0'
            }}>
              <button
                onClick={() => setActiveCategory('residential')}
                style={{
                  backgroundColor: activeCategory === 'residential' ? '#1e2761' : '#e6e9f0',
                  color: activeCategory === 'residential' ? 'white' : '#1e2761',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.25rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                }}
              >
                Residential
              </button>
              <button
                onClick={() => setActiveCategory('commercial')}
                style={{
                  backgroundColor: activeCategory === 'commercial' ? '#1e2761' : '#e6e9f0',
                  color: activeCategory === 'commercial' ? 'white' : '#1e2761',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.25rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                }}
              >
                Commercial
              </button>
            </div>

            {/* Gallery Grid - Optimized with Image component */}
            <div className="contentSection" style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2.5rem',
              margin: '2rem 0 3rem'
            }}>
              {galleryItems
                .filter(item => item.category === activeCategory)
                .map((item, index) => (
                  <div 
                    key={item.id} 
                    className="contentRow"
                    onClick={() => openLightbox(item, 0)}
                    style={{
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease',
                      display: 'block',
                      marginBottom: '0',
                      position: 'relative',
                      overflow: 'visible'
                    }}
                  >
                    <div className="imageContainer" style={{ 
                      position: 'relative',
                      width: '100%',
                      display: 'block',
                      overflow: 'visible',
                      marginBottom: '1rem'
                    }}>
                      {/* Yellow accent */}
                      <div className="yellowAccent" style={{
                        position: 'absolute',
                        top: '1rem',
                        left: isMobile ? (index % 2 === 0 ? '-1.5rem' : 'auto') : '-1.5rem',
                        right: isMobile ? (index % 2 === 1 ? '-1.5rem' : 'auto') : 'auto',
                        width: '100%',
                        paddingBottom: '58.74%',
                        height: 0,
                        backgroundColor: '#f5a623',
                        borderRadius: '0.5rem',
                        zIndex: 1,
                        transform: 'translateY(1rem)',
                        boxShadow: '0 4px 12px rgba(245, 166, 35, 0.4)',
                        pointerEvents: 'none'
                      }} />
                      <div className="imageWrapper" style={{
                        position: 'relative',
                        width: '100%',
                        borderRadius: '0.5rem',
                        overflow: 'hidden',
                        zIndex: 2,
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)'
                      }}>
                        {/* Main thumbnail image - always show first image */}
                        <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: '66.67%' }}>
                          <Image
                            src={item.images[0]}
                            alt={item.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index < 6} // Prioritize loading first 6 images
                            className="galleryImage"
                            style={{
                              objectFit: 'cover',
                              transition: 'transform 0.5s ease',
                            }}
                          />
                        </div>
                        
                        {/* Image count indicator */}
                        {item.images.length > 1 && (
                          <div style={{
                            position: 'absolute',
                            top: '0.75rem',
                            right: '0.75rem',
                            backgroundColor: 'rgba(30, 39, 97, 0.8)',
                            color: 'white',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            zIndex: 4
                          }}>
                            +{item.images.length - 1} more
                          </div>
                        )}
                        
                        {/* Title overlay */}
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          padding: '1rem',
                          background: 'linear-gradient(to top, rgba(30, 39, 97, 0.9), transparent)',
                          color: 'white',
                          zIndex: 3
                        }}>
                          <h3 style={{
                            margin: 0,
                            fontSize: '1.25rem',
                            color: 'white',
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                            textAlign: 'center'
                          }}>{item.title}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Call to action */}
            <div 
              style={{
                margin: '3rem auto',
                padding: '2.5rem',
                background: 'linear-gradient(to bottom, #1e2761, #2a3578)',
                borderRadius: '0.5rem',
                textAlign: 'center',
                color: 'white',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                borderLeft: '5px solid #f5a623'
              }}
            >
              <h2 style={{
                color: '#f5a623',
                fontSize: '1.75rem',
                marginTop: 0,
                marginBottom: '1rem'
              }}>Ready to Transform Your Property?</h2>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                margin: '0 auto 1.5rem',
                maxWidth: '100%',
                color: 'white'
              }}>
                Contact us today for a free consultation and estimate on your roofing or exterior project.
                Let Bro's Construction bring out the best in your home or business with our quality craftsmanship.
              </p>
              <a 
                href="/contact"
                style={{
                  backgroundColor: '#f5a623',
                  color: '#1e2761',
                  fontWeight: 700,
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  display: 'inline-block',
                  textDecoration: 'none'
                }}
              >
                Request a Quote
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Use dynamically imported Lightbox Component when needed */}
      {lightboxOpen && currentItem && (
        <LightboxComponent
          item={currentItem}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          closeLightbox={closeLightbox}
          navigateLightbox={navigateLightbox}
          navigateGalleryItems={navigateGalleryItems}
        />
      )}
    </div>
  );
}