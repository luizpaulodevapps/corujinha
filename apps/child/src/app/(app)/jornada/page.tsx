'use client'

import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CalendarDays, 
  CheckCircle2, 
  Compass, 
  Map, 
  Sparkles, 
  Target, 
  type LucideIcon 
} from 'lucide-react'
import clsx from 'clsx'
import { PageContainer } from '@/components/page-container'
import { JourneyCard } from '@/components/journey-card'
import { JourneyEventModal } from '@/components/journey-event-modal'
import { useJourney } from '@/features/journey/hooks/use-journey'
import { JourneyBackground } from '@/features/journey/components/JourneyBackground'
import { JourneyFooterStats } from '@/features/journey/components/JourneyFooterStats'
import { useWorldState } from '@/stores/use-world-state'

type JourneyFilter = 'all' | 'active' | 'locked'

function JourneyMetric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: number | string }) {
  return (
    <div className="cj-metric">
      <span>
        <Icon size={15} />
        {label}
      </span>
      <strong>{value}</strong>
    </div>
  )
}

export default function JornadaPage() {
  const [filter, setFilter] = useState<JourneyFilter>('active')
  const { vibe } = useWorldState()
  const {
    events,
    selectedEvent,
    setSelectedEventId,
    toggleMission,
    journeyProgress
  } = useJourney()

  const totalMissions = events.flatMap(event => event.missions).length
  const completedMissions = events.flatMap(event => event.missions).filter(mission => mission.status === 'done').length
  const nextEvent = events.find(event => event.status !== 'locked') ?? events[0]
  const urgentCount = events.filter(event => event.isUrgent && event.status !== 'locked').length

  const visibleEvents = useMemo(() => {
    if (filter === 'active') return events.filter(event => event.status !== 'locked')
    if (filter === 'locked') return events.filter(event => event.status === 'locked')
    return events
  }, [events, filter])

  return (
    <PageContainer title="Mapa da Jornada" hideHeader hideAvatar>
      <JourneyBackground />

      <section className="cj-hero relative overflow-hidden" aria-labelledby="journey-title">
        {/* Ambient Life: Névoa e Partículas */}
        <div className="absolute inset-0 pointer-events-none">
           <motion.div 
             animate={{ x: [-20, 20, -20], opacity: [0.1, 0.2, 0.1] }}
             transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
             className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-white/10 to-transparent blur-3xl"
           />
        </div>

        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="cj-hero__map bg-brand-primary text-white shadow-[0_20px_40px_rgba(10,47,31,0.3)]"
        >
          <Map size={42} strokeWidth={2.4} />
        </motion.div>

        <div className="cj-hero__copy">
          <p className="text-loud text-emerald-900/40 bg-brand-accent/10 border-brand-accent/20 px-3 py-1.5 rounded-lg inline-flex items-center gap-2 !text-[9px] mb-4">
            <Sparkles size={14} className="text-brand-accent" />
            Caminhos da Floresta
          </p>
          <h1 id="journey-title" className="text-hero-title text-white mb-6">Trilha do Conhecimento</h1>
          <p className="text-poetic text-white/60 !text-sm max-w-[320px] mx-auto mb-10">
            Descubra novos capítulos, explore trilhas secretas e veja como sua história está crescendo na floresta.
          </p>

          {nextEvent && nextEvent.status !== 'locked' && (
            <button 
              className="cj-primary-action h-14 px-8 text-loud !text-[12px] bg-white text-emerald-950 rounded-[var(--radius-lg)] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto border-0" 
              onClick={() => setSelectedEventId(nextEvent.id)}
            >
              Abrir próxima aventura
              <Compass size={20} strokeWidth={3} className="animate-pulse" />
            </button>
          )}
        </div>

        <div className="cj-hero__stats !bg-white/10 !backdrop-blur-xl !border-white/20 !shadow-2xl">
          <JourneyMetric icon={CalendarDays} label="Capítulos" value={events.length} />
          <JourneyMetric icon={Target} label="Desafios" value={`${completedMissions}/${totalMissions}`} />
          <JourneyMetric icon={Compass} label="Explorada" value={`${journeyProgress}%`} />
        </div>
      </section>

      <section className="cj-agenda" aria-labelledby="agenda-title">
        <div className="cj-section-head">
          <div>
            <p className="text-loud text-emerald-600/40 !text-[9px] mb-1">Próximos Passos</p>
            <h2 id="agenda-title" className="text-2xl font-black text-emerald-950 italic">Mapa da Jornada</h2>
          </div>
          {urgentCount > 0 && (
            <span className="cj-urgent bg-brand-accent text-emerald-900 text-loud !text-[9px] px-4 py-2 rounded-full animate-bounce shadow-lg">
              {urgentCount} hoje
            </span>
          )}
        </div>

        <div className="cj-filter bg-emerald-50/50 p-1.5 rounded-[2rem] mb-8 shadow-inner border border-emerald-900/5" role="tablist" aria-label="Filtrar agenda">
          {([
            ['active', 'Explorando'],
            ['all', 'Todo o Mapa'],
            ['locked', 'Em breve']
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={filter === value}
              onClick={() => setFilter(value)}
              className={clsx(
                'flex-1 py-3 px-4 rounded-[1.5rem] text-loud !text-[10px] transition-all duration-300', 
                filter === value ? 'bg-white text-emerald-900 shadow-md scale-[1.02]' : 'text-emerald-600/40 hover:bg-white/40'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {visibleEvents.length > 0 ? (
          <div className="cj-list space-y-6">
            {visibleEvents.map((event, index) => (
              <JourneyCard
                key={event.id}
                event={event}
                index={index}
                onClick={(evt) => setSelectedEventId(evt.id)}
              />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="cj-empty py-20 border-2 border-emerald-50 rounded-[3rem] bg-emerald-50/20 text-center"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-6">
              <Compass size={32} />
            </div>
            <h3 className="text-xl font-black text-emerald-950 italic mb-2">A trilha está tranquila agora 🌿</h3>
            <p className="text-emerald-900/50 font-bold max-w-[240px] mx-auto">Nenhuma nova aventura apareceu na floresta ainda. Explore outras partes do mapa!</p>
          </motion.div>
        )}
      </section>

      <JourneyFooterStats progress={journeyProgress} />

      <JourneyEventModal
        event={selectedEvent}
        onClose={() => setSelectedEventId(null)}
        onToggleMission={toggleMission}
      />
    </PageContainer>
  )
}
