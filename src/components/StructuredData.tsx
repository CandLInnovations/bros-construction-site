import React from 'react';

export function FAQPageSchema() {
  const yearsInBusiness = new Date().getFullYear() - 2001;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long has Bro's Construction been in business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Bro's Construction has over ${yearsInBusiness} years of experience in commercial and residential roofing, siding, and gutters throughout Salt Lake City and the Wasatch Front.`
        }
      },
      {
        "@type": "Question",
        "name": "What areas do you serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We serve Salt Lake City and the entire Wasatch Front region, including Utah County, Davis County, Weber County, and Summit County. We're locally owned and operated, with specific expertise in Utah's unique climate challenges."
        }
      },
      {
        "@type": "Question",
        "name": "Are you licensed and insured?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Bro's Construction is fully licensed, bonded, and insured in the state of Utah. We maintain comprehensive liability insurance and workers' compensation coverage to protect our clients and employees."
        }
      },
      {
        "@type": "Question",
        "name": "What roofing services do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer comprehensive roofing services including: new roof installation, roof replacement and re-roofing, roof repairs and maintenance, custom metal roofing with on-site fabrication, metal siding installation, heated roofing systems, snow retention systems, and commercial and residential services."
        }
      },
      {
        "@type": "Question",
        "name": "What roofing materials do you work with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We work with a wide range of high-quality roofing materials including: asphalt shingles (standard and architectural), metal roofing (standing seam, corrugated, metal shingles), synthetic shake and slate, natural wood shake and shingles, flat roofing materials (TPO, EPDM, PVC), tile (concrete and clay), and commercial roofing systems. We partner with top suppliers including CertainTeed, CMG, DaVinci, Carlisle, and Bartile."
        }
      },
      {
        "@type": "Question",
        "name": "What are the benefits of metal roofing in Utah?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Metal roofing is an excellent choice for Utah's climate due to its durability in harsh weather conditions. Benefits include: longevity (40-70 year lifespan), energy efficiency, superior snow shedding capabilities, resistance to fire and high winds, minimal maintenance requirements, and customizable on-site fabrication with our SSQ II MultiPro system."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a typical roof replacement take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most residential roof replacements take 1-3 days, depending on the size, complexity, material type, and weather conditions. Commercial projects typically take longer based on square footage and system specifications."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a new roof cost in Utah?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Roofing costs vary based on multiple factors. As a general range, asphalt shingle roofs typically cost $5-8 per square foot installed, while metal roofing ranges from $9-15 per square foot. We provide detailed, transparent estimates during our consultation process."
        }
      },
      {
        "@type": "Question",
        "name": "What warranties do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We stand behind our work with comprehensive warranty coverage including a 5-10 year workmanship warranty on our installation labor, manufacturer warranties from CertainTeed, CMG, DaVinci, Carlisle, and Bartile (typically 25-50 years), and extended warranty options for many products."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const yearsInBusiness = new Date().getFullYear() - 2001;
  const schema = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "name": "Bro's Construction",
    "legalName": "Bro's Construction Corporation",
    "alternateName": "Bros Construction",
    "image": "https://bros-construction.com/Bros-roofing-hero-poster.jpg",
    "url": "https://bros-construction.com",
    "telephone": "+1-801-867-0576",
    "email": "jordan@bros-construction.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5731 W 12900 S",
      "addressLocality": "Herriman",
      "addressRegion": "UT",
      "postalCode": "84096",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.5141,
      "longitude": -112.0327
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Salt Lake City",
        "containedIn": {
          "@type": "State",
          "name": "Utah"
        }
      },
      {
        "@type": "Place",
        "name": "Wasatch Front"
      },
      {
        "@type": "Place",
        "name": "Wasatch Back"
      },
      {
        "@type": "City",
        "name": "Park City"
      },
      {
        "@type": "City",
        "name": "Provo"
      },
      {
        "@type": "City",
        "name": "Ogden"
      }
    ],
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "18:00"
      }
    ],
    "hasCredential": {
  "@type": "EducationalOccupationalCredential",
  "credentialCategory": "Professional License",
  "name": "Roofing Contractor License",
  "identifier": "5274895-5501",
  "issuedBy": {
    "@type": "GovernmentOrganization",
    "name": "Utah Division of Occupational and Professional Licensing",
    "url": "https://dopl.utah.gov/"
  },
  "recognizedBy": {
    "@type": "GovernmentOrganization",
    "name": "State of Utah"
  }
},
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Roofing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Metal Roofing Installation",
            "description": "Premium metal roofing systems including standing seam and corrugated metal"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Asphalt Shingle Installation",
            "description": "Quality asphalt shingle roofing for residential properties"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Composite Shake Roofing",
            "description": "Durable composite shake roofing systems"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Flat Roofing Systems",
            "description": "TPO, EPDM, and PVC commercial flat roofing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Metal Siding",
            "description": "Architectural metal siding for residential and commercial properties"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Roof Repair",
            "description": "Professional roof repair and maintenance services"
          }
        }
      ]
    },

    "founder": [
      {
        "@type": "Person",
        "name": "Kent Mangum"
      },
      {
        "@type": "Person",
        "name": "Mike Mangum"
      }
    ],
    "employee": [
      {
        "@type": "Person",
        "name": "Jordan Mangum",
        "jobTitle": "Owner & President"
      },
      {
        "@type": "Person",
        "name": "Savannah Mangum",
        "jobTitle": "Owner & Vice President"
      },
    {
      "@type": "Person",
      "name": "Kent Mangum",
      "jobTitle": "Estimator"
    }
    ],
    "foundingDate": "2001",
    "description": `Expert roofing and custom metal siding services in Salt Lake City and the Wasatch Front. ${yearsInBusiness}+ years experience in residential and commercial roofing, repairs, and installations.`,
    "slogan": "Premium Roofing & Custom Metal Siding"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function RoofingServicesSchema() {
  const areaServed = [
    {
      "@type": "City",
      "name": "Salt Lake City",
      "containedIn": {
        "@type": "State",
        "name": "Utah"
      }
    },
    {
      "@type": "City",
      "name": "Herriman",
      "containedIn": {
        "@type": "State",
        "name": "Utah"
      }
    },
    {
      "@type": "Place",
      "name": "Wasatch Front"
    },
    {
      "@type": "City",
      "name": "Park City"
    },
    {
      "@type": "City",
      "name": "Provo"
    },
    {
      "@type": "City",
      "name": "Ogden"
    },
    {
      "@type": "City",
      "name": "Lehi"
    },
    {
      "@type": "City",
      "name": "West Jordan",
      "containedIn": "Utah"
    },
    {
      "@type": "City",
      "name": "Sandy",
      "containedIn": "Utah"
    },
    {
      "@type": "City",
      "name": "Murray",
      "containedIn": "Utah"
    },
    {
      "@type": "City",
      "name": "South Jordan",
      "containedIn": "Utah"
    },
    {
      "@type": "City",
      "name": "Draper"
    },
    {
      "@type": "City",
      "name": "Midvale"
    },
    {
      "@type": "City",
      "name": "Taylorsville"
    },
    {
      "@type": "City",
      "name": "Layton"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Salt Lake County"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Utah County"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Davis County"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Weber County"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Summit County"
    }
  ];

  const provider = {
    "@type": "RoofingContractor",
    "name": "Bro's Construction",
    "url": "https://bros-construction.com",
    "telephone": "+1-801-867-0576",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5731 W 12900 S",
      "addressLocality": "Herriman",
      "addressRegion": "UT",
      "postalCode": "84096",
      "addressCountry": "US"
    }
  };

  const services = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://bros-construction.com/services#metal-roofing",
      "serviceType": "Metal Roofing Installation",
      "name": "Metal & Steel Roofing",
      "description": "Long-lasting metal roof systems designed to withstand Utah's harsh weather conditions. Our metal roofing offers superior durability, energy efficiency, and a modern aesthetic with 40-70 year lifespan.",
      "provider": provider,
      "areaServed": areaServed,
      "offers": {
        "@type": "Offer",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "9-15",
          "priceCurrency": "USD",
          "unitText": "per square foot"
        }
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Metal Roofing Types",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Standing Seam Metal Roof",
              "description": "Premium standing seam panels with hidden fastener system"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Corrugated Metal Roofing",
              "description": "Durable corrugated metal panels with classic profile"
            }
          }
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://bros-construction.com/services#asphalt-shingles",
      "serviceType": "Asphalt Shingle Roofing",
      "name": "Asphalt Shingles",
      "description": "Premium asphalt shingle roofing that combines durability, aesthetic appeal, and cost-effectiveness. Ideal for most residential homes with 25-30 year warranty options.",
      "provider": provider,
      "areaServed": areaServed,
      "offers": {
        "@type": "Offer",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "5-8",
          "priceCurrency": "USD",
          "unitText": "per square foot"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://bros-construction.com/services#composite-shake",
      "serviceType": "Composite Shake Roofing",
      "name": "Composite Shake",
      "description": "Classic shake roofing that brings natural beauty and character to your home with both traditional wood and modern composite options available. Superior durability with authentic appearance.",
      "provider": provider,
      "areaServed": areaServed
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://bros-construction.com/services#flat-roofing",
      "serviceType": "Commercial Flat Roofing",
      "name": "Flat Roofing Systems",
      "description": "Specialized flat roofing solutions using TPO, EPDM, and PVC materials designed for commercial buildings and specific residential applications.",
      "provider": provider,
      "areaServed": areaServed,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Flat Roofing Materials",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "TPO Roofing",
              "description": "Energy-efficient white membrane TPO roofing systems"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "EPDM Roofing",
              "description": "Durable EPDM rubber roofing systems"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "PVC Roofing",
              "description": "Premium PVC membrane roofing systems"
            }
          }
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://bros-construction.com/services#tile-roofing",
      "serviceType": "Tile Roofing Installation",
      "name": "Tile Roofing",
      "description": "Elegant and durable tile roofing solutions that add distinctive character to your home. Our tile roofing options are designed for longevity (50+ years) and minimal maintenance.",
      "provider": provider,
      "areaServed": areaServed
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://bros-construction.com/services#custom-metal-siding",
      "serviceType": "Metal Siding Installation",
      "name": "Custom Metal Siding",
      "description": "Premium metal siding solutions that provide durability, low maintenance, and a distinctive modern appearance for your home or commercial building.",
      "provider": provider,
      "areaServed": areaServed
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://bros-construction.com/services#roof-repairs",
      "serviceType": "Roof Repair Service",
      "name": "Roof Repairs & Maintenance",
      "description": "Professional roof repair services addressing leaks, storm damage, and general wear to extend the life of your existing roof system.",
      "provider": provider,
      "areaServed": areaServed
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://bros-construction.com/services#heated-roofing",
      "serviceType": "Heated Roofing & Snow Retention",
      "name": "Heated Roofing & Snow Retention",
      "description": "Specialized solutions for Utah's snowy winters, including heated roof elements and snow retention systems to prevent dangerous snow slides and ice dams.",
      "provider": provider,
      "areaServed": areaServed
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://bros-construction.com/services#roof-deck-systems",
      "serviceType": "Roof Deck Installation",
      "name": "Roof Deck Systems",
      "description": "Transform your flat roof into a usable outdoor space with our roof deck systems featuring wood Ipe or concrete pavers with pedestals for proper drainage.",
      "provider": provider,
      "areaServed": areaServed
    }
  ];

  return (
    <>
      {services.map((service, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
        />
      ))}
    </>
  );
}

export function GallerySchema() {
  const galleryItems = [
    {
      "@type": "ImageObject",
      "name": "Mountain Modern Masterpiece - Metal Roofing",
      "description": "Striking residence with dramatic rooflines and expert metal roofing craftsmanship in Salt Lake City. Premium metal roofing installation showcasing angular geometry and superior durability for alpine conditions.",
      "contentUrl": "https://bros-construction.com/roofing-exterior-home.webp",
      "thumbnailUrl": "https://bros-construction.com/roofing-exterior-home.webp",
      "author": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "creator": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "locationCreated": {
        "@type": "Place",
        "name": "Salt Lake City, Utah"
      }
    },
    {
      "@type": "ImageObject",
      "name": "Alpine Sanctuary - Standing Seam Metal Roof",
      "description": "Mountain cabin with premium standing seam metal roof in Kamas, Utah. Superior protection against heavy snow loads and harsh mountain conditions with modern metal roofing.",
      "contentUrl": "https://bros-construction.com/Bros-home-kamas-metal-roof.webp",
      "thumbnailUrl": "https://bros-construction.com/Bros-home-kamas-metal-roof.webp",
      "author": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "creator": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "locationCreated": {
        "@type": "Place",
        "name": "Kamas, Utah"
      }
    },
    {
      "@type": "ImageObject",
      "name": "Mountain Estate - Architectural Metal Roofing",
      "description": "Stunning Kamas vacation property with premium metal roofing engineered for harsh alpine conditions. Architectural metal installation providing decades of protection against heavy snowfall and UV exposure.",
      "contentUrl": "https://bros-construction.com/cabin-kamas-utah-metal-roof.webp",
      "thumbnailUrl": "https://bros-construction.com/cabin-kamas-utah-metal-roof.webp",
      "author": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "creator": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "locationCreated": {
        "@type": "Place",
        "name": "Kamas, Utah"
      }
    },
    {
      "@type": "ImageObject",
      "name": "Architectural Metal Siding - Custom Installation",
      "description": "Premium custom metal siding delivering sophisticated modern appeal. Expert metal siding installation for residential homes in Salt Lake City, providing superior weather resistance and minimal maintenance.",
      "contentUrl": "https://bros-construction.com/custom-metal-siding.webp",
      "thumbnailUrl": "https://bros-construction.com/custom-metal-siding.webp",
      "author": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "creator": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "locationCreated": {
        "@type": "Place",
        "name": "Salt Lake City, Utah"
      }
    },
    {
      "@type": "ImageObject",
      "name": "Custom Metal Chimney Caps",
      "description": "Elegantly crafted custom metal chimney caps protecting chimneys while enhancing home architecture. Premium metal fabrications with superior weather resistance for Wasatch Front homes.",
      "contentUrl": "https://bros-construction.com/custom-chimney-cap3.webp",
      "thumbnailUrl": "https://bros-construction.com/custom-chimney-cap3.webp",
      "author": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "creator": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "locationCreated": {
        "@type": "Place",
        "name": "Wasatch Front, Utah"
      }
    },
    {
      "@type": "ImageObject",
      "name": "Premium Asphalt Shingle Roofing",
      "description": "Architectural-grade asphalt shingles with enhanced UV resistance and impact protection. Premium asphalt roof installation in Salt Lake City creating sophisticated curb appeal with dimensional profiles.",
      "contentUrl": "https://bros-construction.com/asphalt-shingle-reroof-home.webp",
      "thumbnailUrl": "https://bros-construction.com/asphalt-shingle-reroof-home.webp",
      "author": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "creator": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "locationCreated": {
        "@type": "Place",
        "name": "Salt Lake City, Utah"
      }
    },
    {
      "@type": "ImageObject",
      "name": "Commercial Medical Office Building - Tile Roofing",
      "description": "Flash Pointe Medical Center in Lehi featuring architectural tile roofing. Commercial tile roof installation blending traditional aesthetic with modern durability and fire resistance.",
      "contentUrl": "https://bros-construction.com/commercial-composite-shake-shingle-roof.webp",
      "thumbnailUrl": "https://bros-construction.com/commercial-composite-shake-shingle-roof.webp",
      "author": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "creator": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "locationCreated": {
        "@type": "Place",
        "name": "Lehi, Utah"
      }
    },
    {
      "@type": "ImageObject",
      "name": "Commercial Office Park - TPO Roofing System",
      "description": "Park City office park with TPO roofing system across multi-building complex. Commercial flat roof installation with energy-efficient white membrane for superior UV resistance.",
      "contentUrl": "https://bros-construction.com/apartment-flat-tpo-roof.webp",
      "thumbnailUrl": "https://bros-construction.com/apartment-flat-tpo-roof.webp",
      "author": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "creator": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "locationCreated": {
        "@type": "Place",
        "name": "Park City, Utah"
      }
    },
    {
      "@type": "ImageObject",
      "name": "Commercial Business Park - EPDM Membrane Roofing",
      "description": "Mountain View Business Park in Lehi with premium single-ply EPDM membrane roofing. Commercial roofing installation with reflective surface reducing cooling costs and UV protection.",
      "contentUrl": "https://bros-construction.com/commercial-roof-edpm.webp",
      "thumbnailUrl": "https://bros-construction.com/commercial-roof-edpm.webp",
      "author": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "creator": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "locationCreated": {
        "@type": "Place",
        "name": "Lehi, Utah"
      }
    },
    {
      "@type": "ImageObject",
      "name": "Cedar Shake Roofing with Metal Accents",
      "description": "Cedar shake shingles paired with sleek metal accents in Salt Lake City. Premium wood shake roofing blending timeless beauty with modern durability and weather protection.",
      "contentUrl": "https://bros-construction.com/shake-wood-shingle.webp",
      "thumbnailUrl": "https://bros-construction.com/shake-wood-shingle.webp",
      "author": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "creator": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "locationCreated": {
        "@type": "Place",
        "name": "Salt Lake City, Utah"
      }
    },
    {
      "@type": "ImageObject",
      "name": "Corrugated Metal Residential Roofing",
      "description": "Premium corrugated metal roofing with rhythmic wave patterns creating dynamic shadow lines. Modern metal roof installation in Utah offering exceptional durability and minimal maintenance.",
      "contentUrl": "https://bros-construction.com/corrugated-metal-residential-roof.webp",
      "thumbnailUrl": "https://bros-construction.com/corrugated-metal-residential-roof.webp",
      "author": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "creator": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "locationCreated": {
        "@type": "Place",
        "name": "Utah"
      }
    },
    {
      "@type": "ImageObject",
      "name": "DaVinci Composite Shake with Snow Retention",
      "description": "Utah mountain home with DaVinci composite shake shingles and snow retention system. Premium composite roof installation preventing dangerous snow slides while maintaining authentic wood shake aesthetic.",
      "contentUrl": "https://bros-construction.com/davinci-new-home-roof.webp",
      "thumbnailUrl": "https://bros-construction.com/davinci-new-home-roof.webp",
      "author": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "creator": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Bro's Construction"
      },
      "locationCreated": {
        "@type": "Place",
        "name": "Utah Mountains"
      }
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Bro's Construction Roofing Projects Gallery",
    "description": "Browse our portfolio of residential and commercial roofing projects throughout Salt Lake City and the Wasatch Front. Expert metal roofing, asphalt shingles, composite shake, and custom siding installations.",
    "url": "https://bros-construction.com/gallery",
    "about": {
      "@type": "Service",
      "name": "Professional Roofing Services",
      "provider": {
        "@type": "RoofingContractor",
        "name": "Bro's Construction",
        "telephone": "+1-801-867-0576",
        "url": "https://bros-construction.com"
      }
    },
    "associatedMedia": galleryItems
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
