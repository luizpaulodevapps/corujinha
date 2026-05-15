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
      className={clsx(
        "w-full text-left p-6 rounded-[var(--radius-card)] border-2 transition-all duration-300 flex items-center gap-5 relative overflow-hidden group",
        isLocked 
          ? "bg-emerald-50/20 border-emerald-50/40 opacity-60 grayscale" 
          : "bg-white border-emerald-50 shadow-md hover:shadow-xl hover:border-emerald-100 active:scale-[0.98]"
      )}
    >
      {event.isUrgent && !isLocked && (
        <span className="absolute top-0 right-0 bg-brand-accent text-emerald-950 text-loud !text-[8px] px-3 py-1 rounded-bl-xl shadow-sm">
          Hoje
        </span>
      )}

      {/* Decorative Gradient Rail */}
      {!isLocked && (
        <div 
          className="absolute left-0 top-0 bottom-0 w-1.5 opacity-20" 
          style={{ backgroundColor: event.color }}
        />
      )}

      <div className={clsx(
        "w-16 h-16 rounded-[var(--radius-lg)] flex items-center justify-center relative shrink-0 transition-transform group-hover:scale-110",
        isLocked ? "bg-emerald-100 text-emerald-600" : "bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-inner"
      )}>
        {isLocked ? <Lock size={28} /> : <Icon size={30} />}
        {!isLocked && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-brand-accent rounded-full flex items-center justify-center text-emerald-900 shadow-sm border-2 border-white">
            <Sparkles size={12} fill="currentColor" />
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-loud text-emerald-600/40 !text-[8px] mb-1">
          <CalendarClock size={12} />
          {event.date} • {event.time}
        </div>
        <h3 className="text-lg font-black text-emerald-950 italic tracking-tight leading-tight mb-3 truncate">
          {event.title}
        </h3>

        {isLocked ? (
          <div className="flex items-center gap-2 text-loud text-emerald-300 !text-[9px]">
            <Lock size={12} />
            CONTEÚDO BLOQUEADO
          </div>
        ) : totalMissions > 0 ? (
          <div className="space-y-2">
            <div className="h-2 w-full bg-emerald-50 rounded-full overflow-hidden border border-emerald-100 shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.4)]"
              />
            </div>
            <div className="flex items-center gap-2 text-loud text-emerald-900/40 !text-[8px]">
              <CheckCircle2 size={12} className={progress === 100 ? 'text-brand-success' : ''} />
              {completedMissions} de {totalMissions} missões concluídas
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-loud text-emerald-600 !text-[9px] animate-pulse">
            <Sparkles size={12} fill="currentColor" />
            PRONTO PARA AVENTURA
          </div>
        )}
      </div>

      {!isLocked && (
        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
          <ChevronRight size={20} strokeWidth={3} />
        </div>
      )}
    </motion.button>
  )
}
