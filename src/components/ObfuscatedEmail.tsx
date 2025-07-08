// Create a new component: components/ObfuscatedEmail.tsx
import React, { useState, useEffect } from 'react';

interface ObfuscatedEmailProps {
  className?: string;
  children?: React.ReactNode;
}

const ObfuscatedEmail: React.FC<ObfuscatedEmailProps> = ({ className, children }) => {
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    // Decode the email on client side
    const user = 'jordan';
    const domain = 'bros-construction.com';
    setEmail(`${user}@${domain}`);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (email) {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <a 
      href="#" 
      onClick={handleClick}
      className={className}
      data-email-obfuscated="true"
    >
      {children || email || 'Loading...'}
    </a>
  );
};

export default ObfuscatedEmail;