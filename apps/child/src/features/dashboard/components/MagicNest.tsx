'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Feather } from 'lucide-react'
import clsx from 'clsx'

interface MagicNestProps {
  streak: number
  level: number
  isSmall?: boolean
}

export function MagicNest({ streak, level, isSmall = false }: MagicNestProps) {
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
    <div className={clsx(
      "relative w-full h-full flex items-center justify-center transition-all duration-500",
      !isSmall && "max-w-[240px] aspect-square"
    )}>
      {/* Background Glow (Aura) */}
      <motion.div
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        className={clsx(
          "absolute inset-0 rounded-full blur-[20px] transition-colors duration-1000",
          stage >= 3 ? "bg-brand-accent/30" : "bg-emerald-400/20"
        )}
      />

      {/* The Nest Core */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          className="relative z-10 w-full h-full flex items-center justify-center"
        >
          {/* Visual Nest Representation */}
          <div className={clsx(
            "relative bg-gradient-to-b from-[#8B5E34] to-[#5C4033] rounded-[100%] shadow-xl border-t-2 border-[#A67C52]/20 flex items-center justify-center transition-all",
            isSmall ? "w-full h-full" : "w-40 h-16"
          )}>
             {/* Inside the nest */}
             <div className="absolute inset-0 rounded-[100%] bg-black/10 backdrop-blur-[1px]" />

             {/* Stage 2: Magic Feathers */}
             {stage >= 2 && (
               <div className={clsx("absolute flex gap-2", isSmall ? "-top-2" : "-top-4")}>
                  {[...Array(stage >= 3 ? 3 : 2)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ delay: i * 0.5, duration: 3, repeat: Infinity }}
                      className="text-emerald-400"
                    >
                      <Feather size={isSmall ? 10 : 20} fill="currentColor" />
                    </motion.div>
                  ))}
               </div>
             )}

             {/* Stage 3: Crystals */}
             {stage >= 3 && (
               <div className={clsx("absolute flex gap-6", isSmall ? "-bottom-1" : "-bottom-2")}>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-brand-accent"
                  >
                    <Sparkles size={isSmall ? 8 : 16} fill="currentColor" />
                  </motion.div>
               </div>
             )}

             {/* Stage 4: Fireflies */}
             {stage >= 4 && (
                <div className="absolute inset-0 pointer-events-none">
                   {[...Array(isSmall ? 3 : 5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                           y: [0, isSmall ? -15 : -40, 0],
                           opacity: [0, 0.6, 0]
                        }}
                        transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
                        className="absolute left-1/2 top-1/2 w-0.5 h-0.5 bg-brand-accent rounded-full blur-[0.5px]"
                      />
                   ))}
                </div>
             )}

             {/* Center Indicator (Streak) - Hidden if small */}
             {!isSmall && (
               <div className="relative z-20 flex items-baseline gap-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">DIA</span>
                  <span className="text-3xl font-black italic tracking-tighter text-white drop-shadow-md">{streak}</span>
               </div>
             )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
