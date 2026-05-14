'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Star, Trophy, Zap } from 'lucide-react'

interface XPProgressCardProps {
  xp: number
  nextLevelXp: number
  level: number
}

export function XPProgressCard({ xp, nextLevelXp, level }: XPProgressCardProps) {
  const xpPercentage = Math.min((xp / nextLevelXp) * 100, 100)
  const remainingXp = Math.max(nextLevelXp - xp, 0)

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="cd-xp">
      <div className="cd-xp__header">
        <div className="cd-xp__title-wrap">
          <div className="cd-xp__badge">
            <Trophy size={24} fill="currentColor" />
          </div>
          <div>
            <p className="cd-section-eyebrow">Progresso do heroi</p>
            <h2 className="cd-xp__title">Nivel {level}</h2>
          </div>
        </div>

        <div className="cd-xp__value">
          <strong>{xp}</strong>
          <span>XP</span>
        </div>
      </div>

      <div className="cd-xp__meta">
        <span>
          <Star size={15} fill="currentColor" />
          {remainingXp} XP para o nivel {level + 1}
        </span>
        <strong>
          {Math.round(xpPercentage)}%
          <ArrowUpRight size={14} />
        </strong>
      </div>

      <div className="cd-xp__bar" aria-label={`Progresso de XP: ${Math.round(xpPercentage)}%`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${xpPercentage}%` }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="cd-xp__tiles">
        <div className="cd-xp__tile cd-xp__tile--dark">
          <span>
            <Zap size={13} fill="currentColor" />
            Energia
          </span>
          <strong>Alta</strong>
        </div>
        <div className="cd-xp__tile cd-xp__tile--light">
          <span>Proximo marco</span>
          <strong>Nivel {level + 1}</strong>
        </div>
      </div>
    </motion.section>
  )
}
