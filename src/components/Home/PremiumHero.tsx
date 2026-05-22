"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const PremiumHero = () => {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
          alt="Premium Background"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Gradient Overlay for Premium Feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Animated Particles/Glow Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-4xl">
          {/* Golden Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6 lg:mb-8"
          >
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] mb-6 lg:mb-8"
          >
            <span className="block text-white tracking-tight mb-2">ENGINEERED</span>
            <span className="block text-white tracking-tight mb-2">FOR THE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 tracking-tight">
              AVANT-GARDE
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8 lg:mb-12 space-y-2"
          >
            <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl leading-relaxed font-light">
              Discover the intersection of digital craft and physical luxury.
            </p>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
              Precision-engineered products for the modern aesthetician. Where innovation meets
              elegance.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/products">
              <button className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-transparent border-2 border-amber-400 text-amber-400 font-bold text-sm sm:text-base uppercase tracking-widest overflow-hidden transition-all duration-500 hover:text-black hover:scale-105 hover:shadow-2xl hover:shadow-amber-400/50">
                {/* Button Background Animation */}
                <span className="absolute inset-0 bg-amber-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

                {/* Button Content */}
                <span className="relative z-10 font-black">Explore Collection</span>
                <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </button>
            </Link>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 lg:mt-16 flex flex-wrap items-center gap-6 lg:gap-8 text-gray-500 text-xs sm:text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-200" />
              <span>Free Worldwide Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-400" />
              <span>Exclusive Collections</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-400 to-transparent animate-pulse" />
        </div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};

export default PremiumHero;
