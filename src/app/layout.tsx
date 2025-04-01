import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Bro's Construction",
  description: "Professional roofing and siding services for residential and commercial projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}