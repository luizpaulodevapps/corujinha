'use client'

import { motion } from 'framer-motion'
import { Map, Star } from 'lucide-react'

interface JourneyFooterStatsProps {
  progress: number
}

export function JourneyFooterStats({ progress }: JourneyFooterStatsProps) {
  return (
    <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="cj-footer">
      <div className="cj-footer__icon">
        <Map size={28} strokeWidth={2.6} />
      </div>

      <div className="cj-footer__body">
        <p>Mapa da temporada</p>
        <h3>{progress}% descoberto</h3>
        <div className="cj-footer__bar" aria-label={`Mapa ${progress}% descoberto`}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1.1, ease: 'easeOut' }} />
        </div>
      </div>

      <div className="cj-footer__star">
        <Star size={26} fill="currentColor" />
      </div>
    </motion.section>
  )
}
