"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-yellow-500/5 rounded-full blur-2xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative">
            {/* Outer Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 rounded-full border-2 border-dashed border-amber-500/30"
            />
            
            {/* Middle Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border-2 border-dashed border-yellow-500/40"
            />
            
            {/* Inner Circle with Logo */}
            <div className="absolute inset-8 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl font-black text-white"
              >
                Nex<span className="text-amber-400">.</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            Loading <span className="text-amber-400">Experience</span>
          </h2>
          <p className="text-gray-400">Preparing something amazing for you...</p>
        </motion.div>

        {/* Progress Dots */}
        <div className="flex items-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
