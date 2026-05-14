'use client'

import { motion, type MotionStyle } from 'framer-motion'
import { BookOpen, CalendarClock, CheckCircle2, ChevronRight, Dumbbell, Lock, Sparkles, Users } from 'lucide-react'
import clsx from 'clsx'
import { JourneyEvent } from '@/features/journey/types'

interface JourneyCardProps {
  event: JourneyEvent
  onClick: (event: JourneyEvent) => void
  index: number
}

const TYPE_ICON = {
  school: BookOpen,
  sports: Dumbbell,
  family: Users
}

export function JourneyCard({ event, onClick, index }: JourneyCardProps) {
  const completedMissions = event.missions.filter(mission => mission.status === 'done').length
  const totalMissions = event.missions.length
  const progress = totalMissions > 0 ? Math.round((completedMissions / totalMissions) * 100) : 0
  const isLocked = event.status === 'locked'
  const Icon = TYPE_ICON[event.type]

  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 260, damping: 24 }}
      onClick={() => onClick(event)}
      disabled={isLocked}
      className={clsx('cj-card', isLocked && 'is-locked')}
      style={{ '--event-color': event.color } as MotionStyle}
    >
      {event.isUrgent && !isLocked && <span className="cj-card__urgent">Hoje</span>}

      <div className="cj-card__rail" />

      <div className="cj-card__icon">
        {isLocked ? <Lock size={28} /> : <Icon size={30} />}
        {!isLocked && (
          <span>
            <Sparkles size={12} fill="currentColor" />
          </span>
        )}
      </div>

      <div className="cj-card__body">
        <div className="cj-card__time">
          <CalendarClock size={14} />
          {event.date} - {event.time}
        </div>
        <h3>{event.title}</h3>

        {isLocked ? (
          <div className="cj-card__locked">
            <Lock size={13} />
            Bloqueado
          </div>
        ) : totalMissions > 0 ? (
          <div className="cj-card__progress">
            <div className="cj-card__bar">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <span>
              <CheckCircle2 size={13} />
              {completedMissions} de {totalMissions} missoes
            </span>
          </div>
        ) : (
          <div className="cj-card__ready">
            <Sparkles size={14} fill="currentColor" />
            Pronto para aventura
          </div>
        )}
      </div>

      {!isLocked && (
        <div className="cj-card__arrow">
          <ChevronRight size={21} strokeWidth={3} />
        </div>
      )}
    </motion.button>
  )
}
