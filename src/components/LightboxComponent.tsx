"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Define the interfaces
interface GalleryItem {
  id: number;
  images: string[];
  alt: string;
  title: string;
  description: string;
  category: 'residential' | 'commercial';
}

interface LightboxProps {
  item: GalleryItem;
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
  closeLightbox: () => void;
  navigateLightbox: (direction: 'prev' | 'next') => void;
  navigateGalleryItems: (direction: 'prev' | 'next') => void;
}

export default function LightboxComponent({
  item,
  currentImageIndex,
  setCurrentImageIndex,
  closeLightbox,
  navigateLightbox,
  navigateGalleryItems
}: LightboxProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Check if on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <div
      id="lightbox"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 9999999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? '10px' : '20px'
      }}
      onClick={closeLightbox}
    >
      {/* Close button */}
      <button
        onClick={closeLightbox}
        style={{
          position: 'fixed',
          top: '15px',
          right: '15px',
          width: isMobile ? '40px' : '45px',
          height: isMobile ? '40px' : '45px',
          backgroundColor: '#f5a623',
          color: 'white',
          border: '3px solid white',
          borderRadius: '50%',
          fontSize: isMobile ? '20px' : '24px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10000000,
          boxShadow: '0 0 10px rgba(0,0,0,0.5)'
        }}
      >
        X
      </button>
      
      {/* Project Navigation - positioned at top for mobile */}
      {isMobile && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0 10px',
            marginBottom: '15px', 
            marginTop: '60px', // Added space to avoid overlap with close button
            position: 'relative',
            zIndex: 10000001
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateGalleryItems('prev');
            }}
            style={{
              width: '80px',
              height: '60px',
              backgroundColor: 'rgba(245, 166, 35, 0.9)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
              padding: '6px 0'
            }}
            title="Previous Project"
          >
            <span style={{ fontSize: '18px', marginBottom: '2px' }}>⟪ Prev</span>
            <span style={{ fontSize: '14px' }}>Project</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateGalleryItems('next');
            }}
            style={{
              width: '80px',
              height: '60px',
              backgroundColor: 'rgba(245, 166, 35, 0.9)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
              padding: '6px 0'
            }}
            title="Next Project"
          >
            <span style={{ fontSize: '18px', marginBottom: '2px' }}>Next ⟫</span>
            <span style={{ fontSize: '14px' }}>Project</span>
          </button>
        </div>
      )}
      
      {/* Desktop Project Navigation - Left */}
      {!isMobile && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '20px',
            transform: 'translateY(-50%)',
            zIndex: 10000001,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateGalleryItems('prev');
            }}
            style={{
              width: '90px',
              height: '70px',
              borderRadius: '8px',
              backgroundColor: '#f5a623',
              color: 'white',
              border: 'none',
              fontWeight: 'bold',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(0,0,0,0.7)',
              padding: '6px 0'
            }}
            title="Previous Project (Shift+←)"
          >
            <span style={{ fontSize: '20px', marginBottom: '4px' }}>⟪ Prev</span>
            <span style={{ fontSize: '16px' }}>Project</span>
          </button>
        </div>
      )}
      
      {/* Desktop Project Navigation - Right */}
      {!isMobile && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            right: '20px',
            transform: 'translateY(-50%)',
            zIndex: 10000001,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateGalleryItems('next');
            }}
            style={{
              width: '90px',
              height: '70px',
              borderRadius: '8px',
              backgroundColor: '#f5a623',
              color: 'white',
              border: 'none',
              fontWeight: 'bold',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(0,0,0,0.7)',
              padding: '6px 0'
            }}
            title="Next Project (Shift+→)"
          >
            <span style={{ fontSize: '20px', marginBottom: '4px' }}>Next ⟫</span>
            <span style={{ fontSize: '16px' }}>Project</span>
          </button>
        </div>
      )}
      
      {/* Main image container */}
      <div
        style={{
          position: 'relative',
          maxWidth: '100%',
          maxHeight: isMobile ? '50vh' : '70vh',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous image button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigateLightbox('prev');
          }}
          disabled={item.images.length <= 1}
          style={{
            position: 'absolute',
            left: '10px',
            width: isMobile ? '35px' : '45px',
            height: isMobile ? '35px' : '45px',
            borderRadius: isMobile ? '4px' : '50%',
            backgroundColor: item.images.length > 1 ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.3)',
            color: 'white',
            border: '2px solid white',
            fontSize: isMobile ? '20px' : '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: item.images.length > 1 ? 'pointer' : 'not-allowed',
            zIndex: 10000001
          }}
          title="Previous Image (←)"
        >
          ‹
        </button>
        
        {/* Main image */}
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          height: isMobile ? '40vh' : '60vh',
          maxWidth: isMobile ? '100%' : '75%' // Reduced to make room for project navigation
        }}>
          <Image
            src={item.images[currentImageIndex]}
            alt={`${item.alt} - Image ${currentImageIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            priority
            quality={85}
            style={{
              objectFit: 'contain'
            }}
          />
        </div>
        
        {/* Next image button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigateLightbox('next');
          }}
          disabled={item.images.length <= 1}
          style={{
            position: 'absolute',
            right: '10px',
            width: isMobile ? '35px' : '45px',
            height: isMobile ? '35px' : '45px',
            borderRadius: isMobile ? '4px' : '50%',
            backgroundColor: item.images.length > 1 ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.3)',
            color: 'white',
            border: '2px solid white',
            fontSize: isMobile ? '20px' : '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: item.images.length > 1 ? 'pointer' : 'not-allowed',
            zIndex: 10000001
          }}
          title="Next Image (→)"
        >
          ›
        </button>
      </div>
      
      {/* Thumbnail row for multiple images */}
      {item.images.length > 1 && (
        <div 
          style={{
            display: 'flex',
            gap: isMobile ? '0.25rem' : '0.5rem',
            marginTop: '0.75rem',
            justifyContent: 'center',
            maxWidth: '100%',
            overflowX: 'auto',
            padding: isMobile ? '0.25rem' : '0.5rem'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {item.images.map((image, idx) => (
            <div 
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              style={{
                width: isMobile ? '45px' : '60px',
                height: isMobile ? '45px' : '60px',
                position: 'relative',
                border: currentImageIndex === idx ? '3px solid #f5a623' : '3px solid transparent',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Image 
                src={image}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes={isMobile ? '45px' : '60px'}
                style={{
                  objectFit: 'cover',
                  borderRadius: '0.15rem'
                }}
              />
            </div>
          ))}
        </div>
      )}
      
      {/* Image counter */}
      {item.images.length > 1 && (
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '1rem',
            fontSize: '0.875rem',
            marginTop: '0.5rem'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          Image {currentImageIndex + 1} of {item.images.length}
        </div>
      )}
      
      {/* Caption */}
      <div
        style={{
          marginTop: '15px',
          backgroundColor: '#1e2761',
          padding: isMobile ? '10px 15px' : '15px 20px',
          borderRadius: '6px',
          maxWidth: isMobile ? '100%' : '800px',
          width: isMobile ? '95%' : 'auto',
          border: '2px solid #f5a623'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          style={{
            margin: '0 0 8px 0',
            color: '#f5a623',
            textAlign: 'center',
            fontSize: isMobile ? '18px' : '22px'
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            margin: 0,
            color: 'white',
            textAlign: 'center',
            fontSize: isMobile ? '14px' : '16px'
          }}
        >
          {item.description}
        </p>
      </div>
      
      {/* Keyboard shortcut hints - only show on desktop */}
      {!isMobile && (
        <div
          style={{
            position: 'fixed',
            bottom: '10px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '12px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <span>ESC: Close</span>
          <span>←/→: Navigate Images</span>
          <span>Shift+←/→: Navigate Projects</span>
        </div>
      )}
    </div>
  );
}