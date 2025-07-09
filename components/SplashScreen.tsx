'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [hide, setHide] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const delay = 1000;
    const timer = setTimeout(() => setHide(true), delay);
    const removeTimer = setTimeout(() => setShow(false), delay + 700);
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-20 flex items-center justify-center bg-white transition-transform duration-700 will-change-transform ${hide ? 'pointer-events-none -translate-y-full' : ''} `}
    >
      <div>
        <img src="/favicon.png" alt="logo" className="mx-auto mb-4 h-16 w-16 animate-bounce" />
        <h2 className="text-center text-lg font-bold text-gray-800">Quotation App</h2>
        <h3 className="text-center text-lg font-bold text-gray-800">載入中...</h3>
      </div>
    </div>
  );
}
