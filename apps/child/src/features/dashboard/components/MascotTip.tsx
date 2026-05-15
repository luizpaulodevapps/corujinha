'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Sparkles } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useMentorGreeting } from '@/features/dashboard/hooks/use-mentor-greeting'

interface MascotTipProps {
  tip: string
  isVisible: boolean
  onClose: () => void
}

export function MascotTip({ tip, isVisible, onClose }: MascotTipProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const { mentor: dominantMentor } = useMentorGreeting()
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // 🎭 Personality-Driven Idle Animations
  const personalities: Record<string, { animate: any, transition: any }> = {
    BOLT: {
      animate: { y: [0, -10, 0], scale: [1, 1.05, 1], rotate: [0, 3, 0, -3, 0] },
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
    GAIA: {
      animate: { x: [-2, 2, -2], y: [0, -4, 0] },
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    },
    LUMI: {
      animate: { opacity: [0.8, 1, 0.8], scale: [0.98, 1, 0.98] },
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    },
    BUBO: {
      animate: { y: [0, -2, 0], rotate: [0, 0.5, 0] },
      transition: { duration: 8, repeat: Infinity, ease: "linear" }
    }
  }

  const currentPersonality = personalities[dominantMentor.toUpperCase()] || personalities.BUBO!

  const startTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setIsExpanded(false), 12000) // 12s for a calmer experience
  }

  useEffect(() => {
    if (isVisible) {
      setIsExpanded(true)
      startTimer()
      // Play companion sound when appearing
      import('@/services/audio-service').then(({ audioService }) => {
        audioService.playEffect('mentor_appear', 'MENTOR', dominantMentor)
      })
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [isVisible, tip, dominantMentor])

  return (
    <div className="fixed bottom-22 right-4 z-[150] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isVisible && isExpanded && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 15, originX: 0.9, originY: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            onClick={() => setIsExpanded(false)}
            className="relative pointer-events-auto cursor-pointer group mb-[-18px] mr-2"
          >
            {/* ☁️ Organic Dialogue Bubble: Balanced & Narrative */}
            <div className="bg-[#F8F6F1]/92 backdrop-blur-sm px-6 py-5 rounded-[2rem] rounded-br-[0.8rem] shadow-[0_18px_50px_-12px_rgba(6,31,21,0.18)] border border-white/70 relative max-w-[280px] min-w-[220px]">
              
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-900/15">
                  <Sparkles size={8} className="animate-pulse" />
                  <span className="text-[7px] font-black tracking-[0.25em] uppercase opacity-50">Sussurro</span>
                </div>
                <p className="text-[15px] font-medium text-emerald-950/88 leading-[1.7] tracking-[-0.01em] font-serif">
                  {tip}
                </p>
              </div>

              {/* Invisible touch area */}
              <div className="absolute -inset-2 rounded-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🦉 The Companion AI: Perched Presence */}
      <motion.button
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        className="pointer-events-auto relative flex items-center justify-center z-10"
        style={{ width: isExpanded ? 84 : 56, height: isExpanded ? 84 : 56 }}
      >
        <AnimatePresence>
          {isVisible && !isExpanded && (
            <motion.span 
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute top-0 right-0 w-5 h-5 bg-brand-accent rounded-full flex items-center justify-center text-emerald-950 shadow-lg z-20 border-2 border-white"
            >
              <MessageCircle size={10} fill="currentColor" />
            </motion.span>
          )}
        </AnimatePresence>

        <div className="relative w-full h-full">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-brand-accent/20 blur-2xl rounded-full opacity-30" />
          
          <motion.img 
            animate={currentPersonality.animate}
            transition={currentPersonality.transition}
            src="/owl_mascot_new.png" 
            alt="Mascote" 
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_8px_12px_rgba(0,0,0,0.12)]" 
          />
        </div>
      </motion.button>
    </div>
  )
}
