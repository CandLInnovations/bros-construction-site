"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  const galleryItems: GalleryItem[] = useMemo(() => [
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
      description: 'This striking residence showcases dramatic rooflines with precise angular geometry, highlighting our expert metal roofing craftsmanship. The sleek, contemporary design merges bold architectural statement with superior durability—providing both distinctive mountain aesthetic and exceptional protection against alpine elements for this luxury chalet.', 
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
      description: "This stunning Kamas vacation property features a premium metal roofing system engineered to withstand harsh alpine conditions. The architectural metal installation complements the home's grand scale and natural surroundings, providing decades of protection against heavy snowfall, UV exposure, and dramatic temperature fluctuations while maintaining its elegant mountain aesthetic.", 
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
      title: 'Architectural Metal Distinction', 
      description: 'Transform your home with premium metal siding that delivers sophisticated modern appeal and lasting durability. Perfect for accent walls, gable ends, entryway features, and full-façade applications—our custom metal installations create striking visual interest while providing superior weather resistance. These versatile systems can be integrated with traditional materials for contemporary contrast or used throughout for a bold architectural statement, all while requiring minimal maintenance for discerning homeowners.', 
      category: 'residential' 
    },
    { 
      id: 5, 
      images: [
        '/custom-chimney-cap3.webp',
        '/custom-metal-copper-roof-cap.webp',
        '/custom-metal-black-roof-cap2.webp',
        '/custom-metal-black-chimney-cap3.webp',
        '/custom-chimney-cap1.webp',
        '/custom-chimney-cap2.webp',
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
      description: 'These homes feature architectural-grade asphalt shingles crafted from high-performance materials with enhanced UV resistance and impact protection. These homes feature architectural-grade asphalt shingles crafted from high-performance materials with enhanced UV resistance and impact protection. The dimensional profiles create sophisticated curb appeal with rich textures and shadow lines, delivering traditional aesthetics enhanced by modern engineering—the perfect investment in both timeless style and long-term performance.', 
      category: 'residential' 
    },
    { 
      id: 7, 
      images: [
        '/commercial-composite-shake-shingle-roof.webp',
        '/commercial-composite-shake-shingle-roof2.webp',
        '/commercial-composite-shake-shingle-roof3.webp'
      ], 
      alt: 'Medical office bulding with tile shingles in Lehi UT', 
      title: 'Medial Office Building', 
      description: "The Flash Pointe Medical Center in Lehi features distinctive architectural tile roofing that blends traditional aesthetic appeal with modern durability. These engineered tiles offer the timeless elegance of Mediterranean design while providing enhanced fire resistance, impact protection, and color retention. The dimensional profile creates a sophisticated play of light and shadow across the building's exterior, complementing its contemporary architectural lines. These clay or concrete tiles require minimal maintenance while delivering superior performance against harsh weather conditions. The earth-toned color palette integrates seamlessly with the surrounding landscape, creating a professional yet inviting atmosphere for clients and employees alike.",
      category: 'commercial' 
    },
    { 
      id: 8, 
      images: [
        '/apartment-flat-tpo-roof.webp',
        '/apartment-flat-tpo-roof2.webp'
      ], 
      alt: 'Commercial office park in Park City UT', 
      title: 'Office Park', 
      description: 'This Park City office park project showcases our TPO roofing system across this multi-building business complex. The bright white reflective membrane provides superior energy efficiency in this desert climate while offering exceptional durability against UV exposure and temperature fluctuations. Expertly installed on flat roof sections with precise detailing around HVAC units and drainage systems, this commercial application demonstrates our capability to deliver large-scale roofing solutions that combine performance, aesthetics, and sustainability in challenging environments.', 
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
      alt: 'Commercial business complex in Lehi UT', 
      title: 'High-Performance Commercial Membrane Roofing', 
      description: "Mountain View Business Park in Lehi features our premium single-ply membrane roofing system, delivering exceptional performance in this challenging alpine environment. The bright white reflective surface significantly reduces cooling costs while withstanding extreme temperature fluctuations and UV exposure. This commercial installation includes custom parapet detailing and integrated drainage solutions, ensuring watertight protection for the modern glass façade below. The clean, minimalist aesthetic complements the building's contemporary design while providing superior protection against the region's heavy snowfall and dramatic seasonal weather patterns. Completed on schedule despite high-elevation challenges, this project demonstrates our expertise in commercial roofing applications where both performance and visual appeal are paramount.", 
      category: 'commercial' 
    },
    { 
      id: 10, 
      images: [
        '/commercial-metal-arch.webp'
      ], 
      alt: 'Commercial Roof Project 4', 
      title: 'Distinctive Metal Arch Accent', 
      description: "Elevate your commercial property with our premium architectural metal arches that combine form and function. These elegant structural elements create a striking visual focal point while providing exceptional durability against the elements. Our custom-fabricated metal arches seamlessly integrate with your building's design, adding sophisticated dimension and contemporary appeal. Available in a variety of finishes and profiles to complement any architectural style—from sleek modern minimalism to classic industrial aesthetics. Backed by our comprehensive warranty and professional installation, these low-maintenance architectural features will enhance your building's value and curb appeal for decades to come.", 
      category: 'commercial' 
    },
    /* PENDING CLIENT: Image section commented out waiting for final image assets from client
    { 
      id: 11, 
      images: [
        '/placeholder.webp'
      ], 
      alt: 'Commercial Roof Project 5', 
      title: 'Restaurant Building', 
      description: 'Custom metal accent details and high-performance roofing for this upscale dining establishment.', 
      category: 'commercial' 
    },
    { 
      id: 12, 
      images: [
        '/placeholder.webp'
      ], 
      alt: 'Commercial Roof Project 6', 
      title: 'Medical Office', 
      description: 'Premium EPDM roofing system installed for this healthcare facility in the Wasatch Front area.', 
      category: 'commercial' 
    },
    */
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
  title: 'Mountain Contemporary', 
  description: 'This sophisticated residence showcases a premium standing seam metal roof with dynamic multi-level planes and clean architectural lines. The thoughtful integration of metal, wood, and stone creates a harmonious modern design that complements its dramatic mountain setting while providing superior protection against the elements.', 
  category: 'residential' 
},
{ 
  id: 16, 
  images: [
    '/corrugated-metal-residential-roof.webp',
    '/corrugated-metal-residential-roof2.webp'
  ], 
  alt: 'Modern Metal Design', 
  title: 'Corrugated Metal', 
  description: "Transform your custom home with our premium corrugated metal roofing, blending timeless architectural character with modern performance. These striking roofs feature rhythmic wave patterns that create dynamic shadow lines and visual texture across your home's silhouette. Engineered for exceptional durability, our corrugated metal roofing withstands decades of harsh weather while requiring minimal maintenance. Built for longevity and cost-effectiveness, these roofs offer reliable protection that can help reduce long-term maintenance expenses. Available in a spectrum of designer colors and finishes—from weathered copper patinas to sleek contemporary matte blacks—to complement any architectural style. Environmentally conscious homeowners appreciate that our metal roofing contains recycled content and is 100% recyclable at the end of its remarkably long lifespan.", 
  category: 'residential' 
},
{ 
  id: 17, 
  images: [
    '/modern-residential-home.webp'
  ], 
  alt: 'Contemporaty Metal Style', 
  title: 'Modern Architectural Innovation', 
  description: "This bold hillside residence features a contemporary design with dramatic geometric volumes and extensive glazing. The integrated metal roofing system complements the home's minimalist aesthetic while providing superior insulation and weather protection in challenging mountain conditions.", 
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
    '/roofing-in-progress2.webp',
    '/roofing-in-progress.webp',
    '/roofing-in-progress3.webp',
    '/roofing-in-progress4.webp',
    '/roofing-in-progress5.webp',
    '/roofing-in-progress6.webp'
  ], 
  alt: 'Roofing in Progress - construction photos', 
  title: 'Roofing in Progress', 
  description: 'A visual journey through our expert installation process, featuring precision detailing, skilled craftsmanship, and architectural transformations. This collection showcases our team navigating complex rooflines, installing premium materials, and implementing advanced weatherproofing techniques. From initial framework to finished masterpieces, these images highlight the meticulous attention to detail that ensures lasting protection and visual appeal for every project. Witness the evolution of structures as our skilled professionals bring architectural visions to life through expert roofing solutions.', 
  category: 'residential' 
},
{ 
  id: 21, 
  images: [
    '/shake-shingle-gallery.webp',
    '/shake-shingle-home.webp',
    '/shake-shingle-services.webp'
  ], 
  alt: 'Roofing in Progress - construction photos', 
  title: 'Shake Legacy', 
  description: "Elevate your custom home with our premium composite shake shingles, capturing the authentic beauty of natural cedar with advanced engineered performance. These meticulously crafted shingles replicate the organic texture and dimensional depth of traditional wood shake, creating rich shadow lines and rustic charm that ages gracefully over time. Engineered for superior durability, our composite shake shingles resist fire, impact, and moisture while eliminating the maintenance demands of natural wood—no splitting, warping, or regular treatments required. Built for energy efficiency, these shingles provide excellent insulation properties that can help regulate your home's temperature year-round. Available in an array of natural wood tones and weathered finishes—from warm cedar browns to silvered driftwood grays—to complement both traditional and contemporary architectural styles. Environmentally conscious homeowners value that our composite shingles offer the classic aesthetic of wood shake without contributing to deforestation, while providing decades of reliable performance.", 
  category: 'residential' 
},
{ 
  id: 22, 
  images: [
    '/davinci-new-home-roof.webp',
    '/davinci-new-home-snow-retention.webp',
    '/davinci-shake-roof-garage.webp',
    '/composite-shake-mountain-home.webp'
  ], 
  alt: 'Roofing in Progress - construction photos', 
  title: 'Mountain Shake', 
  description: "This stunning Utah mountain home showcases the perfect blend of rustic elegance and modern protection with DaVinci composite shake shingles. The rich, natural wood-like texture complements the home's stone and timber architecture while providing superior durability against harsh mountain weather. Notice the strategically placed snow retention system along the rooflines—essential for Utah's heavy snowfall, these guards prevent dangerous snow slides while maintaining the roof's clean aesthetic. DaVinci's composite technology delivers the timeless beauty of cedar shake with none of the maintenance, giving this luxury retreat both curb appeal and peace of mind for years to come.", 
  category: 'residential' 
},
{ 
  id: 23, 
  images: [
    '/new-home-metal-ashphalt-roof.webp'
  ], 
  alt: 'Metal and asphalt shingle roof on a luxury home', 
  title: 'Contemporary Design', 
  description: "This beautiful modern home showcases the perfect blend of contemporary design and quality craftsmanship. The multi-level structure features sleek metal roofing that complements the stone and glass exterior, creating clean lines against the natural hillside setting. Large windows flood the interior with warm light, while the wraparound deck and outdoor living spaces take full advantage of the scenic views. The metal roofing system not only provides superior durability and weather protection but also enhances the home's architectural appeal with its crisp, linear profile. This project demonstrates how premium roofing materials can elevate both the functionality and aesthetic impact of modern residential construction.", 
  category: 'residential' 
},
{ 
  id: 24, 
  images: [
    '/shake-roof-copper-gutters.webp',
    '/shake-roof-copper-gutters2.webp'
  ], 
  alt: 'Shake roof with copper gutters and accents', 
  title: 'Elegant Shake & Copper', 
  description: "This elegant stone residence exemplifies timeless architectural design with its beautiful natural stone facade and expertly crafted roof system. The home features classic cedar shake roofing that provides both durability and rich texture, perfectly complementing the limestone exterior. Multiple dormers and varied rooflines create visual interest while maximizing interior space and natural light. The warm cedar shake shingles create a stunning contrast against the natural surroundings, while the clean lines and expert installation demonstrate superior workmanship. The roofing extends seamlessly across multiple levels and angles, showcasing the skill required for complex residential projects. This installation highlights how quality roofing materials and professional craftsmanship can enhance both the beauty and long-term performance of your home.", 
  category: 'residential' 
},
{ 
  id: 25, 
  images: [
    '/asphalt-roof-project.webp'
  ], 
  alt: 'Luxury custom home with asphalt shingles', 
  title: 'Custom Architectural Shingle', 
  description: "This impressive custom home showcases the perfect harmony between traditional design and modern luxury living. The expansive residence features premium architectural shingle roofing that delivers both outstanding durability and classic curb appeal. Multiple gable sections and varied rooflines create dynamic visual interest while demonstrating the precision required for complex residential roofing projects. The high-quality roofing system seamlessly integrates with the stone and siding exterior, providing reliable weather protection across the home's generous footprint. Set against a dramatic evening sky, this project exemplifies how expert roofing installation and premium materials can enhance both the architectural beauty and long-term value of your home investment.", 
  category: 'residential' 
},
{ 
  id: 26, 
  images: [
    '/farmhouse-metal-roof.webp'
  ], 
  alt: 'Contemporary farmhouse with metal roof', 
  title: 'Contemporary Farmhouse', 
  description: "This impressive contemporary farmhouse demonstrates how modern roofing excellence can elevate classic architectural styles. The crisp white exterior is crowned with a sophisticated metal roofing system that combines sleek aesthetics with superior performance. Multiple roof planes and varying pitches create compelling visual depth while showcasing the precision installation required for complex residential projects. The metal roofing's clean lines and durable finish provide long-lasting weather protection while maintaining the home's fresh, timeless appeal. Framed by mature landscaping and set under a brilliant blue sky, this project illustrates how quality roofing materials and expert craftsmanship can transform architectural vision into lasting beauty and reliable protection for your home.", 
  category: 'residential' 
},
  ], []);

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
  }, [currentItem, activeCategory, galleryItems]);

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
              fontSize: 'clamp(1rem, 3.5vw, 1.75rem)',
              fontWeight: 700,
              color: '#1e2761',
              textAlign: 'center',
              marginTop: '2rem',
              marginBottom: '1rem',
              lineHeight: 1.2,
              padding: '0 1rem'
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
                        left: isMobile ? (index % 2 === 0 ? '-1rem' : 'auto') : '-1rem',
                        right: isMobile ? (index % 2 === 1 ? '-1rem' : 'auto') : 'auto',
                        width: 'calc(100% - 1rem)',
                        paddingBottom: '56%',
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
                            priority={index < 3} // Only prioritize first 3 images above fold
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
                href="/quote"
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