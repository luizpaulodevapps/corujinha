'use client'

import { motion } from 'framer-motion'

/**
 * ✨ MagicalParticles
 * 
 * Efeito visual de poeira estelar/vaga-lumes para componentes mágicos.
 */

interface MagicalParticlesProps {
  count?: number
  color?: string
  className?: string
  vibe?: 'calm' | 'energetic'
}

export function MagicalParticles({ 
  count = 6, 
  color = 'var(--brand-accent)', 
  className = '',
  vibe = 'calm'
}: MagicalParticlesProps) {
  const duration = vibe === 'calm' ? 4 : 2

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [0, -60, 0], 
            opacity: [0, 0.4, 0],
            x: [0, (i % 2 === 0 ? 20 : -20), 0]
          }}
          transition={{ 
            duration: duration + Math.random() * 2, 
            repeat: Infinity, 
            delay: i * 0.7 
          }}
          className="absolute bottom-0 left-1/2 w-1 h-1 rounded-full blur-[1px]"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  )
}
