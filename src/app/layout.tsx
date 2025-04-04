import './globals.css';
import type { Metadata } from 'next';
import Navbar from '../components/Navbar';

// Import Montserrat from Google Fonts
import { Montserrat } from 'next/font/google';

// Configure the font
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Regular, Medium, Bold
  display: 'swap', // Ensure font loads quickly
});

export const metadata: Metadata = {
  title: "Bro's Construction",
  description: "Professional construction services for residential and commercial projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}