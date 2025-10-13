import './globals.css';
import ScrollNavbarWrapper from '../components/ScrollNavbarWrapper';
import Footer from '../components/Footer';
import { Montserrat } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { LocalBusinessSchema } from '../components/StructuredData';
import type { Metadata } from 'next';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Bro's Construction - Premier Roofing & Custom Metal Siding | Salt Lake City & Wasatch Front",
    template: "%s | Bro's Construction"
  },
  description: "Expert roofing services in Salt Lake City and the Wasatch Front. Specializing in metal roofing, asphalt shingles, composite shake, flat roofing (TPO/EPDM), custom metal siding, and roof repairs. 24+ years of experience. Licensed & insured. Free estimates. Call (801) 867-0576.",
  keywords: [
    "roofing contractor Salt Lake City",
    "metal roofing Utah",
    "custom metal siding",
    "asphalt shingle installation",
    "composite shake roofing",
    "TPO roofing",
    "EPDM roofing",
    "flat roofing",
    "roof repair Salt Lake City",
    "Wasatch Front roofing",
    "residential roofing",
    "commercial roofing",
    "Herriman roofing",
    "Utah County roofing",
    "Davis County roofing",
    "Weber County roofing",
    "Summit County roofing",
    "licensed roofer Utah",
    "roof replacement",
    "standing seam metal roof",
    "gutter installation",
    "roof deck systems",
    "heated roofing",
    "snow retention systems"
  ],
  authors: [{ name: "Bro's Construction" }],
  creator: "Bro's Construction",
  publisher: "Bro's Construction",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bros-construction.com',
    title: "Bro's Construction - Premier Roofing Services | Salt Lake City & Wasatch Front",
    description: "24+ years of expert roofing services. Metal roofing, asphalt shingles, composite shake, flat roofing, custom metal siding, and repairs. Licensed & insured. Serving Salt Lake City and the Wasatch Front. Free estimates.",
    siteName: "Bro's Construction",
    images: [
      {
        url: 'https://bros-construction.com/roofing-exterior-home.webp',
        width: 1200,
        height: 630,
        alt: "Bro's Construction - Premium Roofing Services"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bro's Construction - Premier Roofing Services | Salt Lake City",
    description: "24+ years of expert roofing services. Metal roofing, asphalt shingles, custom siding, and more. Licensed & insured.",
    images: ['https://bros-construction.com/roofing-exterior-home.webp']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://bros-construction.com'
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#1e2761',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <LocalBusinessSchema />
      </head>
      <body>
        <ScrollNavbarWrapper />
        {children}
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}