'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Coins,
  Flame,
  Sparkles,
  Sword,
  Target,
  Trophy,
  Zap,
  type LucideIcon
} from 'lucide-react'
import clsx from 'clsx'
import { PageContainer } from '@/components/page-container'
import { XPProgressCard } from '@/features/dashboard/components/XPProgressCard'
import { MissionCard } from '@/features/dashboard/components/MissionCard'
import { MascotTip } from '@/features/dashboard/components/MascotTip'
import { MissionDetailModal } from '@/components/modals/MissionDetailModal'
import { MissionSuccessModal } from '@/components/modals/MissionSuccessModal'
import { useChildDashboard } from '@/features/dashboard/hooks/use-child-dashboard'

interface DashboardStatProps {
  icon: LucideIcon
  label: string
  value: number
  tone: 'green' | 'gold' | 'orange'
}

function DashboardStat({ icon: Icon, label, value, tone }: DashboardStatProps) {
  return (
    <div className={`cd-stat cd-stat--${tone}`}>
      <div className="cd-stat__label">
        <Icon size={15} />
        {label}
      </div>
      <div className="cd-stat__value">{value}</div>
    </div>
  )
}

function MiniMetric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: number }) {
  return (
    <div className="cd-mini-metric">
      <div className="cd-mini-metric__label">
        <Icon size={15} />
        {label}
      </div>
      <div className="cd-mini-metric__value">{value}</div>
    </div>
  )
}

type MissionFilter = 'open' | 'all' | 'done'

export default function ChildDashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [showTip, setShowTip] = useState(true)
  const [missionFilter, setMissionFilter] = useState<MissionFilter>('open')
  const {
    profile,
    missions,
    modals,
    selectedMission,
    lastCompletedMission,
    handleCompleteMission
  } = useChildDashboard()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const completedMissions = missions.filter(mission => mission.completed).length
  const activeMissions = missions.length - completedMissions
  const featuredMission = missions.find(mission => !mission.completed) ?? missions[0]
  const allMissionsDone = missions.length > 0 && completedMissions === missions.length
  const availableXp = missions
    .filter(mission => !mission.completed)
    .reduce((sum, mission) => sum + mission.xp, 0)
  const visibleMissions = missions.filter(mission => {
    if (missionFilter === 'open') return !mission.completed
    if (missionFilter === 'done') return mission.completed
    return true
  })

  return (
    <PageContainer title="Corujinha" hideHeader hideAvatar>
      <section className="cd-hero" aria-labelledby="dashboard-title">
        <div className="cd-hero__image" />
        <div className="cd-hero__shade" />

        <div className="cd-hero__content">
          <div className="cd-hero__copy">
            <div className="cd-kicker">
              <Sparkles size={15} />
              Ninho ativo
            </div>

            <h1 id="dashboard-title" className="cd-hero__title">
              Ola, {profile.name}
            </h1>
            <p className="cd-hero__text">
              {allMissionsDone
                ? 'Tudo pronto por hoje. A floresta ja esta celebrando suas conquistas.'
                : 'Escolha uma missao, ganhe moedas e avance para o proximo nivel.'}
            </p>

            <div className="cd-actions">
              {featuredMission && !allMissionsDone && (
                <button className="cd-button cd-button--primary" onClick={() => modals.openMission(featuredMission.id)}>
                  Continuar aventura
                  <ArrowRight size={18} strokeWidth={3} />
                </button>
              )}
              <button className="cd-button cd-button--ghost" onClick={modals.openWallet}>
                <Coins size={18} fill="currentColor" />
                Ver moedas
              </button>
            </div>

            <div className="cd-stats">
              <DashboardStat icon={Trophy} label="Nivel" value={profile.level} tone="green" />
              <DashboardStat icon={Coins} label="Moedas" value={profile.coins} tone="gold" />
              <DashboardStat icon={Flame} label="Serie" value={profile.streak} tone="orange" />
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="cd-hero__avatar"
          >
            <img src={profile.avatar} alt="Corujinha aventureira" />
          </motion.div>
        </div>
      </section>

      <XPProgressCard xp={profile.xp} nextLevelXp={profile.nextLevelXp} level={profile.level} />

      {featuredMission && !allMissionsDone && (
        <section className="cd-featured">
          <div className="cd-featured__header">
            <div>
              <p className="cd-section-eyebrow">Missao em destaque</p>
              <h2 className="cd-featured__title">{featuredMission.title}</h2>
            </div>
            <div className="cd-featured__icon">{featuredMission.icon}</div>
          </div>

          <div className="cd-featured__footer">
            <div className="cd-tags">
              <span>{featuredMission.category}</span>
              <span>{featuredMission.difficulty}</span>
              <span>
                <Coins size={14} fill="currentColor" /> +{featuredMission.coins}
              </span>
            </div>
            <button className="cd-button cd-button--compact" onClick={() => modals.openMission(featuredMission.id)}>
              Comecar
              <ArrowRight size={17} strokeWidth={3} />
            </button>
          </div>
        </section>
      )}

      <section className="cd-missions" aria-labelledby="missions-title">
        <div className="cd-section-header">
          <div>
            <p className="cd-section-eyebrow">Trilha da floresta</p>
            <h2 id="missions-title" className="cd-section-title">
              <Sword size={24} />
              Missoes de hoje
            </h2>
          </div>
          <div className="cd-count">
            <CheckCircle2 size={16} />
            {completedMissions}/{missions.length}
          </div>
        </div>

        <div className="cd-mini-grid">
          <MiniMetric icon={Target} label="Abertas" value={activeMissions} />
          <MiniMetric icon={Zap} label="XP livre" value={availableXp} />
        </div>

        <div className="cd-filter" role="tablist" aria-label="Filtrar missoes">
          {([
            ['open', 'Abertas'],
            ['all', 'Todas'],
            ['done', 'Feitas']
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={missionFilter === value}
              onClick={() => setMissionFilter(value)}
              className={clsx('cd-filter__button', missionFilter === value && 'is-active')}
            >
              {label}
            </button>
          ))}
        </div>

        {visibleMissions.length > 0 ? (
          <div className="cd-mission-list">
            {visibleMissions.map((mission, i) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                index={i}
                onClick={() => modals.openMission(mission.id)}
              />
            ))}
          </div>
        ) : (
          <div className="cd-empty">
            <CheckCircle2 size={30} />
            <h3>Nenhuma missao aqui</h3>
            <p>Troque o filtro para ver todas as missoes ou volte mais tarde para novas aventuras.</p>
          </div>
        )}
      </section>

      <MascotTip
        tip="Completar missoes seguidas aumenta seu bonus de XP diario."
        isVisible={showTip}
        onClose={() => setShowTip(false)}
      />

      <MissionDetailModal
        mission={selectedMission}
        onClose={modals.closeMission}
        onComplete={handleCompleteMission}
      />

      <MissionSuccessModal
        isOpen={modals.showReward}
        onClose={modals.closeReward}
        reward={lastCompletedMission ? { coins: lastCompletedMission.coins, xp: lastCompletedMission.xp } : null}
      />
    </PageContainer>
  )
}
