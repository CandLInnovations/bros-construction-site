import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Get Your Free Roofing Quote - Salt Lake City | Bro's Construction",
  description: "Request a free, no-obligation roofing quote from Bro's Construction. Expert estimates for metal roofing, asphalt shingles, composite shake, flat roofing, and custom siding in Salt Lake City and the Wasatch Front. 24-hour response time.",
  keywords: [
    "free roofing quote",
    "roofing estimate Salt Lake City",
    "metal roofing quote Utah",
    "free roof inspection",
    "roofing cost estimate",
    "Wasatch Front roofing quote",
    "commercial roofing estimate",
    "residential roofing quote"
  ],
  openGraph: {
    title: "Free Roofing Quote - Salt Lake City | Bro's Construction",
    description: "Get a free, detailed quote for your roofing project. We respond within 24 hours with a comprehensive estimate.",
    type: 'website',
    url: 'https://bros-construction.com/quote',
    images: [
      {
        url: 'https://bros-construction.com/cabin-kamas-utah-metal-roof.webp',
        width: 1200,
        height: 630,
        alt: "Get Your Free Roofing Quote"
      }
    ]
  },
  alternates: {
    canonical: 'https://bros-construction.com/quote'
  }
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
