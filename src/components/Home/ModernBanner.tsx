"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ModernBanner = () => {
  return (
    <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[750px] bg-[#0a0a0a] overflow-hidden">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[120%] h-full">
          <svg
            className="absolute top-0 right-0 w-full h-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* Wave paths with flowing animation */}
            <g className="animate-wave-slow">
              <path
                d="M 0 400 Q 200 300 400 400 T 800 400 T 1200 400 L 1200 800 L 0 800 Z"
                fill="url(#waveGradient1)"
                opacity="0.3"
              />
            </g>
            <g className="animate-wave-medium">
              <path
                d="M 0 450 Q 250 350 500 450 T 1000 450 T 1500 450 L 1500 800 L 0 800 Z"
                fill="url(#waveGradient2)"
                opacity="0.2"
              />
            </g>
            <g className="animate-wave-fast">
              <path
                d="M 0 500 Q 300 400 600 500 T 1200 500 T 1800 500 L 1800 800 L 0 800 Z"
                fill="url(#waveGradient1)"
                opacity="0.15"
              />
            </g>
          </svg>
        </div>

        {/* Additional flowing lines effect */}
        <div className="absolute top-1/4 right-0 w-[80%] h-[60%] opacity-40">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-500 to-amber-500 blur-3xl animate-pulse-slow" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-3xl">
          {/* Small Label */}
          <div className="inline-block mb-6 sm:mb-8">
            <span className="text-amber-400 text-xs sm:text-sm font-medium tracking-wider uppercase border border-amber-400/30 px-4 py-2 rounded-sm backdrop-blur-sm">
              Season 04 / Core
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-6 sm:mb-8">
            <span className="block text-white tracking-tight">ENGINEERED</span>
            <span className="block text-white tracking-tight">FOR THE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 tracking-tight">
              AVANT-GARDE
            </span>
          </h1>

          {/* Description */}
          <div className="mb-8 sm:mb-10 space-y-2">
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
              Discover the intersection of digital craft and physical luxury.
            </p>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
              Precision-milled accessories for the modern aesthetician.
            </p>
          </div>

          {/* CTA Button */}
          <Link href="/products">
            <button className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-amber-400 text-amber-400 font-semibold text-sm sm:text-base uppercase tracking-wider overflow-hidden transition-all duration-300 hover:text-black">
              {/* Button background animation */}
              <span className="absolute inset-0 bg-amber-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />

              {/* Button content */}
              <span className="relative z-10">Explore Collection</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </div>

        {/* Right side text (Premium E-Commerce) */}
        <div className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2">
          <div className="text-right">
            <p className="text-gray-600 text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
              PREMIUM
            </p>
            <p className="text-gray-600 text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
              E-COMMERCE
            </p>
            <p className="text-gray-700 text-4xl xl:text-5xl font-bold tracking-tight leading-tight mt-2">
              FUTURE OF
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </div>
  );
};

export default ModernBanner;
