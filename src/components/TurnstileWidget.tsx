"use client";

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useRef } from 'react';

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  onLoad?: () => void;
  className?: string;
}

export default function TurnstileWidget({
  onVerify,
  onError,
  onExpire,
  onLoad,
  className
}: TurnstileWidgetProps) {
  const ref = useRef<TurnstileInstance>(null);

  const handleError = () => {
    console.error('Turnstile verification failed');
    onError?.();
  };

  const handleExpire = () => {
    console.log('Turnstile token expired');
    onExpire?.();
  };

  return (
    <div className={className}>
      <Turnstile
        ref={ref}
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={onVerify}
        onError={handleError}
        onExpire={handleExpire}
        onLoad={onLoad}
        options={{
          theme: 'light',
          size: 'normal'
        }}
      />
    </div>
  );
}