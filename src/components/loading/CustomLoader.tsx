"use client";

import { motion } from "framer-motion";

interface CustomLoaderProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  fullScreen?: boolean;
}

export default function CustomLoader({ 
  size = 'medium', 
  message = 'Loading...',
  fullScreen = false 
}: CustomLoaderProps) {
  const sizeConfig = {
    small: { container: 'w-16 h-16', logo: 'text-lg' },
    medium: { container: 'w-24 h-24', logo: 'text-2xl' },
    large: { container: 'w-32 h-32', logo: 'text-3xl' }
  };

  const config = sizeConfig[size];

  const containerClasses = fullScreen 
    ? 'min-h-screen w-full bg-black flex items-center justify-center'
    : 'flex items-center justify-center';

  return (
    <div className={containerClasses}>
      <div className="relative flex flex-col items-center">
        {/* Animated Logo Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`${config.container} relative mb-6`}
        >
          {/* Outer Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/30"
          />
          
          {/* Middle Counter-Rotating Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-2 border-dashed border-yellow-500/40"
          />
          
          {/* Inner Pulsing Circle */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20"
          />
          
          {/* Logo Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`${config.logo} font-black text-white`}>
              Nex<span className="text-amber-400">.</span>
            </span>
          </div>
        </motion.div>

        {/* Loading Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-lg font-semibold text-white mb-2">{message}</p>
          <p className="text-sm text-gray-400">Please wait a moment...</p>
        </motion.div>

        {/* Animated Progress Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center gap-2 mt-6"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
