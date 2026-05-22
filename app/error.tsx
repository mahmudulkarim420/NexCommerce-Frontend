"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Home, RefreshCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl" />
        
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
      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        {/* Error Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-flex items-center justify-center">
            {/* Outer Pulse Ring */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute w-32 h-32 rounded-full border-2 border-red-500/30"
            />
            
            {/* Middle Ring */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.4, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-red-500/20 to-amber-500/20"
            />
            
            {/* Icon Container */}
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center shadow-lg shadow-red-500/20">
              <AlertTriangle className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
          </div>
        </motion.div>

        {/* Error Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-500 to-yellow-500">
            500
          </span>
        </motion.div>

        {/* Error Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Something Went <span className="text-amber-400">Wrong</span>
        </motion.h1>

        {/* Error Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-400 mb-8 max-w-md mx-auto"
        >
          We apologize for the inconvenience. An unexpected error has occurred. 
          Please try again or return to the homepage.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Retry Button */}
          <button
            onClick={reset}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105"
          >
            <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span>Try Again</span>
          </button>

          {/* Home Button */}
          <Link
            href="/"
            className="group flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            <span>Back Home</span>
          </Link>
        </motion.div>

        {/* Error Digest (for debugging) */}
        {error.digest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <p className="text-gray-500 text-sm font-mono">
              Error ID: <span className="text-amber-400">{error.digest}</span>
            </p>
          </motion.div>
        )}

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8"
        >
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
