import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us - 40+ Years of Roofing Excellence | Bro's Construction",
  description: "Learn about Bro's Construction's family legacy in roofing. Founded in 2001 by brothers Kent and Mike Mangum, with 40+ years of combined experience. Now led by Jordan and Savannah Mangum, serving Salt Lake City and the Wasatch Front with quality craftsmanship.",
  keywords: [
    "about Bro's Construction",
    "roofing company history",
    "family roofing business",
    "Salt Lake City roofers",
    "Mangum roofing",
    "experienced roofing contractor",
    "Utah roofing company",
    "Wasatch Front roofers"
  ],
  openGraph: {
    title: "About Bro's Construction - Four Decades of Roofing Excellence",
    description: "Family-owned roofing company with 40+ years of experience serving Salt Lake City and the Wasatch Front.",
    type: 'website',
    url: 'https://bros-construction.com/about',
    images: [
      {
        url: 'https://bros-construction.com/Bros-roofing-hero-poster.jpg',
        width: 1200,
        height: 630,
        alt: "Bro's Construction - About Us"
      }
    ]
  },
  alternates: {
    canonical: 'https://bros-construction.com/about'
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
