"use client";

import './globals.css';
import ScrollNavbarWrapper from '../components/ScrollNavbarWrapper';
import Footer from '../components/Footer';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <ScrollNavbarWrapper />
        {children}
        <Footer />
      </body>
    </html>
  );
}