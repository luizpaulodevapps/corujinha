'use client'

import { motion } from 'framer-motion'

export function MagicBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#FDFEFC] dark:bg-[#061F15]" aria-hidden>
      {/* 1. SOFT ATMOSPHERE (Warm & Organic) */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/5 via-transparent to-amber-900/5" />
      
      {/* 2. ATMOSPHERIC HEADER GLOW (Support for Header HUD) */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-[radial-gradient(circle_at_top,rgba(75,156,122,0.06),transparent_70%)]" />

      {/* 3. AMBIENT DEPTH */}
      <motion.div 
        animate={{ opacity: [0.03, 0.08, 0.03], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-[10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-emerald-400/5 blur-[120px]" 
      />
      <motion.div 
        animate={{ opacity: [0.02, 0.06, 0.02], scale: [1, 1.15, 1] }}
        transition={{ duration: 20, repeat: Infinity, delay: 5 }}
        className="absolute bottom-[10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-amber-400/5 blur-[150px]" 
      />

      {/* 4. TEXTURE OVERLAY (Paper/Watercolor feel) */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('/textures/noise.svg')]" />
      
      {/* 5. SOFT VIGNETTE (Focus on content) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(6,31,21,0.12)_100%)]" />
      
      {/* 6. MAGIC FIREFLIES (Warm Amber Spirits) */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -80, 0],
            x: [0, 30, 0],
            opacity: [0, 0.4, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 15 + i * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
          className="absolute h-1.5 w-1.5 bg-amber-400/80 rounded-full blur-[0.8px] shadow-[0_0_8px_rgba(251,191,36,0.6)]"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
        />
      ))}
    </div>
  )
}
