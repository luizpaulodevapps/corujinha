'use client'

import { useEffect, useState, useMemo } from 'react'
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
  Coins,
  Flame,
  type LucideIcon
} from 'lucide-react'
import clsx from 'clsx'
import { PageContainer } from '@/components/page-container'
import { MissionCard } from '@/features/dashboard/components/MissionCard'
import { MissionDetailModal } from '@/components/modals/MissionDetailModal'
import { MissionSuccessModal } from '@/components/modals/MissionSuccessModal'
import { MascotTip } from '@/features/dashboard/components/MascotTip'
import { useChildDashboard } from '@/features/dashboard/hooks/use-child-dashboard'
import { useWorldState } from '@/stores/use-world-state'
import { ClientOnly } from '@/components/ClientOnly'
import { useMentorGreeting } from '@/features/dashboard/hooks/use-mentor-greeting'
import { ChildWalletModal } from '@/components/child-wallet-modal-v3'
import Link from 'next/link'

/**
 * ⚔️ MissionsPage: A Trilha das Aventuras
 * 
 * Página dedicada exclusivamente à listagem e filtragem de missões.
 */

type MissionFilter = 'open' | 'all' | 'done'

export default function MissionsPage() {
  const [missionFilter, setMissionFilter] = useState<MissionFilter>('open')
  const [showTip, setShowTip] = useState(true)
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

  const { mentor: dominantMentor } = useMentorGreeting()

  useEffect(() => {
    if (!profile) {
      fetchProfile('child-1')
    }
  }, [profile, fetchProfile])

  // 2. ⚡ Performance: Memoized Stats & Filtered Data
  const { completedMissions, activeMissions, availableXp } = useMemo(() => {
    const done = missions.filter(m => m.completed).length
    const active = missions.length - done
    const xp = missions
      .filter(m => !m.completed)
      .reduce((sum, mission) => sum + mission.xp, 0)
    
    return { completedMissions: done, activeMissions: active, availableXp: xp }
  }, [missions])

  const visibleMissions = useMemo(() => {
    return missions.filter(mission => {
      if (missionFilter === 'open') return !mission.completed
      if (missionFilter === 'done') return mission.completed
      return true
    })
  }, [missions, missionFilter])

  // 3. Hydration Guard: Ensure clean render
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

  return (
    <PageContainer 
      title="Missões" 
      hideHeader 
      hideAvatar 
      mentor={dominantMentor.toLowerCase() as any} 
      energy={vibe === 'night' ? 'night' : 'adventure'}
    >
      <ClientOnly>
        {/* 🚀 1. The Magic Status Bar (Sticky like Dashboard) */}
        <div className={clsx(
          "sticky top-0 z-[100] w-full transition-all duration-300",
          "pt-[env(safe-area-inset-top,24px)] pb-4",
          "bg-gradient-to-b from-emerald-950/90 to-transparent backdrop-blur-[8px]"
        )}>
          <div className="flex items-center justify-between px-5 sm:px-10 w-full max-w-2xl mx-auto">
            {/* LEFT: Identity Anchor */}
            <Link href="/profile" className="flex items-center gap-4 group cursor-pointer">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-full border-2 border-brand-accent/40 bg-brand-accent/10 p-0.5 overflow-hidden"
              >
                <img src={profile.avatar} alt={`Avatar de ${profile.name}`} className="w-full h-full object-cover rounded-full bg-emerald-900/40" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black tracking-[0.2em] text-white/40 uppercase leading-none mb-1">Grau {profile.level}</span>
                <span className="text-base font-black text-white italic tracking-tighter leading-none group-hover:text-brand-accent transition-colors">{profile.name}</span>
              </div>
            </Link>

            {/* RIGHT: Stats: Now Interactive */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={modals.openWallet}
              className="flex items-center bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/5 shadow-2xl hover:bg-black/60 transition-all cursor-pointer"
            >
               <div className="flex items-center gap-1.5 pr-3 border-r border-white/5">
                 <Coins size={14} className="text-brand-accent" fill="currentColor" />
                 <span className="text-sm font-black text-white tracking-tighter">{profile.coins}</span>
               </div>
               <div className="flex items-center gap-1.5 pl-3">
                 <Flame size={14} className="text-orange-400" fill="currentColor" />
                 <span className="text-sm font-black text-white tracking-tighter">{profile.streak}</span>
               </div>
            </motion.button>
          </div>
        </div>
        {/* Environmental Atmosphere Layers: Shared with Dashboard */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-transparent to-transparent" />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className={clsx(
              "absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[120px]",
              vibe === 'night' ? "bg-indigo-500/10" : "bg-brand-accent/10"
            )}
          />
        </div>

        {/* 🏹 Hero Section: Narrative Header (ADS V3.2) */}
        <section className={clsx(
          "relative z-10 pt-12 pb-24 px-6 sm:px-12 rounded-b-[0.5rem] overflow-hidden mb-16 transition-all duration-1000 shadow-2xl mt-[-1px]",
          vibe === 'night' ? "bg-indigo-950/90" : "bg-emerald-950"
        )}>
           <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[url('/textures/noise.svg')]" />
           <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
           
           <div className="relative z-10 max-w-xl mx-auto text-center">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] font-black tracking-[0.4em] text-brand-accent/80 uppercase mb-8"
              >
                — A Trilha das Aventuras —
              </motion.div>
              
              <h1 className="text-6xl sm:text-7xl font-black text-white mb-10 tracking-tighter italic drop-shadow-2xl">
                Missões
              </h1>
              
              <p className="text-emerald-100/60 text-poetic !text-[17px] mb-16 max-w-[260px] mx-auto px-4 !not-italic leading-relaxed italic opacity-90">
                "Cada pequena tarefa é um passo em direção ao coração da floresta."
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                 {/* Metric Cards: Responsive Flow */}
                 {[
                   { icon: Target, label: 'ATIVAS', value: activeMissions, color: 'text-brand-accent', glow: 'shadow-[0_0_30px_rgba(252,225,138,0.2)]' },
                   { icon: Zap, label: 'ENERGIA', value: availableXp, color: 'text-emerald-400', glow: 'shadow-[0_0_30px_rgba(16,185,129,0.2)]' }
                 ].map((metric, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -6, scale: 1.02 }}
                      className={clsx("flex-1 min-w-[140px] flex flex-col items-center gap-3 p-8 sm:p-10 rounded-[0.5rem] border border-white/10 bg-white/5 backdrop-blur-md", metric.glow)}
                    >
                       <div className={clsx("flex items-center gap-2 text-[10px] font-black tracking-widest", metric.color)}>
                          <metric.icon size={14} strokeWidth={3} />
                          {metric.label}
                       </div>
                       <p className="text-5xl font-black text-white italic tracking-tighter leading-none drop-shadow-md">{metric.value}</p>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        <div className="space-y-12 pb-40 px-6 sm:px-12 max-w-2xl mx-auto relative z-20">
           {/* Filters: Improved Tabs and Spacing */}
           <div className="bg-emerald-900/10 backdrop-blur-md p-1.5 rounded-[0.5rem] flex items-center gap-2 shadow-inner border border-emerald-950/10">
              {([
                ['open', 'Abertas'],
                ['all', 'Todas'],
                ['done', 'Concluídas']
              ] as const).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMissionFilter(value)}
                  aria-pressed={missionFilter === value}
                  className={clsx(
                    'flex-1 py-4 px-4 rounded-[0.5rem] text-[11px] font-black tracking-widest transition-all duration-300', 
                    missionFilter === value 
                      ? 'bg-emerald-950 text-white shadow-xl' 
                      : 'text-emerald-950/60 hover:bg-emerald-950/5'
                  )}
                >
                  {label.toUpperCase()}
                </button>
              ))}
           </div>

           {/* Narrative Progress Counter */}
           <div className="flex items-center justify-between px-6 py-8 rounded-[0.5rem] bg-emerald-50/40 border border-emerald-100/50 shadow-sm backdrop-blur-[2px]">
              <div className="space-y-1">
                 <p className="text-[10px] font-black tracking-[0.2em] text-emerald-900/30 uppercase">Caminho Percorrido</p>
                 <h4 className="text-2xl font-black text-emerald-950 italic tracking-tighter">Energia da Clareira</h4>
              </div>
              <div className="flex items-center gap-3 bg-white/80 px-6 py-4 rounded-[0.5rem] border border-emerald-100 shadow-sm">
                 <span className="text-3xl font-black text-emerald-950 tracking-tighter leading-none">{completedMissions}</span>
                 <div className="w-[1px] h-6 bg-emerald-200" />
                 <span className="text-3xl font-black text-emerald-900/20 tracking-tighter leading-none">{missions.length}</span>
              </div>
           </div>

           {/* Living Quest Path: Vertical Storytelling */}
           <div className="relative">
             {/* Vertical Path Line (Subtle Mist) */}
             <div className="absolute left-[59px] top-12 bottom-12 w-[2px] bg-emerald-100/50 rounded-full -z-10" />
             
             <AnimatePresence mode="popLayout" initial={false}>
               {visibleMissions.length > 0 ? (
                 <div className="space-y-10">
                   {visibleMissions.map((mission, i) => (
                     <motion.div 
                       key={mission.id} 
                       layout
                       initial={{ opacity: 0, scale: 0.9, y: 20 }}
                       animate={{ opacity: 1, scale: 1, y: 0 }}
                       exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                       className="relative"
                     >
                        <MissionCard
                          mission={mission}
                          index={i}
                          onClick={() => modals.openMission(mission.id)}
                        />
                     </motion.div>
                   ))}
                 </div>
               ) : (
                 <motion.div 
                   key="empty-state"
                   initial={{ opacity: 0, scale: 0.98 }} 
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.98 }}
                   className="bg-emerald-900/5 backdrop-blur-sm rounded-[0.5rem] p-10 sm:p-16 text-center shadow-sm border border-emerald-100 relative overflow-hidden"
                 >
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('/textures/noise.svg')] pointer-events-none" />
                    <div className="w-24 h-24 bg-white/50 rounded-[0.5rem] flex items-center justify-center text-emerald-200 mx-auto mb-10 border border-emerald-100/50">
                      <MapIcon size={48} />
                    </div>
                    <h3 className="text-3xl font-black text-emerald-950 italic mb-6 tracking-tighter leading-tight">A clareira está tranquila</h3>
                    <p className="text-poetic text-emerald-900/40 !text-[16px] !not-italic max-w-[300px] mx-auto leading-relaxed">
                      Você explorou todos os segredos desta região por hoje. Que tal descansar no seu ninho?
                    </p>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
        </div>

        <MascotTip
          tip="Explore a trilha das aventuras para ganhar energia e fortalecer nosso ninho!"
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
          mission={lastCompletedMission}
          reward={lastCompletedMission ? { coins: lastCompletedMission.coins, xp: lastCompletedMission.xp } : null}
        />

        <ChildWalletModal 
          isOpen={modals.showWallet}
          onClose={modals.closeWallet}
        />
      </ClientOnly>
    </PageContainer>
  )
}
