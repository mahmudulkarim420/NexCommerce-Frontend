"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80",
    items: "1,234",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80",
    items: "892",
    color: "from-pink-500 to-rose-400",
  },
  {
    id: 3,
    name: "Home & Living",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
    items: "567",
    color: "from-amber-500 to-yellow-400",
  },
  {
    id: 4,
    name: "Sports",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
    items: "423",
    color: "from-green-500 to-emerald-400",
  },
  {
    id: 5,
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
    items: "1,012",
    color: "from-purple-500 to-violet-400",
  },
  {
    id: 6,
    name: "Technology",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    items: "1,456",
    color: "from-indigo-500 to-blue-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function Categories() {
  return (
    <section className="relative bg-black py-16 lg:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        
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
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-gray-400 text-sm">Explore Our Collection</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Category</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our curated selection across diverse categories, crafted for the modern lifestyle
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href="/shop" className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
                  {/* Image */}
                  <div className="relative h-28 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-80 transition-opacity duration-300`} />
                    
                    {/* Items Count */}
                    <div className="absolute bottom-2 left-2">
                      <span className="text-xs text-white/90 font-medium bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
                        {category.items}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-3 text-center">
                    <h3 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors duration-300">
                      {category.name}
                    </h3>
                  </div>
                  
                  {/* Hover Arrow */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link 
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Categories;
