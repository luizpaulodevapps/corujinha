'use client'

import { useMemo, useState } from 'react'
import { CalendarDays, CheckCircle2, Compass, Map, Sparkles, Target, type LucideIcon } from 'lucide-react'
import clsx from 'clsx'
import { PageContainer } from '@/components/page-container'
import { JourneyCard } from '@/components/journey-card'
import { JourneyEventModal } from '@/components/journey-event-modal'
import { useJourney } from '@/features/journey/hooks/use-journey'
import { JourneyBackground } from '@/features/journey/components/JourneyBackground'
import { JourneyFooterStats } from '@/features/journey/components/JourneyFooterStats'

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
    <PageContainer title="Agenda Magica" hideHeader hideAvatar>
      <JourneyBackground />

      <section className="cj-hero" aria-labelledby="journey-title">
        <div className="cj-hero__map">
          <Map size={42} strokeWidth={2.4} />
        </div>

        <div className="cj-hero__copy">
          <p className="cj-kicker">
            <Sparkles size={15} />
            Agenda magica
          </p>
          <h1 id="journey-title">Trilha do Conhecimento</h1>
          <p>Veja os proximos eventos, prepare pequenas missoes e acompanhe seu progresso no mapa.</p>

          {nextEvent && nextEvent.status !== 'locked' && (
            <button className="cj-primary-action" onClick={() => setSelectedEventId(nextEvent.id)}>
              Abrir proxima aventura
              <Compass size={18} strokeWidth={3} />
            </button>
          )}
        </div>

        <div className="cj-hero__stats">
          <JourneyMetric icon={CalendarDays} label="Eventos" value={events.length} />
          <JourneyMetric icon={Target} label="Missoes" value={`${completedMissions}/${totalMissions}`} />
          <JourneyMetric icon={CheckCircle2} label="Mapa" value={`${journeyProgress}%`} />
        </div>
      </section>

      <section className="cj-agenda" aria-labelledby="agenda-title">
        <div className="cj-section-head">
          <div>
            <p className="cj-eyebrow">Proximas aventuras</p>
            <h2 id="agenda-title">Agenda da jornada</h2>
          </div>
          {urgentCount > 0 && <span className="cj-urgent">{urgentCount} hoje</span>}
        </div>

        <div className="cj-filter" role="tablist" aria-label="Filtrar agenda">
          {([
            ['active', 'Ativas'],
            ['all', 'Todas'],
            ['locked', 'Bloqueadas']
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={filter === value}
              onClick={() => setFilter(value)}
              className={clsx('cj-filter__button', filter === value && 'is-active')}
            >
              {label}
            </button>
          ))}
        </div>

        {visibleEvents.length > 0 ? (
          <div className="cj-list">
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
          <div className="cj-empty">
            <Compass size={30} />
            <h3>Nada por aqui</h3>
            <p>Troque o filtro para ver outros eventos da sua jornada.</p>
          </div>
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
