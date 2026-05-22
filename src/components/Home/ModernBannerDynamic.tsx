"use client";
import React from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useHomeBanner } from "@/src/utils/useHomeBanner";

const ModernBannerDynamic = () => {
  const { homebanner, loading, error } = useHomeBanner();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  // Filter only active banners from API
  const slides = React.useMemo(() => {
    if (!homebanner || !Array.isArray(homebanner)) return [];
    return homebanner.filter((banner) => banner.active === true);
  }, [homebanner]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides?.length) % slides?.length);
  };

  // Auto play functionality
  React.useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;
    const interval = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length, currentSlide]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (loading) {
    return (
      <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[750px] bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error || !slides?.length) {
    // Fallback to static banner if no data
    return <StaticModernBanner />;
  }

  const currentBanner = slides[currentSlide];

  return (
    <div
      className="relative w-full h-[500px] sm:h-[600px] lg:h-[750px] bg-[#0a0a0a] overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide._id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide?.image || (Array.isArray(slide?.images) ? slide?.images[0] : null) || ""}
              alt={slide?.title || "Banner"}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          </div>
        ))}
      </div>

      {/* Animated Wave Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[120%] h-full opacity-30">
          <svg
            className="absolute top-0 right-0 w-full h-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <g className="animate-wave-slow">
              <path
                d="M 0 400 Q 200 300 400 400 T 800 400 T 1200 400 L 1200 800 L 0 800 Z"
                fill="url(#waveGradient1)"
                opacity="0.3"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 
                     bg-white/10 hover:bg-white/20 backdrop-blur-sm 
                     text-white p-2 md:p-3 rounded-full 
                     transition-all duration-300
                     opacity-0 group-hover:opacity-100
                     hover:scale-110 active:scale-95
                     border border-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 
                     bg-white/10 hover:bg-white/20 backdrop-blur-sm 
                     text-white p-2 md:p-3 rounded-full 
                     transition-all duration-300
                     opacity-0 group-hover:opacity-100
                     hover:scale-110 active:scale-95
                     border border-white/20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </>
      )}

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-3xl">
          {/* Small Label */}
          <div className="inline-block mb-6 sm:mb-8 animate-fade-up">
            <span className="text-amber-400 text-xs sm:text-sm font-medium tracking-wider uppercase border border-amber-400/30 px-4 py-2 rounded-sm backdrop-blur-sm">
              Featured Collection
            </span>
          </div>

          {/* Main Heading - Using API title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-6 sm:mb-8">
            {currentBanner?.title?.split(" ").map((word, index) => {
              const isLastWord = index === currentBanner.title.split(" ").length - 1;
              return (
                <span
                  key={index}
                  className={`block tracking-tight ${
                    isLastWord
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600"
                      : "text-white"
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </h1>

          {/* Description - Using API description */}
          {(currentBanner?.Description || currentBanner?.description) && (
            <div className="mb-8 sm:mb-10">
              <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
                {currentBanner?.Description || currentBanner?.description}
              </p>
            </div>
          )}

          {/* CTA Button */}
          <Link href="/products">
            <button className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-amber-400 text-amber-400 font-semibold text-sm sm:text-base uppercase tracking-wider overflow-hidden transition-all duration-300 hover:text-black">
              <span className="absolute inset-0 bg-amber-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">Explore Collection</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </div>

      {/* Dots indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-amber-400 w-8" : "bg-white/40 w-2 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </div>
  );
};

// Static fallback banner
const StaticModernBanner = () => {
  return (
    <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[750px] bg-[#0a0a0a] overflow-hidden">
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
            </defs>
            <g className="animate-wave-slow">
              <path
                d="M 0 400 Q 200 300 400 400 T 800 400 T 1200 400 L 1200 800 L 0 800 Z"
                fill="url(#waveGradient1)"
                opacity="0.3"
              />
            </g>
          </svg>
        </div>
        <div className="absolute top-1/4 right-0 w-[80%] h-[60%] opacity-40">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-500 to-amber-500 blur-3xl animate-pulse-slow" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-3xl">
          <div className="inline-block mb-6 sm:mb-8">
            <span className="text-amber-400 text-xs sm:text-sm font-medium tracking-wider uppercase border border-amber-400/30 px-4 py-2 rounded-sm backdrop-blur-sm">
              Season 04 / Core
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-6 sm:mb-8">
            <span className="block text-white tracking-tight">ENGINEERED</span>
            <span className="block text-white tracking-tight">FOR THE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 tracking-tight">
              AVANT-GARDE
            </span>
          </h1>

          <div className="mb-8 sm:mb-10 space-y-2">
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
              Discover the intersection of digital craft and physical luxury.
            </p>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
              Precision-milled accessories for the modern aesthetician.
            </p>
          </div>

          <Link href="/products">
            <button className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-amber-400 text-amber-400 font-semibold text-sm sm:text-base uppercase tracking-wider overflow-hidden transition-all duration-300 hover:text-black">
              <span className="absolute inset-0 bg-amber-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">Explore Collection</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </div>
  );
};

export default ModernBannerDynamic;
