'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Coins,
  Flame,
  Sparkles,
  Trophy,
  type LucideIcon,
  Sun,
  Moon,
  Sword,
  Newspaper,
  Lightbulb,
  Heart
} from 'lucide-react'
import clsx from 'clsx'
import { PageContainer } from '@/components/page-container'
import { XPProgressCard } from '@/features/dashboard/components/XPProgressCard'
import { MascotTip } from '@/features/dashboard/components/MascotTip'
import { MissionDetailModal } from '@/components/modals/MissionDetailModal'
import { MissionSuccessModal } from '@/components/modals/MissionSuccessModal'
import { useChildDashboard } from '@/features/dashboard/hooks/use-child-dashboard'
import { useMentorGreeting } from '@/features/dashboard/hooks/use-mentor-greeting'
import { MagicNest } from '@/features/dashboard/components/MagicNest'
import { audioService } from '@/services/audio-service'
import { SoundToggle } from '@/components/SoundToggle'
import { useWorldState } from '@/stores/use-world-state'
import { ClientOnly } from '@/components/ClientOnly'
import Link from 'next/link'
import { DashboardHero } from '@/features/dashboard/components/DashboardHero'

/**
 * 🏠 ChildDashboardPage (Home): O Coração da Floresta
 * 
 * Agora focado em narrativas, novidades e bem-estar, com as missões em sua própria trilha.
 */

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

export default function ChildDashboardPage() {
  const [showTip, setShowTip] = useState(true)
  const audioTriggered = useRef(false)

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

  const { greeting, mentor: dominantMentor } = useMentorGreeting()

  useEffect(() => {
    if (!profile) {
      fetchProfile('child-1')
    }
  }, [profile, fetchProfile])

  /* 
  useEffect(() => {
    if (profile && !audioTriggered.current) {
      audioService.playEffect('morning_greeting')
      audioTriggered.current = true
    }
  }, [profile])
  */

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0A1A14] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          className="text-brand-primary"
        >
          <Sparkles size={48} />
        </motion.div>
      </div>
    )
  }

  const completedMissions = missions.filter(mission => mission.completed).length
  const featuredMission = missions.find(mission => !mission.completed) ?? missions[0]
  const allMissionsDone = missions.length > 0 && completedMissions === missions.length

  return (
    <PageContainer title="Início" hideHeader hideAvatar mentor={dominantMentor.toLowerCase() as any} energy={vibe === 'night' ? 'night' : 'adventure'}>
      <ClientOnly>
        <DashboardHero 
          profile={profile}
          vibe={vibe}
          greeting={greeting}
          dominantMentor={dominantMentor}
          onOpenWallet={modals.openWallet}
        />

        <div className="relative z-20 -mt-8">
          <XPProgressCard xp={profile.xp} nextLevelXp={profile.nextLevelXp} level={profile.level} />
        </div>

        {/* Narrative Spatial Flow: Optimized pacing */}
        <div className="space-y-20 px-6 pb-20 mt-12">
          
          {/* Section 1: The Clearing (News) */}
          <section className="max-w-2xl mx-auto w-full">
            <div className="flex flex-col items-center text-center gap-4 mb-8">
              <div className="flex items-center justify-center text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                <Newspaper size={24} strokeWidth={2.5} />
              </div>
              <h3 className="text-[10px] font-black tracking-[0.3em] text-emerald-900/90 uppercase">Notícias da Clareira</h3>
            </div>

            <div className="sacred-card p-10 group !border-0">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                <Sparkles size={120} className="text-brand-accent" />
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10 text-center sm:text-left">
                <div className="flex items-center justify-center w-24 h-24 !rounded-[0.5rem] !bg-brand-accent/10 !text-brand-accent shadow-none">
                  <Sparkles size={48} fill="currentColor" />
                </div>
                <div>
                  <p className="text-2xl font-black text-emerald-950 mb-3 leading-tight italic tracking-tight">O Festival da Lua chegou!</p>
                  <p className="text-poetic text-emerald-900/90 !text-[15px] !not-italic leading-relaxed">Complete missões durante o anoitecer para ganhar bônus de luz estelar e recompensas raras.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: The Mentor's Nest */}
          <section className="max-w-2xl mx-auto w-full">
            <div className="flex flex-col items-center text-center gap-4 mb-8">
              <div className="flex items-center justify-center text-brand-accent drop-shadow-[0_0_10px_rgba(252,225,138,0.3)]">
                <Lightbulb size={24} strokeWidth={2.5} />
              </div>
              <h3 className="text-[10px] font-black tracking-[0.3em] text-emerald-900/90 uppercase">Sussurro de {dominantMentor}</h3>
            </div>

            <div className="ritual-card p-12 group !bg-emerald-950/95">
              <div className="absolute inset-0 opacity-5 bg-[url('/textures/noise.svg')] pointer-events-none mix-blend-overlay" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <motion.div 
                  animate={{ y: [0, -12, 0], rotate: [0, 1, 0, -1, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-40 h-40 mb-8 flex items-center justify-center relative group"
                >
                  <img 
                    src={`/mentors/${dominantMentor.toLowerCase()}.png`} 
                    alt={dominantMentor} 
                    className="w-full h-full object-contain opacity-95 relative z-10 drop-shadow-[0_0_20px_rgba(252,225,138,0.2)]" 
                  />
                </motion.div>
                <p className="text-3xl text-poetic mb-8 leading-snug italic text-emerald-50/90">
                  "Cuidar do ninho com calma é a maior de todas as aventuras."
                </p>
                <div className="flex items-center gap-2 text-brand-accent text-[10px] font-bold tracking-widest bg-white/10 px-8 py-3 rounded-[0.5rem] border border-white/20">
                  <Heart size={14} fill="currentColor" />
                  MENTOR {dominantMentor.toUpperCase()}
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: The Journey Path */}
          {featuredMission && !allMissionsDone && (
            <section className="max-w-2xl mx-auto w-full">
              <div className="flex flex-col items-center text-center gap-4 mb-8">
                <div className="flex items-center justify-center text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                  <Sword size={24} strokeWidth={2.5} />
                </div>
                <h3 className="text-[10px] font-black tracking-[0.3em] text-emerald-900/90 uppercase">Próxima Jornada</h3>
              </div>

              <motion.div
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => modals.openMission(featuredMission.id)}
                className="floating-card p-8 flex flex-col sm:flex-row items-center justify-between cursor-pointer group !bg-forest-parchment/30 !border-emerald-100/50"
              >
                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left mb-6 sm:mb-0">
                  <div className="section-icon w-20 h-20 !rounded-[0.5rem] !bg-white !border-emerald-100 !text-4xl shadow-sm">
                    {featuredMission.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.2em] text-emerald-900/50 mb-1 uppercase">{featuredMission.category}</p>
                    <p className="text-2xl font-black text-emerald-950 leading-tight italic tracking-tighter">{featuredMission.title}</p>
                  </div>
                </div>
                <div className="cj-button cj-button-primary !w-full sm:!w-16 h-16 !p-0 shadow-lg">
                  <ArrowRight size={28} strokeWidth={3} />
                </div>
              </motion.div>
            </section>
          )}

          {/* Spacer to clear BottomNav and MascotTip */}
          <div className="h-48" aria-hidden="true" />
        </div>

        <MascotTip
          tip="Você já viu que a floresta mudou hoje? Explore o mapa para descobrir!"
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
      </ClientOnly>
    </PageContainer>
  )
}
