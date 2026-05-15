'use client'

import { useWorldState, WorldVibe } from '@/stores/use-world-state'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * ✨ WorldStateOverlay
 * 
 * Aplica filtros visuais e tons de cor globais baseados no estado do mundo.
 * Ex: Tons quentes no pôr do sol, azul profundo à noite.
 */

const VIBE_CONFIGS: Record<WorldVibe, { color: string, brightness: number }> = {
  dawn: { color: 'rgba(249, 115, 22, 0.05)', brightness: 1.05 },
  day: { color: 'rgba(255, 255, 255, 0)', brightness: 1 },
  golden_hour: { color: 'rgba(245, 158, 11, 0.1)', brightness: 0.95 },
  dusk: { color: 'rgba(49, 46, 129, 0.15)', brightness: 0.85 },
  night: { color: 'rgba(15, 23, 42, 0.3)', brightness: 0.7 }
}

export function WorldStateOverlay() {
  const { vibe, updateVibe, isRitualActive } = useWorldState()

  useEffect(() => {
    updateVibe()
    const interval = setInterval(updateVibe, 60000) // Checar a cada minuto
    return () => clearInterval(interval)
  }, [updateVibe])

  // Sincronizar estado do mundo com o Body para CSS selectors
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-world-state', vibe)
      document.body.setAttribute('data-ritual-active', String(isRitualActive))
    }
  }, [vibe, isRitualActive])

  const config = VIBE_CONFIGS[vibe]
  const ritualMultiplier = isRitualActive ? 0.6 : 1 // Dim more during ritual

  return (
    <>
      {/* Global Color/Brightness Filter */}
      <motion.div
        animate={{ 
          backgroundColor: isRitualActive ? 'rgba(6, 12, 32, 0.4)' : config.color,
          opacity: 1 
        }}
        transition={{ duration: 4 }}
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{ 
          filter: `brightness(${config.brightness * ritualMultiplier}) saturate(${isRitualActive ? 0.8 : 1.1})`,
          mixBlendMode: 'multiply'
        }}
      />
      
      {/* Night Particles (Fireflies) */}
      <AnimatePresence>
        {(vibe === 'dusk' || vibe === 'night') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[9998]"
          >
            {[...Array(isRitualActive ? 8 : 12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  x: [Math.random() * 100 + 'vw', Math.random() * 100 + 'vw'],
                  y: [Math.random() * 100 + 'vh', Math.random() * 100 + 'vh'],
                  opacity: [0, isRitualActive ? 0.3 : 0.6, 0]
                }}
                transition={{ 
                  duration: (isRitualActive ? 12 : 5) + Math.random() * 5, 
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute w-1 h-1 bg-amber-200 rounded-full blur-[1px]"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
