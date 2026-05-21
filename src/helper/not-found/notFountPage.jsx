"use client";
import React, { useState, useEffect } from "react";
import { Home, Search, ShoppingBag, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

const PageNotFound = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGoHome = () => {
    console.log("Navigating to home...");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-indigo-200 rounded-full opacity-20 animate-ping delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-pink-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div
        className={`container  mx-auto text-center transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Logo/Brand */}
        <div className="mb-8 lg:mt-24">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r  from-emerald-600 via-green-600 to-teal-600 rounded-2xl mb-4 transform hover:scale-110 transition-transform duration-300">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">NexCommerce</h1>
        </div>

        {/* 404 Number Animation */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r  from-emerald-600 via-green-600 to-teal-600 animate-pulse">
            404
          </div>
          <div className="w-32 h-1 bg-gradient-to-r  from-emerald-600 via-green-600 to-teal-600 mx-auto rounded-full mt-4 animate-pulse"></div>
        </div>

        {/* Main Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            পেজ খুঁজে পাওয়া যায়নি!
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি আর এখানে নেই।
          </p>
          <p className="text-base text-gray-500">হয়তো এটি সরানো হয়েছে বা URL ভুল হয়েছে।</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="পণ্য খুঁজুন..."
                onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:border-teal-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r  from-emerald-600 via-green-600 to-teal-600 text-white px-6 py-2 rounded-full hover:from-teal-600 hover:to-green-600 transition-all duration-300 hover:scale-105"
              >
                খুঁজুন
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            href="/"
            onClick={handleGoHome}
            className="group flex items-center space-x-2 bg-gradient-to-r  from-emerald-600 via-green-600 to-teal-600 text-white px-6 py-3 rounded-full hover:from-teal-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span>হোমে ফিরুন</span>
          </Link>

          <Link
            href="/shop"
            onClick={handleGoBack}
            className="group flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-full border-2 border-gray-200 hover:border-gray-300 hover:bg-white transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>পূর্বের পেজে যান</span>
          </Link>
        </div>

        {/* Popular Categories */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">জনপ্রিয় ক্যাটাগরি</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "ইলেকট্রনিক্স", emoji: "📱" },
              { name: "ফ্যাশন", emoji: "👕" },
              { name: "বই", emoji: "📚" },
              { name: "খেলনা", emoji: "🧸" },
              { name: "কসমেটিক্স", emoji: "💄" },
              { name: "রান্নাঘর", emoji: "🍳" },
              { name: "খেলাধুলা", emoji: "⚽" },
              { name: "জুয়েলারি", emoji: "💍" },
            ].map((category, index) => (
              <button
                key={index}
                className="group flex flex-col items-center p-3 bg-white/50 rounded-xl hover:bg-white/80 transition-all duration-300 transform hover:scale-105 hover:shadow-md border border-white/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {category.emoji}
                </div>
                <span className="text-sm text-gray-700 font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-500">
          <p className="mb-2">সাহায্যের প্রয়োজন? আমাদের সাথে যোগাযোগ করুন:</p>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="hover:text-teal-600 transition-colors duration-300 hover:underline"
            >
              📞 সাপোর্ট
            </a>
            <a
              href="#"
              className="hover:text-teal-600 transition-colors duration-300 hover:underline"
            >
              💬 লাইভ চ্যাট
            </a>
            <a
              href="#"
              className="hover:text-teal-600 transition-colors duration-300 hover:underline"
            >
              📧 ইমেইল
            </a>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-6">
          <button
            onClick={() => window.location.reload()}
            className="group inline-flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-all duration-300"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-sm">পেজ রিফ্রেশ করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
