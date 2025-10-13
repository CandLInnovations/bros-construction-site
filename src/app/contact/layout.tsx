import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us - Get Your Free Roofing Estimate | Bro's Construction",
  description: "Contact Bro's Construction for expert roofing services in Salt Lake City and the Wasatch Front. Call (801) 867-0576 or fill out our contact form for a free consultation. We respond within 24 hours.",
  keywords: [
    "contact roofing contractor",
    "Salt Lake City roofing contact",
    "free roofing estimate",
    "roofing consultation Utah",
    "Bro's Construction contact",
    "roofing contractor phone number",
    "Wasatch Front roofing"
  ],
  openGraph: {
    title: "Contact Bro's Construction - Salt Lake City Roofing Experts",
    description: "Get in touch for expert roofing services. Call (801) 867-0576 or message us for a free consultation.",
    type: 'website',
    url: 'https://bros-construction.com/contact',
    images: [
      {
        url: 'https://bros-construction.com/Bros-roofing-hero-poster.jpg',
        width: 1200,
        height: 630,
        alt: "Contact Bro's Construction"
      }
    ]
  },
  alternates: {
    canonical: 'https://bros-construction.com/contact'
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
