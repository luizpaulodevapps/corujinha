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
        className="cj-modal"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, y: 24 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 24 }}
          className="cj-modal__panel"
          style={{ '--event-color': event.color } as MotionStyle}
          onClick={eventClick => eventClick.stopPropagation()}
        >
          <button className="cj-modal__close" onClick={onClose} aria-label="Fechar evento">
            <X size={20} strokeWidth={3} />
          </button>

          <div className="cj-modal__topline" />

          <header className="cj-modal__header">
            <div className="cj-modal__icon">
              <Icon size={34} />
            </div>
            <div>
              <h2>{event.title}</h2>
              <p>
                <CalendarClock size={16} />
                {event.date} - {event.time}
              </p>
            </div>
          </header>

          <div className="cj-modal__tip">
            <img src="/owl_mascot_new.png" alt="Corujinha" />
            <p>{event.description}</p>
          </div>

          <section className="cj-modal__missions">
            <div className="cj-modal__missions-head">
              <h3>
                <Sparkles size={16} fill="currentColor" />
                Missoes do dia
              </h3>
              <span>{completedMissions}/{event.missions.length}</span>
            </div>

            {event.missions.length > 0 ? (
              <>
                <div className="cj-modal__bar">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, ease: 'easeOut' }} />
                </div>

                <div className="cj-modal__mission-list">
                  {event.missions.map(mission => (
                    <button
                      key={mission.id}
                      className={clsx('cj-modal__mission', mission.status === 'done' && 'is-done')}
                      onClick={() => onToggleMission(event.id, mission.id)}
                    >
                      <span className="cj-modal__check">
                        {mission.status === 'done' ? <CheckCircle2 size={20} strokeWidth={3} /> : null}
                      </span>
                      <strong>{mission.title}</strong>
                      <em>+{mission.xp} XP</em>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="cj-modal__empty">Esse evento ainda nao tem missoes.</div>
            )}
          </section>

          <div className="cj-modal__actions">
            <button className="cj-modal__secondary" onClick={onClose}>Voltar</button>
            <button className="cj-modal__primary" onClick={onClose}>
              Tudo certo
              <Sparkles size={20} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
