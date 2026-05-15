'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Leaf, Feather, Star, Zap } from 'lucide-react'
import clsx from 'clsx'

interface MagicNestProps {
  streak: number
  level: number
}

export function MagicNest({ streak, level }: MagicNestProps) {
  // Determine evolution stage
  const getStage = () => {
    if (streak >= 30) return 5 // Ancestral Tree
    if (streak >= 15) return 4 // Fireflies
    if (streak >= 8) return 3  // Crystals
    if (streak >= 4) return 2  // Feathers
    return 1 // Simple Nest
  }

  const stage = getStage()

  return (
    <div className="relative w-full aspect-square max-w-[240px] mx-auto flex items-center justify-center p-4">
      {/* Background Glow (Aura) */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1] 
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className={clsx(
          "absolute inset-0 rounded-full blur-[60px] -z-10 transition-colors duration-1000",
          stage >= 3 ? "bg-brand-accent/20" : "bg-brand-primary/15"
        )}
      />

      {/* The Nest Core */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* Stages Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            className="relative flex items-center justify-center w-full h-full"
          >
            {/* Visual Nest Representation */}
            <div className="relative w-40 h-16 bg-gradient-to-b from-[#8B5E34] to-[#5C4033] rounded-[100%] shadow-xl border-t-2 border-[#A67C52]/20 flex items-center justify-center">
               
               {/* Inside the nest */}
               <div className="absolute inset-0 rounded-[100%] bg-black/5 backdrop-blur-[1px]" />

               {/* Stage 2: Magic Feathers */}
               {stage >= 2 && (
                 <div className="absolute -top-4 flex gap-4">
                    {[...Array(stage >= 3 ? 3 : 2)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          y: [0, -4, 0],
                          rotate: [0, 5, 0]
                        }}
                        transition={{ delay: i * 0.5, duration: 3, repeat: Infinity }}
                        className="text-emerald-400"
                      >
                        <Feather size={20} fill="currentColor" className="drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                      </motion.div>
                    ))}
                 </div>
               )}

               {/* Stage 3: Crystals */}
               {stage >= 3 && (
                 <div className="absolute -bottom-1 flex gap-6">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-brand-accent"
                    >
                      <Sparkles size={16} fill="currentColor" />
                    </motion.div>
                 </div>
               )}

               {/* Stage 4: Fireflies (Particles) */}
               {stage >= 4 && (
                  <div className="absolute inset-0 pointer-events-none">
                     {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                             x: [0, (Math.random() - 0.5) * 80, 0],
                             y: [0, (Math.random() - 0.5) * 80, 0],
                             opacity: [0, 0.8, 0]
                          }}
                          transition={{ 
                             duration: 4 + Math.random() * 2, 
                             repeat: Infinity,
                             delay: i * 0.5
                          }}
                          className="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-brand-accent rounded-full blur-[2px]"
                        />
                     ))}
                  </div>
               )}

               {/* Center Indicator (Streak) */}
               <div className="relative z-20 flex items-baseline gap-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">DIA</span>
                  <span className="text-3xl font-black italic tracking-tighter text-white drop-shadow-md">{streak}</span>
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
