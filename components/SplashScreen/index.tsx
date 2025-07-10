'use client';

import { useEffect, useState } from 'react';
import { SplashScreenProps } from './types';

export default function SplashScreen({ delay = 1000, duration = 700 }: SplashScreenProps) {
  const [hide, setHide] = useState(false);
  const [show, setShow] = useState(true);

  const styleClass =
    'fixed inset-0 z-20 flex items-center justify-center bg-white pb-12 transition-transform duration-700 will-change-transform dark:bg-gray-900';

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), delay);
    const removeTimer = setTimeout(() => setShow(false), delay + duration);
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [delay, duration]);

  if (!show) return null;

  return (
    <div
      role="region"
      aria-label="Loading..."
      className={`${styleClass} ${hide ? 'pointer-events-none -translate-y-full' : ''} `}
    >
      <div>
        <img src="/favicon.png" alt="logo" className="mx-auto mb-8 h-20 w-20 animate-bounce" />
        <h2 className="mb-1 border-b border-gray-300 dark:border-gray-700 text-center text-lg font-bold text-gray-800 dark:text-gray-100">
          - Quotation App -
        </h2>
        <h3 className="text-center text-lg font-bold text-gray-800 dark:text-gray-100">Loading...</h3>
      </div>
    </div>
  );
}
