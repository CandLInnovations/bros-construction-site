import React from 'react';

export function FAQPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long has Bro's Construction been in business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bro's Construction has over 24 years of experience in commercial and residential roofing, siding, and gutters throughout Salt Lake City and the Wasatch Front."
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
  const schema = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "name": "Bro's Construction",
    "image": "https://bros-construction.com/Bros-roofing-hero-poster.jpg",
    "url": "https://bros-construction.com",
    "telephone": "+1-801-867-0576",
    "email": "jordan@bros-construction.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Salt Lake City",
      "addressRegion": "UT",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.7608,
      "longitude": -111.8910
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "50"
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
        "jobTitle": "President"
      },
      {
        "@type": "Person",
        "name": "Savannah Mangum",
        "jobTitle": "Vice President"
      }
    ],
    "foundingDate": "2001",
    "description": "Expert roofing and custom metal siding services in Salt Lake City and the Wasatch Front. 24+ years experience in residential and commercial roofing, repairs, and installations.",
    "slogan": "Premium Roofing & Custom Metal Siding"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
