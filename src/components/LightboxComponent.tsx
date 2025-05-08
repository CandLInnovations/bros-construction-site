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
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  
  // Check if on mobile or large screen
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsLargeScreen(window.innerWidth > 1600);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  
  // Function to handle navigation with automatic project navigation
  const handleImageNavigation = (direction: 'prev' | 'next') => {
    // If we're at the first image and going prev, go to previous project
    if (direction === 'prev' && currentImageIndex === 0) {
      navigateGalleryItems('prev');
      return;
    }
    
    // If we're at the last image and going next, go to next project
    if (direction === 'next' && currentImageIndex === item.images.length - 1) {
      navigateGalleryItems('next');
      return;
    }
    
    // Otherwise, navigate normally within the current item's images
    navigateLightbox(direction);
  };

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
          top: '5px',
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
          zIndex: 10000002, // Increased z-index to be above other elements
          boxShadow: '0 0 10px rgba(0,0,0,0.5)'
        }}
      >
        X
      </button>
      
      {/* Main content container - reorganized to fix positioning */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: isMobile ? '100%' : '1200px',
          margin: '0 auto',
          overflow: 'visible',
          position: 'relative'
        }}
      >
        {/* Main image container */}
        <div
          style={{
            position: 'relative',
            maxWidth: '100%',
            maxHeight: isMobile ? '50vh' : '70vh',
            margin: '0 auto',
            marginTop: isMobile ? '55px' : '0', // Added top margin on mobile for next/prev buttons
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginBottom: isMobile ? '40px' : '30px' // Added margin to make room for thumbnails
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Keyboard shortcut hints - positioned at top of the image on desktop */}
          {!isMobile && (
            <div
              style={{
                position: 'absolute',
                top: '1px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'inline-block',
                color: 'white',
                fontSize: '12px',
                backgroundColor: 'rgba(30, 39, 97, 0.8)',
                padding: '6px 15px',
                zIndex: 10000001,
                borderRadius: '4px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <span>ESC: Close</span>
              <span> | </span>
              <span>←/→: Navigate Images</span>
              <span> | </span>
              <span>Shift+←/→: Navigate Projects</span>
            </div>
          )}
          
          {/* Project Navigation for mobile - positioned to bleed into top of the image */}
          {isMobile && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                position: 'absolute',
                top: '-30px', // Position to bleed into top of image
                left: 0,
                padding: '0 10px',
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
                  width: '70px',
                  height: '40px',
                  backgroundColor: 'rgba(245, 166, 35, 0.9)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
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
                <span style={{ fontSize: '14px', marginBottom: '2px' }}>⟪ Prev</span>
                <span style={{ fontSize: '12px' }}>Project</span>
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateGalleryItems('next');
                }}
                style={{
                  width: '70px',
                  height: '40px',
                  backgroundColor: 'rgba(245, 166, 35, 0.9)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '12px',
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
                <span style={{ fontSize: '14px', marginBottom: '2px' }}>Next ⟫</span>
                <span style={{ fontSize: '12px' }}>Project</span>
              </button>
            </div>
          )}
          
          {/* Previous image button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleImageNavigation('prev');
            }}
            style={{
              position: 'absolute',
              left: '10px',
              width: isMobile ? '35px' : '45px',
              height: isMobile ? '35px' : '45px',
              borderRadius: isMobile ? '4px' : '50%',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: 'white',
              border: '2px solid white',
              fontSize: isMobile ? '20px' : '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10000001
            }}
            title={currentImageIndex === 0 ? "Previous Project" : "Previous Image (←)"}
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
              handleImageNavigation('next');
            }}
            style={{
              position: 'absolute',
              right: '10px',
              width: isMobile ? '35px' : '45px',
              height: isMobile ? '35px' : '45px',
              borderRadius: isMobile ? '4px' : '50%',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: 'white',
              border: '2px solid white',
              fontSize: isMobile ? '20px' : '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10000001
            }}
            title={currentImageIndex === item.images.length - 1 ? "Next Project" : "Next Image (→)"}
          >
            ›
          </button>
        </div>
        
        {/* Desktop Project Navigation - Left */}
        {!isMobile && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: isLargeScreen ? '10%' : '20px',
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
              right: isLargeScreen ? '10%' : '20px',
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
        
        {/* Thumbnail row for multiple images - adjusted position */}
        {item.images.length > 1 && (
          <div 
            style={{
              display: 'flex',
              gap: isMobile ? '0.25rem' : '0.5rem',
              justifyContent: 'center',
              maxWidth: '100%',
              overflowX: 'auto',
              padding: isMobile ? '0.25rem' : '0.5rem',
              position: 'relative',
              marginTop: isMobile ? '-85px' : '-70px', // Negative margin to overlap with main image
              marginBottom: isMobile ? '25px' : '15px',
              zIndex: 10000001
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
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
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
              marginBottom: '8px',
              marginTop: '-20px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            Image {currentImageIndex + 1} of {item.images.length}
          </div>
        )}
        
        {/* Caption - Made scrollable with increased height on mobile */}
        <div
          style={{
            backgroundColor: '#1e2761',
            padding: isMobile ? '10px 15px' : '15px 20px',
            borderRadius: '6px',
            maxWidth: isMobile ? '100%' : '800px',
            width: isMobile ? '95%' : 'auto',
            border: '2px solid #f5a623',
            maxHeight: isMobile ? '190px' : '150px', // Increased mobile height from 150px to 190px
            overflow: 'auto', // Make content scrollable
            marginBottom: isMobile ? '15px' : '0'
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
              fontSize: isMobile ? '14px' : '16px',
              paddingBottom: '1px' // Added padding for better readability when scrolling
            }}
          >
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}