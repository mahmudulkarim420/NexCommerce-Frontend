"use client";

import { motion } from "motion/react";
import {
  ShoppingBag,
  Users,
  Heart,
  Shield,
  Truck,
  Award,
  Star,
  Sparkles,
  Target,
  Zap,
  Globe,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const AboutPage = () => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const stats = [
    {
      icon: Users,
      number: "50K+",
      label: "Happy Customers",
      color: "from-amber-400 to-yellow-500",
    },
    { icon: ShoppingBag, number: "100K+", label: "Products", color: "from-purple-400 to-pink-500" },
    { icon: Award, number: "5 Years", label: "Experience", color: "from-blue-400 to-cyan-500" },
    { icon: Star, number: "4.9", label: "Rating", color: "from-green-400 to-emerald-500" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Your satisfaction is our top priority. Every decision we make puts your needs at the forefront.",
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description:
        "Advanced encryption and security measures protect your data and ensure safe transactions.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Lightning-fast shipping nationwide. Your products arrive when you need them, guaranteed.",
      gradient: "from-amber-500 to-yellow-500",
    },
    {
      icon: Target,
      title: "Quality Assured",
      description:
        "Every product is carefully curated and verified to meet our premium quality standards.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "Innovation Driven",
      description:
        "Cutting-edge technology and modern solutions for a seamless shopping experience.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connecting you to the world's finest products with local expertise and care.",
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  const features = [
    "Largest product collection in Bangladesh",
    "24/7 customer support",
    "Easy return & exchange policy",
    "Secure payment system",
    "Cash on delivery available",
    "Free nationwide delivery",
    "Exclusive member benefits",
    "Price match guarantee",
  ];

  const timeline = [
    {
      year: "2019",
      title: "Founded",
      description: "Started with a vision to revolutionize e-commerce",
    },
    { year: "2020", title: "Expansion", description: "Reached 10,000+ customers nationwide" },
    { year: "2022", title: "Innovation", description: "Launched AI-powered recommendation system" },
    { year: "2024", title: "Leadership", description: "Became the #1 trusted e-commerce platform" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-gray-400 text-sm">About NexCommerce</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-6">
              <span className="block text-white">REDEFINING</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600">
                E-COMMERCE
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Where innovation meets excellence. We're not just an online store—we're your trusted
              partner in discovering premium products.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/shop">
                <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-400/50">
                  <span>Explore Products</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 bg-white/5 border-2 border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300">
                  Contact Us
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-amber-400 to-transparent animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                className="text-center group cursor-pointer"
              >
                <div className="mb-4 flex justify-center">
                  <div
                    className={`p-4 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-300 ${hoveredStat === index ? "scale-110 shadow-lg" : ""}`}
                  >
                    <stat.icon className="w-8 h-8 text-black" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                  Story
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto mb-8" />
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                Since 2019, NexCommerce has been on a mission to transform online shopping in
                Bangladesh. We started with a simple vision: to bring premium quality products to
                every doorstep with unmatched service and reliability.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Today, we're proud to serve over 50,000 happy customers, offering 100,000+ products
                across multiple categories. Our commitment to innovation, quality, and customer
                satisfaction has made us the most trusted e-commerce platform in the region.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                Journey
              </span>
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black text-xl mb-4">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-amber-400/50 to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                Values
              </span>
            </h2>
            <p className="text-gray-400 text-lg">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300"
              >
                <div
                  className={`inline-flex p-4 rounded-full bg-gradient-to-r ${value.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Why Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                NexCommerce?
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Features that set us apart from the rest</p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300 group"
              >
                <CheckCircle2 className="w-6 h-6 text-amber-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Experience{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                Excellence?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover why NexCommerce is the #1 choice
              for online shopping.
            </p>
            <Link href="/shop">
              <button className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-400/50">
                <span>Start Shopping Now</span>
                <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
