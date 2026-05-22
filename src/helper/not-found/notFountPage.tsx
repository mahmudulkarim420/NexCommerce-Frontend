"use client";

import { motion } from "framer-motion";
import { Search, Home, ArrowLeft, Compass, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const popularCategories = [
  { name: "Electronics", icon: "ðŸ“±", href: "/shop?category=electronics" },
  { name: "Fashion", icon: "ðŸ‘•", href: "/shop?category=fashion" },
  { name: "Home", icon: "ðŸ ", href: "/shop?category=home" },
  { name: "Beauty", icon: "ðŸ’„", href: "/shop?category=beauty" },
  { name: "Sports", icon: "âš½", href: "/shop?category=sports" },
  { name: "Books", icon: "ðŸ“š", href: "/shop?category=books" },
];

export default function NotFoundPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <Compass className="w-4 h-4 text-amber-400" />
            <span className="text-gray-400 text-sm">Page Not Found</span>
          </div>
        </motion.div>

        {/* 404 Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 blur-3xl" />
            
            {/* 404 Text */}
            <h1 className="relative text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 leading-none">
              404
            </h1>
            
            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-16 h-16 border-2 border-dashed border-amber-500/30 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -left-4 w-12 h-12 border-2 border-dashed border-yellow-500/30 rounded-full"
            />
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Lost in <span className="text-amber-400">Space</span>?
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            The page you&apos;re looking for seems to have drifted off into the digital cosmos. 
            Let&apos;s help you find your way back.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onSubmit={handleSearch}
          className="max-w-xl mx-auto mb-10"
        >
          <div className="relative flex items-center">
            <div className="absolute left-4 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-12 pr-32 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all duration-300"
            />
            <button
              type="submit"
              className="absolute right-2 px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105"
            >
              Search
            </button>
          </div>
        </motion.form>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            href="/"
            className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Go Back</span>
          </button>
        </motion.div>

        {/* Popular Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-4 justify-center">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-gray-400 text-sm">Popular Categories</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {popularCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
              >
                <Link
                  href={category.href}
                  className="group flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </span>
                  <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">
                    {category.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
