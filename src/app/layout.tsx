import './globals.css'; // Correct path since globals.css is in src/app/
import type { Metadata } from 'next';
import Navbar from '../components/Navbar'; // Adjusted path
import Footer from '../components/Footer'; // Adjusted path
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

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
    <html lang="en" className={montserrat.className}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}