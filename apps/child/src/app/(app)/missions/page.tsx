'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  Sword,
  Target,
  Zap,
  Map as MapIcon,
  Search,
  Filter,
  Sparkles,
  type LucideIcon
} from 'lucide-react'
import clsx from 'clsx'
import { PageContainer } from '@/components/page-container'
import { MissionCard } from '@/features/dashboard/components/MissionCard'
import { MissionDetailModal } from '@/components/modals/MissionDetailModal'
import { MissionSuccessModal } from '@/components/modals/MissionSuccessModal'
import { useChildDashboard } from '@/features/dashboard/hooks/use-child-dashboard'
import { useWorldState } from '@/stores/use-world-state'
import { ClientOnly } from '@/components/ClientOnly'

/**
 * ⚔️ MissionsPage: A Trilha das Aventuras
 * 
 * Página dedicada exclusivamente à listagem e filtragem de missões.
 */

type MissionFilter = 'open' | 'all' | 'done'

function MiniMetric({ icon: Icon, label, value, unit = '' }: { icon: LucideIcon; label: string; value: number | string; unit?: string }) {
  return (
    <div className="cd-mini-metric">
      <div className="cd-mini-metric__label">
        <Icon size={15} />
        {label}
      </div>
      <div className="cd-mini-metric__value">
        {value}
        <span className="text-[10px] ml-1 opacity-60">{unit}</span>
      </div>
    </div>
  )
}

export default function MissionsPage() {
  const [missionFilter, setMissionFilter] = useState<MissionFilter>('open')
  const { vibe } = useWorldState()
  const {
    profile,
    missions,
    modals,
    selectedMission,
    lastCompletedMission,
    fetchProfile,
    handleCompleteMission
  } = useChildDashboard()

  useEffect(() => {
    if (!profile) {
      fetchProfile('child-1')
    }
  }, [profile, fetchProfile])

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0A1A14] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          className="text-brand-primary"
        >
          <Sword size={48} />
        </motion.div>
      </div>
    )
  }

  const completedMissions = missions.filter(mission => mission.completed).length
  const activeMissions = missions.length - completedMissions
  const availableXp = missions
    .filter(mission => !mission.completed)
    .reduce((sum, mission) => sum + mission.xp, 0)
  
  const visibleMissions = missions.filter(mission => {
    if (missionFilter === 'open') return !mission.completed
    if (missionFilter === 'done') return mission.completed
    return true
  })

  return (
    <PageContainer title="Missões" hideHeader hideAvatar>
      <ClientOnly>
        {/* Environmental Atmosphere Layers */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-emerald-50/20">
           <motion.div 
             animate={{ 
               scale: [1, 1.15, 1],
               opacity: [0.3, 0.4, 0.3]
             }}
             transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
             className={clsx(
               "absolute -top-1/4 -right-1/4 w-full h-full rounded-full blur-[140px] transition-colors duration-1000",
               vibe === 'night' ? "bg-indigo-900/15" : "bg-brand-accent/20"
             )}
           />
        </div>

        {/* Missions Header: Simplified and Atmospheric */}
        <section className={clsx(
          "relative pt-16 pb-12 px-8 rounded-b-[4rem] overflow-hidden mb-16 transition-all duration-1000",
          vibe === 'night' ? "bg-indigo-950/95" : "bg-emerald-950"
        )}>
           <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('/textures/noise.svg')]" />
           
           <div className="relative z-10 max-w-xl mx-auto text-center">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] font-bold tracking-[0.3em] text-brand-accent/60 uppercase mb-4"
              >
                — A Trilha das Aventuras —
              </motion.div>
              
              <h1 className="text-hero-title text-white mb-6 tracking-tight">
                Missões
              </h1>
              
              <p className="text-emerald-100/60 text-poetic !text-[15px] mb-12 max-w-[280px] mx-auto !not-italic">
                "Cada pequena tarefa é um passo em direção ao coração da floresta."
              </p>
              
              <div className="flex justify-center gap-4">
                 {[
                   { icon: Target, label: 'ATIVAS', value: activeMissions, color: 'text-brand-accent' },
                   { icon: Zap, label: 'ENERGIA', value: availableXp, color: 'text-emerald-400' }
                 ].map((metric, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 min-w-[120px] p-5 rounded-[2.5rem] border border-white/5 bg-white/5 shadow-sm">
                       <div className={clsx("flex items-center gap-1.5 text-[8px] font-black tracking-widest opacity-40", metric.color)}>
                          <metric.icon size={10} />
                          {metric.label}
                       </div>
                       <p className="text-3xl font-black text-white italic tracking-tighter leading-none">{metric.value}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        <div className="px-8 space-y-16 pb-32 max-w-2xl mx-auto">
           {/* Filters: Pacing & Hierarchy */}
           <div className="bg-color-moon-cream p-1.5 rounded-[2rem] flex items-center gap-1 shadow-sm border border-emerald-100">
              {([
                ['open', 'Abertas'],
                ['all', 'Todas'],
                ['done', 'Concluídas']
              ] as const).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMissionFilter(value)}
                  className={clsx(
                    'flex-1 py-4 px-4 rounded-[1.8rem] text-[10px] font-black tracking-widest transition-all duration-300', 
                    missionFilter === value 
                      ? 'bg-emerald-950 text-white shadow-lg' 
                      : 'text-emerald-950/30 hover:bg-emerald-50'
                  )}
                >
                  {label.toUpperCase()}
                </button>
              ))}
           </div>

           {/* Narrative Progress Counter */}
           <div className="flex items-center justify-between px-4">
              <div className="space-y-1">
                 <p className="text-[9px] font-bold tracking-[0.2em] text-emerald-900/30 uppercase">Caminho Percorrido</p>
                 <h4 className="text-2xl font-black text-emerald-950 italic tracking-tighter">Energia da Clareira</h4>
              </div>
              <div className="flex items-center gap-3 bg-color-moon-cream px-6 py-4 rounded-[2rem] border border-emerald-100 shadow-sm">
                 <span className="text-3xl font-black text-emerald-950 tracking-tighter leading-none">{completedMissions}</span>
                 <div className="w-[1px] h-6 bg-emerald-200" />
                 <span className="text-3xl font-black text-emerald-900/20 tracking-tighter leading-none">{missions.length}</span>
              </div>
           </div>

           {/* Living Quest Path: Vertical Storytelling */}
           {visibleMissions.length > 0 ? (
             <div className="relative space-y-10">
               {/* Vertical Path Line (Subtle Mist) */}
               <div className="absolute left-[39px] top-12 bottom-12 w-[2px] bg-emerald-100/50 rounded-full -z-10" />
               
               {visibleMissions.map((mission, i) => (
                 <div key={mission.id} className="relative">
                    <MissionCard
                      mission={mission}
                      index={i}
                      onClick={() => modals.openMission(mission.id)}
                    />
                 </div>
               ))}
             </div>
           ) : (
             <motion.div 
               initial={{ opacity: 0, scale: 0.98 }} 
               animate={{ opacity: 1, scale: 1 }}
               className="bg-color-moon-cream rounded-[3rem] p-16 text-center shadow-sm border border-emerald-100 relative overflow-hidden"
             >
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/textures/noise.svg')] pointer-events-none" />
                <div className="w-24 h-24 bg-emerald-50/50 rounded-full flex items-center justify-center text-emerald-200 mx-auto mb-10 border border-emerald-100/50">
                  <MapIcon size={48} />
                </div>
                <h3 className="text-3xl font-black text-emerald-950 italic mb-6 tracking-tighter leading-tight">A clareira está tranquila</h3>
                <p className="text-poetic text-emerald-900/40 !text-[16px] !not-italic max-w-[300px] mx-auto leading-relaxed">
                  Você explorou todos os segredos desta região por hoje. Que tal descansar no seu ninho?
                </p>
             </motion.div>
           )}
        </div>

        <MissionDetailModal
          mission={selectedMission}
          onClose={modals.closeMission}
          onComplete={handleCompleteMission}
        />

        <MissionSuccessModal
          isOpen={modals.showReward}
          onClose={modals.closeReward}
          mission={lastCompletedMission}
          reward={lastCompletedMission ? { coins: lastCompletedMission.coins, xp: lastCompletedMission.xp } : null}
        />
      </ClientOnly>
    </PageContainer>
  )
}
