"use client";
import React, { useState, useEffect } from "react";
import { ShoppingBag, Users, Heart, Shield, Truck, Award, Star, CheckCircle } from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { icon: Users, number: "50,000+", label: "Happy Customers" },
    { icon: ShoppingBag, number: "100,000+", label: "Products" },
    { icon: Award, number: "5 Years", label: "Experience" },
    { icon: Star, number: "4.9", label: "Rating" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "à¦†à¦®à¦¾à¦¦à§‡à¦° à¦—à§à¦°à¦¾à¦¹à¦•à¦¦à§‡à¦° à¦¸à¦¨à§à¦¤à§à¦·à§à¦Ÿà¦¿à¦‡ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦ªà§à¦°à¦§à¦¾à¦¨ à¦²à¦•à§à¦·à§à¦¯à¥¤ à¦ªà§à¦°à¦¤à¦¿à¦Ÿà¦¿ à¦¸à§‡à¦¬à¦¾à¦¯à¦¼ à¦†à¦®à¦°à¦¾ à¦—à§à¦°à¦¾à¦¹à¦•à§‡à¦° à¦šà¦¾à¦¹à¦¿à¦¦à¦¾à¦•à§‡ à¦¸à¦°à§à¦¬à§‹à¦šà§à¦š à¦…à¦—à§à¦°à¦¾à¦§à¦¿à¦•à¦¾à¦° à¦¦à¦¿à¦¯à¦¼à§‡ à¦¥à¦¾à¦•à¦¿à¥¤",
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description:
        "à¦†à¦ªà¦¨à¦¾à¦° à¦¨à¦¿à¦°à¦¾à¦ªà¦¤à§à¦¤à¦¾ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦•à¦¾à¦›à§‡ à¦…à¦—à§à¦°à¦¾à¦§à¦¿à¦•à¦¾à¦°à¥¤ à¦†à¦®à¦°à¦¾ à¦¸à¦°à§à¦¬à§‹à¦šà§à¦š à¦¨à¦¿à¦°à¦¾à¦ªà¦¤à§à¦¤à¦¾ à¦¬à§à¦¯à¦¬à¦¸à§à¦¥à¦¾ à¦¨à¦¿à¦¶à§à¦šà¦¿à¦¤ à¦•à¦°à§‡ à¦†à¦ªà¦¨à¦¾à¦° à¦¶à¦ªà¦¿à¦‚ à¦…à¦­à¦¿à¦œà§à¦žà¦¤à¦¾ à¦¸à§à¦°à¦•à§à¦·à¦¿à¦¤ à¦°à¦¾à¦–à¦¿à¥¤",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "à¦¦à§à¦°à§à¦¤ à¦“ à¦¨à¦¿à¦°à§à¦­à¦°à¦¯à§‹à¦—à§à¦¯ à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿ à¦¸à§‡à¦¬à¦¾à¥¤ à¦†à¦®à¦°à¦¾ à¦¸à¦¾à¦°à¦¾à¦¦à§‡à¦¶à¦¬à§à¦¯à¦¾à¦ªà§€ à¦¦à§à¦°à§à¦¤à¦¤à¦® à¦¸à¦®à¦¯à¦¼à§‡ à¦†à¦ªà¦¨à¦¾à¦° à¦ªà¦£à§à¦¯ à¦ªà§Œà¦à¦›à§‡ à¦¦à§‡à¦“à¦¯à¦¼à¦¾à¦° à¦œà¦¨à§à¦¯ à¦ªà§à¦°à¦¤à¦¿à¦¶à§à¦°à§à¦¤à¦¿à¦¬à¦¦à§à¦§à¥¤",
    },
  ];

  const features = [
    "à¦¬à¦¾à¦‚à¦²à¦¾à¦¦à§‡à¦¶à§‡à¦° à¦¸à¦¬à¦šà§‡à¦¯à¦¼à§‡ à¦¬à¦¡à¦¼ à¦ªà¦£à§à¦¯à§‡à¦° à¦¸à¦‚à¦—à§à¦°à¦¹",
    "à§¨à§ª/à§­ à¦•à¦¾à¦¸à§à¦Ÿà¦®à¦¾à¦° à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿ",
    "à¦¸à¦¹à¦œ à¦°à¦¿à¦Ÿà¦¾à¦°à§à¦¨ à¦“ à¦à¦•à§à¦¸à¦šà§‡à¦žà§à¦œ à¦¨à§€à¦¤à¦¿",
    "à¦¨à¦¿à¦°à¦¾à¦ªà¦¦ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦¸à¦¿à¦¸à§à¦Ÿà§‡à¦®",
    "à¦•à§à¦¯à¦¾à¦¶ à¦…à¦¨ à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿ à¦¸à§à¦¬à¦¿à¦§à¦¾",
    "à¦¦à§‡à¦¶à¦¬à§à¦¯à¦¾à¦ªà§€ à¦«à§à¦°à¦¿ à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿",
  ];

  return (
    <div className="min-h-screen lg:mt-20 py-5 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div
          className={`container mx-auto px-4 py-16 md:py-24 relative transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-6 animate-pulse">
              NexCommerce
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              à¦¬à¦¾à¦‚à¦²à¦¾à¦¦à§‡à¦¶à§‡à¦° à¦¸à¦¬à¦šà§‡à¦¯à¦¼à§‡ à¦¬à¦¿à¦¶à§à¦¬à¦¸à§à¦¤ à¦…à¦¨à¦²à¦¾à¦‡à¦¨ à¦¶à¦ªà¦¿à¦‚ à¦—à¦¨à§à¦¤à¦¬à§à¦¯
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="mb-4 flex justify-center">
                  <div className="p-4 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-full group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div
              className={`text-center mb-16 transform transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¸à¦®à§à¦ªà¦°à§à¦•à§‡</h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="mb-6 text-lg">
                  à§¨à§¦à§§à§¯ à¦¸à¦¾à¦² à¦¥à§‡à¦•à§‡ NexCommerce à¦¬à¦¾à¦‚à¦²à¦¾à¦¦à§‡à¦¶à§‡à¦° à¦®à¦¾à¦¨à§à¦·à§‡à¦° à¦•à¦¾à¦›à§‡ à¦—à§à¦£à¦—à¦¤ à¦ªà¦£à§à¦¯ à¦¸à¦¾à¦¶à§à¦°à¦¯à¦¼à§€ à¦®à§‚à¦²à§à¦¯à§‡ à¦ªà§Œà¦à¦›à§‡
                  à¦¦à§‡à¦“à¦¯à¦¼à¦¾à¦° à¦²à¦•à§à¦·à§à¦¯à§‡ à¦•à¦¾à¦œ à¦•à¦°à§‡ à¦¯à¦¾à¦šà§à¦›à§‡à¥¤ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¸à§à¦¬à¦ªà§à¦¨ à¦¹à¦²à§‹ à¦ªà§à¦°à¦¤à¦¿à¦Ÿà¦¿ à¦¬à¦¾à¦‚à¦²à¦¾à¦¦à§‡à¦¶à§€ à¦ªà¦°à¦¿à¦¬à¦¾à¦°à§‡à¦° à¦•à¦¾à¦›à§‡
                  à¦¸à¦¹à¦œ à¦“ à¦¨à¦¿à¦°à¦¾à¦ªà¦¦ à¦…à¦¨à¦²à¦¾à¦‡à¦¨ à¦¶à¦ªà¦¿à¦‚ à¦¸à§à¦¬à¦¿à¦§à¦¾ à¦ªà§Œà¦à¦›à§‡ à¦¦à§‡à¦“à¦¯à¦¼à¦¾à¥¤
                </p>
                <p className="text-lg">
                  à¦†à¦®à¦°à¦¾ à¦¬à¦¿à¦¶à§à¦¬à¦¾à¦¸ à¦•à¦°à¦¿ à¦¯à§‡, à¦ªà§à¦°à¦¯à§à¦•à§à¦¤à¦¿à¦° à¦¸à¦ à¦¿à¦• à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦°à§‡à¦° à¦®à¦¾à¦§à§à¦¯à¦®à§‡ à¦†à¦®à¦°à¦¾ à¦®à¦¾à¦¨à§à¦·à§‡à¦° à¦œà§€à¦¬à¦¨à¦¯à¦¾à¦¤à§à¦°à¦¾à¦°
                  à¦®à¦¾à¦¨ à¦‰à¦¨à§à¦¨à¦¯à¦¼à¦¨à§‡ à¦…à¦¬à¦¦à¦¾à¦¨ à¦°à¦¾à¦–à¦¤à§‡ à¦ªà¦¾à¦°à¦¿à¥¤ à¦¤à¦¾à¦‡ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦ªà§à¦°à¦¤à¦¿à¦Ÿà¦¿ à¦¸à§‡à¦¬à¦¾ à¦¡à¦¿à¦œà¦¾à¦‡à¦¨ à¦•à¦°à¦¾ à¦¹à¦¯à¦¼à§‡à¦›à§‡ à¦—à§à¦°à¦¾à¦¹à¦•à§‡à¦°
                  à¦¸à§à¦¬à¦¿à¦§à¦¾à¦•à§‡ à¦®à¦¾à¦¥à¦¾à¦¯à¦¼ à¦°à§‡à¦–à§‡à¥¤
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">à¦†à¦®à¦¾à¦¦à§‡à¦° à¦®à§‚à¦²à§à¦¯à¦¬à§‹à¦§</h2>
            <p className="text-gray-600 text-lg">à¦¯à§‡ à¦¨à§€à¦¤à¦¿à¦—à§à¦²à§‹ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦ªà¦°à¦¿à¦šà¦¾à¦²à¦¨à¦¾ à¦•à¦°à§‡</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-500 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-full">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                à¦•à§‡à¦¨ NexCommerce?
              </h2>
              <p className="text-gray-600 text-lg">à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¬à¦¿à¦¶à§‡à¦·à¦¤à§à¦¬à¦—à§à¦²à§‹ à¦¯à¦¾ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦†à¦²à¦¾à¦¦à¦¾ à¦•à¦°à§‡ à¦¤à§‹à¦²à§‡</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">à¦†à¦®à¦¾à¦¦à§‡à¦° à¦²à¦•à§à¦·à§à¦¯</h2>
            <p className="text-xl leading-relaxed mb-8">
              à¦†à¦®à¦¾à¦¦à§‡à¦° à¦²à¦•à§à¦·à§à¦¯ à¦¹à¦²à§‹ à¦¬à¦¾à¦‚à¦²à¦¾à¦¦à§‡à¦¶à§‡à¦° à¦ªà§à¦°à¦¤à¦¿à¦Ÿà¦¿ à¦®à¦¾à¦¨à§à¦·à§‡à¦° à¦•à¦¾à¦›à§‡ à¦¸à¦¹à¦œ, à¦¨à¦¿à¦°à¦¾à¦ªà¦¦ à¦à¦¬à¦‚ à¦†à¦¨à¦¨à§à¦¦à¦¦à¦¾à¦¯à¦¼à¦• à¦…à¦¨à¦²à¦¾à¦‡à¦¨
              à¦¶à¦ªà¦¿à¦‚ à¦…à¦­à¦¿à¦œà§à¦žà¦¤à¦¾ à¦ªà§Œà¦à¦›à§‡ à¦¦à§‡à¦“à¦¯à¦¼à¦¾à¥¤ à¦†à¦®à¦°à¦¾ à¦šà¦¾à¦‡ à¦ªà§à¦°à¦¤à§à¦¯à§‡à¦•à¦Ÿà¦¿ à¦—à§à¦°à¦¾à¦¹à¦• à¦¯à§‡à¦¨ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¸à¦¾à¦¥à§‡ à¦¶à¦ªà¦¿à¦‚ à¦•à¦°à§‡
              à¦¸à¦¨à§à¦¤à§à¦·à§à¦Ÿ à¦à¦¬à¦‚ à¦–à§à¦¶à¦¿ à¦¹à¦¯à¦¼à§‡ à¦«à¦¿à¦°à§‡ à¦¯à¦¾à¦¨à¥¤
            </p>
            <div className="flex justify-center">
              <div className="w-32 h-1 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¸à¦¾à¦¥à§‡ à¦¯à§à¦•à§à¦¤ à¦¹à¦¨
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            à¦†à¦œà¦‡ à¦¶à§à¦°à§ à¦•à¦°à§à¦¨ à¦†à¦ªà¦¨à¦¾à¦° à¦…à¦¨à¦²à¦¾à¦‡à¦¨ à¦¶à¦ªà¦¿à¦‚ à¦¯à¦¾à¦¤à§à¦°à¦¾ à¦à¦¬à¦‚ à¦…à¦­à¦¿à¦œà§à¦žà¦¤à¦¾ à¦¨à¦¿à¦¨ à¦¸à§‡à¦°à¦¾ à¦¸à§‡à¦¬à¦¾à¦°à¥¤
          </p>
          <Link
            href="/shop"
            className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
          >
            à¦à¦–à¦¨à¦‡ à¦¶à¦ªà¦¿à¦‚ à¦¶à§à¦°à§ à¦•à¦°à§à¦¨
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
