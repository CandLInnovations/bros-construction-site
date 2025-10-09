import './globals.css';
import ScrollNavbarWrapper from '../components/ScrollNavbarWrapper';
import Footer from '../components/Footer';
import { Montserrat } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from 'next';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Bro's Construction - Premium Roofing & Custom Metal Siding | Salt Lake City",
    template: "%s | Bro's Construction"
  },
  description: "Expert roofing and custom metal siding services in Salt Lake City and the Wasatch Front. 24+ years experience in residential and commercial roofing, repairs, and installations.",
  keywords: ["roofing", "metal siding", "Salt Lake City", "Utah", "construction", "roof repair", "roof installation"],
  authors: [{ name: "Bro's Construction" }],
  creator: "Bro's Construction",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: "Bro's Construction - Premium Roofing Services",
    description: "Expert roofing and custom metal siding services in Salt Lake City and the Wasatch Front.",
    siteName: "Bro's Construction",
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