"use client";

import React, { useEffect, useState } from 'react';

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
  category: string;
}

// Component to automatically calculate and display years in business
export function YearsInBusinessAnswer() {
  // Starting year of the business
  const foundingYear = 2001; // Company started in 2001 (24 years before 2025)
  
  // State to store the calculated years
  const [yearsInBusiness, setYearsInBusiness] = useState<number>(24); // Default to 24 for SSR
  
  // Calculate the years in business when the component mounts
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = currentYear - foundingYear;
    setYearsInBusiness(years);
  }, []);
  
  return (
    <>
      Bro's Construction has over {yearsInBusiness} years of experience in commercial and residential roofing, siding, and gutters throughout Salt Lake City and the Wasatch Front.
    </>
  );
}

const faqData: FAQItem[] = [
  // General Questions
  {
    question: "How long has Bro's Construction been in business?",
    answer: <YearsInBusinessAnswer />,
    category: "general"
  },
  
  {
    question: "What areas do you serve?",
    answer: "We serve Salt Lake City and the entire Wasatch Front region, including Utah County, Davis County, Weber County, and Summit County. We're locally owned and operated, with specific expertise in Utah's unique climate challenges.",
    category: "general"
  },
  
  {
    question: "Are you licensed and insured?",
    answer: "Yes, Bro's Construction is fully licensed, bonded, and insured in the state of Utah. We maintain comprehensive liability insurance and workers' compensation coverage to protect our clients and employees.",
    category: "general"
  },
  
  // Services Questions
  {
    question: "What roofing services do you offer?",
    answer: (
      <>
        <p>We offer comprehensive roofing services including:</p>
        <ul>
          <li>New roof installation</li>
          <li>Roof replacement and re-roofing</li>
          <li>Roof repairs and maintenance</li>
          <li>Custom metal roofing with on-site fabrication</li>
          <li>Metal siding installation</li>
          <li>Heated roofing systems</li>
          <li>Snow retention systems</li>
          <li>Commercial and residential services</li>
        </ul>
      </>
    ),
    category: "services"
  },
  
  {
    question: "Do you offer emergency roof repairs?",
    answer: "Yes, we understand that roof damage can happen at any time and requires immediate attention. We offer emergency roof repair services for situations like storm damage, leaks, and other urgent issues to prevent further damage to your property.",
    category: "services"
  },
  
  {
    question: "Can you work with my insurance company for storm damage?",
    answer: "Absolutely. We have extensive experience working with insurance companies on storm damage claims. Our team can help document the damage, provide detailed estimates, and work directly with your insurance adjuster to ensure you receive the coverage you're entitled to under your policy.",
    category: "services"
  },
  
  // Materials Questions
  {
    question: "What roofing materials do you work with?",
    answer: (
      <>
        <p>We work with a wide range of high-quality roofing materials including:</p>
        <ul>
          <li>Asphalt shingles (standard and architectural)</li>
          <li>Metal roofing (standing seam, corrugated, metal shingles)</li>
          <li>Synthetic shake and slate</li>
          <li>Natural wood shake and shingles</li>
          <li>Flat roofing materials (TPO, EPDM, PVC)</li>
          <li>Tile (concrete and clay)</li>
          <li>Commercial roofing systems</li>
        </ul>
        <p>We partner with top suppliers including CertainTeed, CMG, DaVinci, Carlisle, and Bartile to provide the highest quality materials for your project.</p>
      </>
    ),
    category: "materials"
  },
  
  {
    question: "What are the benefits of metal roofing in Utah?",
    answer: "Metal roofing is an excellent choice for Utah's climate due to its durability in harsh weather conditions. Benefits include: longevity (40-70 year lifespan), energy efficiency, superior snow shedding capabilities, resistance to fire and high winds, minimal maintenance requirements, and customizable on-site fabrication with our SSQ II MultiPro system. Metal roofs are particularly advantageous in areas with heavy snowfall or wildfire concerns.",
    category: "materials"
  },
  
  {
    question: "Which roofing material is best for Utah's climate?",
    answer: "For Utah's climate with hot summers, cold winters, and significant temperature fluctuations, we recommend several options: 1) Metal roofing for its durability, energy efficiency, and snow-shedding properties; 2) Impact-resistant asphalt shingles for protection against hail and wind; 3) Synthetic slate or shake for a traditional look with modern durability; 4) Snow retention systems to prevent dangerous snow slides. During your consultation, we'll discuss your specific location's microclimate and recommend the optimal solution.",
    category: "materials"
  },
  
  // Process Questions
  {
    question: "How long does a typical roof replacement take?",
    answer: "Most residential roof replacements take 1-3 days, depending on the size, complexity, material type, and weather conditions. Commercial projects typically take longer based on square footage and system specifications. We always provide a specific timeline estimate during your consultation and work efficiently to minimize disruption to your property.",
    category: "process"
  },
  
  {
    question: "Do I need to be home during the roof installation?",
    answer: "No, you don't need to be present during the installation as long as we have access to the work area and electrical outlets. However, we recommend being available at the beginning for any last-minute questions and at completion for a final walkthrough. We maintain clear communication throughout the project regardless of your presence.",
    category: "process"
  },
  
  {
    question: "How do you handle cleanup after a roofing project?",
    answer: "Thorough cleanup is a standard part of our service. We use specialized equipment to remove all nails and debris from your property. Our crews perform multiple sweeps of the area, including magnetic nail sweeps, to ensure no dangerous materials remain. We take pride in leaving your property cleaner than we found it.",
    category: "process"
  },
  
  // Cost & Warranty Questions
  {
    question: "How much does a new roof cost in Utah?",
    answer: "Roofing costs vary based on multiple factors including material type, roof size, pitch, complexity, removal of existing materials, and your specific location. As a general range, asphalt shingle roofs typically cost $5-8 per square foot installed, while metal roofing ranges from $9-15 per square foot. Premium materials like slate, tile, or synthetic products may cost more. We provide detailed, transparent estimates during our consultation process.",
    category: "cost"
  },
  
  {
    question: "Do you offer financing options?",
    answer: "Yes, we understand that a new roof is a significant investment. We offer several financing options with competitive rates and terms to fit different budgets. Our team can help you explore these options during your consultation to find the best solution for your financial situation.",
    category: "cost"
  },
  
  {
    question: "What warranties do you offer?",
    answer: (
      <>
        <p>We stand behind our work with comprehensive warranty coverage:</p>
        <ul>
          <li>Workmanship Warranty: We offer a 5-10 year warranty on our installation labor (varies by project)</li>
          <li>Manufacturer Warranties: We install materials from industry-leading suppliers like CertainTeed, CMG, DaVinci, Carlisle, and Bartile, which come with strong manufacturer warranties (typically 25-50 years depending on the product)</li>
          <li>Extended Warranty Options: For many products, extended warranty options are available</li>
        </ul>
        <p>All warranty details are clearly outlined in your contract, and we provide complete warranty documentation upon project completion.</p>
      </>
    ),
    category: "cost"
  },
  
  // Supplier Questions
  {
    question: "Why do you use CertainTeed products?",
    answer: "We're proud to offer CertainTeed roofing products, known for their exceptional quality and industry-leading warranties. CertainTeed manufactures premium asphalt shingles with advanced technology for superior wind, impact, and algae resistance. They offer a wide selection of styles and colors to enhance your home's curb appeal, backed by one of the strongest warranties in the industry (up to lifetime limited coverage). As a CertainTeed partner, our installation teams are factory-trained to ensure your roof is installed to the highest standards.",
    category: "suppliers"
  },
  
  {
    question: "What does CMG offer for metal roofing?",
    answer: "CMG (Coated Metal Group) is one of our trusted suppliers for premium metal roofing products. They produce high-quality steel and aluminum panels in a variety of profiles, gauges, and finishes specifically designed for the Intermountain West climate. CMG products feature superior paint systems with excellent fade and chalk resistance, essential for Utah's intense UV exposure. Their metal roofing systems offer exceptional durability, energy efficiency, and design flexibility, with warranty protection against extreme weather conditions common in our region.",
    category: "suppliers"
  },
  
  {
    question: "Why would I choose DaVinci synthetic roofing products?",
    answer: "DaVinci Roofscapes creates premium synthetic slate and shake products that provide the authentic appearance of natural materials with enhanced performance benefits. Their products are ideal for Utah's climate due to their Class A fire rating, Class 4 impact resistance (highest rating), and exceptional performance in extreme temperature fluctuations and UV exposure. DaVinci tiles are significantly lighter than natural slate while providing authentic texture and appearance. They're available in a wide variety of colors and blends with a 50-year limited warranty, making them an excellent investment for homeowners seeking premium aesthetics with modern performance.",
    category: "suppliers"
  },
  
  {
    question: "What Carlisle products do you install?",
    answer: "Carlisle is our preferred manufacturer for commercial and flat roofing systems. We install their industry-leading single-ply membranes, including TPO (Thermoplastic Polyolefin), EPDM (Ethylene Propylene Diene Monomer), and PVC systems. Carlisle products are specifically engineered for excellent weathering characteristics, energy efficiency, and long-term performance. Their systems are ideal for commercial buildings, low-slope residential applications, and custom architectural designs, offering warranties up to 30 years. Carlisle's commitment to innovation and quality aligns perfectly with our standards for commercial roofing excellence.",
    category: "suppliers"
  },
  
  {
    question: "What makes Bartile roof tiles special for Utah homes?",
    answer: "Bartile concrete roof tiles are manufactured locally in Utah and specifically designed for our region's climate challenges. These tiles offer the beautiful aesthetics of slate, clay, or shake with enhanced durability and a Class A fire rating. Bartile products excel in our extreme temperature fluctuations and intense UV exposure, with exceptional resistance to freeze-thaw cycles that can damage other roofing materials. Their thermal mass provides natural insulation benefits, and their 75-year warranty offers unmatched peace of mind. As a local Utah manufacturer, Bartile tiles are a sustainable choice that supports the local economy while providing superior protection for your home.",
    category: "suppliers"
  }
];

export default faqData;