'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  // Optional: Smooth scroll effect on text (parallax)
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -80]);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black font-mono">
      {/* 🎬 Interstellar Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/interstellar.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🌑 Overlay for contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />

      {/* 🌠 Foreground Text */}
      <motion.div
        style={{ y }}
        className="relative z-20 pt-36 pb-10 px-4 text-center space-y-6"
      >
        {/* 🌌 Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-wider uppercase bg-gradient-to-r from-[#ffffff] via-[#90cdf4] to-[#a78bfa] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(255,255,255,0.25)]">
          Your AI Career Coach
          <br />
          for Professional Success
        </h1>

        {/* 💫 Subtitle */}
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-md shadow-md">
          Advance your journey with futuristic tools, AI-driven insights, and job-winning strategies. You’re not just building a resume — you’re launching into a career galaxy.
        </p>

        {/* 🚀 Buttons */}
        <div className="flex justify-center gap-4">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="px-8 bg-[#00ffc3] text-black hover:bg-[#00e6b2]"
            >
              Get Started
            </Button>
          </Link>
          <Link
            href="https://youtu.be/UbXpRv5ApKA?si=sT3HoPi55aLh3YVv"
            target="_blank"
          >
            <Button
              size="lg"
              className="px-8 border border-[#00ffc3] text-[#00ffc3] hover:bg-[#00ffc310]"
              variant="outline"
            >
              Watch Demo
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

