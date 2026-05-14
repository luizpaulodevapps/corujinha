'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, ChevronRight, Coins, Zap } from 'lucide-react'
import { Mission } from '@/types'
import clsx from 'clsx'

interface MissionCardProps {
  mission: Mission
  index: number
  onClick: () => void
}

export function MissionCard({ mission, index, onClick }: MissionCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 260, damping: 24 }}
      onClick={onClick}
      disabled={mission.completed}
      className={clsx('cd-mission-card', mission.completed && 'is-completed')}
    >
      <div className="cd-mission-card__icon">
        {mission.completed ? <CheckCircle2 size={28} /> : mission.icon}
      </div>

      <div className="cd-mission-card__body">
        <div className="cd-mission-card__tags">
          <span>{mission.category}</span>
          <span>{mission.difficulty}</span>
        </div>
        <h3>{mission.title}</h3>
      </div>

      <div className="cd-mission-card__reward">
        {mission.completed ? (
          <span className="cd-mission-card__done">Feita</span>
        ) : (
          <>
            <span>
              <Coins size={15} fill="currentColor" />
              +{mission.coins}
            </span>
            <span>
              <Zap size={13} fill="currentColor" />
              +{mission.xp} XP
            </span>
          </>
        )}
      </div>

      {!mission.completed && (
        <div className="cd-mission-card__arrow">
          <ChevronRight size={20} strokeWidth={3} />
        </div>
      )}
    </motion.button>
  )
}
