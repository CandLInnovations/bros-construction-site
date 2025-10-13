import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Roofing Project Gallery - Salt Lake City & Wasatch Front | Bro's Construction",
  description: "Browse our portfolio of residential and commercial roofing projects throughout Salt Lake City and the Wasatch Front. View completed metal roofing, asphalt shingles, composite shake, and custom siding installations.",
  keywords: [
    "roofing gallery",
    "roofing projects Salt Lake City",
    "metal roofing examples",
    "Utah roofing portfolio",
    "residential roofing gallery",
    "commercial roofing projects",
    "Wasatch Front roofing",
    "roof installation photos"
  ],
  openGraph: {
    title: "Roofing Project Gallery - Salt Lake City | Bro's Construction",
    description: "Browse our portfolio of residential and commercial roofing projects throughout Salt Lake City and the Wasatch Front.",
    type: 'website',
    url: 'https://bros-construction.com/gallery',
    images: [
      {
        url: 'https://bros-construction.com/Bros-home-kamas-metal-roof.webp',
        width: 1200,
        height: 630,
        alt: "Bro's Construction Roofing Gallery"
      }
    ]
  },
  alternates: {
    canonical: 'https://bros-construction.com/gallery'
  }
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
