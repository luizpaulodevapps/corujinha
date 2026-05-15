'use client'

import { AnimatePresence, motion, type MotionStyle } from 'framer-motion'
import { BookOpen, CalendarClock, CheckCircle2, Dumbbell, Sparkles, Users, X } from 'lucide-react'
import clsx from 'clsx'
import { JourneyEvent } from '@/features/journey/types'

interface JourneyEventModalProps {
  event: JourneyEvent | null
  onClose: () => void
  onToggleMission: (eventId: string, missionId: string) => void
}

const TYPE_ICON = {
  school: BookOpen,
  sports: Dumbbell,
  family: Users
}

export function JourneyEventModal({ event, onClose, onToggleMission }: JourneyEventModalProps) {
  if (!event) return null

  const Icon = TYPE_ICON[event.type]
  const completedMissions = event.missions.filter(mission => mission.status === 'done').length
  const progress = event.missions.length > 0 ? Math.round((completedMissions / event.missions.length) * 100) : 100

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, y: 24 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 24 }}
          className="relative w-full max-w-lg bg-white rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] overflow-hidden flex flex-col max-h-[90vh] pointer-events-auto"
          onClick={eventClick => eventClick.stopPropagation()}
        >
          {/* Top Decorative Border */}
          <div 
            className="absolute top-0 left-0 right-0 h-2 opacity-80" 
            style={{ backgroundColor: event.color }}
          />

          <button 
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-900 hover:bg-emerald-100 transition-colors z-20" 
            onClick={onClose} 
            aria-label="Fechar evento"
          >
            <X size={20} strokeWidth={3} />
          </button>

          <header className="p-8 pt-10 flex items-center gap-6 border-b border-emerald-50">
            <div className="w-20 h-20 rounded-[var(--radius-lg)] bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner border border-emerald-100 shrink-0">
              <Icon size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-emerald-950 italic tracking-tight mb-2">
                {event.title}
              </h2>
              <div className="flex items-center gap-2 text-loud text-emerald-600/60 !text-[10px]">
                <CalendarClock size={16} />
                {event.date} • {event.time}
              </div>
            </div>
          </header>

          <div className="p-8 space-y-8 overflow-y-auto scrollbar-hide">
            <div className="bg-emerald-50/50 rounded-[var(--radius-card)] p-6 flex items-start gap-4 border border-emerald-100">
              <div className="w-12 h-12 shrink-0 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-emerald-100">
                <img src="/owl_mascot_new.png" alt="Corujinha" className="w-8 h-8 object-contain" />
              </div>
              <p className="text-poetic !text-[13px] !not-italic text-emerald-900/80 leading-relaxed">
                {event.description}
              </p>
            </div>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-loud text-emerald-950/40 !text-[10px] flex items-center gap-2">
                  <Sparkles size={16} fill="currentColor" className="text-brand-accent" />
                  MISSÕES DO DIA
                </h3>
                <span className="text-loud text-emerald-950 !text-[10px] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  {completedMissions} / {event.missions.length}
                </span>
              </div>

              {event.missions.length > 0 ? (
                <div className="space-y-6">
                  <div className="h-3 w-full bg-emerald-50 rounded-full overflow-hidden border border-emerald-100 shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${progress}%` }} 
                      transition={{ duration: 1, ease: 'easeOut' }} 
                      className="h-full bg-emerald-600 shadow-[0_0_10px_rgba(5,150,105,0.4)]"
                    />
                  </div>

                  <div className="grid gap-3">
                    {event.missions.map(mission => (
                      <button
                        key={mission.id}
                        className={clsx(
                          'w-full p-4 rounded-[var(--radius-lg)] border-2 flex items-center gap-4 transition-all duration-300', 
                          mission.status === 'done' 
                            ? 'bg-emerald-50/40 border-emerald-100/50 opacity-60' 
                            : 'bg-white border-emerald-50 hover:border-emerald-200 hover:shadow-md'
                        )}
                        onClick={() => onToggleMission(event.id, mission.id)}
                      >
                        <span className={clsx(
                          "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                          mission.status === 'done' ? "bg-emerald-600 border-emerald-600 text-white" : "bg-white border-emerald-100 text-transparent"
                        )}>
                          <CheckCircle2 size={16} strokeWidth={3} />
                        </span>
                        <div className="flex-1 text-left">
                          <strong className={clsx(
                            "text-[15px] font-black block leading-tight",
                            mission.status === 'done' ? "text-emerald-950/40 line-through" : "text-emerald-950"
                          )}>
                            {mission.title}
                          </strong>
                          <em className="text-loud text-brand-accent !text-[8px] uppercase not-italic">
                            +{mission.xp} XP • Sabedoria
                          </em>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 bg-emerald-50/30 rounded-[var(--radius-card)] border-2 border-dashed border-emerald-100 text-loud text-emerald-900/30 !text-[10px]">
                  ESSE EVENTO AINDA NÃO TEM MISSÕES
                </div>
              )}
            </section>
          </div>

          <div className="p-8 bg-emerald-50/50 flex gap-4 border-t border-emerald-100">
            <button 
              className="flex-1 h-14 rounded-[var(--radius-lg)] text-loud !text-[10px] text-emerald-950/60 border-2 border-emerald-100 bg-white hover:bg-emerald-50 transition-colors" 
              onClick={onClose}
            >
              VOLTAR
            </button>
            <button 
              className="flex-[2] h-14 bg-emerald-950 text-white rounded-[var(--radius-lg)] text-loud !text-[10px] shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all border-0" 
              onClick={onClose}
            >
              TUDO CERTO
              <Sparkles size={18} className="text-brand-accent" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
