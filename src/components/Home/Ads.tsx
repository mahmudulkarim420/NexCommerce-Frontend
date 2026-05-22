"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Image from "next/image";
import { useGetCenterBanner } from "@/src/utils/banner/useCenterBanner";

function Ads() {
  const { ads, loading, error } = useGetCenterBanner();

  if (loading || error) return null;

  // Filter active ads
  const activeAds = Array.isArray(ads)
    ? ads.filter(
        (item) =>
          item?.status === "active" && Array.isArray(item?.images) && item.images.length > 0,
      )
    : [];

  if (!activeAds.length) return null;

  return (
    <section className="relative bg-black py-16 lg:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl" />
        
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

      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-gray-400 text-sm">Featured Promotions</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Deals</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don&apos;t miss out on these limited-time offers and special promotions
          </p>
        </motion.div>

        {/* Ads Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activeAds.slice(0, 3).map((ad, index) => (
            <motion.div
              key={ad._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={ad.images[0]}
                  alt={ad.title || "Promotional Banner"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Deal Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-xs font-bold rounded-full">
                    {index === 0 ? "HOT DEAL" : index === 1 ? "FLASH SALE" : "LIMITED"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                  {ad.title || "Special Offer"}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {ad.description || "Don't miss out on this amazing deal. Limited time only!"}
                </p>
                <button className="inline-flex items-center gap-2 text-amber-400 font-semibold text-sm group/btn">
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300">
            <span>View All Promotions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
    </section>
  );
}

export default Ads;
