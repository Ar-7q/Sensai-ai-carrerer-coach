'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black text-white">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
      >
        <source src="/interstellar.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Box */}
      <div className="relative z-10 px-6 py-10 max-w-lg w-full text-center backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl">
        <h1 className="text-7xl md:text-8xl font-extrabold tracking-wide text-white drop-shadow-lg">
          404
        </h1>
        <h2 className="text-2xl mt-4 font-semibold text-indigo-300 drop-shadow-sm">
          Lost in the stars...
        </h2>
        <p className="mt-3 text-sm text-gray-300">
          The page you’re looking for may have warped through a black hole.
        </p>

        <Link href="/">
          <Button className="mt-6 px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 rounded-lg shadow-md">
            Return to Earth
          </Button>
        </Link>
      </div>
    </div>
  );
}
